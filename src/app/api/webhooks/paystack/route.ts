import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/strapiServer';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle successful payment event
    if (event.event === 'charge.success' && event.data) {
      const transaction = event.data;
      const metadata = transaction.metadata;

      if (!metadata || !metadata.artwork_id) {
        console.error('Missing artwork_id in payment metadata');
        return NextResponse.json({ received: true });
      }

      // Verify transaction was successful
      if (transaction.status !== 'success') {
        console.log('Transaction not successful, skipping update');
        return NextResponse.json({ received: true });
      }

      try {
        // Find artwork by ID or documentId
        const artworkId = metadata.artwork_id;
        const artworkDocumentId = metadata.artwork_documentId;

        let artworkResponse;
        try {
          if (artworkDocumentId) {
            artworkResponse = await client.collection('artworks').find({
              filters: { documentId: { $eq: artworkDocumentId } },
            });
          } else {
            artworkResponse = await client.collection('artworks').find({
              filters: { id: { $eq: Number(artworkId) || artworkId } },
            });
          }
        } catch (error) {
          console.error('Error finding artwork:', error);
          return NextResponse.json({ received: true });
        }

        if (!artworkResponse.data || artworkResponse.data.length === 0) {
          console.error('Artwork not found for ID:', artworkId);
          return NextResponse.json({ received: true });
        }

        const artwork = artworkResponse.data[0];
        const artworkData = artwork.attributes || artwork;

        // Check if already purchased
        if (artworkData.BoughtBy) {
          console.log('Artwork already purchased, skipping update');
          return NextResponse.json({ received: true });
        }

        // Update artwork with buyer information
        const buyerName = metadata.customer_name || 'Unknown Buyer';
        const updateData: any = {
          BoughtBy: buyerName,
        };

        // Update the artwork
        const documentId = artwork.documentId || artworkData.documentId;
        if (documentId) {
          await client.collection('artworks').update(documentId, {
            data: updateData,
          });
        } else {
          // Fallback to ID-based update
          const id = artwork.id || artworkData.id;
          await client.collection('artworks').update(String(id), {
            data: updateData,
          });
        }

        console.log(`Artwork ${artworkId} marked as purchased by ${buyerName}`);
      } catch (error) {
        console.error('Error updating artwork after payment:', error);
        // Still return success to Paystack to avoid retries
        return NextResponse.json({ received: true });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
