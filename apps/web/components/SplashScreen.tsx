'use client';

// SplashScreen — full-viewport black overlay with three teal dots
// bouncing in a row. Dismisses when both: minimum 900ms have elapsed
// AND `document.readyState === 'complete'` (page assets fully loaded).
// Then fades to transparent over 700ms, revealing the cream hero +
// braille pattern + globe underneath. The black-to-cream contrast jump
// reads as a tonal morph without orchestrating anything below.
//
// Once-per-session — sessionStorage flag prevents the splash from
// firing again on sub-route navigations or back/forward traversals.
//
// `prefers-reduced-motion: reduce` — overlay renders for 200ms then
// snaps off. No bouncing dots.

import { useEffect, useState } from 'react';

// Splash trigger logic — what we settled on after weighing the UX
// trade-offs:
//
//   • sessionStorage gate (NOT localStorage) — the splash establishes
//     brand identity once per browser session. Returning users in the
//     same session skip it entirely; new sessions get the full reveal.
//   • Mounted inside the marketing layout only — internal client-side
//     route navigations don't replay it. The /design route never
//     triggers it.
//   • Shorter hold on mobile / coarse-pointer devices (300ms vs 900ms).
//     Touch users want fast access; the brand cue still fires but
//     doesn't block thumb-driven exploration. Matches Stripe/Linear.
//   • Defensive 4s ceiling — if `load` never fires (slow 3rd party
//     blocking it), dismiss anyway so the page is never permanently
//     stuck behind the overlay.
//   • prefers-reduced-motion: snaps off after 200ms with no bouncing
//     dots — overlay still flashes briefly so the brand mark registers.

