import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '3000',
        protocol: 'http'
      }
    ]
  }
};

export default nextConfig;
