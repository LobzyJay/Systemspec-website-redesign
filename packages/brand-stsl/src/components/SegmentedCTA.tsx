import { Container, Section } from '@systemspecs/foundations/layout';
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
// banker / federal CIO / fintech lead / partner to the right pod. Each
// segment is a Doppelrand panel with a magnetic arrow chip on hover.
export function SegmentedCTA({ headline, segments }: SegmentedCTAProps) {
  return (
    <Section surface="inverse" density="lg">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center h-6 px-3 rounded-pill bg-white/10 text-fg-on-inverse text-[10px] uppercase tracking-[0.22em] font-mono font-medium ring-1 ring-white/15 mb-6">
              <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-accent" />
              Pathways
            </span>
            <h2 className="font-display font-medium text-display-lg text-fg-on-inverse text-balance leading-[1.05] tracking-[-0.02em]">
              {headline}
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group/seg block rounded-3xl p-1.5 ring-1 ring-white/10
                         bg-white/[0.03] transition-[transform,background-color] duration-slow ease-expressive
                         hover:-translate-y-0.5 hover:bg-white/[0.06]"
            >
              <div className="relative flex flex-col h-full p-7 md:p-8 rounded-[calc(1.75rem-0.375rem)] bg-bg-inverse shadow-inner-hi-dark">
                <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent">{s.audience}</p>
                <p className="mt-5 font-display font-medium text-heading-1 text-fg-on-inverse text-balance tracking-tight">
                  {s.outcome}
                </p>
                {/* CTA wrapper pinned to the bottom — every card's button
                    row sits on the same baseline regardless of outcome
                    length. The pill is sized so the chip clears its right
                    padding (chip h-9 + pr-1 = pill h-11). */}
                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-2.5 h-11 pl-5 pr-1 rounded-pill ring-1 ring-white/15 text-body-sm font-medium text-fg-on-inverse transition-[background-color] duration-base ease-expressive group-hover/seg:bg-accent group-hover/seg:ring-accent">
                    <span className="leading-none">{s.cta}</span>
                    <span aria-hidden="true" className="inline-flex items-center justify-center h-9 w-9 rounded-pill bg-white/10 text-fg-on-inverse transition-[transform,background-color] duration-base ease-expressive group-hover/seg:translate-x-0.5 group-hover/seg:-translate-y-px group-hover/seg:scale-[1.06] group-hover/seg:bg-white/20">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
