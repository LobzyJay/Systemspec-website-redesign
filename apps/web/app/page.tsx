// Static-export compatible redirect — server `redirect()` from
// `next/navigation` doesn't work without a runtime. Use a meta-refresh +
// noscript fallback so the root URL routes to /design on every host
// (Vercel, GitHub Pages, plain static).

import type { Metadata } from 'next';

const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/design/`;

export const metadata: Metadata = {
  // Renders <meta http-equiv="refresh"> in <head> via Next's metadata API.
  other: {
    'http-equiv': 'refresh',
    content: `0; url=${target}`,
  },
};

export default function RootPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-bg-canvas">
      <a href={target} className="text-fg-primary underline underline-offset-4">
        Open the SystemSpecs design system →
      </a>
    </main>
  );
}
