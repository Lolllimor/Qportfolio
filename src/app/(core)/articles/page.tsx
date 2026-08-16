import Article from '@/components/article/Article';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, pageBreadcrumbJsonLd } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Articles',
  description:
    'Writing on design, AI, UX research, design systems, and how designers work.',
  path: '/articles',
});

export default function ArticlesPage() {
  return (
    <>
      <JsonLd data={pageBreadcrumbJsonLd('Articles', '/articles')} />
      <Article />
    </>
  );
}
