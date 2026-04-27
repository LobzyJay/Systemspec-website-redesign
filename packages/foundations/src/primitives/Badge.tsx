import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  // When `dot` is true, a leading colored dot precedes the label. Used as a
  // status pill; without `dot` the badge reads as a tag/category chip.
  dot?: boolean;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-bg-surface-raised text-fg-secondary ring-1 ring-[color:var(--border-subtle)]',
  accent:  'bg-accent-subtle text-accent ring-1 ring-[color:var(--accent-default)]/20',
  success: 'bg-feedback-success-subtle text-feedback-success ring-1 ring-feedback-success/20',
  warning: 'bg-feedback-warning-subtle text-feedback-warning ring-1 ring-feedback-warning/20',
  danger:  'bg-feedback-danger-subtle text-feedback-danger ring-1 ring-feedback-danger/20',
  info:    'bg-feedback-info-subtle text-feedback-info ring-1 ring-feedback-info/20',
};

const dotTones: Record<BadgeTone, string> = {
  neutral: 'bg-fg-muted',
  accent:  'bg-accent',
  success: 'bg-feedback-success',
  warning: 'bg-feedback-warning',
  danger:  'bg-feedback-danger',
  info:    'bg-feedback-info',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', dot, className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 h-7 ' +
          'text-[11px] uppercase tracking-[0.14em] font-mono font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot ? (
        <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 rounded-pill', dotTones[tone])} />
      ) : null}
      {children}
    </span>
  );
});
