import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/strapiServer';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Fetch order from Strapi
    const orderResponse = await client.collection('orders').find({
      filters: {
        $or: [
          { id: { $eq: Number(id) || id } },
          { documentId: { $eq: String(id) } },
        ],
      },
    });

    if (!orderResponse.data || orderResponse.data.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderResponse.data[0];
    const orderData = order.attributes || order;

    // Fetch artwork details if artworkId exists
    let artworkDetails = null;
    if (orderData.artworkId) {
      try {
        const artworkResponse = await client.collection('artworks').find({
          filters: {
            $or: [
              { id: { $eq: Number(orderData.artworkId) } },
              { documentId: { $eq: String(orderData.artworkId) } },
            ],
          },
          populate: '*',
        });

        if (artworkResponse.data && artworkResponse.data.length > 0) {
          const artwork = artworkResponse.data[0];
          const artworkData = artwork.attributes || artwork;
          artworkDetails = {
            id: artwork.id || artworkData.id,
            documentId: artwork.documentId || artworkData.documentId,
            title: artworkData.Title,
            price: artworkData.Price,
            year: artworkData.Year,
            collection: artworkData.Collection,
          };
        }
      } catch (artworkError) {
        console.error('Error fetching artwork details:', artworkError);
      }
    }

    return NextResponse.json({
      order: {
        orderId: order.id || orderData.id,
        documentId: order.documentId || orderData.documentId,
        reference: orderData.reference || '',
        amount: orderData.amount || 0,
        status: orderData.status || 'pending',
        customerName: orderData.customerName || '',
        email: orderData.email || '',
        phone: orderData.phone || undefined,
        artworkId: orderData.artworkId || undefined,
        artworkDocumentId: orderData.artworkDocumentId || undefined,
        artwork: artworkDetails,
        createdAt: orderData.createdAt || order.createdAt,
      },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

