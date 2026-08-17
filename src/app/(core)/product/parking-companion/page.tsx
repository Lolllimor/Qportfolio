import { ParkingCompanionStudy } from '@/components/product/ParkingCompanionStudy';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

const PATH = '/product/parking-companion';
const TITLE = 'Parking Management Companion App';
const DESCRIPTION =
  'Usability research and redesign of the Quickteller parking companion app. 14 participants over 7 weeks. Score moved from 7.3 to 9.4.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: 'article',
});

export default function ParkingCompanionPage() {
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
          datePublished: '2025-07',
          image: getCanonicalUrl(
            '/case-studies/parking-companion/high-fidelity.webp'
          ),
        })}
      />
      <ParkingCompanionStudy />
    </>
  );
}
