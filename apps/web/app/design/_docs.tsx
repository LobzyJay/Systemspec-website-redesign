// Reusable docs primitives. Underscore prefix excludes the file from App
// Router. The Editorial Luxury vibe: warm paper, large headings, eyebrow
// pills, Doppelrand stages, and serif callouts. Spacing breathes hard —
// every Stage gets at least 64px vertical room from neighboring text.

import type { ReactNode } from 'react';
import { TableOfContents, CopyButton } from './_client';

export function DocsPageBody({
  toc,
  children,
}: {
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_12rem] gap-8 md:gap-12 lg:gap-16">
      <div className="min-w-0">{children}</div>
      <aside className="hidden lg:block">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface p-5 font-mono text-caption text-fg-primary"
      aria-label="Code example"
    >
      <code>{children}</code>
    </pre>
  );
}

// Eyebrow tag — microscopic uppercase pill that precedes major headings.
// Skill §4C signature.
export function Eyebrow({ children, tone = 'accent' }: { children: ReactNode; tone?: 'accent' | 'muted' }) {
  return (
    <span
      className={
        'inline-flex items-center h-6 px-3 rounded-pill ' +
        'text-[10px] uppercase tracking-[0.22em] font-mono font-medium ' +
        (tone === 'accent'
          ? 'bg-accent-subtle text-accent ring-1 ring-[color:var(--accent-default)]/15'
          : 'bg-bg-surface-raised text-fg-muted ring-1 ring-[color:var(--border-subtle)]')
      }
    >
      <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-current opacity-60" />
      {children}
    </span>
  );
}

export function PageHeading({
  number,
  title,
  lede,
}: {
  number?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-24 md:mb-32 lg:mb-40 max-w-4xl" data-reveal>
      {number ? <Eyebrow tone="accent">{number}</Eyebrow> : null}
      <h1 className="mt-7 font-display font-medium text-display-md md:text-display-xl lg:text-display-2xl text-fg-primary text-balance leading-[1.02] tracking-[-0.025em]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-6 md:mt-8 lg:mt-10 font-serif italic text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] leading-[1.45] text-fg-secondary text-pretty max-w-3xl">
          {lede}
        </p>
      ) : null}
    </header>
  );
}

export function SectionHeading({
  id,
  number,
  title,
  intro,
}: {
  id: string;
  number?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-12 md:mb-14 lg:mb-16 mt-24 md:mt-32 lg:mt-40 first:mt-0 scroll-mt-32" id={id} data-reveal>
      {number ? <Eyebrow tone="muted">Section {number}</Eyebrow> : null}
      <h2 className="mt-6 font-display font-medium text-display-md md:text-display-lg lg:text-display-xl text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 md:mt-5 text-body md:text-body-lg text-fg-secondary max-w-2xl text-pretty">{intro}</p>
      ) : null}
    </header>
  );
}

export function SubHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className="scroll-mt-28 mt-12 md:mt-16 lg:mt-20 mb-6 md:mb-7 flex items-baseline gap-4"
      data-reveal
    >
      <span aria-hidden="true" className="inline-block h-px w-8 bg-[color:var(--border-default)]" />
      <h3 className="font-display font-medium text-heading-2 md:text-heading-1 text-fg-primary tracking-tight">
        {children}
      </h3>
    </div>
  );
}

type StageWidth = 'default' | 'bleed' | 'scroll';

export function Stage({
  children,
  dark,
  flush,
  width = 'default',
}: {
  children: ReactNode;
  dark?: boolean;
  // flush — drop the inner padding for visuals that supply their own frame.
  flush?: boolean;
  // width:
  //   • default — fits the article column (current behaviour)
  //   • bleed   — breaks out to full viewport width so marketing components
  //               (Nav, Footer, Hero) get real `md:`/`lg:` viewport queries
  //   • scroll  — adds a horizontal scroll wrapper for fixed-pixel artifacts
  //               (banners, social cards, anything wider than the article)
  width?: StageWidth;
}) {
  // `dark` stages are always-dark showcases (e.g. mono wordmark, inverse
  // surface previews). Hardcoded so they don't flip when the user toggles
  // the docs to dark theme — `bg-inverse` is a *theme-flipping* token.
  const surface = dark
    ? 'bg-[#0B0C0F] text-[#F7F8F9]'
    : 'bg-bg-surface text-fg-primary';
  const padding = flush ? '' : 'p-6 md:p-10 lg:p-12 ';

  if (width === 'bleed') {
    // Full-bleed escape hatch. We measure the article column's left offset
    // via BleedAnchor (mounted in layout) and pull this wrapper back to the
    // viewport's left edge. width: 100vw extends to the right edge. Children
    // with viewport-based media queries render at their intended breakpoint.
    return (
      <div className="docs-bleed mb-4" data-reveal>
        <div
          className={
            'mx-4 md:mx-8 lg:mx-12 rounded-2xl ring-1 ring-[color:var(--border-subtle)] ' +
            'overflow-hidden ' + padding + surface
          }
        >
          {children}
        </div>
      </div>
    );
  }

  if (width === 'scroll') {
    // Scrollable stage — keeps the rounded shell in the article column but
    // exposes a horizontal scroll for content wider than the column.
    return (
      <div
        data-reveal
        className={
          'rounded-2xl mb-4 ring-1 ring-[color:var(--border-subtle)] ' +
          'overflow-x-auto overflow-y-hidden ' + padding + surface
        }
      >
        {children}
      </div>
    );
  }

  // Single-radius stage — one rounded container, no inner core. Stops nested
  // rounding inside Stage children (color swatches, icon chips, etc.).
  return (
    <div
      data-reveal
      className={
        'group/stage rounded-2xl mb-4 ring-1 ring-[color:var(--border-subtle)] ' +
        'overflow-hidden ' + padding + surface
      }
    >
      {children}
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-caption text-fg-muted mt-4 font-serif italic leading-relaxed max-w-2xl">
      {children}
    </p>
  );
}

export function Swatch({
  name,
  value,
  cssVar,
  dark,
}: {
  name: string;
  value: string;
  cssVar?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Sharp-edged color tile — no nested rounding inside the Stage. */}
      <div
        className="aspect-square"
        style={{ background: value }}
        aria-label={`${name} swatch`}
      />
      <div className={'flex flex-col gap-0.5 ' + (dark ? 'text-fg-on-inverse' : '')}>
        <p className="text-body-sm font-medium tracking-tight">{name}</p>
        <CopyButton value={value} />
        {cssVar ? <CopyButton value={cssVar} /> : null}
      </div>
    </div>
  );
}
