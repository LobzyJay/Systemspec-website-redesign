'use client';

import { useEffect, useRef, useState } from 'react';
import { Container, Stack } from '@systemspecs/foundations/layout';
import { Button, Link } from '@systemspecs/foundations/primitives';
import { cn } from '@systemspecs/foundations';

interface NavLink {
  label: string;
  href: string;
}

interface NavProps {
  primaryLinks: NavLink[];
  governmentHref?: string;
  salesHref: string;
  brand: { mark: React.ReactNode; href: string; label: string };
}

/**
 * Marketing nav.
 *
 * Polish notes (motion):
 *  - Hamburger icon is an animated three-bar construct (no static SVG swap).
 *    Bars morph into an X via CSS transforms keyed off `data-open` on the
 *    button. 320ms cubic-bezier(0.32, 0.72, 0, 1) — Apple-style settle, no
 *    overshoot. Respects prefers-reduced-motion.
 *  - Mobile drawer animates with `transform + opacity` (not max-height) so
 *    the open/close feels like a soft inhale instead of a layout reflow.
 *    Items inside cascade in with a 40ms stagger via :nth-child delays.
 *  - Header background frosts when the user scrolls past 80px — opaque white
 *    above the fold, rgba(255,255,255,.92) + backdrop-blur(16px) below.
 *    Toggle is a `data-scrolled` attribute set by a single passive scroll
 *    listener (no React re-render storm).
 */
