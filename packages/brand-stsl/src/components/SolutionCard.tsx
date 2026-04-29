import { ArrowUpRight } from '../icons';
import type { ReactNode } from 'react';

interface SolutionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  proof: string;
  href: string;
}

// Doppelrand solution card. Outer warm shell (paper bloom + hairline ring) +
// inner core. The icon sits in its own nested chip to echo the architecture
// at the micro-scale. CTA uses the button-in-button trailing arrow.
export function SolutionCard({ icon, title, description, proof, href }: SolutionCardProps) {
  return (
    <a
      href={href}
      data-reveal-card
      className="group/sol block rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                 bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                 shadow-e1 transition-[transform,box-shadow] duration-slow ease-expressive
                 hover:-translate-y-0.5 hover:shadow-e3"
    >
      <div className="relative flex flex-col h-full p-6 md:p-8 rounded-[calc(1.75rem-0.375rem)] bg-bg-surface shadow-inner-hi">
        {/* Icon chip — micro Doppelrand. Tiny rotate + scale on parent
            group-hover keeps the icon present without becoming theatrical. */}
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl p-1 ring-1 ring-[color:var(--border-subtle)] bg-bg-surface-raised mb-6 md:mb-7
                        transition-transform duration-[280ms] ease-expressive
                        motion-safe:group-hover/sol:rotate-1 motion-safe:group-hover/sol:scale-105">
          <div className="h-full w-full grid place-items-center rounded-[calc(1rem-0.25rem)] bg-bg-surface text-accent shadow-inner-hi">
            {icon}
          </div>
        </div>

        <h3 className="font-display text-heading-2 md:text-heading-1 font-medium text-fg-primary tracking-tight text-balance">
          {title}
        </h3>
        <p className="mt-3 text-body text-fg-secondary text-pretty flex-1">{description}</p>

        <div className="mt-7 pt-6 border-t border-[color:var(--border-subtle)]">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">Proof</p>
          <p className="mt-2 text-body-sm text-fg-primary font-medium">{proof}</p>
        </div>

        {/* CTA pinned to card bottom (mt-auto) so a row of cards lines up
            on the same horizontal baseline. Pill h-11 + chip h-9 + pr-1 →
            chip clears the right padding cleanly. */}
        <div className="mt-auto pt-7">
          {/* Pill h-12, chip h-9 → 1.5px buffer top/bottom; chip's hover
              translate stays within the pill rim. Right padding pr-1.5 and
              left padding pl-6 read as balanced (pill is "tabbed in" on the
              right where the chip sits flush). No scale on hover — translate
              alone does the kinetic work without overshooting the rim. */}
          <span className="inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-pill
                           bg-bg-surface ring-1 ring-[color:var(--border-default)]
                           text-body-sm font-medium text-fg-primary
                           transition-[background-color,border-color] duration-base ease-expressive
                           group-hover/sol:bg-accent group-hover/sol:!text-white group-hover/sol:ring-accent">
            <span className="leading-none">Explore</span>
            <span aria-hidden="true" className="inline-flex items-center justify-center h-9 w-9 rounded-pill bg-accent-subtle text-accent transition-[transform,background-color,color] duration-base ease-expressive group-hover/sol:translate-x-0.5 group-hover/sol:bg-white/15 group-hover/sol:text-white">
              <ArrowUpRight size={14} />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
