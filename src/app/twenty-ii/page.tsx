import { JsonLd } from '@/components/JsonLd';
import { pageBreadcrumbJsonLd } from '@/lib/seo';

import TwentyTwoPage from './TwentyTwoClient';

export default function Page() {
  return (
    <>
      <JsonLd data={pageBreadcrumbJsonLd('Twenty II', '/twenty-ii')} />
      <TwentyTwoPage />
    </>
  );
}
