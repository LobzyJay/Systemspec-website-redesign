'use client';

// Client-only docs widgets: scroll-spied TOC, theme toggle, copy-to-clipboard
// affordance. Kept private with the underscore prefix so the App Router skips
// the file.

import { useEffect, useRef, useState } from 'react';

// ────────────────────────────────────────────────────────────────────
// BleedAnchor — measures the article column's distance from the viewport
// left edge and exposes it as a `--docs-article-x` CSS custom property on
// the design layout root. Stage[width="bleed"] uses that value to pull
// itself to viewport-left so full-bleed components render edge-to-edge,
// not centred on the offset article column.
// ────────────────────────────────────────────────────────────────────
export function BleedAnchor() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-design-docs]');
    const article = document.querySelector<HTMLElement>('[data-design-docs] article');
    if (!root || !article) return;

    const update = () => {
      const rect = article.getBoundingClientRect();
      root.style.setProperty('--docs-article-x', `${rect.left}px`);
      root.style.setProperty('--docs-article-w', `${rect.width}px`);
    };

    update();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(article);
    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

interface TocItem {
  id: string;
  label: string;
}

interface RailItem {
  label: string;
  href: string;
}

interface RailSection {
  title: string;
  number: string;
  href: string;
  items: RailItem[];
}

// ────────────────────────────────────────────────────────────────────
// DocsRail — Editorial book-spine.
//
// Reads like a margin index in a magazine spread, not a docs sidebar.
//
//  · Section numerals in BIG serif italic (Source Serif 4) on the left.
//  · Section titles in display sans (Plus Jakarta Sans), the type that
//    the rest of the page uses for headlines — keeps it brand-coherent.
//  · The active chapter is the only one whose sub-anchors are visible,
//    fading in beneath it as a small index of what's in this section.
//  · Each SubHeading on the page carries a unique anchor id, so the
//    rail tracks WHERE in the section you're reading down to the
//    sub-component level — when you scroll past "Hero" to "Proof bar",
//    the active sub-item moves with you and a small accent flag slides
//    onto its row.
//  · Mono is used sparingly (just one tiny eyebrow) — heavy mono reads
//    AI-generated; serif italic + display reads editorial.
//  · A hairline accent on the far left of the rail glides between
//    sections as you scroll — the "you are here" gesture is a moving
//    stripe, not a baton or a progress fill.
//  · Hover on inactive section: its title slides 1px right and lifts
//    to full opacity. Tactile.
// ────────────────────────────────────────────────────────────────────
export function DocsRail({ sections }: { sections: RailSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.href.replace('#', '') ?? '');
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const sectionRowRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [stripeY, setStripeY] = useState(0);
  const [stripeH, setStripeH] = useState(0);

  // Build a flat lookup of every sub-anchor and which section it belongs to,
  // so when a sub-id becomes active we also know its parent section.
  const subToSection = (() => {
    const map = new Map<string, string>();
    for (const s of sections) {
      const sid = s.href.replace('#', '');
      for (const item of s.items) {
        const subId = item.href.replace('#', '');
        map.set(subId, sid);
      }
    }
    return map;
  })();

  // Scroll-spy. Two passes per scroll tick:
  //  1. find the closest sub-anchor above the reading band
  //  2. derive section from the matched sub-anchor (fall back to the
  //     section heading itself if no sub-anchor has crossed yet)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = sections.map((s) => s.href.replace('#', ''));
    const subIds = Array.from(subToSection.keys());

    let raf = 0;
    const measure = () => {
      const band = window.innerHeight * 0.22;

      // Sub-anchor pass
      let activeSubId: string | null = null;
      let bestSubDist = Infinity;
      for (const id of subIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top - band <= 0 && Math.abs(r.top - band) < bestSubDist) {
          bestSubDist = Math.abs(r.top - band);
          activeSubId = id;
        }
      }

      // Section pass — used as a fallback when no sub-anchor has crossed.
      let activeSectionId = sectionIds[0];
      let bestSectionDist = Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top - band <= 0 && Math.abs(r.top - band) < bestSectionDist) {
          bestSectionDist = Math.abs(r.top - band);
          activeSectionId = id;
        }
      }

      const finalSection = activeSubId
        ? subToSection.get(activeSubId) ?? activeSectionId
        : activeSectionId;

      setActiveSub((cur) => (cur === activeSubId ? cur : activeSubId));
      setActiveId((cur) => (cur === finalSection ? cur : (finalSection ?? cur)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  // Position the gliding hairline stripe against the active section row.
  useEffect(() => {
    const row = sectionRowRefs.current.get(activeId);
    const list = listRef.current;
    if (!row || !list) return;
    const r = row.getBoundingClientRect();
    const lr = list.getBoundingClientRect();
    setStripeY(r.top - lr.top);
    setStripeH(r.height);
  }, [activeId, sections]);

  // Single tuned curve + duration so every element on the rail moves to the
  // same beat. ~320ms is the sweet spot — fast enough to feel responsive,
  // slow enough to read as eased.
  const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  const dur = '320ms';
  const durSlow = '420ms';

  return (
    <nav aria-label="Design system contents" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Editorial header — small caps display, NO mono. */}
      <p className="font-display uppercase tracking-[0.18em] text-[10px] font-medium text-fg-muted mb-1">
        The system
      </p>
      <p className="font-serif italic text-[13px] leading-tight text-fg-secondary mb-8">
        an index of every component, in order.
      </p>

      <ol ref={listRef} className="relative flex flex-col gap-7">
        {/* Gliding hairline stripe — slides between section rows on scroll.
            Sits at the far left of the rail like a bookmark ribbon. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-3 w-[2px] bg-accent rounded-pill"
          style={{
            transform: `translateY(${stripeY}px)`,
            height: stripeH,
            transition: `transform ${durSlow} ${ease}, height ${durSlow} ${ease}`,
          }}
        />

        {sections.map((s) => {
          const id = s.href.replace('#', '');
          const isActive = id === activeId;
          return (
            <li
              key={s.href}
              ref={(el) => {
                if (el) sectionRowRefs.current.set(id, el);
                else sectionRowRefs.current.delete(id);
              }}
              className="relative"
            >
              <a
                href={s.href}
                aria-current={isActive ? 'location' : undefined}
                className="group/sec relative flex items-baseline gap-3"
              >
                {/* Big serif italic chapter numeral. Reads like a magazine
                    page-number. Active version goes accent + non-italicises
                    a hair (skewX(-2deg) → 0deg) for a tiny editorial pop. */}
                <span
                  aria-hidden="true"
                  className={
                    'shrink-0 font-serif italic text-[26px] leading-none tabular-nums tracking-tight transition-[color,transform] duration-slow ' +
                    (isActive
                      ? 'text-accent'
                      : 'text-fg-muted group-hover/sec:text-fg-secondary')
                  }
                  style={{
                    transitionTimingFunction: ease,
                    transitionDuration: dur,
                    transform: isActive ? 'skewX(0deg)' : 'skewX(-1deg)',
                  }}
                >
                  {s.number}
                </span>

                {/* Title in display sans, brand-coherent with page headlines. */}
                <span
                  className={
                    'block font-display font-medium text-[15px] leading-tight tracking-tight transition-[color,opacity,transform] duration-slow will-change-transform ' +
                    (isActive
                      ? 'text-fg-primary opacity-100 translate-x-0'
                      : 'text-fg-secondary opacity-70 -translate-x-0.5 group-hover/sec:opacity-100 group-hover/sec:translate-x-0 group-hover/sec:text-fg-primary')
                  }
                  style={{ transitionTimingFunction: ease, transitionDuration: dur }}
                >
                  {s.title}
                </span>
              </a>

              {/* Sub-anchor index — only renders for the active chapter.
                  Each item carries a tiny dot that fills accent when its
                  SubHeading is the closest one above the reading band. */}
              <div
                className="grid"
                style={{
                  transition: `grid-template-rows ${durSlow} ${ease}, opacity ${durSlow} ${ease}, margin-top ${durSlow} ${ease}`,
                  gridTemplateRows: isActive ? '1fr' : '0fr',
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? '12px' : '0px',
                }}
                aria-hidden={!isActive}
              >
                <ul className="overflow-hidden ml-[34px]">
                  <div className="flex flex-col">
                    {s.items.map((it, i) => {
                      const itemId = it.href.replace('#', '');
                      const isItemActive = itemId === activeSub;
                      return (
                        <li key={i}>
                          <a
                            href={it.href}
                            tabIndex={isActive ? 0 : -1}
                            className={
                              'group/sub flex items-baseline gap-2.5 py-1 text-[13px] leading-relaxed transition-[color,transform] duration-base ' +
                              (isItemActive
                                ? 'text-accent translate-x-0'
                                : 'text-fg-muted hover:text-fg-secondary hover:translate-x-px')
                            }
                            style={{ transitionTimingFunction: ease, transitionDuration: dur }}
                          >
                            <span
                              aria-hidden="true"
                              className={
                                'inline-block h-1 w-1 rounded-pill shrink-0 transition-[background-color,transform] duration-base ' +
                                (isItemActive
                                  ? 'bg-accent scale-150'
                                  : 'bg-[color:var(--border-default,var(--border-subtle))] group-hover/sub:bg-fg-secondary')
                              }
                              style={{ transitionTimingFunction: ease, transitionDuration: dur }}
                            />
                            <span>{it.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </div>
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Editorial footer flourish — a tiny serif italic mark of position. */}
      <p
        aria-live="polite"
        className="mt-10 font-serif italic text-[12px] text-fg-muted"
      >
        chapter <span className="text-fg-secondary tabular-nums">
          {String(Math.max(0, sections.findIndex((s) => s.href.replace('#', '') === activeId)) + 1).padStart(2, '0')}
        </span> of {String(sections.length).padStart(2, '0')}
      </p>
    </nav>
  );
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the topmost intersecting heading.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-fg-muted mb-2">On this page</p>
      <ul className="flex flex-col gap-1.5 border-l border-[color:var(--border-subtle)]">
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={
                  'block -ml-px border-l-2 pl-3 py-1 text-body-sm transition-[color,border-color,transform] duration-base ease-expressive ' +
                  (active
                    ? 'border-accent text-fg-primary font-medium translate-x-0.5'
                    : 'border-transparent text-fg-muted hover:text-fg-primary')
                }
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const STORAGE_KEY = 'stsl-docs-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* no-op: localStorage may be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-pressed={theme === 'dark'}
      className="inline-flex h-8 items-center gap-2 rounded-pill ring-1 ring-[color:var(--border-subtle)] bg-bg-surface-raised px-3 text-[11px] uppercase font-mono tracking-[0.18em] font-medium text-fg-muted hover:text-fg-primary hover:ring-[color:var(--border-default)] transition-[color,box-shadow] duration-base ease-expressive"
    >
      <span aria-hidden="true">{mounted ? (theme === 'dark' ? '◐' : '◑') : '◑'}</span>
      <span>{mounted ? theme : 'light'}</span>
    </button>
  );
}

// Borrowed from the Layout Studio docs pattern — every token / hex / var is
// individually copyable. Tiny but turns the docs into a usable reference
// surface, not just a gallery.
export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      })
      .catch(() => {
        /* user-permissions or insecure context — silent */
      });
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label ?? value}`}
      className="inline-flex h-6 items-center gap-1 rounded-sm px-2 text-caption font-mono text-fg-muted hover:text-fg-primary hover:bg-bg-surface-muted transition-colors duration-fast ease-standard"
    >
      <span>{copied ? 'copied' : (label ?? value)}</span>
      <span aria-hidden="true" className="opacity-50">
        {copied ? '✓' : '⧉'}
      </span>
    </button>
  );
}
