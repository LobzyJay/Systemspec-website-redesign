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

// Contact removed — the "Talk to sales" CTA in the right rail covers the
// same destination. Footer keeps Contact as a deep link for non-sales
// audiences (press, careers, support).
const primaryLinks = [
  { label: 'Solutions',  href: '/solutions' },
  { label: 'Products',   href: '/products' },
  { label: 'Developers', href: '/developers' },
  { label: 'Company',    href: '/company' },
];

const footerColumns = [
  {
    title: 'Solutions',
    links: [
      { label: 'Banking',             href: '/solutions/banking' },
      { label: 'E-Government',        href: '/solutions/e-government' },
      { label: 'Community',           href: '/solutions/community' },
      { label: 'Enterprise Software', href: '/solutions/enterprise-software' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Pouchii',     href: '/products/pouchii' },
      { label: 'FundACause',  href: '/products/fundacause' },
      { label: 'Monicenta',   href: '/products/monicenta' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',       href: '/company' },
      { label: 'Leadership',  href: '/company/leadership' },
      { label: 'Group',       href: '/company/group' },
      { label: 'Press',       href: '/company/press' },
      { label: 'Careers',     href: '/company/careers' },
    ],
  },
];

const groupCompanies = [
  { label: 'Remita',        href: 'https://remita.net' },
  { label: 'HumanManager',  href: 'https://humanmanager.com' },
  { label: 'WhataDeal',     href: 'https://whatadeal.com' },
];

const legalLinks = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms',   href: '/legal/terms' },
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
