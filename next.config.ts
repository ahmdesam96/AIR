import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled for Vercel
  // basePath: '/AIR', // Disabled for Vercel
  turbopack: {
    root: __dirname,
  },
  images: {
    // unoptimized: true, // Disabled for Vercel
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
