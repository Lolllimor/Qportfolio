import type { MetadataRoute } from 'next';

import { portfolioRoutes, siteConfig, twentyIiRoutes } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const portfolioEntries = portfolioRoutes.map(({ path }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const twentyIiEntries = twentyIiRoutes.map(({ path }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/twenty-ii' ? 0.7 : 0.6,
  }));

  return [...portfolioEntries, ...twentyIiEntries];
}
