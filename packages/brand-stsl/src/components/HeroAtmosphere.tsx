// HeroAtmosphere — Braille-style dot grid with a slow left-to-right reading
// sweep. Two modes:
//   • default — static sweep + diagonal headline shield (used on homepage,
//     where the Globe is the focal interactive element)
//   • reactive — adds a cursor-tracked spotlight that brightens dots near
//     the cursor (used on hero pages without a globe / visual slot — gives
//     the empty visual real estate something to react to)
//
// Design intent (per brief §7 — calm, editorial, restraint signals
// seniority):
//   • Tiny dots, 3-row × 2-column Braille cells (cell shape only, not
//     encoded text)
//   • Two static layers + one sweep band; cursor spotlight is opt-in
//   • Diagonal mask zeros pattern across headline column (left)
//   • Top-edge fade dissolves into page above
//   • prefers-reduced-motion: reduce — sweep stops, cursor tracking off,
//     only faint static dots remain

'use client';

import { useEffect, useRef } from 'react';
import { HeroAtmosphereReactive } from './HeroAtmosphereReactive';

const CELL_W = 14;
const CELL_H = 20;
const DOT_R  = 0.7;

interface HeroAtmosphereProps {
  // When true, the atmosphere tracks the cursor — a soft accent spotlight
  // follows the pointer through the hero, brightening dots underneath.
  // Off by default. Pages without a Globe / interactive visual should
  // turn this on so the empty visual side responds to the user.
  reactive?: boolean;
}

function BraillePattern({ id, opacity }: { id: string; opacity: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full text-[color:var(--accent-default)]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={CELL_W}
          height={CELL_H}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="4"  r={DOT_R} fill="currentColor" />
          <circle cx="9" cy="4"  r={DOT_R} fill="currentColor" />
          <circle cx="3" cy="10" r={DOT_R} fill="currentColor" />
          <circle cx="9" cy="10" r={DOT_R} fill="currentColor" />
          <circle cx="3" cy="16" r={DOT_R} fill="currentColor" />
          <circle cx="9" cy="16" r={DOT_R} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function HeroAtmosphere({ reactive = false }: HeroAtmosphereProps) {
  // Reactive mode → canvas-driven forcefield variant. The cursor pushes
  // braille dots outward inside its influence radius; dots spring back
  // when the cursor leaves. The static SVG sweep below is for the
  // non-reactive (homepage) path.
  if (reactive) return <HeroAtmosphereReactive />;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reactive) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Default cursor position sits center-right where the visual slot
    // would be — keeps the spotlight honest before the user touches it.
    node.style.setProperty('--mx', '70%');
    node.style.setProperty('--my', '50%');

    let raf = 0;
    let pendingX = 70;
    let pendingY = 50;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        node.style.setProperty('--mx', `${pendingX}%`);
        node.style.setProperty('--my', `${pendingY}%`);
      });
    };

    // Listen on the parent <section> so the cursor anywhere in the hero
    // moves the spotlight, not just inside the atmosphere overlay.
    const root = node.closest('section') ?? node.parentElement ?? node;
    root.addEventListener('mousemove', onMove as EventListener, { passive: true });

    return () => {
      root.removeEventListener('mousemove', onMove as EventListener);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reactive]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* 1 — Static Braille texture. Bumped from 7% → 11% so the bg
             pattern reads more clearly across all surfaces. */}
      <BraillePattern id="hero-braille-static" opacity={0.11} />

      {/* 2 — Sweep layer. Brighter band travels left → right on a 16s
             loop. CSS-driven, no JS. */}
      <div className="absolute inset-0 hero-braille-sweep">
        <BraillePattern id="hero-braille-sweep" opacity={0.28} />
      </div>

      {/* 3 — Cursor spotlight (reactive mode only). A soft radial
             accent wash that follows --mx/--my, brightening dots
             beneath the cursor. Pure CSS gradient masked overlay. */}
      {reactive ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 280px at var(--mx, 70%) var(--my, 50%), color-mix(in srgb, var(--accent-default) 22%, transparent) 0%, color-mix(in srgb, var(--accent-default) 8%, transparent) 35%, transparent 70%)',
            transition: 'background-position 240ms cubic-bezier(.2,0,0,1)',
            mixBlendMode: 'multiply',
          }}
        />
      ) : null}

      {/* 4 — Top edge fade dissolving into the page above. */}
      <div
        className="absolute inset-x-0 top-0 h-20"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg-canvas) 0%, transparent 100%)',
        }}
      />

      <style>{`
        @keyframes hero-braille-sweep-anim {
          0%   { -webkit-mask-position: -50% 0; mask-position: -50% 0; }
          100% { -webkit-mask-position: 150% 0; mask-position: 150% 0; }
        }
        .hero-braille-sweep {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 38%,
            #000 50%,
            transparent 62%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            transparent 38%,
            #000 50%,
            transparent 62%,
            transparent 100%
          );
          -webkit-mask-size: 50% 100%;
          mask-size: 50% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: hero-braille-sweep-anim 16s cubic-bezier(.4,0,.2,1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-braille-sweep { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
