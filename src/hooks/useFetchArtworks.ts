import { useEffect, useState } from 'react';

import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiClient';
import { Art, Artwork } from '@/types';

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface UseFetchArtworksReturn {
  artworks?: Artwork[];
  loading: boolean;
  error?: unknown;
  pagination?: PaginationMeta;
}

export function useFetchArtworks(
  page: number = 1,
  pageSize: number = 25
): UseFetchArtworksReturn {
  const [artworks, setArtworks] = useState<Artwork[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(undefined);
  const [pagination, setPagination] = useState<PaginationMeta | undefined>(
    undefined
  );

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await client.collection('artworks').find({
          populate: '*',
          pagination: {
            page,
            pageSize,
          },
        });

        const transformedArtworks: Artwork[] = response.data.map(
          (item: any) => {
            const data = item.attributes || item;

            // Extract tags - handle both relation format and direct format
            let tags: string[] = [];
            if (data.tags) {
              if (data.tags.data) {
                // Relation format: tags.data is an array of tag objects
                tags = Array.isArray(data.tags.data)
                  ? data.tags.data.map((tag: any) => {
                      const tagData = tag.attributes || tag;
                      return tagData.tag || tagData.name || tagData.title || '';
                    })
                  : [];
              } else if (Array.isArray(data.tags)) {
                // Array of tag objects
                tags = data.tags.map((tag: any) => {
                  const tagData = tag.attributes || tag;
                  return (
                    tagData.tag || tagData.name || tagData.title || String(tag)
                  );
                });
              } else if (typeof data.tags === 'string') {
                // Single string
                tags = [data.tags];
              }
            }

            // Process art object and construct full URL
            let art: Art = {} as Art;
            if (data.art) {
              const artData = data.art.data || data.art;
              const artAttributes = artData.attributes || artData;

              // Construct full URL if it's a relative path
              const imageUrl = artAttributes.url
                ? artAttributes.url.startsWith('http')
                  ? artAttributes.url
                  : `${STRAPI_BASE_URL_WITHOUT_API}${artAttributes.url}`
                : '';

              art = {
                ...artAttributes,
                url: imageUrl,
                // Also update formats URLs if they exist
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
                            url: artAttributes.formats.small.url?.startsWith(
                              'http'
                            )
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
                typeof data.Year === 'number'
                  ? data.Year
                  : Number(data.Year) || 0,
              Collection: data.Collection || '',
              BoughtBy: data.BoughtBy || null,
            };
          }
        );

        if (isMounted) {
          setArtworks(transformedArtworks);

          // Extract pagination metadata
          if (response.meta?.pagination) {
            setPagination({
              page: response.meta.pagination.page,
              pageSize: response.meta.pagination.pageSize,
              pageCount: response.meta.pagination.pageCount,
              total: response.meta.pagination.total,
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return { artworks, loading, error, pagination };
}
