/** @type {import('next').NextConfig} */
//
// Two build modes:
//   GITHUB_PAGES=true  → sets basePath so assets resolve at the Pages subpath
//   (default)          → basePath '' so local dev + standalone export work

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '../..');

const isGhPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGhPages ? '/Systemspec-website-redesign' : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
  turbopack: {
    root: monorepoRoot,
  },
  transpilePackages: ['@systemspecs/foundations', '@systemspecs/brand-stsl'],
  experimental: {
    optimizePackageImports: [
      '@systemspecs/brand-stsl',
      '@systemspecs/foundations',
      'cobe',
      '@radix-ui/react-dialog',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-select',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
