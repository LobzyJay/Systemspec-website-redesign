'use client';

// Client-only dynamic shim for HeroAtmosphere.
//
// HeroAtmosphere ships canvas physics (HeroAtmosphereReactive) plus an
// SVG sweep + cursor-tracking effect via useEffect. None of that needs
// to be in the server-rendered HTML — it's purely decorative and only
// wakes up after hydration.
//
// Wrapping the import in next/dynamic with ssr:false means:
//   • The atmosphere code is split into its own chunk
//   • That chunk loads only after the page is interactive
//   • Routes that never display the hero (impossible here, but the
//     splitting still helps every navigation that hits a cached
//     framework chunk before the atmosphere chunk).
//
// Hero stays a server component because it consumes this shim (and the
// shim is the client component) — the small wrapper is the only client
// payload added to the hero's render path.

import dynamic from 'next/dynamic';

export const HeroAtmosphere = dynamic(
  () => import('./HeroAtmosphere').then((m) => ({ default: m.HeroAtmosphere })),
  {
    ssr: false,
    // No loading state — the atmosphere is decorative and the hero's own
    // content sits above it via z-index. A flash of empty space behind the
    // text reads as intended quiet, not a missing element.
    loading: () => null,
  },
);
