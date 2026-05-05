// Isolated footer showcase route — renders ONLY the marketing footer in a
// padded dark frame so case-study iframes (and anyone deep-linking the
// component) get the footer floating as a component, with no nav, hero, or
// other page chrome bleeding in. Reuses the same Footer component + reactive
// FooterAtmosphereReactive that ships on every (marketing) route — the
// cursor-tracking green sweep is self-contained inside Footer, so this
// route just gives it a frame to live in.

import type { Metadata } from 'next';
import { Footer } from '@systemspecs/brand-stsl';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
      { label: 'Teams',       href: `${base}/company/teams` },
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

const legalLinks: { label: string; href: string }[] = [];

const socialLinks: { kind: 'linkedin' | 'twitter'; href: string }[] = [
  { kind: 'linkedin', href: 'https://www.linkedin.com/company/systemspecs-technology-solutions/' },
];

export const metadata: Metadata = {
  title: 'Footer · Component showcase',
  description: 'Isolated showcase of the SystemSpecs Technology Solutions marketing footer with its reactive cursor atmosphere.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/footer-demo' },
};

export default function FooterDemoPage() {
  return (
    // Brand-canvas wrapper — `bg-bg-canvas` resolves to --bg-canvas, which
    // is cream (#FBF8F2) under the default light theme and espresso ink
    // (#0A0B0E) under [data-theme='dark']. The token swap means this route
    // honours the user's persisted theme choice (stsl-docs-theme) instead
    // of hardcoding either side. Equal padding on all four sides + full
    // dvh min-height frames the dark footer as a card-like island floating
    // on the page surface — exactly what the case-study iframe needs.
    <div className="min-h-[100dvh] w-full bg-bg-canvas p-6 md:p-10 lg:p-12">
      <Footer
        columns={footerColumns}
        groupCompanies={groupCompanies}
        contact={{ email: 'hello@stsl.ng', phone: '+234 (0)1 271 0511' }}
        legalLinks={legalLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
}
