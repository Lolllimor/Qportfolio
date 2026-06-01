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
    'Product and UX designer crafting digital experiences across fintech, ed-tech, AI-powered tools, and social impact products. Currently designing at Interswitch.',
  url: normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),
  ogImage: '/opengraph-image',
  email: 'quadrimorin@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/quadmor/',
    behance: 'https://www.behance.net/quadrimorin',
    github: 'https://github.com/Quadmor009',
    medium: 'https://medium.com/@quadmor009',
  },
} as const;

export const portfolioRoutes = [
  { path: '/', label: 'Home' },
  { path: '/product', label: 'Products' },
  { path: '/graphics', label: 'Graphics' },
  { path: '/gallery', label: 'Artworks' },
  { path: '/articles', label: 'Articles' },
] as const;

export const twentyIiRoutes = [
  { path: '/twenty-ii', label: 'Twenty II' },
  { path: '/twenty-ii/artworks', label: 'Artworks' },
  { path: '/twenty-ii/artist', label: 'Artist' },
] as const;
