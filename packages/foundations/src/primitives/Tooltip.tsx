'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  children: ReactNode;
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ className, sideOffset = 6, children, ...props }, ref) {
    return (
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            'z-50 max-w-xs rounded-md bg-bg-inverse px-3 py-1.5',
            'text-caption text-fg-on-inverse shadow-e3',
            'data-[state=delayed-open]:animate-fade-in',
            className,
          )}
          {...props}
        >
          {children}
          <RadixTooltip.Arrow className="fill-bg-inverse" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    );
  },
);
