'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export const DialogContent = forwardRef<
  HTMLDivElement,
  RadixDialog.DialogContentProps & { title: string; description?: string; children: ReactNode }
>(function DialogContent({ className, title, description, children, ...props }, ref) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-lg max-h-[90vh] overflow-y-auto',
          'bg-bg-surface rounded-xl shadow-e4 p-8',
          'focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        <RadixDialog.Title className="text-heading-2 font-semibold text-fg-primary">
          {title}
        </RadixDialog.Title>
        {description ? (
          <RadixDialog.Description className="mt-2 text-body text-fg-secondary">
            {description}
          </RadixDialog.Description>
        ) : null}
        <div className="mt-6">{children}</div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
