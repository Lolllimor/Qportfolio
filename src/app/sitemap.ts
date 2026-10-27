import type { MetadataRoute } from 'next';

import { articles } from '@/lib/articles';
import { getArtworkSitemapEntries } from '@/lib/artworks';
import {
  caseStudyRoutes,
  exploreArtRoute,
  getCanonicalUrl,
  portfolioRoutes,
  twentyIiRoutes,
} from '@/lib/site';

function laterDate(current: string, next: string) {
  return next > current ? next : current;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newestArticleDate = articles.reduce(
    (latest, article) => laterDate(latest, article.date),
    '1970-01-01'
  );

  const portfolioEntries = portfolioRoutes.map(({ path, updated }) => ({
    url: getCanonicalUrl(path),
    lastModified: new Date(
      path === '/articles' ? laterDate(updated, newestArticleDate) : updated
    ),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const exploreArtEntry = {
    url: getCanonicalUrl(exploreArtRoute.path),
    lastModified: new Date(exploreArtRoute.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  };

  const caseStudyEntries = caseStudyRoutes
    .filter((route) => !('private' in route && route.private))
    .map(({ path, updated }) => ({
      url: getCanonicalUrl(path),
      lastModified: new Date(updated),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  const twentyIiEntries = twentyIiRoutes.map(({ path, updated }) => ({
    url: getCanonicalUrl(path),
    lastModified: new Date(updated),
    changeFrequency: 'weekly' as const,
    priority: path === '/twenty-ii' ? 0.7 : 0.6,
  }));

  const articleEntries = articles.map((article) => ({
    url: getCanonicalUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const artworkEntries = (await getArtworkSitemapEntries()).map(
    ({ id, updatedAt }) => ({
      url: getCanonicalUrl(`/twenty-ii/artworks/${id}`),
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    })
  );

  return [
    ...portfolioEntries,
    exploreArtEntry,
    ...articleEntries,
    ...caseStudyEntries,
    ...twentyIiEntries,
    ...artworkEntries,
  ];
}
