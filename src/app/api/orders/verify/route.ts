import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/strapiServer';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, reference } = body;

    // Validate required fields
    if (!orderId || !reference) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, reference' },
        { status: 400 }
      );
    }

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment verification service unavailable' },
        { status: 500 }
      );
    }

    // Check idempotency key (optional but recommended)
    const idempotencyKey = request.headers.get('Idempotency-Key');

    // Fetch order from Strapi
    let order;
    try {
      const orderResponse = await client.collection('orders').find({
        filters: {
          $or: [
            { id: { $eq: Number(orderId) || orderId } },
            { documentId: { $eq: String(orderId) } },
          ],
        },
      });

      if (!orderResponse.data || orderResponse.data.length === 0) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      order = orderResponse.data[0];
    } catch (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { error: 'Failed to fetch order' },
        { status: 500 }
      );
    }

    const orderData = order.attributes || order;

    // Check if order is already paid (idempotency check)
    if (orderData.status === 'paid') {
      return NextResponse.json({
        success: true,
        message: 'Payment already verified (cached)',
        alreadyPaid: true,
        isIdempotentReplay: true,
        data: {
          orderId: order.id || orderData.id,
          status: orderData.status,
          paid: true,
        },
      });
    }

    // Verify payment with Paystack
    const verificationResult = await verifyPaystackPayment(reference);

    if (!verificationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification failed: ${
            verificationResult.message || 'Unknown error'
          }`,
        },
        { status: 500 }
      );
    }

    // Update order status to paid
    try {
      const documentId = order.documentId || orderData.documentId;
      const updateData: any = {
        status: 'paid',
      };

      // Store Paystack reference if different from our reference
      if (
        verificationResult.data?.reference &&
        verificationResult.data.reference !== reference
      ) {
        updateData.paystackReference = verificationResult.data.reference;
      }

      if (documentId) {
        await client.collection('orders').update(documentId, {
          data: updateData,
        });
      } else {
        // Fallback to ID-based update
        await client
          .collection('orders')
          .update(String(order.id || orderData.id), {
            data: updateData,
          });
      }

      // If order has artworkId, mark artwork as sold
      if (orderData.artworkId) {
        try {
          const artworkResponse = await client.collection('artworks').find({
            filters: {
              $or: [
                { id: { $eq: Number(orderData.artworkId) } },
                { documentId: { $eq: String(orderData.artworkId) } },
              ],
            },
          });

          if (artworkResponse.data && artworkResponse.data.length > 0) {
            const artwork = artworkResponse.data[0];
            const artworkData = artwork.attributes || artwork;

            if (!artworkData.BoughtBy) {
              const artworkDocumentId =
                artwork.documentId || artworkData.documentId;
              if (artworkDocumentId) {
                await client.collection('artworks').update(artworkDocumentId, {
                  data: {
                    BoughtBy: orderData.customerName || 'Unknown Buyer',
                  },
                });
              } else {
                await client
                  .collection('artworks')
                  .update(String(artwork.id || artworkData.id), {
                    data: {
                      BoughtBy: orderData.customerName || 'Unknown Buyer',
                    },
                  });
              }
            }
          }
        } catch (artworkError) {
          console.error('Error updating artwork after payment:', artworkError);
          // Don't fail the verification if artwork update fails
        }
      }
    } catch (updateError) {
      console.error('Error updating order status:', updateError);
      // Payment is verified but order update failed
      // Return success but log the error
    }

    return NextResponse.json({
      success: true,
      message: 'Order verified and paid',
      alreadyPaid: false,
      data: {
        orderId: order.id || orderData.id,
        status: 'paid',
        paid: true,
      },
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Payment verification failed: ${
          error.message || 'Unknown error'
        }`,
      },
      { status: 500 }
    );
  }
}

async function verifyPaystackPayment(reference: string): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: `Paystack API error: ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (data.status && data.data) {
      // Check if payment was successful
      if (data.data.status === 'success') {
        return {
          success: true,
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: `Payment status: ${data.data.status}`,
        };
      }
    } else {
      return {
        success: false,
        message: data.message || 'Payment verification failed',
      };
    }
  } catch (error) {
    console.error('Paystack verification error:', error);
    return {
      success: false,
      message: 'Network error during verification',
    };
  }
}
