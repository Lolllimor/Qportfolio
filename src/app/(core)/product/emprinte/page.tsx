import { EmprinteReadersStudy } from '@/components/product/EmprinteReadersStudy';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

const PATH = '/product/emprinte';
const TITLE = 'Emprinte Readers Hub';
const DESCRIPTION =
  'Brand and product ecosystem for Emprinte Readers Hub — a reading and accountability platform for ambitious young Africans. Solo-led from strategy to App Store launch.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'article',
});

export default function EmprintePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Product Design', url: getCanonicalUrl('/product') },
          { name: TITLE, url: getCanonicalUrl(PATH) },
        ])}
      />
      <JsonLd
        data={caseStudyJsonLd({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
          datePublished: '2026-05',
          image: getCanonicalUrl('/case-studies/emprinte/cover.webp'),
        })}
      />
      <EmprinteReadersStudy />
    </>
  );
}
