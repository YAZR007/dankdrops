import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'twenty20mendocino.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'friscolabs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'litfarms.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
