import { FloatingGallery } from '@/components/gallery/FloatingGallery';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'Explore my art',
  description:
    'Original digital pieces by Quadri Morin — portraits, figures, and studies from the studio.',
  path: '/gallery/explore',
});

export default function ExploreArtPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Artworks', url: getCanonicalUrl('/gallery') },
          { name: 'Explore my art', url: getCanonicalUrl('/gallery/explore') },
        ])}
      />
      <FloatingGallery />
    </>
  );
}
