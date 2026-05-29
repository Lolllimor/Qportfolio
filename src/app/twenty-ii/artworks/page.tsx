import type { Metadata } from 'next';

import ExhibitionPage from '@/components/twenty-ii/ExhibitionPage';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Artworks — Twenty II',
  description:
    'Browse the Twenty II art collection by Quadri Morin. Digital artworks exploring self-empowerment, identity, and inner transformation.',
  path: '/twenty-ii/artworks',
});

export default function ArtworksPage() {
  return <ExhibitionPage />;
}
