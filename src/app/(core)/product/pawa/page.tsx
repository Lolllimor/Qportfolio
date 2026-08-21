import { PawaStudy } from '@/components/product/PawaStudy';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

const PATH = '/product/pawa';
const TITLE = 'Pawa — Solar Power Sharing App';
const DESCRIPTION =
  'A solar power-sharing app for Nigerian apartment buildings, designed and built end to end with AI — from the first sketch to a live interactive prototype.';
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
          name: TITLE,
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
