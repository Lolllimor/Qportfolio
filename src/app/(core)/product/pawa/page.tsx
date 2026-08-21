import { PawaStudy } from '@/components/product/PawaStudy';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

const PATH = '/product/pawa';
const TITLE = {
  absolute:
    'Pawa — Prepaid Power for Nigerian Apartments · Live Prototype | Quadri Morin',
};
const DESCRIPTION =
  'A prepaid power-sharing app for Nigerian apartment buildings — for landlords generating their own electricity and the tenants who buy it from them.';
const HERO = '/case-studies/pawa/pawa-hero.png';

export async function generateMetadata() {
  return createPageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    type: 'article',
    image: getCanonicalUrl(HERO),
  });
}

export default function PawaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Product Design', url: getCanonicalUrl('/product') },
          { name: 'Pawa', url: getCanonicalUrl(PATH) },
        ])}
      />
      <JsonLd
        data={caseStudyJsonLd({
          name: 'Pawa — Prepaid Power for Nigerian Apartments',
          description: DESCRIPTION,
          path: PATH,
          datePublished: '2026-08',
          image: getCanonicalUrl(HERO),
        })}
      />
      <PawaStudy />
    </>
  );
}
