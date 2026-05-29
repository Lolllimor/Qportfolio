import type { Metadata } from 'next';

import Artist from './ArtistClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About the Artist — Twenty II',
  description:
    'Quadri Morin is an artist whose work explores self-empowerment, inner transformation, and the quiet shifts that redefine personal identity.',
  path: '/twenty-ii/artist',
});

export default function ArtistPage() {
  return <Artist />;
}
