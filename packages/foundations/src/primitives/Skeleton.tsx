import { type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type SkeletonVariant = 'text' | 'heading' | 'card' | 'circle';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variants: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded-sm',
  heading: 'h-8 w-2/3 rounded-md',
  card: 'h-40 w-full rounded-lg',
  circle: 'h-10 w-10 rounded-pill',
};

export function Skeleton({ variant = 'text', className, style, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'relative overflow-hidden bg-bg-surface-raised',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-bg-surface before:to-transparent',
        'before:animate-shimmer',
        variants[variant],
        className,
      )}
      style={style}
      {...props}
    />
  );
}
