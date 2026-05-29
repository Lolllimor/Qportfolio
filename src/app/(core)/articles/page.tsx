import Article from '@/components/article/Article';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Articles',
  description:
    'Writing on design, AI, UX research, design systems, and how designers work.',
  path: '/articles',
});

export default function ArticlesPage() {
  return <Article />;
}
