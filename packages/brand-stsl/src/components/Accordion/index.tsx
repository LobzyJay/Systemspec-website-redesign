'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { type ReactNode } from 'react';

export interface AccordionEntry {
  question: string;
  answer: string | ReactNode;
}

export interface AccordionProps {
  items: AccordionEntry[];
  /** Single = one panel open at a time (default). Multiple = many. */
  type?: 'single' | 'multiple';
  /** Default-open entry index — only honoured for type="single". */
  defaultOpen?: number;
}

/**
 * Brand FAQ accordion for Solutions sub-pages (§6.2 — procurement,
 * integration, support). Wraps Radix Accordion (already a foundations
 * dependency) so we get keyboard nav, aria wiring, and proper roving focus
 * for free.
 *
 * Voice notes:
 *  - hairline rule between items, no card chrome
 *  - plus/minus icon swap (not a chevron) — the icon rotates 90deg on open
 *    so it reads as a single mark transforming, not two glyphs flickering
 *  - smooth height transition uses Radix's CSS variables (--radix-accordion-
 *    content-height) on a CSS grid `1fr` track for a layout-shift-free open
 *
 * Hard rule: single 24px radius is not applied because this is a borderless
 * editorial list, not a card surface.
 */
export function Accordion({ items, type = 'single', defaultOpen }: AccordionProps) {
  const rootProps =
    type === 'multiple'
      ? ({ type: 'multiple' as const } satisfies RadixAccordion.AccordionMultipleProps)
      : ({
          type: 'single' as const,
          collapsible: true,
          defaultValue:
            defaultOpen != null && defaultOpen >= 0 && defaultOpen < items.length
              ? `item-${defaultOpen}`
              : undefined,
        } satisfies RadixAccordion.AccordionSingleProps);

  return (
    <RadixAccordion.Root {...rootProps} className="flex flex-col">
      {items.map((item, i) => (
        <RadixAccordion.Item
          key={`${i}-${item.question.slice(0, 24)}`}
          value={`item-${i}`}
          className="border-b border-[color:var(--border-subtle)] first:border-t first:border-[color:var(--border-subtle)]"
        >
          <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
              className="
                group/qa flex flex-1 items-center justify-between gap-6 py-5 md:py-6 text-left
                font-display font-medium text-heading-3 md:text-heading-2 text-fg-primary
                tracking-[-0.005em] leading-[1.3]
                transition-colors duration-base ease-expressive
                hover:text-accent
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas focus-visible:rounded-sm
              "
            >
              {/* 1px right-slide on hover — only when the row is closed.
                  Tiny physical cue that this is interactive. Respects
                  prefers-reduced-motion via motion-safe variant. */}
              <span
                className="
                  text-pretty
                  motion-safe:transition-transform motion-safe:duration-[180ms] motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]
                  motion-safe:group-data-[state=closed]/qa:group-hover/qa:translate-x-[1px]
                "
              >
                {item.question}
              </span>
              <PlusMinus />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            className="
              overflow-hidden text-body text-fg-secondary
              data-[state=open]:animate-[acc-open_280ms_cubic-bezier(0.32,0.72,0,1)]
              data-[state=closed]:animate-[acc-close_220ms_cubic-bezier(0.32,0.72,0,1)]
            "
          >
            <div className="pb-6 md:pb-7 pr-12 max-w-prose text-pretty">
              {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
            </div>
            {/* Inline keyframes — keeps the component self-contained and
                avoids relying on the apps's tailwind config registering
                accordion animations. Scoped to a unique name so it can't
                collide with site-wide animations. */}
            <style>{`
              @keyframes acc-open  { from { height: 0 } to { height: var(--radix-accordion-content-height) } }
              @keyframes acc-close { from { height: var(--radix-accordion-content-height) } to { height: 0 } }
              @media (prefers-reduced-motion: reduce) {
                @keyframes acc-open  { from { height: var(--radix-accordion-content-height) } to { height: var(--radix-accordion-content-height) } }
                @keyframes acc-close { from { height: 0 } to { height: 0 } }
              }
            `}</style>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}

export default Accordion;

/**
 * Plus/minus mark. Two strokes — horizontal always present, vertical fades
 * + rotates 90deg out when the parent trigger is in the open state. Keeps
 * the icon area to a single 24px box; sits inside a hairline pill for
 * affordance.
 */
function PlusMinus() {
  return (
    <span
      aria-hidden="true"
      className="
        inline-flex items-center justify-center h-9 w-9 shrink-0 rounded-pill
        bg-bg-surface ring-1 ring-[color:var(--border-default)] text-fg-muted
        transition-[color,background-color,border-color] duration-base ease-expressive
        group-hover/qa:text-accent group-hover/qa:ring-accent
      "
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        {/* horizontal — always visible */}
        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* vertical — rotates + fades when [data-state=open] on ancestor */}
        <path
          d="M8 3v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="
            origin-center transition-[transform,opacity] duration-base ease-expressive
            group-data-[state=open]/qa:rotate-90 group-data-[state=open]/qa:opacity-0
          "
        />
      </svg>
    </span>
  );
}
