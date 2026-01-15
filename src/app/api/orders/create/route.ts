import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/strapiServer';
import crypto from 'crypto';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation (basic - adjust for your needs)
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference, amount, customerName, email, phone, artworkId } = body;

    // Validate required fields
    if (
      !reference ||
      !amount ||
      !customerName ||
      !email ||
      !phone ||
      !artworkId
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!phone || !PHONE_REGEX.test(phone) || phone.trim().length < 8) {
      return NextResponse.json(
        { error: 'Valid phone number is required' },
        { status: 400 }
      );
    }

    if (!customerName || customerName.trim().length < 1) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    // Fetch artwork from Strapi to get the REAL price (server-side)
    let artwork;
    try {
      const response = await client.collection('artworks').find({
        filters: {
          $or: [
            { documentId: { $eq: String(artworkId) } },
            { id: { $eq: Number(artworkId) || artworkId } },
          ],
        },
        populate: '*',
      });

      if (!response.data || response.data.length === 0) {
        return NextResponse.json(
          { error: 'Artwork not found' },
          { status: 404 }
        );
      }

      const item = response.data[0];
      const data = item.attributes || item;

      // Check if artwork is already sold
      if (data.BoughtBy) {
        return NextResponse.json(
          { error: 'This artwork has already been purchased' },
          { status: 400 }
        );
      }

      artwork = {
        id: item.id || data.id,
        documentId: item.documentId || data.documentId,
        Title: data.Title || '',
        Price:
          typeof data.Price === 'string'
            ? data.Price
            : String(data.Price || '0'),
      };
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return NextResponse.json(
        { error: 'Failed to fetch artwork details' },
        { status: 500 }
      );
    }

    // Validate and convert price
    const price = Number(artwork.Price);
    if (Number.isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: 'Invalid artwork price' },
        { status: 400 }
      );
    }

    // Return payment configuration (price is now validated server-side)
    return NextResponse.json({
      reference,
      amount: Math.round(price * 100), // Convert to kobo (Paystack uses smallest currency unit)
      email: email.trim(),
      metadata: {
        artwork_id: String(artwork.id),
        artwork_documentId: artwork.documentId,
        artwork_title: artwork.Title,
        customer_name: customerName.trim(),
        phone_number: phone.trim(),
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
