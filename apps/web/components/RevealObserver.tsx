'use client';

// RevealObserver — single mount point that wires every [data-reveal] and
// [data-reveal-card] node on the page into one IntersectionObserver. The
// first time a node crosses 12% of the viewport (or has more than 80px of
// itself visible — whichever lands first), it gets `data-revealed="true"`,
// which triggers the CSS transition in globals.css.
//
// Universal — works in Chrome / Edge / Safari / Firefox. Replaced the
// CSS `animation-timeline: view()` approach because that's Chromium-only
// and Safari/Firefox were silently rendering cards in place.
//
// One observer for the whole page (not per-component) so we don't create
// dozens of observer instances. The MutationObserver re-scans on DOM
// changes so client-route navigations and lazy-mounted sections still
// pick up reveal nodes.

import { useEffect } from 'react';

const SELECTOR = '[data-reveal], [data-reveal-card]';

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reduced-motion users: flip every node revealed immediately so the
      // CSS reduced-motion override (opacity:1, transform:none) settles.
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        el.dataset.revealed = 'true';
      });
      return;
    }

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // 12% rootMargin from the bottom catches elements just before they
        // enter the visible viewport so the transition has runway. 0.05
        // threshold means the node only needs 5% of itself in view for the
        // observer to fire — combined the two give a generous trigger
        // window without being eager.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.05,
      },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        // If a node is already in the viewport on initial mount (e.g. the
        // hero text that's visible above the fold), reveal it immediately
        // without forcing an IO callback round-trip.
        const rect = el.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
        if (inView) {
          seen.add(el);
          el.dataset.revealed = 'true';
        } else {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // MutationObserver — re-scans when new reveal nodes get added to the
    // DOM (client navigations, modal opens, lazily-mounted sections).
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
