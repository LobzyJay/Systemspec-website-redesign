// Server-component layout for /contact so we can export Next.js metadata.
// The page itself ('use client') reads useSearchParams() to switch views, so
// metadata can't live alongside it. The layout just passes children through.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to STSL — banking sales, fintech API access, government enquiries, partnerships, careers, and press. Replies within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · SystemSpecs Technology Solutions',
    description:
      'Banking sales, fintech API access, government enquiries, partnerships, press, and careers.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
