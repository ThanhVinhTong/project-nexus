import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ensure Next.js resolves the monorepo root correctly to avoid lockfile/root warnings
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
