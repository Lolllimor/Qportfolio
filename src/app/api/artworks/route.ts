import { NextRequest, NextResponse } from 'next/server';

import { getArtworks } from '@/lib/artworks';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '25', 10);

    const result = await getArtworks(page, pageSize);

    return NextResponse.json({
      artworks: result.artworks,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}
