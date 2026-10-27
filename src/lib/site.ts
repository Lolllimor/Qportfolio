const DEFAULT_SITE_URL = 'https://www.quadmor.design';

/** Single canonical origin: https, www, no trailing slash on origin. */
export function normalizeSiteOrigin(raw: string): string {
  try {
    const parsed = new URL(raw);
    if (parsed.hostname === 'quadmor.design') {
      parsed.hostname = 'www.quadmor.design';
    }
    parsed.protocol = 'https:';
    parsed.pathname = '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Absolute canonical URL for a path (homepage keeps trailing slash). */
export function getCanonicalUrl(path = ''): string {
  const origin = siteConfig.url;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!path || normalizedPath === '/') {
    return `${origin}/`;
  }

  return `${origin}${normalizedPath.replace(/\/$/, '')}`;
}

export const siteConfig = {
  name: 'Quadri Morin',
  title: 'Quadri Morin — Product & UX Designer',
  description:
    'Product and UX designer working across fintech, ed-tech, AI tools, and social-impact products. Case studies and articles on craft, AI, and UX.',
  url: normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),
  ogImage: '/opengraph-image',
  email: 'quadmor009@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/quadmor/',
    behance: 'https://www.behance.net/quadrimorin',
    github: 'https://github.com/Quadmor009',
    medium: 'https://medium.com/@quadmor009',
    instagram: 'https://www.instagram.com/quadmor',
  },
} as const;

export const portfolioRoutes = [
  { path: '/', label: 'Quadmor', updated: '2026-10-26' },
  { path: '/product', label: 'Products', updated: '2026-08-27' },
  { path: '/graphics', label: 'Graphics', updated: '2026-08-27' },
  { path: '/gallery', label: 'Artworks', updated: '2026-08-27' },
  { path: '/articles', label: 'Articles', updated: '2026-10-20' },
] as const;

export const exploreArtRoute = {
  path: '/gallery/explore',
  label: 'Explore artworks',
  updated: '2026-08-27',
} as const;

export const caseStudyRoutes = [
  {
    path: '/product/pawa',
    label: 'Pawa',
    updated: '2026-08-27',
  },
  {
    path: '/product/emprinte',
    label: 'Emprinte Readers Hub',
    updated: '2026-08-27',
  },
  {
    path: '/product/changers',
    label: 'Changers Website Design',
    updated: '2026-08-27',
  },
  {
    path: '/product/parking-companion',
    label: 'Parking Management Companion App',
    updated: '2026-08-27',
    private: true,
  },
] as const;

export const twentyIiRoutes = [
  { path: '/twenty-ii', label: 'Twenty II', updated: '2026-09-11' },
  { path: '/twenty-ii/artworks', label: 'Artworks', updated: '2026-08-27' },
  { path: '/twenty-ii/artist', label: 'Artist', updated: '2026-08-27' },
] as const;
