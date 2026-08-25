import { Gallery } from '@/components/gallery/Gallery';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, pageBreadcrumbJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Artworks',
  description:
    "Studio artworks and Restacking the Odds, Quadri Morin's solo exhibition at OneArt Gallery, Lagos.",
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
