import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '3000',
        protocol: 'http'
      },
      {
        hostname: 'vercel',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
