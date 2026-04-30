import { ArrowUpRight } from '../icons';

interface InsightCardProps {
  kind: 'press' | 'blog' | 'case-study';
  publication?: string;
  date: string;
  title: string;
  href: string;
  // Optional cover image — case studies + featured press benefit from it.
  cover?: string;
}

const kindMeta: Record<InsightCardProps['kind'], { label: string; tint: string }> = {
  press:        { label: 'Press',       tint: 'var(--feedback-info)' },
  blog:         { label: 'Insight',     tint: 'var(--accent-default)' },
  'case-study': { label: 'Case study',  tint: 'var(--feedback-success)' },
};

// Doppelrand insight card. Cover (when present) sits inside the inner core so
// the outer hairline reads as a frame around the editorial unit. CTA chip is
// a magnetic arrow that translates on parent hover.
export function InsightCard({ kind, publication, date, title, href, cover }: InsightCardProps) {
  const meta = kindMeta[kind];
  return (
    <a
      href={href}
      data-reveal-card
      className="group/ins relative block rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                 bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                 shadow-e1 origin-center
                 transition-[transform,box-shadow] duration-150 ease-out
                 hover:scale-[1.05] hover:shadow-e3 hover:z-10
                 motion-safe:active:scale-[0.98] motion-safe:active:duration-100 active:shadow-e2"
    >
      <div className="relative flex flex-col h-full rounded-[calc(1.75rem-0.375rem)] overflow-hidden bg-bg-surface shadow-inner-hi">
        {cover ? (
          <div className="aspect-[4/3] overflow-hidden bg-bg-surface-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt=""
              className="h-full w-full object-cover transition-transform duration-cinematic ease-expressive"
            />
          </div>
        ) : null}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <span
            className="inline-flex items-center self-start h-6 px-3 rounded-pill text-[10px] uppercase tracking-[0.22em] font-mono font-medium"
            style={{ color: meta.tint, boxShadow: `inset 0 0 0 1px ${meta.tint}28`, backgroundColor: `${meta.tint}10` }}
          >
            <span aria-hidden="true" className="stsl-dot-pulse mr-2 inline-block h-1 w-1 rounded-pill" style={{ backgroundColor: meta.tint }} />
            {meta.label}
          </span>

          <h3 className="mt-5 font-display font-medium text-heading-2 text-fg-primary text-balance tracking-tight flex-1">
            {title}
          </h3>

          <div className="mt-7 pt-5 border-t border-[color:var(--border-subtle)] flex items-center justify-between">
            <span className="text-caption">
              <span className="text-fg-secondary font-medium">{publication ?? 'SystemSpecs'}</span>
              <span className="text-fg-muted"> · {date}</span>
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center h-8 w-8 rounded-pill bg-bg-surface-raised text-fg-muted ring-1 ring-[color:var(--border-subtle)] transition-[transform,background-color,color] duration-base ease-expressive group-hover/ins:bg-accent group-hover/ins:text-white group-hover/ins:translate-x-0.5 group-hover/ins:-translate-y-px group-hover/ins:scale-[1.06] group-hover/ins:ring-accent"
            >
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
