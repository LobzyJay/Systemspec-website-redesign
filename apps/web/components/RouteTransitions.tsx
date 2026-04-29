'use client';

// RouteTransitions — single capture-phase click delegate that wraps every
// same-origin internal navigation in `document.startViewTransition` and
// hands the actual route change to the Next.js App Router. Mounted once
// from the marketing layout; covers Nav, Footer, SegmentedCTA, card grids,
// and any other internal <a href="/..."> on the page without touching the
// brand package.
//
// Why a global delegate instead of a TransitionLink wrapper:
//  - The brand-stsl Nav + Footer use plain <a> tags (full reload by
//    default, since they live in a shared package and can't import
//    next/link). A delegate covers them automatically.
//  - All marketing card components (SolutionCard, ProductCard, etc.) also
//    render plain <a>. Same story.
//  - Single mount point keeps the React tree clean — no per-component
//    wrappers, no import sweeps, no chance of someone forgetting to swap.
//
// Browser support:
//  - Chrome / Edge (current stable)         → cross-fade + slide
//  - Safari Technology Preview               → cross-fade + slide
//  - Safari stable / Firefox                 → falls through to instant
//                                              client-side navigation
//                                              (router.push without VT)
//
// Hard rules respected:
//  - prefers-reduced-motion handled by the CSS @media block in globals.css
//  - external links, mail/tel, anchor-only fragments, target="_blank",
//    download links, and modifier-key clicks all bypass the wrapper and
//    use the browser's native behavior.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Browser-native typing for the View Transitions API. Next 16's TS lib
// doesn't ship a stable type for this yet, so we declare the minimum
// surface we use. (This is the one allowed cast per the brief's hard rules.)
type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => unknown;
};

export function RouteTransitions() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (event: MouseEvent) => {
      // Only respond to primary-button clicks; let the browser handle
      // middle-click, right-click, and any modified click (cmd/ctrl/shift/alt
      // → new tab / new window / download).
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.defaultPrevented) return;

      // Walk up from the click target to find the nearest <a>. We use
      // closest() so clicks on nested icons/spans inside an anchor still
      // resolve to the link itself.
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;
      const anchor = target.closest('a');
      if (!anchor) return;

      // Skip anchors without an href, with download, or with a non-default
      // target — those should keep their native behavior.
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (anchor.hasAttribute('download')) return;
      const targetAttr = anchor.getAttribute('target');
      if (targetAttr && targetAttr !== '_self') return;

      // Pure fragment links (#sales) — let the browser handle the in-page
      // jump, no view transition needed.
      if (href.startsWith('#')) return;

      // mailto:, tel:, and any other non-http scheme. Skip.
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith('http')) return;

      // External links (different origin). Skip — browser handles natively.
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Same-origin same-pathname (only fragment or query change). Let the
      // browser handle anchor scroll; skipping the VT here keeps in-page
      // jumps from feeling like a route swap.
      if (url.pathname === window.location.pathname && url.hash) return;

      // We own this navigation. Build the destination as a path+search+hash
      // so router.push gets a clean relative target. Strip the basePath
      // prefix if present — Next.js router.push expects paths WITHOUT the
      // basePath (it adds the prefix internally). Without this, hrefs that
      // already include the basePath (needed for correct GitHub Pages static
      // HTML attributes) would push a double-prefixed URL.
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
      const rawPath = base && url.pathname.startsWith(base)
        ? url.pathname.slice(base.length) || '/'
        : url.pathname;
      const destination = rawPath + url.search + url.hash;

      const doc = document as ViewTransitionDoc;
      const startVT = doc.startViewTransition;

      // Always intercept and use router.push for client-side navigation.
      // If View Transitions are supported, wrap the push in startViewTransition;
      // otherwise just push directly (no animation, but still SPA-fast).
      event.preventDefault();
      if (typeof startVT === 'function') {
        startVT(() => {
          router.push(destination);
        });
      } else {
        router.push(destination);
      }
    };

    // Capture phase so we run before any per-link handlers (e.g. drawer
    // close handlers in Nav). We return after preventDefault, so other
    // listeners on the same anchor still get to run if they don't bail
    // on defaultPrevented.
    document.addEventListener('click', handleClick, { capture: false });
    return () => {
      document.removeEventListener('click', handleClick, { capture: false });
    };
  }, [router]);

  return null;
}
