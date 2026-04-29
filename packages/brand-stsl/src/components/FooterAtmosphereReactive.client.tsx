'use client';

// Client-only dynamic shim for FooterAtmosphereReactive.
//
// The footer atmosphere is a canvas-driven Braille forcefield. Like the
// hero atmosphere, it's purely decorative and only matters post-hydration,
// so there's no value shipping it in the initial First Load JS for every
// route.
//
// Wrapping the import in next/dynamic with ssr:false splits the canvas
// physics into its own chunk that loads after page is interactive. The
// Footer component stays a server component because it consumes this
// client shim instead of the raw module.

import dynamic from 'next/dynamic';

export const FooterAtmosphereReactive = dynamic(
  () =>
    import('./FooterAtmosphereReactive').then((m) => ({
      default: m.FooterAtmosphereReactive,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);
