import type { ReactNode } from 'react';

export interface CapabilityBlockProps {
  /** 28px line glyph (teal). Pass any icon node — the wrapper sets the size. */
  icon: ReactNode;
  /** Block heading. Plus Jakarta 22/500. */
  title: string;
  /** Supporting copy, Geist 14.5 secondary. */
  description: string;
  /** Optional bullets — each rendered with a mono-caps eyebrow + body line. */
  bullets?: string[];
  /** Optional inline visual (diagram, mini-chart). Right-aligned on desktop. */
  visual?: ReactNode;
  /** Render the block on a card surface (single 24px radius) instead of bare. */
  surface?: boolean;
  /** When unset, the block renders as a borderless `section`. Override here. */
  as?: 'section' | 'article' | 'div';
}

/**
 * Capability block for Solutions sub-pages (§6.2 — "4–6 capability blocks
 * with real depth"). Editorial restraint: a 28px teal glyph sits above a
 * hairline rule (no nested icon tile), title in display, body in Geist,
 * optional bullets and optional inline diagram slot.
 *
 * Used as a 2-up grid on desktop (parent owns the grid).
 *
 * Single 24px radius if `surface` is true — never nests another radius
 * inside. Default render is borderless to preserve the editorial floor of
 * the page.
 */
export function CapabilityBlock({
  icon,
  title,
  description,
  bullets,
  visual,
  surface = false,
  as = 'section',
}: CapabilityBlockProps) {
  const Tag = as;
  const surfaceClasses = surface
    ? 'rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-7 md:p-8 shadow-e1'
    : '';

  return (
    <Tag
      data-reveal-card
      className={`group/cap relative flex flex-col h-full ${surfaceClasses}`}
    >
      {/* Icon row — 28px teal glyph above a hairline. No nested chip. Icon
          gets a tiny rotate + scale on parent group-hover (motion-safe). */}
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center h-7 w-7 text-accent shrink-0
                     [&>svg]:h-7 [&>svg]:w-7
                     transition-transform duration-[280ms] ease-expressive
                     motion-safe:group-hover/cap:rotate-1 motion-safe:group-hover/cap:scale-105"
        >
          {icon}
        </span>
        <span
          aria-hidden="true"
          className="mt-3.5 flex-1 h-px bg-[color:var(--border-subtle)]"
        />
      </div>

      {/* Title + body live in a flex row so the optional visual can pin
          right. On mobile the visual stacks below. */}
      <div className="mt-6 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-medium text-[1.375rem] leading-[1.25] tracking-[-0.01em] text-fg-primary text-balance">
            {title}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.6] text-fg-secondary text-pretty">
            {description}
          </p>

          {bullets && bullets.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3">
              {bullets.map((item, i) => (
                <li key={`${i}-${item.slice(0, 24)}`} className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent shrink-0 w-6"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body-sm text-fg-primary text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {visual ? (
          <div className="md:w-[14rem] md:shrink-0 md:pl-2">{visual}</div>
        ) : null}
      </div>
    </Tag>
  );
}

export default CapabilityBlock;
