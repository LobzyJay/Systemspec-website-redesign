'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const Checkbox = forwardRef<HTMLButtonElement, RadixCheckbox.CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <RadixCheckbox.Root
        ref={ref}
        className={cn(
          'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm',
          'border border-border bg-bg-surface',
          'transition-colors duration-fast ease-standard',
          'data-[state=checked]:bg-accent data-[state=checked]:border-accent',
          'data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-fg-on-accent">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m3 8 3.5 3.5L13 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  },
);
