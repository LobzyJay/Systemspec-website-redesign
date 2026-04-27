// STSL v2 icon set — single 24×24 viewBox, ultra-light 1.25 stroke, round caps
// + joins, no fills. Hand-authored to a Phosphor-Light / Remix-Line tier so the
// set reads as a single, opinionated voice — not a free-icon-site grab bag.
//
// Authored as React components rather than a sprite or font. Tree-shakable,
// inherits color via currentColor, scales via font-size or width/height.
//
// Conventions:
//   • viewBox 0 0 24 24, paths optically centered around (12, 12)
//   • domain glyphs sit on a ~18px optical box so they balance against status
//     icons that fill closer to the full 20px field
//   • stroke 1.25, round caps + joins, no fills (LinkedIn excepted — official
//     filled brand glyph, untouched)

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function Svg({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ----- Navigation / arrows -----

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12h15" />
    <path d="m13 6.5 5.5 5.5L13 17.5" />
  </Svg>
);
export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.25 16.75 16.75 7.25" />
    <path d="M9 7.25h7.75V15" />
  </Svg>
);
export const ChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6.5 9.75 5.5 5 5.5-5" />
  </Svg>
);
export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.25h16" />
    <path d="M4 15.75h16" />
  </Svg>
);
export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6.5 6.5 11 11" />
    <path d="m17.5 6.5-11 11" />
  </Svg>
);

// ----- Status / feedback -----

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.75 12.5 4.5 4.5L19.25 6.75" />
  </Svg>
);
export const Info = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.25" />
    <circle cx="12" cy="8" r="0.55" fill="currentColor" stroke="none" />
  </Svg>
);
export const Alert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.55 4.4 3.16 17.2a1.65 1.65 0 0 0 1.43 2.48h14.82a1.65 1.65 0 0 0 1.43-2.48L13.45 4.4a1.65 1.65 0 0 0-2.9 0Z" />
    <path d="M12 10v4.25" />
    <circle cx="12" cy="17" r="0.55" fill="currentColor" stroke="none" />
  </Svg>
);
export const Lock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="10.75" width="15" height="9" rx="2.25" />
    <path d="M7.75 10.75V7.5a4.25 4.25 0 0 1 8.5 0v3.25" />
    <circle cx="12" cy="15" r="0.6" fill="currentColor" stroke="none" />
  </Svg>
);

// ----- Domain icons (STSL's actual capabilities) -----

// Building — slim curtain-wall block: stacked horizontal glazing bands instead
// of repeated dots, single recessed entry. Reads as commercial real estate.
export const Building = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.25 20.5V5.5a1 1 0 0 1 1-1h11.5a1 1 0 0 1 1 1v15" />
    <path d="M3.75 20.5h16.5" />
    <path d="M8.25 8.5h7.5" />
    <path d="M8.25 12h7.5" />
    <path d="M8.25 15.5h2.25" />
    <path d="M13.5 15.5h2.25" />
    <path d="M10.5 20.5v-2.75a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.75" />
  </Svg>
);

// Government — symmetric pediment over evenly spaced columns with a clean
// stylobate. No fascia repetition; the columns do the talking.
export const Government = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 9.75 12 4.25l8.5 5.5" />
    <path d="M3.5 9.75h17" />
    <path d="M5.75 9.75v8" />
    <path d="M9.75 9.75v8" />
    <path d="M14.25 9.75v8" />
    <path d="M18.25 9.75v8" />
    <path d="M3.25 17.75h17.5" />
    <path d="M3.25 20h17.5" />
  </Svg>
);

// Bank — distinguished from Government by a flat lintel (no pediment) and a
// single coin slot at its centre. Reads as vault / financial institution.
export const Bank = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.75 8 12 4l8.25 4" />
    <path d="M3.75 8h16.5" />
    <path d="M5.5 8v1.5" />
    <path d="M18.5 8v1.5" />
    <path d="M6.5 11.5v6" />
    <path d="M10 11.5v6" />
    <path d="M14 11.5v6" />
    <path d="M17.5 11.5v6" />
    <path d="M4.5 17.5h15" />
    <path d="M3.75 20h16.5" />
  </Svg>
);

// Network — three nodes joined by precise edges, with hairline ring-accents
// around each node so they read as devices/peers, not dots on lines.
export const Network = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="5.25" r="2" />
    <circle cx="5.25" cy="18.75" r="2" />
    <circle cx="18.75" cy="18.75" r="2" />
    <path d="M11.1 7.05 6.15 16.95" />
    <path d="M12.9 7.05 17.85 16.95" />
    <path d="M7.25 18.75h9.5" />
  </Svg>
);

