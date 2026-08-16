import { Graphics } from '@/components/graphics/Graphics';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, pageBreadcrumbJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Graphics',
  description:
    'Visual design work including branding, posters, and graphic design projects by Quadri Morin.',
  path: '/graphics',
});

export default function GraphicsPage() {
  return (
    <>
      <JsonLd data={pageBreadcrumbJsonLd('Graphics', '/graphics')} />
      <Graphics />
    </>
  );
}
