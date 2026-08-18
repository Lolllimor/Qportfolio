import { ChangersStudy } from '@/components/product/ChangersStudy';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

const PATH = '/product/changers';
const TITLE = 'Changers Website Design';
const DESCRIPTION =
  'CHANGERS is a platform connecting social-initiative advocates with campaigns across Africa. End-to-end UX for discovery, donations, and impact tracking.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'article',
});

export default function ChangersPage() {
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
          datePublished: '2025-01',
          image: getCanonicalUrl('/case-studies/changers/cover.webp'),
        })}
      />
      <ChangersStudy />
    </>
  );
}