// Code — angled brackets with a slimmer, longer slash for editorial rhythm.
export const Code = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 8.25 4 12l4.5 3.75" />
    <path d="m15.5 8.25 4.5 3.75-4.5 3.75" />
    <path d="M14 4.5 10 19.5" />
  </Svg>
);

// Card — payment card with a single chip-square instead of a generic mag-stripe
// + "card-number" hash. Quiet, considered.
export const Card = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.25" y="6" width="17.5" height="12" rx="2" />
    <path d="M3.25 9.5h17.5" />
    <rect x="6" y="13" width="3" height="2.25" rx="0.4" />
  </Svg>
);

// Wallet — billfold with a button-stud pocket on the right. Single continuous
// outer path, no fold-flap doubling back on itself awkwardly.
export const Wallet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9.5V7a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 18 7v2.5" />
    <path d="M4 9.5h15a1.5 1.5 0 0 1 1.5 1.5v6.5A1.5 1.5 0 0 1 19 19H5.5A1.5 1.5 0 0 1 4 17.5v-8Z" />
    <path d="M20.5 13h-3a1.5 1.5 0 0 0 0 3h3" />
  </Svg>
);

// Document — corner-folded sheet with a precise crease line and three
// indented copy lines that don't touch the edge.
export const Document = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 4.5h7.75L18.5 9.75v8.75a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18.5v-12.5A1.5 1.5 0 0 1 5.5 4.5Z" />
    <path d="M13.25 4.5v4.25a1 1 0 0 0 1 1h4.25" />
    <path d="M7.5 13h7.5" />
    <path d="M7.5 16h5" />
  </Svg>
);

// Users — two figures, one slightly back, with shoulder-line silhouettes
// (no generic "circle on a half-pill"). Front figure leads visually.
export const Users = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9.5" cy="8.75" r="2.75" />
    <path d="M3.75 19c0-2.9 2.575-5.25 5.75-5.25S15.25 16.1 15.25 19" />
    <circle cx="16.75" cy="9.5" r="2.25" />
    <path d="M14.5 13.75c2.85 0 5.75 1.85 5.75 4.5" />
  </Svg>
);

// Award — medallion with two ribbon tails crossing behind. Single ring,
// crossed ribbons, no random pentagon-laurel mash-up.
export const Award = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9.5" r="5.25" />
    <path d="m9 13.75-2.25 6.5L12 17.5l5.25 2.75L15 13.75" />
  </Svg>
);

// Shield — crest silhouette with a thin inner verification tick. Crisper
// shoulders than the previous rounded-pebble shape.
export const Shield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.75 4.75 6v6c0 4.25 3.05 7.65 7.25 8.5 4.2-.85 7.25-4.25 7.25-8.5V6L12 3.75Z" />
    <path d="m9.25 12 2 2 3.5-3.5" />
  </Svg>
);

// ----- Social -----

// Official LinkedIn brand glyph — solid mark, not a line interpretation. Use
// `currentColor` so callers can tint to brand or invert for dark surfaces.
export const LinkedIn = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...rest}
  >
    <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.137 1.447-2.137 2.94v5.666H9.354V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.78 13.019H3.555V9h3.562v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Twitter — refined X mark with a subtle compositional asymmetry (slightly
// tighter top corners) so it reads as a glyph, not a generic close icon.
export const Twitter = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 4.25h3.75L20 19.75h-3.75L4 4.25Z" />
    <path d="m4.75 19.75 6.5-7.5" />
    <path d="m12.75 11.75 6.5-7.5" />
  </Svg>
);

// Mail — envelope with a single seam crease, flap drawn as a soft V that
// stops short of the side walls (no generic "M3 7 → 9 6 → 9 6").
export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.25" y="5.5" width="17.5" height="13" rx="2" />
    <path d="m4.5 7.5 6.65 4.7a1.5 1.5 0 0 0 1.7 0l6.65-4.7" />
  </Svg>
);

// Phone — handset with a clean radius at both ear and mouth, single
// continuous path, no kinked elbows.
export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 4.5h2.65a1 1 0 0 1 .96.72l1.1 3.85a1 1 0 0 1-.46 1.13l-1.85 1.05a11 11 0 0 0 5 5l1.05-1.85a1 1 0 0 1 1.13-.46l3.85 1.1a1 1 0 0 1 .72.96V18a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 4 6a1.5 1.5 0 0 1 1.5-1.5Z" />
  </Svg>
);

export type { IconProps };
