import type { MetadataRoute } from 'next';

import { articles } from '@/lib/articles';
import { getAllArtworkIds } from '@/lib/artworks';
import {
  caseStudyRoutes,
  getCanonicalUrl,
  portfolioRoutes,
  twentyIiRoutes,
} from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const portfolioEntries = portfolioRoutes.map(({ path }) => ({
    url: getCanonicalUrl(path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const caseStudyEntries = caseStudyRoutes.map(({ path }) => ({
    url: getCanonicalUrl(path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const twentyIiEntries = twentyIiRoutes.map(({ path }) => ({
    url: getCanonicalUrl(path),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/twenty-ii' ? 0.7 : 0.6,
  }));

  const articleEntries = articles.map((article) => ({
    url: getCanonicalUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const artworkIds = await getAllArtworkIds();
  const artworkEntries = artworkIds.map((id) => ({
    url: getCanonicalUrl(`/twenty-ii/artworks/${id}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

  return [
    ...portfolioEntries,
    ...articleEntries,
    ...caseStudyEntries,
    ...twentyIiEntries,
    ...artworkEntries,
  ];
}
