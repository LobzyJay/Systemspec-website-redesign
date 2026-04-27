// Static PNG globe — the canonical SystemSpecs globe asset (Africa lit in
// brand teal). Use this anywhere the live cobe globe or the SVG DottedGlobe
// would be overkill: hero visuals, banner thumbnails, social cards,
// newsletter heads. Renders at any size while preserving the same artwork.
//
// Transparent-friendly — the source has no opaque background, so it sits
// cleanly on any surface (paper canvas, dark inverse, brand forest).

import type { ImgHTMLAttributes } from 'react';

interface GlobeAssetProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string;
}

export function GlobeAsset({ className, alt = 'SystemSpecs coverage globe', ...props }: GlobeAssetProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/globe-asset.jpg"
      alt={alt}
      className={['block w-full h-auto select-none pointer-events-none', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
