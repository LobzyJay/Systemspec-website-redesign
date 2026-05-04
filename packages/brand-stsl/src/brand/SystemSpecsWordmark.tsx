// SystemSpecs Holdings parent wordmark.
//
// Two source assets — black on transparent, white on transparent. Both
// preserve the teal dot motif at the correct hues; we never invert.
//
// Theme behavior:
//   tone="brand" (default) → black asset on light theme, white asset on
//                            dark theme. Auto-swaps via CSS data-theme.
//                            Use on canvas surfaces.
//   tone="mono"            → forces white (use on always-dark surfaces
//                            regardless of theme — e.g. the GroupBlock
//                            forest band).
//   tone="inverse"         → OPPOSITE of brand: white asset on light theme,
//                            black asset on dark theme. Use on inverse
//                            surfaces (Footer, SegmentedCTA) whose
//                            background flips with theme.

import type { ImgHTMLAttributes } from 'react';
import { asset } from '../utils/asset';

interface SystemSpecsWordmarkProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  height?: number;
  tone?: 'brand' | 'mono' | 'inverse';
  alt?: string;
}

const INTRINSIC_RATIO = 5.4;
const BLACK = '/brand/systemspec-official-logo-black.png';
const WHITE = '/brand/systemspec-official-logo-white.png';

export function SystemSpecsWordmark({
  height = 32,
  tone = 'brand',
  alt = 'SystemSpecs',
  className,
  ...props
}: SystemSpecsWordmarkProps) {
  const width = Math.round(height * INTRINSIC_RATIO);

  if (tone === 'mono') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(WHITE)} alt={alt} height={height} width={width} className={className} {...props} />
    );
  }

  // Theme-aware: render both, hide one via CSS so the swap is instant on
  // theme toggle without a re-render or asset re-fetch.
  // brand:    light → BLACK, dark → WHITE  (canvas surfaces)
  // inverse:  light → WHITE, dark → BLACK  (inverse surfaces that flip)
  const lightAsset = tone === 'inverse' ? WHITE : BLACK;
  const darkAsset = tone === 'inverse' ? BLACK : WHITE;

  return (
    <span className="inline-block" style={{ height, width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(lightAsset)}
        alt={alt}
        height={height}
        width={width}
        className={`block dark:hidden ${className ?? ''}`}
        {...props}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(darkAsset)}
        alt=""
        aria-hidden="true"
        height={height}
        width={width}
        className={`hidden dark:block ${className ?? ''}`}
      />
    </span>
  );
}
