'use client';

import { useEffect } from 'react';

/**
 * EmbeddedGuard — neutralizes navigation when the site is rendered inside
 * an <iframe>. The case study at /Portfolio/case-study/stsl/ embeds several
 * routes of this site as artefacts; without this guard, readers can click
 * a link inside one of those iframes and accidentally navigate the iframe
 * away from the artefact, which reads as "the case study broke".
 *
 * Behaviour:
 *   - Not embedded (window.self === window.top) → renders nothing, attaches
 *     no listeners, zero impact on production traffic.
 *   - Embedded → captures clicks at the document root. External links
 *     (http/https/mailto/tel) open in a new tab via window.open. Internal
 *     navigation (relative hrefs, in-app router links, hash links, submit
 *     buttons, role="link" elements) is suppressed entirely.
 *
 * Detection uses `window.self !== window.top` — the standard same-origin
 * iframe detect, sufficient because we control both the embedder and the
 * embeddee and don't need a query-param escape hatch.
 */
export function EmbeddedGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.self === window.top) return; // not embedded — no-op

    const handler = (e: MouseEvent) => {
      const node = e.target as HTMLElement | null;
      const target = node?.closest?.('a, button[type="submit"], [role="link"]');
      if (!target) return;
      const href = (target as HTMLAnchorElement).getAttribute?.('href') ?? '';
      // External (http/mailto/tel): open in new tab so the iframe stays put.
      if (/^(https?:|mailto:|tel:)/.test(href)) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }
      // Internal navigation (relative paths, hash links, router-driven
      // buttons): kill it entirely.
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('click', handler, true); // capture phase
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}
