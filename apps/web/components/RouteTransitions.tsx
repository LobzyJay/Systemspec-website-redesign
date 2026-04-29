'use client';

// RouteTransitions — wraps internal link clicks in startViewTransition then
// navigates via window.location.assign(href). Using the href directly (not
// router.push) means we never need to strip or re-add the basePath — the
// href in the static HTML already contains the correct full path for
// whichever environment the site runs in.

import { useEffect } from 'react';

type VTDoc = Document & {
  startViewTransition?: (cb: () => void) => unknown;
};

export function RouteTransitions() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.defaultPrevented) return;

      const anchor = (e.target as Element).closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || anchor.hasAttribute('download')) return;

      const t = anchor.getAttribute('target');
      if (t && t !== '_self') return;

      // Pass through: fragments, non-http schemes, external origins
      if (href.startsWith('#')) return;
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith('http')) return;

      let url: URL;
      try { url = new URL(href, location.href); } catch { return; }
      if (url.origin !== location.origin) return;
      // Same page, just a hash change — let browser scroll
      if (url.pathname === location.pathname && url.hash) return;

      // Navigate to the full absolute URL — href already has basePath baked in
      e.preventDefault();
      const vt = (document as VTDoc).startViewTransition;
      if (vt) {
        vt(() => location.assign(url.href));
      } else {
        location.assign(url.href);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}
