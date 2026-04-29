import type { CSSProperties } from 'react';
import { Container, Grid } from '@systemspecs/foundations/layout';
import { ArrowUpRight } from '../icons';

interface CTASegment {
  audience: string;
  outcome: string;
  href: string;
  cta: string;
}

interface SegmentedCTAProps {
  headline: string;
  segments: CTASegment[];
}

// Replaces the brief's §3.4 problem — one CTA path for everyone. Routes
// banker / federal CIO / fintech lead / partner to the right pod.
//
// Surface = pale green wash, derived from the brand accent teal at low
// alpha mixed into the canvas cream. Light enough that the cards keep
// their warm white surface and read as Doppelrand siblings of the
// SolutionCard / ProductCard family; tinted enough that this section
// breaks the page rhythm and the dark Footer squircle below it has a
// colored counterpart instead of stacking against another white block.
export function SegmentedCTA({ headline, segments }: SegmentedCTAProps) {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        // Pale green wash. Top: ~12% accent into canvas (mint cream).
        // Bottom: ~18% accent into canvas (slightly deeper). Stays light
        // enough for fg-primary text to read at full contrast.
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
      }}
    >
      <Container size="wide">
        <Grid cols={12} gap={8} mdGap={12} className="items-end">
          <div className="col-span-12 lg:col-span-7" data-reveal>
            <span className="inline-flex items-center h-6 px-3 rounded-pill bg-white/70 text-accent text-[10px] uppercase tracking-[0.22em] font-mono font-medium ring-1 ring-[color:var(--accent-default)]/20 mb-6">
              <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-accent" />
              Pathways
            </span>
            <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
              {headline}
            </h2>
          </div>
        </Grid>

        <Grid cols={12} gap={4} className="mt-10 md:mt-14">
          {segments.map((s, i) => (
            <a
              key={s.href}
              href={s.href}
              data-reveal-card
              style={{ '--stagger': Math.min(i, 5) } as CSSProperties}
              className="col-span-12 md:col-span-6 lg:col-span-4 group/seg block rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                         bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                         shadow-e1 transition-[transform,box-shadow] duration-slow ease-expressive
                         hover:-translate-y-0.5 hover:shadow-e3"
            >
              <div className="relative flex flex-col h-full p-7 md:p-8 rounded-[calc(1.75rem-0.375rem)] bg-bg-surface shadow-inner-hi">
                <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent">{s.audience}</p>
                <p className="mt-5 font-display font-medium text-heading-1 text-fg-primary text-balance tracking-tight">
                  {s.outcome}
                </p>
                {/* CTA pinned to bottom so every card's button row shares
                    a horizontal baseline regardless of outcome length. */}
                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1 rounded-pill ring-1 ring-[color:var(--border-default)] text-body-sm font-medium text-fg-primary transition-[background-color,border-color,color] duration-base ease-expressive group-hover/seg:ring-accent group-hover/seg:text-accent">
                    <span className="leading-none">{s.cta}</span>
                    <span aria-hidden="true" className="inline-flex items-center justify-center h-9 w-9 rounded-pill bg-accent-subtle text-accent transition-[transform,background-color,color] duration-base ease-expressive group-hover/seg:translate-x-0.5 group-hover/seg:-translate-y-px group-hover/seg:scale-[1.06] group-hover/seg:bg-accent group-hover/seg:!text-white">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
