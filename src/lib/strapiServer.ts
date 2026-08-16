import { strapi } from '@strapi/client';

function readStrapiEnv() {
  const baseURL =
    process.env.STRAPI_BASE_URL || process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const mediaBase =
    process.env.STRAPI_BASE_URL_WITHOUT_API ||
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL_WITHOUT_API;
  const auth =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  return { baseURL, mediaBase, auth };
}

export function getStrapiMediaBase(): string {
  return readStrapiEnv().mediaBase || '';
}

let cachedClient: ReturnType<typeof strapi> | null | undefined;

export function getStrapiClient() {
  if (cachedClient !== undefined) return cachedClient;

  const { baseURL, mediaBase, auth } = readStrapiEnv();
  if (!baseURL || !mediaBase || !auth) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = strapi({
    baseURL,
    auth,
  });
  return cachedClient;
}

const client = new Proxy({} as ReturnType<typeof strapi>, {
  get(_target, prop) {
    const resolved = getStrapiClient();
    if (!resolved) {
      throw new Error(
        'STRAPI_BASE_URL / STRAPI_API_TOKEN environment variables are required'
      );
    }
    const value = resolved[prop as keyof typeof resolved];
    return typeof value === 'function' ? value.bind(resolved) : value;
  },
});

export default client;
export const STRAPI_BASE_URL_WITHOUT_API = getStrapiMediaBase();
