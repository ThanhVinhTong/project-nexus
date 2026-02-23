import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* static export options */
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/project-nexus' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/project-nexus' : '',

  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  // Ensure Next.js resolves the monorepo root correctly to avoid lockfile/root warnings
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
