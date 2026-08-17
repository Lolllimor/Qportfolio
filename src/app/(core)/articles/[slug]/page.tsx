import { notFound } from 'next/navigation';

import { ArticlePost } from '@/components/article/ArticlePost';
import { JsonLd } from '@/components/JsonLd';
import { articles, getArticle } from '@/lib/articles';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/site';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    image: article.cover,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const path = `/articles/${article.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Articles', url: getCanonicalUrl('/articles') },
          { name: article.title, url: getCanonicalUrl(path) },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.description,
          path,
          datePublished: article.date,
          image: getCanonicalUrl(article.cover),
        })}
      />
      <ArticlePost article={article} />
    </>
  );
}
