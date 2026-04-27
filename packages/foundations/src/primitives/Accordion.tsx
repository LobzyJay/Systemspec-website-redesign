'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const Accordion = RadixAccordion.Root;

export const AccordionItem = forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionItemProps
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn('border-b border-[color:var(--border-subtle)] last:border-b-0', className)}
      {...props}
    />
  );
});

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  RadixAccordion.AccordionTriggerProps
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(
          'group/acc flex flex-1 items-center justify-between gap-6 py-5 text-left font-display text-heading-3 font-medium text-fg-primary tracking-tight',
          'transition-colors duration-base ease-expressive hover:text-accent',
          '[&[data-state=open]>span>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center h-8 w-8 rounded-pill bg-bg-surface-raised ring-1 ring-[color:var(--border-subtle)] text-fg-muted shrink-0 transition-[transform,background-color,color] duration-base ease-expressive group-hover/acc:bg-accent-subtle group-hover/acc:text-accent"
        >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-base ease-expressive"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </span>
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});

export const AccordionContent = forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionContentProps
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-body text-fg-secondary',
        'data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close',
        className,
      )}
      {...props}
    >
      <div className="pb-6 pr-12 text-pretty">{children}</div>
    </RadixAccordion.Content>
  );
});
