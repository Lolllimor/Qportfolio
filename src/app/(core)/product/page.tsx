import { ProductComponent } from '@/components/product/Product';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, pageBreadcrumbJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Product Design',
  description:
    'UX and product design case studies across fintech, community platforms, admin dashboards, and mobile apps.',
  path: '/product',
});

export default function ProductPage() {
  return (
    <>
      <JsonLd data={pageBreadcrumbJsonLd('Product Design', '/product')} />
      <ProductComponent />
    </>
  );
}
