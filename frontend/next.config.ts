import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* static export options */
  output: 'export',

  // TO DEPLOY TO GITHUB PAGES:
  // If your repository is 'project-nexus', set basePath and assetPrefix to '/project-nexus'
  // If you are using a custom domain or username.github.io, you can remove these.
  basePath: '/project-nexus',
  assetPrefix: '/project-nexus',

  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  // Ensure Next.js resolves the monorepo root correctly to avoid lockfile/root warnings
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
