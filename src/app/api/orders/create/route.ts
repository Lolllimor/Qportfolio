import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/strapiServer';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference, amount, customerName, email, phone, artworkId } = body;

    // Validate required fields (phone and artworkId are optional per guide)
    if (!reference || !amount || !customerName || !email) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing required fields: reference, amount, customerName, email',
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Valid email is required',
        },
        { status: 400 }
      );
    }

    if (!customerName || customerName.trim().length < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Customer name is required',
        },
        { status: 400 }
      );
    }

    // Check if order with this reference already exists (idempotency)
    let existingOrder = null;
    try {
      const existingResponse = await client.collection('orders').find({
        filters: { reference: { $eq: reference } },
      });

      if (existingResponse.data && existingResponse.data.length > 0) {
        existingOrder = existingResponse.data[0];
        const orderData = existingOrder.attributes || existingOrder;

        return NextResponse.json({
          success: true,
          message: 'Order already exists',
          isNew: false,
          data: {
            orderId: existingOrder.id || orderData.id,
            reference: orderData.reference || reference,
            amount: orderData.amount || amount,
            status: orderData.status || 'pending',
            customerName: orderData.customerName || customerName,
            email: orderData.email || email,
          },
        });
      }
    } catch (error) {
      // Collection might not exist yet, continue to create
      console.log(
        'No existing order found or collection does not exist, creating new order'
      );
    }

    // Fetch artwork from Strapi to validate price if artworkId is provided
    if (artworkId) {
      try {
        const artworkResponse = await client.collection('artworks').find({
          filters: {
            $or: [
              { documentId: { $eq: String(artworkId) } },
              { id: { $eq: Number(artworkId) || artworkId } },
            ],
          },
          populate: '*',
        });

        if (artworkResponse.data && artworkResponse.data.length > 0) {
          const item = artworkResponse.data[0];
          const data = item.attributes || item;

          // Check if artwork is already sold
          if (data.BoughtBy) {
            return NextResponse.json(
              {
                success: false,
                message: 'This artwork has already been purchased',
              },
              { status: 400 }
            );
          }

          // Validate amount matches artwork price (in kobo)
          const artworkPrice = Number(data.Price) * 100;
          if (Math.abs(artworkPrice - amount) > 1) {
            console.warn(
              `Amount mismatch: expected ${artworkPrice}, got ${amount}`
            );
          }
        }
      } catch (error) {
        console.error('Error fetching artwork:', error);
        // Continue with order creation even if artwork fetch fails
      }
    }

    // Create order in Strapi
    let createdOrder;
    try {
      const orderData: any = {
        reference: reference.trim(),
        amount: Number(amount),
        customerName: customerName.trim(),
        email: email.trim(),
        status: 'pending',
      };

      if (phone) {
        orderData.phone = phone.trim();
      }

      if (artworkId) {
        orderData.artworkId = Number(artworkId) || artworkId;
      }

      const createResponse = await client.collection('orders').create({
        data: orderData,
      });

      createdOrder = createResponse.data;
    } catch (error: any) {
      console.error('Error creating order in Strapi:', error);

      // If order creation fails, check if it was created in a retry
      if (error.message?.includes('duplicate') || error.status === 409) {
        try {
          const retryResponse = await client.collection('orders').find({
            filters: { reference: { $eq: reference } },
          });

          if (retryResponse.data && retryResponse.data.length > 0) {
            const existing = retryResponse.data[0];
            const orderData = existing.attributes || existing;

            return NextResponse.json({
              success: true,
              message: 'Order already exists (retry)',
              isNew: false,
              data: {
                orderId: existing.id || orderData.id,
                reference: orderData.reference || reference,
                amount: orderData.amount || amount,
                status: orderData.status || 'pending',
                customerName: orderData.customerName || customerName,
                email: orderData.email || email,
              },
            });
          }
        } catch (retryError) {
          // Fall through to error response
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: `Failed to create order: ${error.message || 'Unknown error'}`,
        },
        { status: 500 }
      );
    }

    const orderAttributes = createdOrder.attributes || createdOrder;

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      isNew: true,
      data: {
        orderId: createdOrder.id || orderAttributes.id,
        reference: orderAttributes.reference || reference,
        amount: orderAttributes.amount || amount,
        status: orderAttributes.status || 'pending',
        customerName: orderAttributes.customerName || customerName,
        email: orderAttributes.email || email,
      },
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to create order: ${error.message || 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
