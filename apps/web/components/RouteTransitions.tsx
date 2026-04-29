'use client';

// RouteTransitions — currently a no-op shim.
//
// Previous versions intercepted clicks to wrap navigation in
// `document.startViewTransition`. That approach only works for
// SAME-DOCUMENT (SPA) transitions and breaks when combined with
// `location.assign()` for static-export sites — the navigation gets
// cancelled by the VT lifecycle and clicks appear to do nothing.
//
// Cross-document view transitions exist but require a different opt-in
// pattern (`@view-transition` CSS rule + same-origin matching) and are
// only in Chrome 126+. Out of scope for v1.
//
// For now: native <a href> navigation with the correct basePath baked
// into the static HTML. Reliable, works in every browser, no JS needed
// for navigation.

export function RouteTransitions() {
  return null;
}
