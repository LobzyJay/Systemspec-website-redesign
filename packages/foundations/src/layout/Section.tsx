import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type SectionSurface = 'canvas' | 'surface' | 'muted' | 'inverse';
type SectionDensity = 'sm' | 'md' | 'lg';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  surface?: SectionSurface;
  density?: SectionDensity;
}

const surfaces: Record<SectionSurface, string> = {
  canvas: 'bg-bg-canvas',
  surface: 'bg-bg-surface',
  muted: 'bg-bg-surface-muted',
  inverse: 'bg-bg-inverse text-fg-on-inverse',
};

const densities: Record<SectionDensity, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { surface = 'canvas', density = 'md', className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(surfaces[surface], densities[density], className)}
      {...props}
    />
  );
});
