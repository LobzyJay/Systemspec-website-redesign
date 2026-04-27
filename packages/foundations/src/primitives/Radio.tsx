'use client';

import * as RadixRadio from '@radix-ui/react-radio-group';
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const RadioGroup = forwardRef<HTMLDivElement, RadixRadio.RadioGroupProps>(
  function RadioGroup({ className, ...props }, ref) {
    return (
      <RadixRadio.Root
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    );
  },
);

export const RadioItem = forwardRef<HTMLButtonElement, RadixRadio.RadioGroupItemProps>(
  function RadioItem({ className, ...props }, ref) {
    return (
      <RadixRadio.Item
        ref={ref}
        className={cn(
          'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill',
          'border border-border bg-bg-surface',
          'transition-colors duration-fast ease-standard',
          'data-[state=checked]:border-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        <RadixRadio.Indicator className="flex items-center justify-center">
          <span className="block h-2 w-2 rounded-pill bg-accent" />
        </RadixRadio.Indicator>
      </RadixRadio.Item>
    );
  },
);
