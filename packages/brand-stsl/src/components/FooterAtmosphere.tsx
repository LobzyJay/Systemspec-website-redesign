'use client';

// Footer atmosphere — dark-mode Braille texture on the espresso
// (--bg-inverse) surface, with a vertical veil at the top that blends the
// footer into the section above.
//
// Mirrors the hero Braille atmosphere but inverted for dark surface:
//   • Tiny 3×2 Braille cells repeating across the footer
//   • Two layers: faint static (always visible at low alpha) + brighter
//     band that traverses left-to-right ("reading sweep")
//   • Tinted accent teal at low alpha against the dark surface
//   • Vertical veil at top blends the footer into whatever sits above it
//
// No cursor tracking. Pure CSS animation. Pointer-events:none.

const CELL_W = 14;
const CELL_H = 20;
const DOT_R  = 0.7;

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

export function FooterAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* 1 — Espresso base. The footer's resting surface tone, painted
             explicitly so the atmosphere stays anchored even if the
             parent footer's bg ever shifts. */}
      <div className="absolute inset-0 bg-bg-inverse" />

      {/* 2 — Static Braille texture. Always-on at low alpha so the
             surface always reads as textured, not flat. */}
      <BraillePattern id="footer-braille-static" opacity={0.14} />

      {/* 3 — Sweep layer. Same Braille pattern at higher alpha, masked
             to a tall vertical band that travels left-to-right. The
             "finger reading along a Braille line" effect. */}
      <div className="absolute inset-0 footer-braille-sweep">
        <BraillePattern id="footer-braille-sweep" opacity={0.32} />
      </div>

      {/* 4 — Top blend veil. Opaque espresso at the top edge fading to
             transparent toward the bottom. Cushions the section break
             whether the section above is light or dark. */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg-inverse) 0%, color-mix(in srgb, var(--bg-inverse) 80%, transparent) 50%, transparent 100%)',
        }}
      />

      <style>{`
        @keyframes footer-braille-sweep-anim {
          0%   { -webkit-mask-position: -50% 0; mask-position: -50% 0; }
          100% { -webkit-mask-position: 150% 0; mask-position: 150% 0; }
        }
        .footer-braille-sweep {
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
          animation: footer-braille-sweep-anim 18s cubic-bezier(.4,0,.2,1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-braille-sweep { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
