import { NextRequest, NextResponse } from 'next/server';

import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiServer';
import { Art, Artwork } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '25', 10);

    const response = await client.collection('artworks').find({
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
    });

    const transformedArtworks: Artwork[] = response.data.map((item: any) => {
      const data = item.attributes || item;

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
                      url: artAttributes.formats.thumbnail.url?.startsWith(
                        'http'
                      )
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

      return {
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
          typeof data.Price === 'string'
            ? data.Price
            : String(data.Price || '0'),
        Year:
          typeof data.Year === 'number' ? data.Year : Number(data.Year) || 0,
        Collection: data.Collection || '',
        BoughtBy: data.BoughtBy || null,
      };
    });

    return NextResponse.json({
      artworks: transformedArtworks,
      pagination: response.meta?.pagination
        ? {
            page: response.meta.pagination.page,
            pageSize: response.meta.pagination.pageSize,
            pageCount: response.meta.pagination.pageCount,
            total: response.meta.pagination.total,
          }
        : undefined,
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}
