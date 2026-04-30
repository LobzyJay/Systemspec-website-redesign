// Prepend the deploy basePath to absolute asset URLs. Required for static
// hosts (GitHub Pages) where the site lives at a subpath. In dev / Vercel
// the env var is empty and the function is a no-op.

export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/')) return path;
  return `${base}${path}`;
}

// Prepend the deploy basePath to internal route hrefs. Behaviourally
// identical to `asset()` but named for routes so the call site reads
// correctly. Use this for ANY <a href> built inside a 'use client'
// component — those hrefs ship through the React bundle and the
// post-build path-fix script (HTML-only) can't reach them. External
// (http*), anchor (#), mailto:, tel:, and already-prefixed paths
// pass through unchanged.
export function route(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!base) return path;
  if (path.startsWith(base)) return path;
  if (
    !path.startsWith('/') ||
    path.startsWith('//') ||
    path.startsWith('#') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }
  return `${base}${path}`;
}
