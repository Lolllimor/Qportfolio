import { useEffect, useState } from 'react';
import { Artwork } from '@/types';

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
        const response = await fetch(`/api/artworks/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Artwork not found');
          }
          throw new Error('Failed to fetch artwork');
        }

        const data = await response.json();
// info
        if (isMounted) {
          setArtwork(data.artwork);
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
