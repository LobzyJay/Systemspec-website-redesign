// Isolated footer-atmosphere showcase route — renders ONLY the reactive
// canvas atmosphere (the "Footer atmosphere · Loop 1 (reactive)" demo from
// /design) inside a padded espresso frame so case-study iframes can embed
// just the canvas physics, with no nav, footer text, links, or other page
// chrome bleeding in.
//
// Mirrors the /footer-demo route's "outside (marketing)" pattern so it
// inherits the root layout only — no marketing nav/footer wrappers.
//
// The canvas component is the SAME FooterAtmosphereReactive that ships
// inside the production Footer; here we paint it directly on a full-bleed
// espresso surface (--bg-inverse / #0B0C0F — the same token Footer.tsx
// uses) so the dots glow against the dark canvas exactly as they do in
// the marketing footer.
//
// Loaded via the .client dynamic shim (ssr:false) so the canvas physics
// only mounts post-hydration — required because FooterAtmosphereReactive
// uses 'use client' + canvas refs.

import type { Metadata } from 'next';
import { FooterAtmosphereReactive } from '@systemspecs/brand-stsl/components';

export const metadata: Metadata = {
  title: 'Footer atmosphere · Component showcase',
  description:
    'Isolated showcase of the reactive Loop 1 footer atmosphere — same canvas physics as the production marketing footer, painted on the espresso surface.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/footer-atmosphere' },
};

export default function FooterAtmospherePage() {
  return (
    // Outer surface — `bg-bg-inverse` resolves to --bg-inverse (#0B0C0F),
    // the exact token Footer.tsx uses for the production footer. Equal
    // padding all four sides creates breathing room around the canvas.
    // The inner wrapper carries `position: relative` so the canvas (which
    // uses position:absolute inset:0 internally) fills the padded area
    // exactly — not the full viewport edge-to-edge.
    <div className="min-h-[100dvh] w-full bg-bg-inverse p-8 md:p-12">
      <div className="relative h-[calc(100dvh-4rem)] md:h-[calc(100dvh-6rem)] w-full overflow-hidden rounded-[32px] bg-bg-inverse">
        <FooterAtmosphereReactive />
      </div>
    </div>
  );
}
