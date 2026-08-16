import type { Metadata } from 'next';

import type { Artwork } from '@/types';
import ExhibitionPage from '@/components/twenty-ii/ExhibitionPage';
import { JsonLd } from '@/components/JsonLd';
import { getArtworks } from '@/lib/artworks';
import { createPageMetadata, twentyIiBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Artworks — Twenty II',
  description:
    'Browse the Twenty II art collection by Quadri Morin. Digital artworks exploring self-empowerment, identity, and inner transformation.',
  path: '/twenty-ii/artworks',
});

export default async function ArtworksPage() {
  let initialArtworks: Artwork[] = [];
  let initialPagination;
  let initialError = false;

  try {
    const result = await getArtworks(1, 25);
    initialArtworks = result.artworks;
    initialPagination = result.pagination;
  } catch {
    initialError = true;
  }

  return (
    <>
      <JsonLd
        data={twentyIiBreadcrumbJsonLd([
          { name: 'Artworks', path: '/twenty-ii/artworks' },
        ])}
      />
      <ExhibitionPage
        initialArtworks={initialArtworks}
        initialPagination={initialPagination}
        initialError={initialError}
      />
    </>
  );
}
