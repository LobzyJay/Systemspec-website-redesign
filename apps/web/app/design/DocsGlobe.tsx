'use client';

import dynamic from 'next/dynamic';
import { GlobeStatic } from '@systemspecs/brand-stsl/components/Globe';

// Lazy-loads cobe + WebGL only when the docs page actually mounts this
// component. Keeps the rest of the page fast — we only pay the cost where
// the live demo lives.
const Globe = dynamic(
  () => import('@systemspecs/brand-stsl/components/Globe').then((m) => m.Globe),
  { ssr: false, loading: () => <GlobeStatic /> },
);

export function DocsGlobe() {
  return <Globe />;
}
