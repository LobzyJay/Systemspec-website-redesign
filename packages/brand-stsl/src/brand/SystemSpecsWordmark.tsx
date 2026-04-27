// SystemSpecs Holdings parent wordmark.
//
// Two source assets — black on transparent, white on transparent. Both
// preserve the teal dot motif at the correct hues; we never invert.
//
// Theme behavior:
//   tone="brand" (default) → black asset on light theme, white asset on
//                            dark theme. Auto-swaps via CSS data-theme.
//   tone="mono"            → forces white (use on dark surfaces regardless
//                            of theme — e.g. the GroupBlock forest band).

import type { ImgHTMLAttributes } from 'react';
import { asset } from '../utils/asset';

interface SystemSpecsWordmarkProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  height?: number;
  tone?: 'brand' | 'mono';
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
  return (
    <span className="inline-block" style={{ height, width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(BLACK)}
        alt={alt}
        height={height}
        width={width}
        className={`block dark:hidden ${className ?? ''}`}
        {...props}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(WHITE)}
        alt=""
        aria-hidden="true"
        height={height}
        width={width}
        className={`hidden dark:block ${className ?? ''}`}
      />
    </span>
  );
}
