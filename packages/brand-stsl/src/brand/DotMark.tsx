// Three-dot "punctuation" motif sampled from the SystemSpecs Holdings parent
// mark — the dots that sit above the "i" of "System". Three sizes, three
// teals, ordered small → medium → large left-to-right. Standalone identifier
// usable wherever the full wordmark would feel heavy (favicon, app tile,
// loader, end-of-page mark).
//
// Geometry was sampled directly from the supplied parent PNG:
//   dot 1 (small):  cx=20.0  r=2.4   #B6D8D4   (very pale teal)
//   dot 2 (medium): cx=29.0  r=3.2   #83BFB7   (light teal)
//   dot 3 (large):  cx=39.5  r=4.4   #017A6A   (deep brand teal)
// Centers normalised so the three dots sit on a 24×8 strip with comfortable
// padding; relative spacing and size ratios match the source ~1:1.4:1.85.

import type { SVGProps } from 'react';

interface DotMarkProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
  size?: number | string;
  // Tone variants for surface contrast. `brand` keeps the source teals.
  // `mono` collapses to currentColor so the motif inherits text color when it
  // sits beside the wordmark on dark surfaces.
  tone?: 'brand' | 'mono';
}

export function DotMark({ size = 48, tone = 'brand', ...props }: DotMarkProps) {
  const isMono = tone === 'mono';
  const small = isMono ? 'currentColor' : 'var(--brand-teal-pale, #B6D8D4)';
  const medium = isMono ? 'currentColor' : 'var(--brand-teal-light, #83BFB7)';
  const large = isMono ? 'currentColor' : 'var(--brand-teal, #017A6A)';
  // Mono mode dims the smaller dots so the source hierarchy survives without
  // colour. Brand mode uses the sampled teals at full opacity.
  const smallOpacity = isMono ? 0.45 : 1;
  const mediumOpacity = isMono ? 0.7 : 1;

  return (
    <svg
      width={size}
      height={(typeof size === 'number' ? size : 48) / 6}
      viewBox="0 0 48 8"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="5" r="1.6" fill={small} opacity={smallOpacity} />
      <circle cx="20" cy="4.5" r="2.3" fill={medium} opacity={mediumOpacity} />
      <circle cx="33" cy="4" r="3.2" fill={large} />
    </svg>
  );
}
