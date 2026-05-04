import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@systemspecs/foundations/layout';
import { SystemSpecsWordmark } from '@systemspecs/brand-stsl/brand';
import { ThemeToggle, BleedAnchor, DocsRail } from './_client';
import { RevealObserver } from '../../components/RevealObserver';

// Per-route metadata override — /design keeps the design-system identity
// while every other route inherits the STSL marketing metadata from the
// root layout.
export const metadata: Metadata = {
  title: 'SystemSpecs Design System',
  description:
    'The design system behind SystemSpecs Technology Solutions — tokens, brand identity, primitives, and composed components. Built as a three-layer monorepo so it can re-skin across SystemSpecs Holdings subsidiaries with token swaps alone.',
  applicationName: 'SystemSpecs Design System',
  alternates: { canonical: '/design' },
  openGraph: {
    type: 'website',
    siteName: 'SystemSpecs Design System',
    title: 'SystemSpecs Design System',
    description:
      'Tokens, primitives, and composed components for the SystemSpecs Holdings design system.',
    url: '/design',
    locale: 'en_NG',
  },
};

// One-page anchor nav. Two columns: left rail = top-level sections + their
// sub-anchors. Right rail = scroll-spied "on this page" mirror. Sidebar
// numerals are tightened to mono; active section gets an accent baton.
const sections = [
  {
    title: 'Foundations',
    number: '01',
    href: '#foundations',
    items: [
      { label: 'Color',           href: '#sub-color' },
      { label: 'Typography',      href: '#sub-type' },
      { label: 'Spacing',         href: '#sub-spacing' },
      { label: 'Radius',          href: '#sub-radius' },
      { label: 'Elevation',       href: '#sub-elevation' },
      { label: 'Motion',          href: '#sub-motiontokens' },
    ],
  },
  {
    title: 'Brand',
    number: '02',
    href: '#brand',
    items: [
      { label: 'Wordmark',  href: '#sub-wordmark' },
      { label: 'Dot mark',  href: '#sub-dotmark' },
      { label: 'Icons',     href: '#sub-icons' },
    ],
  },
  {
    title: 'Primitives',
    number: '03',
    href: '#primitives',
    items: [
      { label: 'Button',     href: '#sub-button' },
      { label: 'Link',       href: '#sub-link' },
      { label: 'Card',       href: '#sub-card' },
      { label: 'Field',      href: '#sub-field' },
      { label: 'Badge',      href: '#sub-badge' },
      { label: 'Tabs',       href: '#sub-tabs' },
      { label: 'Accordion',  href: '#sub-accordion' },
      { label: 'Skeleton',   href: '#sub-skeleton' },
      { label: 'Checkbox',   href: '#sub-checkbox' },
      { label: 'Radio',      href: '#sub-radio' },
      { label: 'Select',     href: '#sub-select' },
      { label: 'Tooltip',    href: '#sub-tooltip' },
      { label: 'Dialog',     href: '#sub-dialog' },
    ],
  },
  {
    title: 'Patterns',
    number: '04',
    href: '#patterns',
    items: [
      { label: 'Globe',            href: '#sub-globe' },
      { label: 'Globe in context', href: '#sub-globe-context' },
      { label: 'Backgrounds',      href: '#sub-bg' },
      { label: 'Team grid',        href: '#sub-team' },
      { label: 'Hero',             href: '#sub-hero' },
      { label: 'Proof bar',        href: '#sub-proof' },
      { label: 'Solution card',    href: '#sub-solution' },
      { label: 'Product card',     href: '#sub-product' },
      { label: 'Capability strip', href: '#sub-capstrip' },
      { label: 'Group block',      href: '#sub-group' },
      { label: 'Leadership',       href: '#sub-leadership' },
      { label: 'Insight',          href: '#sub-insight' },
      { label: 'Segmented CTA',    href: '#sub-segmented' },
      { label: 'Section header',   href: '#sub-sectionheader' },
      { label: 'Stat pill',        href: '#sub-statpill' },
      { label: 'Capability block', href: '#sub-capblock' },
      { label: 'Code sample',      href: '#sub-code' },
      { label: 'Timeline',         href: '#sub-timeline' },
      { label: 'Newsletter',       href: '#sub-newsletter' },
      { label: 'Contact form',     href: '#sub-contact' },
      { label: 'Nav',              href: '#sub-nav' },
      { label: 'Footer',           href: '#sub-footer' },
    ],
  },
  {
    title: 'Motion',
    number: '05',
    href: '#motion',
    items: [
      { label: 'Reactive hero',     href: '#sub-reactive' },
      { label: 'Reveal system',     href: '#sub-reveal' },
      { label: 'Hover micromotion', href: '#sub-hover' },
    ],
  },
  {
    title: 'Compositions',
    number: '06',
    href: '#compositions',
    items: [
      { label: 'Developers',  href: '#sub-developers' },
      { label: 'Contact',     href: '#sub-contactstrip' },
    ],
  },
];


export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" data-design-docs>
      {/* Sticky header — paper tint with backdrop-blur (skill: blur only on
          fixed/sticky chrome, never scrolling content). Hairline ring instead
          of a 1px border. */}
      <header className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--bg-canvas)_85%,transparent)] backdrop-blur-md ring-1 ring-[color:var(--border-subtle)]">
        <Container size="wide">
          <div className="flex h-16 items-center justify-between">
            <Link href="/design" className="flex items-center gap-3">
              <SystemSpecsWordmark height={28} />
              <span className="hidden sm:inline-flex items-center h-6 px-2.5 rounded-pill ring-1 ring-[color:var(--border-subtle)] bg-bg-surface-raised text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-fg-muted">
                Design system
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-body-sm">
              <a href="https://github.com/" rel="noopener" target="_blank" className="text-fg-muted hover:text-fg-primary transition-colors duration-base ease-expressive">
                Source
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </Container>
      </header>

      {/* Mobile section nav — sticky pill rail just under the header. Hidden on
          lg+ where the left sidebar handles section jumps. Horizontal scroll
          for narrow viewports, tap targets ≥32px. */}
      <div className="lg:hidden sticky top-16 z-30 bg-[color-mix(in_srgb,var(--bg-canvas)_85%,transparent)] backdrop-blur-md border-b border-[color:var(--border-subtle)] overflow-x-auto">
        <Container size="wide">
          <nav aria-label="Sections" className="flex items-center gap-2 py-3 whitespace-nowrap">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="inline-flex items-center h-8 px-4 rounded-pill bg-bg-surface-raised ring-1 ring-[color:var(--border-subtle)] text-[10px] font-mono uppercase tracking-[0.18em] font-medium text-fg-secondary hover:text-fg-primary transition-colors duration-base ease-expressive"
              >
                <span className="text-fg-muted mr-1.5">{s.number}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <RevealObserver />
      <BleedAnchor />
      <Container size="wide" className="grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] gap-10 lg:gap-16 py-10 md:py-16 lg:py-24">
        <aside className="hidden lg:block">
          <DocsRail sections={sections} />
        </aside>
        <article className="min-w-0">{children}</article>
      </Container>
    </div>
  );
}
