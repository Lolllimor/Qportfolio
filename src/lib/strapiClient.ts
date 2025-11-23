export interface StrapiResponse<T> {
  data: T;
}

export interface StrapiCollectionItem {
  id: number;
  attributes: Record<string, any>;
}

const baseURL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  '';

const getUrl = (endpoint: string) => {
  const clean = baseURL.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return clean.endsWith('/api') ? `${clean}${path}` : `${clean}/api${path}`;
};

const collection = (name: string) => ({
  find: async (params?: { populate?: string | string[] | '*' }) => {
    const query = new URLSearchParams();
    if (params?.populate) {
      query.append(
        'populate',
        Array.isArray(params.populate)
          ? params.populate.join(',')
          : params.populate
      );
    }
    const qs = query.toString();
    const res = await fetch(getUrl(`/${name}${qs ? `?${qs}` : ''}`), {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        }),
      },
    });
    if (!res.ok) throw new Error(`Strapi error: ${res.statusText}`);
    return res.json() as Promise<StrapiResponse<StrapiCollectionItem[]>>;
  },
});

const client = {
  collection,
  get baseURLWithoutApi() {
    return baseURL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  },
};

export default client;
