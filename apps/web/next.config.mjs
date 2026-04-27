/** @type {import('next').NextConfig} */
//
// GitHub Pages deploys to a subpath: /Systemspec-website-redesign.
// We toggle static-export + basePath via env var so dev stays at the root.
//
// During GitHub Actions deploy:
//   GITHUB_PAGES=true → output: 'export', basePath set, images unoptimized
// Locally:             → standard SSR dev mode

const isGhPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGhPages ? '/Systemspec-website-redesign' : '';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@systemspecs/foundations', '@systemspecs/brand-stsl'],
  ...(isGhPages
    ? {
        output: 'export',
        basePath,
        // GH Pages serves /foo as /foo/index.html — trailing slash keeps
        // hash anchors and relative refs sane.
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  // Expose the basePath to the client so asset helpers can prepend it.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