export function Nav({ primaryLinks, governmentHref, salesHref, brand }: NavProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Scroll-driven frost. Plain DOM attribute toggle keeps this off the React
  // render path — important because the marketing layout has heavy canvas
  // siblings and we don't want scroll to schedule reconciles.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => {
      const scrolled = window.scrollY > 80;
      const current = header.getAttribute('data-scrolled') === 'true';
      if (scrolled !== current) {
        header.setAttribute('data-scrolled', scrolled ? 'true' : 'false');
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Lock the open state when the viewport crosses lg — avoids a stuck
  // drawer if the user resizes from mobile to desktop with menu open.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [open]);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      data-stsl-nav
      className={cn(
        'sticky top-0 z-40 border-b border-border-subtle',
        // Background + backdrop-filter swap on data-scrolled. Transition
        // via CSS variables so the curve is identical for both properties.
        'stsl-nav-header',
      )}
    >
      <Container size="wide">
        <div className="flex min-h-16 py-3 items-center justify-between">
          <a
            href={brand.href}
            className="flex items-center gap-2 font-display text-heading-3 text-fg-primary"
            aria-label={brand.label}
          >
            {brand.mark}
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <Stack direction="row" gap={6} align="center">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  variant="subtle"
                  className="stsl-underline-draw text-body-sm font-medium hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </nav>

          <Stack direction="row" gap={2} align="center" className="hidden lg:flex">
            {governmentHref ? (
              <Button asChild variant="ghost" size="sm">
                <a href={governmentHref}>Government enquiries</a>
              </Button>
            ) : null}
            <Button asChild variant="primary" size="sm">
              <a href={salesHref}>Talk to sales</a>
            </Button>
          </Stack>

          <button
            type="button"
            data-open={open}
            className={cn(
              'lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-fg-primary',
              'transition-colors duration-200 ease-out hover:bg-bg-surface-raised',
              'stsl-burger',
            )}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="stsl-mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span aria-hidden="true" className="stsl-burger__box">
              <span className="stsl-burger__bar stsl-burger__bar--1" />
              <span className="stsl-burger__bar stsl-burger__bar--2" />
              <span className="stsl-burger__bar stsl-burger__bar--3" />
            </span>
          </button>
        </div>

        <div
          id="stsl-mobile-drawer"
          data-open={open}
          aria-hidden={!open}
          className={cn(
            'lg:hidden overflow-hidden stsl-drawer',
            // Pointer-events guard so the collapsed drawer never traps taps
            // even mid-transition.
            open ? 'pointer-events-auto' : 'pointer-events-none',
          )}
        >
          <Stack gap={2} className="py-4 border-t border-border-subtle stsl-drawer__inner">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                variant="subtle"
                className="text-body py-2 stsl-drawer__item"
              >
                {link.label}
              </Link>
            ))}
            <Stack direction="row" gap={2} className="pt-4 stsl-drawer__item">
              {governmentHref ? (
                <Button asChild variant="secondary" size="md" className="flex-1">
                  <a href={governmentHref}>Government</a>
                </Button>
              ) : null}
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={salesHref}>Talk to sales</a>
              </Button>
            </Stack>
          </Stack>
        </div>
      </Container>

      {/* Scoped styles — keeps the motion contract self-contained so the
          component can be lifted into other apps without touching tailwind
          config. All transitions respect prefers-reduced-motion. */}
      <style>{`
        .stsl-nav-header {
          background: #ffffff;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
          transition:
            background-color 320ms cubic-bezier(0.32, 0.72, 0, 1),
            backdrop-filter 320ms cubic-bezier(0.32, 0.72, 0, 1),
            -webkit-backdrop-filter 320ms cubic-bezier(0.32, 0.72, 0, 1);
          /* Safe-area handling for iOS notch / Dynamic Island. The header
             paints UP into the safe-area inset so the white bar reaches
             the very top of the viewport — no gap of body-bg showing
             between the status bar and the header. Inner content gets
             pushed down by the same amount so the wordmark + nav links
             never sit underneath the notch. */
          padding-top: env(safe-area-inset-top, 0px);
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
        }
        .stsl-nav-header[data-scrolled='true'] {
          background: rgba(255, 255, 255, 0.92);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          backdrop-filter: blur(16px) saturate(140%);
        }

        /* ---------- Animated hamburger ---------- */
        .stsl-burger__box {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 14px;
        }
        .stsl-burger__bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 1.5px;
          background: currentColor;
          border-radius: 2px;
          transform-origin: 50% 50%;
          transition:
            transform 320ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 200ms ease,
            top 320ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .stsl-burger__bar--1 { top: 0; }
        .stsl-burger__bar--2 { top: 50%; transform: translateY(-50%); }
        .stsl-burger__bar--3 { top: 100%; transform: translateY(-100%); }

        .stsl-burger[data-open='true'] .stsl-burger__bar--1 {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        .stsl-burger[data-open='true'] .stsl-burger__bar--2 {
          opacity: 0;
          transform: translateY(-50%) scaleX(0);
        }
        .stsl-burger[data-open='true'] .stsl-burger__bar--3 {
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
        }

        /* ---------- Mobile drawer ---------- */
        .stsl-drawer {
          /* Use grid-rows trick for a layout-correct collapse without
             animating max-height. Inner content drives its own transform
             + opacity for the visual ease. */
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-8px);
          transition:
            grid-template-rows 360ms cubic-bezier(0.32, 0.72, 0, 1),
            transform 360ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 360ms cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform, opacity;
        }
        .stsl-drawer[data-open='true'] {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: translateY(0);
        }
        .stsl-drawer[data-open='false'] {
          transition:
            grid-template-rows 240ms cubic-bezier(0.32, 0.72, 0, 1),
            transform 240ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 240ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .stsl-drawer__inner {
          min-height: 0;
          overflow: hidden;
        }

        /* Stagger the items in. Delay only applies on open — closing snaps
           items back instantly so the panel doesn't have stragglers. */
        .stsl-drawer__item {
          opacity: 0;
          transform: translateY(-4px);
          transition:
            opacity 200ms cubic-bezier(0.32, 0.72, 0, 1),
            transform 200ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .stsl-drawer[data-open='true'] .stsl-drawer__item {
          opacity: 1;
          transform: translateY(0);
        }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(1) { transition-delay: 80ms; }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(2) { transition-delay: 120ms; }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(3) { transition-delay: 160ms; }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(4) { transition-delay: 200ms; }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(5) { transition-delay: 240ms; }
        .stsl-drawer[data-open='true'] .stsl-drawer__item:nth-child(6) { transition-delay: 280ms; }

        @media (prefers-reduced-motion: reduce) {
          .stsl-nav-header,
          .stsl-burger__bar,
          .stsl-drawer,
          .stsl-drawer__item {
            transition-duration: 0ms !important;
            transition-delay: 0ms !important;
          }
          .stsl-drawer__item {
            transform: none !important;
          }
        }
      `}</style>
    </header>
  );
}
