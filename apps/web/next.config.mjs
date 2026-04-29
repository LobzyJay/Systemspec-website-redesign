/** @type {import('next').NextConfig} */
//
// GitHub Pages deploys to a subpath: /Systemspec-website-redesign.
// We toggle static-export + basePath via env var so dev stays at the root.
//
// During GitHub Actions deploy:
//   GITHUB_PAGES=true → output: 'export', basePath set, images unoptimized
// Locally:             → standard SSR dev mode

// basePath is always '' so standalone builds work from any directory.
// For GitHub Pages the repo is at root so no subpath is needed either.
const basePath = '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  transpilePackages: ['@systemspecs/foundations', '@systemspecs/brand-stsl'],
  // Tree-shake barrel imports more aggressively. Each entry here tells
  // Next.js the package is "side-effect free" enough to import only the
  // specific named exports a route uses, instead of pulling the whole
  // barrel. Safe with output:'export' — no runtime behaviour changes.
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
