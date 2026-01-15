import { strapi } from '@strapi/client';

const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const STRAPI_BASE_URL_WITHOUT_API =
  process.env.STRAPI_BASE_URL_WITHOUT_API ||
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL_WITHOUT_API;
const STRAPI_AUTH_TOKEN =
  process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!STRAPI_BASE_URL) {
  throw new Error(
    'STRAPI_BASE_URL or NEXT_PUBLIC_STRAPI_BASE_URL environment variable is required'
  );
}

if (!STRAPI_BASE_URL_WITHOUT_API) {
  throw new Error(
    'STRAPI_BASE_URL_WITHOUT_API or NEXT_PUBLIC_STRAPI_BASE_URL_WITHOUT_API environment variable is required'
  );
}

if (!STRAPI_AUTH_TOKEN) {
  throw new Error(
    'STRAPI_API_TOKEN or NEXT_PUBLIC_STRAPI_API_TOKEN environment variable is required'
  );
}

const client = strapi({
  baseURL: STRAPI_BASE_URL,
  auth: STRAPI_AUTH_TOKEN,
});

export default client;
export { STRAPI_BASE_URL_WITHOUT_API };
