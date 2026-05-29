export const siteConfig = {
  name: 'Quadri Morin',
  title: 'Quadri Morin — Product & UX Designer',
  description:
    'Product and UX designer crafting digital experiences across fintech, ed-tech, AI-powered tools, and social impact products. Currently designing at Interswitch.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3005',
  ogImage: '/logo.png',
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
