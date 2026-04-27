import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leadingIcon?: ReactNode;
  // Trailing icon. When present, it auto-renders inside a circular
  // button-in-button wrapper that translates diagonally on hover (skill §4B).
  // Pass any size-agnostic node — the wrapper sets the inner size.
  trailingIcon?: ReactNode;
}

// Pill geometry + spring transitions — replaces the previous rounded-md
// rectangle. Pills + button-in-button trailing icons are the skill's
// signature CTA architecture.
const base =
  'group/btn relative inline-flex items-center font-medium rounded-pill ' +
  'transition-[transform,background-color,border-color,color,box-shadow] ' +
  'duration-base ease-expressive ' +
  'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas ' +
  'active:scale-[0.98]';

const variants: Record<ButtonVariant, string> = {
  // Primary — deep teal with diffuse warm shadow. Hover deepens shade and
  // lifts elevation slightly (no harsh translate; the inner arrow does the
  // motion theatre).
  primary:
    '!text-white bg-accent shadow-e1 hover:bg-accent-default-hover hover:shadow-e2',
  // Secondary — paper-toned with hairline. Hover swaps to teal hairline +
  // teal text; no fill change so it reads as restraint.
  secondary:
    'bg-bg-surface text-fg-primary border border-border hover:border-accent hover:text-accent',
  // Ghost — naked until hover; picks up subtle accent tint.
  ghost:
    'bg-transparent text-fg-primary hover:bg-accent-subtle hover:text-accent',
  // Inverse — espresso ink for dark sections. Hover warms toward accent.
  inverse:
    'bg-bg-inverse text-fg-on-inverse border border-white/10 hover:border-white/30 hover:bg-[color-mix(in_srgb,var(--bg-inverse)_85%,var(--accent-default)_15%)]',
};

// Outer button geometry. Padding-right tightens to flush the inner arrow chip.
const sizes: Record<ButtonSize, string> = {
  sm: 'h-9  pl-4 pr-4 text-body-sm gap-2',
  md: 'h-11 pl-5 pr-5 text-body    gap-2.5',
  lg: 'h-13 pl-6 pr-6 text-body    gap-3',
};
const trailingPad: Record<ButtonSize, string> = {
  sm: 'pr-1',  // chip is 7×7, so right padding = 4px (1)
  md: 'pr-1.5',
  lg: 'pr-2',
};
const chipSize: Record<ButtonSize, string> = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
};

// Variant-specific chip tones — keeps the inner circle visible against each
// background.
const chipTone: Record<ButtonVariant, string> = {
  primary:   'bg-white/15 text-white',
  secondary: 'bg-accent-subtle text-accent',
  ghost:     'bg-accent-subtle text-accent',
  inverse:   'bg-white/10 text-fg-on-inverse',
};

// When asChild is true, Slot merges Button's props onto the consumer's
// single child element — so the consumer owns the children layout. Icon
// composition only applies in the regular (button-tag) form.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', asChild, className, children, leadingIcon, trailingIcon, ...props },
  ref,
) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    trailingIcon ? trailingPad[size] : '',
    className,
  );

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {leadingIcon ? <span className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex items-center justify-center shrink-0 rounded-pill',
            'transition-[transform,background-color] duration-base ease-expressive',
            'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px group-hover/btn:scale-[1.06]',
            chipSize[size],
            chipTone[variant],
          )}
        >
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
});
