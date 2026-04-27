import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type CardSurface = 'flat' | 'raised' | 'outline';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  interactive?: boolean;
}

/*
 * Doppelrand Card. Outer shell hosts a hairline ring + a soft warm bloom; the
 * inner core (rendered via the ::before-of-children pattern would lose the
 * children slot, so we wrap explicitly) carries the actual content with a
 * concentric inner radius and an inset highlight that simulates the seam
 * between two physical panels. Mathematics:
 *   outer radius = 1.75rem (rounded-3xl)
 *   shell padding = 0.375rem (p-1.5)
 *   inner radius = calc(1.75rem - 0.375rem) = 1.375rem
 *
 * Each surface variant maps to a different shell↔core combination so the
 * card vocabulary covers flat-on-tinted, raised-on-canvas, and outline-on-
 * canvas scenarios without losing the nested architecture.
 */

const shellSurfaces: Record<CardSurface, string> = {
  // Outline: warm hairline ring on a near-paper bloom. The default.
  outline:
    'bg-[color-mix(in_srgb,var(--bg-canvas)_60%,var(--bg-surface-muted)_40%)] ' +
    'ring-1 ring-[color:var(--border-subtle)] shadow-e1',
  // Raised: lifted with a softer ring + larger bloom — for above-the-fold cards.
  raised:
    'bg-[color-mix(in_srgb,var(--bg-canvas)_70%,var(--bg-surface-muted)_30%)] ' +
    'ring-1 ring-[color:var(--border-subtle)] shadow-e2',
  // Flat: chrome stripped, lives inside already-tinted sections (e.g. the
  // forest GroupBlock). Still nested so the vocabulary stays consistent.
  flat:
    'bg-bg-surface-raised ring-1 ring-[color:var(--border-subtle)]',
};

const coreSurfaces: Record<CardSurface, string> = {
  outline: 'bg-bg-surface shadow-inner-hi dark:shadow-inner-hi-dark',
  raised:  'bg-bg-surface shadow-inner-hi dark:shadow-inner-hi-dark',
  flat:    'bg-bg-surface',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { surface = 'outline', interactive, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        // Outer shell: large outer radius, small padding, hairline ring,
        // diffuse warm bloom.
        'group/card rounded-3xl p-1.5 transition-[transform,box-shadow] duration-slow ease-expressive',
        shellSurfaces[surface],
        interactive &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-e3',
        className,
      )}
      {...props}
    >
      {/* Inner core. Concentric radius via calc() so curves stay parallel. */}
      <div
        className={cn(
          'rounded-[calc(1.75rem-0.375rem)] p-7',
          coreSurfaces[surface],
        )}
      >
        {children}
      </div>
    </div>
  );
});

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-5', className)} {...props} />;
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-heading-3 font-display font-medium text-fg-primary tracking-tight', className)}
      {...props}
    />
  );
}
export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-body text-fg-secondary text-pretty', className)} {...props} />;
}
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6', className)} {...props} />;
}
