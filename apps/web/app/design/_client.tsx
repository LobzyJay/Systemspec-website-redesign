'use client';

// Client-only docs widgets: scroll-spied TOC, theme toggle, copy-to-clipboard
// affordance. Kept private with the underscore prefix so the App Router skips
// the file.

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
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
    <nav aria-label="On this page" className="sticky top-24 flex flex-col gap-3">
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
