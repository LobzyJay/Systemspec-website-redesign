// Marketing route group layout — wraps every page under (marketing) with
// the shared Nav + Footer from @systemspecs/brand-stsl. The route group
// keeps the URL clean (no /marketing/ segment).
//
// Phase 1A: nav/footer take placeholder data so the shells render. Real IA
// payload lands in Phase 2 alongside per-page content.

import type { ReactNode } from 'react';
import { Nav, Footer, SystemSpecsWordmark } from '@systemspecs/brand-stsl';
import { RevealObserver } from '../../components/RevealObserver';
import { RouteTransitions } from '../../components/RouteTransitions';
import { SplashScreen } from '../../components/SplashScreen';

// Prepend the basePath so static HTML hrefs work on GitHub Pages without
// relying on JS. RouteTransitions will strip the prefix before router.push.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const primaryLinks = [
  { label: 'Solutions',  href: `${base}/solutions` },
  { label: 'Products',   href: `${base}/products` },
  { label: 'Developers', href: `${base}/developers` },
  { label: 'Company',    href: `${base}/company` },
];

const footerColumns = [
  {
    title: 'Solutions',
    links: [
      { label: 'Banking',             href: `${base}/solutions/banking` },
      { label: 'E-Government',        href: `${base}/solutions/e-government` },
      { label: 'Community',           href: `${base}/solutions/community` },
      { label: 'Enterprise Software', href: `${base}/solutions/enterprise-software` },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Pouchii',     href: `${base}/products/pouchii` },
      { label: 'FundACause',  href: `${base}/products/fundacause` },
      { label: 'Monicenta',   href: `${base}/products/monicenta` },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',       href: `${base}/company` },
      { label: 'Leadership',  href: `${base}/company/leadership` },
      { label: 'Group',       href: `${base}/company/group` },
      { label: 'Press',       href: `${base}/company/press` },
      { label: 'Careers',     href: `${base}/company/careers` },
    ],
  },
];

const groupCompanies = [
  { label: 'Remita',        href: 'https://remita.net' },
  { label: 'HumanManager',  href: 'https://humanmanager.com' },
  { label: 'WhataDeal',     href: 'https://whatadeal.com' },
];

const legalLinks = [
  { label: 'Privacy', href: `${base}/legal/privacy` },
  { label: 'Terms',   href: `${base}/legal/terms` },
];

const socialLinks: { kind: 'linkedin' | 'twitter'; href: string }[] = [
  { kind: 'linkedin', href: 'https://www.linkedin.com/company/systemspecs-technology-solutions/' },
];

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    // Page bg = pale mint, matching the bottom stop of the Pathways
    // section's gradient (color-mix accent 18% into canvas). All section
    // surfaces paint over this, so only the inset gap framing the footer
    // squircle reveals the bg — and that gap now reads as a continuation
    // of the green band above the footer instead of a hard white frame.
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          'color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas))',
      }}
    >
      <Nav
        primaryLinks={primaryLinks}
        salesHref="/contact#sales"
        governmentHref="/contact#government"
        brand={{
          mark: <SystemSpecsWordmark height={28} />,
          href: '/',
          label: 'SystemSpecs Technology Solutions',
        }}
      />
      <SplashScreen />
      <RevealObserver />
      <RouteTransitions />
      <main className="flex-1">{children}</main>
      {/* Footer wrapper — inset padding creates the visible breathing
          space between the section above and the floating squircle.
          The black surface peeks through this gap on all four sides. */}
      <div className="p-3 md:p-5">
        <Footer
          columns={footerColumns}
          groupCompanies={groupCompanies}
          contact={{ email: 'hello@stsl.ng', phone: '+234 (0)1 271 0511' }}
          legalLinks={legalLinks}
          socialLinks={socialLinks}
        />
      </div>
    </div>
  );
}
