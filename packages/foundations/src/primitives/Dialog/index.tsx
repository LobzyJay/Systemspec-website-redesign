'use client';

// Dialog — modal primitive.
//
// API contract (parallel agents build against this — DO NOT change prop names):
//
//   <Dialog
//     open={boolean}
//     onOpenChange={(open: boolean) => void}
//     title?: string
//     description?: string
//     size?: 'sm' | 'md' | 'lg'   // 480 / 560 / 720 px
//   >
//     {children}
//   </Dialog>
//
// Wraps Radix Dialog (already in foundations deps). Radix gives us focus
// trap, scroll lock, ESC handling, ARIA wiring and portal mounting for free.
// We add:
//   • Single 24px radius (no nested radii — Doppelrand bug guard)
//   • 28px circular ghost close button, top-right
//   • Backdrop rgba(11,12,15,.42)
//   • Open: scale 0.96 → 1.0 + opacity, 220ms cubic-bezier(0.32,0.72,0,1)
//     — matches the `.kit-sheet` motion in the prototype kit
//   • Sizes — sm 480px / md 560px / lg 720px (clamped to 92vw)
//   • prefers-reduced-motion → 100ms linear
//
// Title/description, when provided, render via Radix's Title/Description so
// the modal is screen-reader-correct. When omitted, we attach VisuallyHidden
// fallbacks so Radix doesn't warn — and so consumers can supply their own
// heading inside `children` when they want bespoke layouts.

import * as RadixDialog from '@radix-ui/react-dialog';
import {
  forwardRef,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { cn } from '../../utils/cn';

type DialogSize = 'sm' | 'md' | 'lg';

const SIZE_PX: Record<DialogSize, number> = {
  sm: 480,
  md: 560,
  lg: 720,
};

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: DialogSize;
  children?: ReactNode;
  /** Optional class for the content panel — for callers that need to widen
   *  padding or override the surface tone. Radius and motion stay locked. */
  className?: string;
}

// Visually hidden helper — used when callers omit `title` or `description`,
// so Radix's a11y linting stays happy without making the surface louder.
const VISUALLY_HIDDEN: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onOpenChange, title, description, size = 'md', children, className },
  ref,
) {
  const widthPx = SIZE_PX[size];

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        {/* Backdrop. Solid ink at 42% — matches the kit prototype. Animation
            keys off Radix's data-state so close gets a real transition out,
            not a snap. */}
        <RadixDialog.Overlay
          className={cn(
            'fixed inset-0 z-[100]',
            'data-[state=open]:animate-stsl-dialog-overlay-in',
            'data-[state=closed]:animate-stsl-dialog-overlay-out',
            'motion-reduce:data-[state=open]:animate-stsl-dialog-overlay-in-reduced',
            'motion-reduce:data-[state=closed]:animate-stsl-dialog-overlay-out-reduced',
          )}
          style={{ background: 'rgba(11,12,15,.42)' }}
        />

        <RadixDialog.Content
          ref={ref}
          aria-describedby={description ? undefined : undefined}
          className={cn(
            'fixed left-1/2 top-1/2 z-[101]',
            '-translate-x-1/2 -translate-y-1/2',
            'bg-bg-surface text-fg-primary',
            'shadow-e4',
            'p-9 max-h-[90vh] overflow-y-auto',
            'focus-visible:outline-none',
            'data-[state=open]:animate-stsl-dialog-content-in',
            'data-[state=closed]:animate-stsl-dialog-content-out',
            'motion-reduce:data-[state=open]:animate-stsl-dialog-content-in-reduced',
            'motion-reduce:data-[state=closed]:animate-stsl-dialog-content-out-reduced',
            className,
          )}
          style={{
            width: `min(${widthPx}px, 92vw)`,
            // Single radius — no nested radii. Doppelrand bug guard.
            borderRadius: 24,
            transformOrigin: 'center center',
          }}
        >
          {title ? (
            <RadixDialog.Title className="font-display text-heading-2 font-medium tracking-[-0.015em] text-fg-primary">
              {title}
            </RadixDialog.Title>
          ) : (
            <RadixDialog.Title style={VISUALLY_HIDDEN}>Dialog</RadixDialog.Title>
          )}

          {description ? (
            <RadixDialog.Description className="mt-2 text-body-sm text-fg-secondary">
              {description}
            </RadixDialog.Description>
          ) : (
            <RadixDialog.Description style={VISUALLY_HIDDEN} />
          )}

          {/* Close — 28px circular ghost button, top-right. Inline glyph (not
              the brand-stsl Icon set, since foundations must not depend on
              the brand layer). Stroke-1.25 round-cap matches the brand voice. */}
          <RadixDialog.Close
            aria-label="Close dialog"
            className={cn(
              'absolute top-4 right-4',
              'inline-flex items-center justify-center',
              'h-7 w-7 rounded-full',
              'text-fg-secondary',
              'hover:bg-bg-surface-raised hover:text-fg-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface',
              'transition-colors duration-fast ease-expressive',
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6.5 6.5 11 11" />
              <path d="m17.5 6.5-11 11" />
            </svg>
          </RadixDialog.Close>

          {(title || description) && children ? (
            <div className="mt-6">{children}</div>
          ) : (
            children
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});
