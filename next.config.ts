import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'q-backend-92vd.onrender.com',
        pathname: '/uploads/**',
      },
    ],
    unoptimized:false
  },
};

export default nextConfig;
