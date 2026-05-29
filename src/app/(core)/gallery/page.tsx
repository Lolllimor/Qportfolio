import { Gallery } from '@/components/gallery/Gallery';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Artworks',
  description:
    'A gallery of original artworks and visual pieces by Quadri Morin.',
  path: '/gallery',
});

export default function GalleryPage() {
  return <Gallery />;
}