// Splash now fires on every refresh — no session gate. This keeps the
// brand reveal consistent and lets the user feel the loading state on
// every visit, including back/forward navigations from external sites.
//
// Fast hold so pages feel responsive, then a quick clip-path reveal.
// Tuned to sit well under 2.5s total to first content (Core Web Vitals
// LCP target). 1.2s desktop / 0.8s mobile (mobile is usually slower
// network so we surface content sooner).
const MIN_HOLD_DESKTOP_MS = 1200;
const MIN_HOLD_MOBILE_MS  = 800;
// Reveal: trimmed from 1400ms → 900ms. Same expo-out easing so the
// circle accelerates hard at the start then floats gently to zero —
// the mask still reads as inhaled, just more responsive.
const REVEAL_MS           = 900;
const REVEAL_EASE         = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function SplashScreen() {
  // Three states:
  //   'mounted' — visible, dots bouncing
  //   'dismissing' — fade-out in progress
  //   'gone' — unmounted, no DOM cost
  // Initial state is null (server) → resolved to 'mounted' or 'gone'
  // in the first effect based on sessionStorage.
  const [phase, setPhase] = useState<null | 'mounted' | 'dismissing' | 'gone'>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPhase('mounted');
    // Defensive scroll-to-top inside the React lifecycle as well — the
    // inline <head> script handles this on first paint, but if React
    // hydration somehow restored scroll position before the splash
    // mounted, this catches it. window.scrollTo(0,0) is cheap.
    window.scrollTo(0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const minHold = reduced ? 200 : (coarsePointer ? MIN_HOLD_MOBILE_MS : MIN_HOLD_DESKTOP_MS);
    const startedAt = performance.now();

    const dismiss = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minHold - elapsed);
      window.setTimeout(() => {
        setPhase('dismissing');
        // Unlock the body bg ~120ms into the reveal so the cream
        // surface is already painted underneath the mask as it
        // collapses — gives a smooth morph instead of a hard color
        // flip at the end.
        window.setTimeout(() => {
          document.documentElement.removeAttribute('data-splash');
        }, reduced ? 0 : 120);
        // After the reveal completes, fully unmount + restore native
        // scroll restoration so subsequent client-side navigations
        // (back/forward) behave normally.
        window.setTimeout(() => {
          setPhase('gone');
          try { if ('scrollRestoration' in history) history.scrollRestoration = 'auto'; } catch {}
        }, reduced ? 0 : REVEAL_MS);
      }, remaining);
    };

    // Slow-network behavior — the splash holds the user inside the
    // loading overlay until BOTH conditions are met:
    //   1. Minimum hold elapsed (the brand-mark moment)
    //   2. `document.readyState === 'complete'` (page assets resolved)
    //
    // On a fast network the load event fires inside the minimum hold
    // window, so the splash dismisses right at minHold. On a slow
    // network the load event lands later, and the splash stays up
    // until the page is ready — the user never gets handed a
    // half-painted hero. A 12s defensive ceiling caps the worst case
    // so a stalled third-party can't hold the user forever.
    if (document.readyState === 'complete') {
      dismiss();
    } else {
      const onLoad = () => dismiss();
      window.addEventListener('load', onLoad, { once: true });
      const ceiling = window.setTimeout(dismiss, 12000);
      return () => {
        window.removeEventListener('load', onLoad);
        window.clearTimeout(ceiling);
      };
    }
  }, []);

  if (phase === null || phase === 'gone') return null;

  const dismissing = phase === 'dismissing';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading SystemSpecs Technology Solutions"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Reveal the page underneath via a clip-path mask. The overlay
        // starts as a circle large enough to cover the viewport
        // (150% radius from center), then collapses to a point. Reads
        // as the page being unveiled from the center outward — the
        // dots stay anchored inside the shrinking circle until they
        // disappear with it.
        clipPath: dismissing
          ? 'circle(0% at 50% 50%)'
          : 'circle(150% at 50% 50%)',
        WebkitClipPath: dismissing
          ? 'circle(0% at 50% 50%)'
          : 'circle(150% at 50% 50%)',
        // Subtle scale: overlay slightly zooms in as the circle collapses —
        // the page "pulls through" the shrinking portal, giving the reveal
        // a sense of depth rather than a flat 2D wipe.
        transform: dismissing ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: dismissing ? 'none' : 'auto',
        transition: [
          `clip-path ${REVEAL_MS}ms ${REVEAL_EASE}`,
          `-webkit-clip-path ${REVEAL_MS}ms ${REVEAL_EASE}`,
          `transform ${REVEAL_MS}ms ${REVEAL_EASE}`,
        ].join(', '),
        willChange: 'clip-path, filter, transform',
      }}
      className={dismissing ? 'splash-blurring' : ''}
    >
      <div
        className="splash-dots"
        aria-hidden="true"
        style={{
          // Dots fade and scale down as the mask collapses so they
          // don't read as "shrinking dots clipped at the edge" —
          // they're gone before the mask reaches them.
          opacity: dismissing ? 0 : 1,
          transform: dismissing ? 'scale(0.5)' : 'scale(1)',
          transition: `opacity ${Math.round(REVEAL_MS * 0.4)}ms cubic-bezier(0.4, 0, 1, 1), transform ${Math.round(REVEAL_MS * 0.6)}ms ${REVEAL_EASE}`,
        }}
      >
        <span />
        <span />
        <span />
      </div>

      <style>{`
        .splash-dots {
          display: inline-flex;
          gap: 14px;
          align-items: center;
        }
        .splash-dots > span {
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: var(--accent-default, #017A6A);
          transform: translateY(0);
          opacity: 0.7;
          animation: stsl-splash-bounce 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .splash-dots > span:nth-child(1) { animation-delay: 0ms; }
        .splash-dots > span:nth-child(2) { animation-delay: 140ms; }
        .splash-dots > span:nth-child(3) { animation-delay: 280ms; }
        @keyframes stsl-splash-bounce {
          0%, 80%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-14px) scale(1.05);
            opacity: 1;
          }
        }
        /* Motion-blur ramp during the mask collapse. Filter peaks at
           ~14px around the midpoint of the reveal, then settles to 0
           by the time the mask is fully closed. Soft fluid wash
           feeling instead of a hard circular wipe. */
        .splash-blurring {
          animation: stsl-splash-blur ${REVEAL_MS}ms ${REVEAL_EASE} both;
        }
        @keyframes stsl-splash-blur {
          /* Ramps fast to peak blur (portal edge softens), dwells through
             the midpoint, then clears just before the circle closes so the
             final snap is crisp rather than soft. */
          0%   { filter: blur(0px); }
          20%  { filter: blur(28px); }
          70%  { filter: blur(22px); }
          95%  { filter: blur(4px); }
          100% { filter: blur(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-dots > span {
            animation: none;
            opacity: 1;
          }
          .splash-blurring {
            animation: none;
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}
