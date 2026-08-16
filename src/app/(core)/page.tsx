import type { Metadata } from 'next';

import Home from '@/components/home/Home';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getWebsiteJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: {
    absolute: 'Quadri Morin — Product & UX Designer',
  },
  description:
    'Product and UX designer working across fintech, ed-tech, AI tools, and social-impact products used by millions.',
  path: '/',
  image: siteConfig.ogImage,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={getWebsiteJsonLd()} />
      <Home />
    </>
  );
}
