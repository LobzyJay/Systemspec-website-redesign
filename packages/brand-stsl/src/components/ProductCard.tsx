import { ArrowUpRight } from '../icons';
import { asset } from '../utils/asset';

interface ProductCardProps {
  name: string;
  positioning: string;
  proof: string;
  href: string;
  tag?: string;
  // Brand-owned hex color. Drives the brand panel + CTA accent.
  brandColor?: string;
  // Product logo. Sits centered on the brand panel.
  logo?: string;
}

// Doppelrand product card — same outer vocabulary as SolutionCard +
// InsightCard so all three cards read as one family in a row. Inner core has
// two zones: a tinted brand panel with the logo on top, paper panel with
// info + CTA below. CTA is pinned to the bottom (mt-auto) so all 3 cards in
// a row have their button on the same horizontal line.
export function ProductCard({
  name,
  positioning,
  proof,
  href,
  tag,
  brandColor,
  logo,
}: ProductCardProps) {
  const panelTint = brandColor
    ? `color-mix(in srgb, ${brandColor} 10%, var(--bg-surface-raised))`
    : 'var(--bg-surface-raised)';

  return (
    <a
      href={href}
      className="group/prod block h-full rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                 bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                 shadow-e1 transition-[transform,box-shadow] duration-slow ease-expressive
                 hover:-translate-y-0.5 hover:shadow-e3"
    >
      <div className="relative flex flex-col h-full rounded-[calc(1.75rem-0.375rem)] overflow-hidden bg-bg-surface shadow-inner-hi">
        {/* Brand panel — tinted ground, logo centered. */}
        <div
          className="relative aspect-[5/2] grid place-items-center px-8"
          style={{ backgroundColor: panelTint }}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset(logo)} alt={name} className="max-h-9 w-auto max-w-[55%] object-contain" />
          ) : (
            <span className="font-display text-display-md text-fg-muted/40">{name[0]}</span>
          )}
          {brandColor ? (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ backgroundColor: brandColor, opacity: 0.5 }}
            />
          ) : null}
        </div>

        {/* Paper panel — info + CTA. flex-col + mt-auto on CTA pins button
            row to bottom; padding kept identical to SolutionCard / InsightCard. */}
        <div className="flex flex-col flex-1 p-7 md:p-8">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display font-medium text-heading-1 text-fg-primary leading-tight tracking-[-0.005em]">
              {name}
            </h3>
            {tag ? (
              <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.16em] text-fg-muted">
                {tag}
              </span>
            ) : null}
          </div>

          <p className="mt-3 text-body text-fg-secondary text-pretty">{positioning}</p>

          <div className="mt-7 pt-5 border-t border-[color:var(--border-subtle)]">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">Proof</p>
            <p className="mt-2 text-body-sm text-fg-primary font-medium">{proof}</p>
          </div>

          {/* CTA pinned to bottom — same vocabulary as SolutionCard. Pill
              h-12 / chip h-9 / pr-1.5 → chip stays inside the rim on hover. */}
          <div className="mt-auto pt-7">
            <span
              className="inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-pill ring-1 text-body-sm font-medium transition-[background-color,box-shadow] duration-base ease-expressive"
              style={
                brandColor
                  ? { color: brandColor, boxShadow: `inset 0 0 0 1px ${brandColor}33` }
                  : undefined
              }
            >
              <span className="leading-none">Visit {name}</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center h-9 w-9 rounded-pill transition-[transform] duration-base ease-expressive group-hover/prod:translate-x-0.5"
                style={
                  brandColor
                    ? { backgroundColor: `${brandColor}1f`, color: brandColor }
                    : { backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-default)' }
                }
              >
                <ArrowUpRight size={14} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
