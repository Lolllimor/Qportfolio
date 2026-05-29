import type { Metadata } from 'next';

import Home from '@/components/home/Home';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quadri Morin — Product & UX Designer',
  description:
    'Product and UX designer crafting digital experiences across fintech, ed-tech, AI-powered tools, and social impact products. Currently designing at Interswitch.',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
