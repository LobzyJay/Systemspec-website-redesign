'use client';

import { useEffect, useRef } from 'react';

export interface TimelineItem {
  /** Year token — e.g. "1992", "2003", "Today". */
  year: string;
  /** Milestone title. Display font. */
  title: string;
  /** Optional supporting description. */
  description?: string;
  /** Optional mono-caps tag (e.g. "TSA", "Restructure"). */
  tag?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Editorial vertical timeline for the About page (§6.5). Year in serif
 * italic, title in display, optional description in body. A single hairline
 * rail runs through the full column with a small accent dot at every
 * milestone.
 *
 * On mobile the year stacks above the title (single column). On desktop
 * year → rail → content sit on the same row.
 *
 * Stagger reveal: each row fades up the first time it intersects the
 * viewport. Respects prefers-reduced-motion.
 */
export function Timeline({ items }: TimelineProps) {
  const rootRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-timeline-row]'));

    if (reduce) {
      rows.forEach((el) => el.setAttribute('data-revealed', 'true'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const i = Number(el.dataset.idx ?? '0');
            // Stagger via inline transition-delay so we don't need a
            // keyframe per row.
            el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
            el.setAttribute('data-revealed', 'true');
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );

    rows.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <ol ref={rootRef} className="relative flex flex-col">
      {items.map((item, i) => (
        <li
          key={`${item.year}-${i}`}
          data-timeline-row
          data-idx={i}
          data-revealed="false"
          className="
            grid grid-cols-1 md:grid-cols-[7.5rem_1fr] md:gap-10
            border-t border-[color:var(--border-subtle)]
            py-7 md:py-9 first:border-t-0 first:pt-0 last:pb-0
            opacity-0 translate-y-3 [&[data-revealed='true']]:opacity-100 [&[data-revealed='true']]:translate-y-0
            transition-[opacity,transform] duration-slow ease-expressive
            motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0
          "
        >
          {/* Year — serif italic. On mobile sits above title; on desktop
              forms the left column. */}
          <div className="flex items-baseline md:items-start gap-3 md:gap-0">
            <span
              aria-hidden="true"
              className="hidden md:inline-block mt-3 mr-3 h-1.5 w-1.5 rounded-pill bg-accent shrink-0"
            />
            <p className="font-serif italic text-[1.5rem] md:text-[1.625rem] leading-[1.1] text-fg-primary tracking-tight tabular-nums">
              {item.year}
            </p>
          </div>

          <div className="mt-2 md:mt-0">
            {item.tag ? (
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent mb-2">
                {item.tag}
              </p>
            ) : null}
            <h3 className="font-display font-medium text-heading-2 md:text-heading-1 text-fg-primary leading-[1.2] tracking-[-0.005em] text-balance">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2.5 text-body text-fg-secondary text-pretty max-w-prose">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
