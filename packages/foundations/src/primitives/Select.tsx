'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export const Select = RadixSelect.Root;
export const SelectGroup = RadixSelect.Group;
export const SelectValue = RadixSelect.Value;

interface SelectTriggerProps extends RadixSelect.SelectTriggerProps {
  children: ReactNode;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, ...props }, ref) {
    return (
      <RadixSelect.Trigger
        ref={ref}
        className={cn(
          'inline-flex w-full items-center justify-between gap-2 h-10 rounded-md',
          'border border-border bg-bg-surface px-3 text-body text-fg-primary',
          'transition-colors duration-fast ease-standard',
          'placeholder:text-fg-muted data-[placeholder]:text-fg-muted',
          'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {children}
        <RadixSelect.Icon asChild>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-fg-muted"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
    );
  },
);

interface SelectContentProps extends RadixSelect.SelectContentProps {
  children: ReactNode;
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent({ className, children, position = 'popper', sideOffset = 6, ...props }, ref) {
    return (
      <RadixSelect.Portal>
        <RadixSelect.Content
          ref={ref}
          position={position}
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
            'rounded-md border border-border bg-bg-surface shadow-e3',
            className,
          )}
          {...props}
        >
          <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    );
  },
);

interface SelectItemProps extends RadixSelect.SelectItemProps {
  children: ReactNode;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ className, children, ...props }, ref) {
    return (
      <RadixSelect.Item
        ref={ref}
        className={cn(
          'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5',
          'text-body-sm text-fg-primary outline-none select-none',
          'data-[highlighted]:bg-bg-surface-raised data-[highlighted]:text-fg-primary',
          'data-[state=checked]:text-accent',
          'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  },
);
