import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
    // Cap how many pages build in parallel — each worker opens its own DB
    // pool, and the free-tier Supabase compute this pulls content from
    // can't handle many workers' worth of simultaneous connections.
    staticGenerationMaxConcurrency: 2,
  },
};

export default nextConfig;
