// Prepend the deploy basePath to absolute asset URLs. Required for static
// hosts (GitHub Pages) where the site lives at a subpath. In dev / Vercel
// the env var is empty and the function is a no-op.

export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/')) return path;
  return `${base}${path}`;
}
