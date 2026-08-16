import { Gallery } from '@/components/gallery/Gallery';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, pageBreadcrumbJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Artworks',
  description:
    'A gallery of original artworks and visual pieces by Quadri Morin.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={pageBreadcrumbJsonLd('Artworks', '/gallery')} />
      <Gallery />
    </>
  );
}
