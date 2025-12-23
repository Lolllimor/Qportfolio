import { useEffect, useState } from 'react';

import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiClient';
import { Art, Artwork } from '@/types';

export interface UseFetchArtworkReturn {
  artwork?: Artwork;
  loading: boolean;
  error?: unknown;
}

export function useFetchArtwork(id: string | number): UseFetchArtworkReturn {
  const [artwork, setArtwork] = useState<Artwork | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
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
          throw new Error('Artwork not found');
        }

        const item = response.data[0];
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
            typeof data.Price === 'string'
              ? data.Price
              : String(data.Price || '0'),
          Year:
            typeof data.Year === 'number' ? data.Year : Number(data.Year) || 0,
          Collection: data.Collection || '',
          BoughtBy: data.BoughtBy || null,
        };

        if (isMounted) {
          setArtwork(transformedArtwork);
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
  }, [id]);

  return { artwork, loading, error };
}
