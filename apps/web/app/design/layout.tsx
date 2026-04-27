import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@systemspecs/foundations/layout';
import { SystemSpecsWordmark } from '@systemspecs/brand-stsl/brand';
import { ThemeToggle, TableOfContents } from './_client';

// One-page anchor nav. Two columns: left rail = top-level sections + their
// sub-anchors. Right rail = scroll-spied "on this page" mirror. Sidebar
// numerals are tightened to mono; active section gets an accent baton.
const sections = [
  {
    title: 'Foundations',
    number: '01',
    href: '#foundations',
    items: [
      { label: 'Color',       href: '#foundations' },
      { label: 'Typography',  href: '#foundations' },
      { label: 'Spacing',     href: '#foundations' },
      { label: 'Radius',      href: '#foundations' },
      { label: 'Motion',      href: '#foundations' },
    ],
  },
  {
    title: 'Brand',
    number: '02',
    href: '#brand',
    items: [
      { label: 'Wordmark',  href: '#brand' },
      { label: 'Dot mark',  href: '#brand' },
      { label: 'Icons',     href: '#brand' },
    ],
  },
  {
    title: 'Primitives',
    number: '03',
    href: '#primitives',
    items: [
      { label: 'Button',     href: '#primitives' },
      { label: 'Field',      href: '#primitives' },
      { label: 'Card',       href: '#primitives' },
      { label: 'Tabs',       href: '#primitives' },
      { label: 'Accordion',  href: '#primitives' },
      { label: 'Skeleton',   href: '#primitives' },
    ],
  },
  {
    title: 'Patterns',
    number: '04',
    href: '#patterns',
    items: [
      { label: 'Globe in context', href: '#patterns' },
      { label: 'Hero',             href: '#patterns' },
      { label: 'Proof bar',        href: '#patterns' },
      { label: 'Solution card',    href: '#patterns' },
      { label: 'Group block',      href: '#patterns' },
      { label: 'Segmented CTA',    href: '#patterns' },
    ],
  },
];

const tocItems = [
  { id: 'foundations', label: '01 Foundations' },
  { id: 'brand',       label: '02 Brand' },
  { id: 'primitives',  label: '03 Primitives' },
  { id: 'patterns',    label: '04 Patterns' },
];

export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
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

      <Container size="wide" className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_12rem] gap-12 py-16 md:py-24">
        <aside className="hidden lg:block">
          <nav aria-label="Sections" className="sticky top-24 flex flex-col gap-8">
            {sections.map((s) => (
              <div key={s.href}>
                <a
                  href={s.href}
                  className="group/sec block transition-colors duration-base ease-expressive"
                >
                  <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted mb-1">
                    {s.number}
                  </span>
                  <span className="block text-body-sm font-display font-medium text-fg-primary group-hover/sec:text-accent transition-colors duration-base ease-expressive">
                    {s.title}
                  </span>
                </a>
                <ul className="mt-3 flex flex-col gap-1.5 border-l border-[color:var(--border-subtle)] pl-3">
                  {s.items.map((it, i) => (
                    <li key={i}>
                      <a href={it.href} className="text-caption text-fg-muted hover:text-fg-primary transition-colors duration-base ease-expressive">
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <article className="min-w-0">{children}</article>
        <aside className="hidden lg:block">
          <TableOfContents items={tocItems} />
        </aside>
      </Container>
    </div>
  );
}
