import { useEffect, useState } from 'react';
import { Artwork } from '@/types';

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
        const response = await fetch(
          `/api/artworks?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }

        const data = await response.json();

        if (isMounted) {
          setArtworks(data.artworks);
          if (data.pagination) {
            setPagination(data.pagination);
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
