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
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_12rem] gap-16">
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
    <header className="mb-40 max-w-4xl" data-reveal>
      {number ? <Eyebrow tone="accent">{number}</Eyebrow> : null}
      <h1 className="mt-7 font-display font-medium text-display-2xl text-fg-primary text-balance leading-[1.02] tracking-[-0.025em]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-10 font-serif italic text-[1.5rem] leading-[1.45] text-fg-secondary text-pretty max-w-3xl">
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
    <header className="mb-16 mt-40 first:mt-0 scroll-mt-24" id={id} data-reveal>
      {number ? <Eyebrow tone="muted">Section {number}</Eyebrow> : null}
      <h2 className="mt-6 font-display font-medium text-display-xl text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-body-lg text-fg-secondary max-w-2xl text-pretty">{intro}</p>
      ) : null}
    </header>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-20 mb-7 flex items-baseline gap-4" data-reveal>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-[color:var(--border-default)]" />
      <h3 className="font-display font-medium text-heading-1 text-fg-primary tracking-tight">
        {children}
      </h3>
    </div>
  );
}

export function Stage({
  children,
  dark,
  flush,
}: {
  children: ReactNode;
  dark?: boolean;
  // flush — drop the inner padding for visuals that supply their own frame.
  flush?: boolean;
}) {
  // Single-radius stage — one rounded container, no inner core. Stops nested
  // rounding inside Stage children (color swatches, icon chips, etc.).
  return (
    <div
      data-reveal
      className={
        'group/stage rounded-2xl mb-4 ring-1 ring-[color:var(--border-subtle)] ' +
        'overflow-hidden ' +
        (flush ? '' : 'p-10 md:p-12 ') +
        (dark
          ? 'bg-bg-inverse text-fg-on-inverse'
          : 'bg-bg-surface text-fg-primary')
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
