'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const Tabs = RadixTabs.Root;

// Segmented-pill TabList — replaces the underline strip. Reads as a control,
// not a navigation bar. Active tab gets a paper chip with a soft ambient bloom;
// inactive tabs sit naked on the warm rail.
export const TabList = forwardRef<
  HTMLDivElement,
  RadixTabs.TabsListProps
>(function TabList({ className, ...props }, ref) {
  return (
    <RadixTabs.List
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-pill',
        'bg-bg-surface-raised ring-1 ring-[color:var(--border-subtle)]',
        className,
      )}
      {...props}
    />
  );
});

export const Tab = forwardRef<
  HTMLButtonElement,
  RadixTabs.TabsTriggerProps
>(function Tab({ className, ...props }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        'relative h-9 px-4 rounded-pill text-body-sm font-medium text-fg-muted',
        'transition-[color,background-color,box-shadow] duration-base ease-expressive',
        'hover:text-fg-primary',
        'data-[state=active]:text-fg-primary data-[state=active]:bg-bg-surface ' +
          'data-[state=active]:shadow-e1 data-[state=active]:ring-1 data-[state=active]:ring-[color:var(--border-subtle)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        className,
      )}
      {...props}
    />
  );
});

export const TabPanel = forwardRef<
  HTMLDivElement,
  RadixTabs.TabsContentProps
>(function TabPanel({ className, ...props }, ref) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn('pt-8 focus-visible:outline-none', className)}
      {...props}
    />
  );
});
