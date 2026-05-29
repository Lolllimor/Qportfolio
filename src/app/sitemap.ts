import type { MetadataRoute } from 'next';

import { portfolioRoutes, siteConfig, twentyIiRoutes } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch artwork IDs for dynamic routes
  let artworkEntries: MetadataRoute.Sitemap = [];
  try {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
    const res = await fetch(`${base}/api/artworks`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const artworks: { documentId: string; Title: string; art?: { url?: string } }[] =
        data.artworks ?? data ?? [];
      artworkEntries = artworks.map((a) => ({
        url: `${siteConfig.url}/twenty-ii/artworks/${a.documentId}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.55,
        ...(a.art?.url ? { images: [a.art.url] } : {}),
      }));
    }
  } catch {
    // API unavailable at build time — skip dynamic entries
  }

  return [...portfolioEntries, ...twentyIiEntries, ...artworkEntries];
}
