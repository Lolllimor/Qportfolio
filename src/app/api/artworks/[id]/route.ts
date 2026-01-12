import { NextRequest, NextResponse } from 'next/server';
import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiServer';
import { Art, Artwork } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      );
    }

    // Try to find by documentId first, then by id
    let response;
    try {
      response = await client.collection('artworks').find({
        filters: { documentId: { $eq: String(id) } },
        populate: '*',
      });
    } catch {
      // Fallback to id if documentId doesn't work
      response = await client.collection('artworks').find({
        filters: { id: { $eq: Number(id) || id } },
        populate: '*',
      });
    }

    if (!response.data || response.data.length === 0) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    const item = response.data[0];
    const data = item.attributes || item;

    // Extract tags - handle both relation format and direct format
    let tags: string[] = [];
    if (data.tags) {
      if (data.tags.data) {
        tags = Array.isArray(data.tags.data)
          ? data.tags.data.map((tag: any) => {
              const tagData = tag.attributes || tag;
              return tagData.tag || tagData.name || tagData.title || '';
            })
          : [];
      } else if (Array.isArray(data.tags)) {
        tags = data.tags.map((tag: any) => {
          const tagData = tag.attributes || tag;
          return tagData.tag || tagData.name || tagData.title || String(tag);
        });
      } else if (typeof data.tags === 'string') {
        tags = [data.tags];
      }
    }

    // Process art object and construct full URL
    let art: Art = {} as Art;
    if (data.art) {
      const artData = data.art.data || data.art;
      const artAttributes = artData.attributes || artData;

      const imageUrl = artAttributes.url
        ? artAttributes.url.startsWith('http')
          ? artAttributes.url
          : `${STRAPI_BASE_URL_WITHOUT_API}${artAttributes.url}`
        : '';

      art = {
        ...artAttributes,
        url: imageUrl,
        formats: artAttributes.formats
          ? {
              ...artAttributes.formats,
              thumbnail: artAttributes.formats.thumbnail
                ? {
                    ...artAttributes.formats.thumbnail,
                    url: artAttributes.formats.thumbnail.url?.startsWith('http')
                      ? artAttributes.formats.thumbnail.url
                      : `${STRAPI_BASE_URL_WITHOUT_API}${artAttributes.formats.thumbnail.url}`,
                  }
                : ({} as any),
              small: artAttributes.formats.small
                ? {
                    ...artAttributes.formats.small,
                    url: artAttributes.formats.small.url?.startsWith('http')
                      ? artAttributes.formats.small.url
                      : `${STRAPI_BASE_URL_WITHOUT_API}${artAttributes.formats.small.url}`,
                  }
                : ({} as any),
            }
          : ({} as any),
      };
    }

    const transformedArtwork: Artwork = {
      id: item.id || data.id || 0,
      documentId: item.documentId || data.documentId || '',
      Title: data.Title || '',
      Date: data.Date || '',
      createdAt: item.createdAt || data.createdAt || new Date(),
      updatedAt: item.updatedAt || data.updatedAt || new Date(),
      publishedAt: item.publishedAt || data.publishedAt || new Date(),
      art: art,
      tags: tags.filter((tag) => tag !== ''),
      Price:
        typeof data.Price === 'string' ? data.Price : String(data.Price || '0'),
      Year: typeof data.Year === 'number' ? data.Year : Number(data.Year) || 0,
      Collection: data.Collection || '',
      BoughtBy: data.BoughtBy || null,
    };

    return NextResponse.json({ artwork: transformedArtwork });
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
}
