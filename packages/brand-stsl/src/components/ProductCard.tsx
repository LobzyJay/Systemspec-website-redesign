import { ProductCardWave } from './ProductCard/ProductCardWave';
import { asset } from '../utils/asset';

interface ProductCardProps {
  name: string;         // e.g. "Pouchii"
  positioning: string;  // description text
  proof: string;        // proof statement
  href: string;
  tag?: string;         // optional badge e.g. "Best Crowdfunding Platform 2022"
  logoColor: string;    // path to color PNG, e.g. '/products/pouchii-color.png'
  logoBw: string;       // path to B/W PNG, e.g. '/products/pouchii-bw.png'
}

export function ProductCard({
  name,
  positioning,
  proof,
  href,
  tag,
  logoColor,
  logoBw,
}: ProductCardProps) {
  return (
    <a
      href={href}
      data-reveal-card
      className="group/prod relative flex flex-col h-full rounded-3xl overflow-hidden
                 ring-1 ring-[color:var(--border-subtle)] shadow-e1 origin-center
                 transition-[transform,box-shadow,ring-color] duration-150 ease-out
                 hover:scale-[1.05] hover:shadow-e3 hover:ring-[color:var(--border-default)] hover:z-10
                 motion-safe:active:scale-[0.98] motion-safe:active:duration-100 active:shadow-e2"
    >
      {/* ── Top section: recessed muted surface so the logo frame reads
          as a distinct zone from the white content below. Using
          bg-bg-surface-muted gives a slightly deeper off-white that
          makes the card feel structured without needing a hard border. ── */}
      <div
        className="relative overflow-hidden bg-bg-surface-muted h-40 md:h-[200px]"
      >
        {/* Canvas wave — absolutely positioned behind logo */}
        <ProductCardWave />

        {/* Four-edge fades — all sides dissolve into the muted surface so the
            braille field reads as floating in the frame rather than tiled.
            Top + bottom are slightly deeper; left + right are slimmer so
            the logos stay centered with breathing room. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-14 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-10 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-10 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />

        {/* B/W logo — fades out on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(logoBw)}
            alt={name}
            className="max-h-[69px] w-auto max-w-[68%] object-contain
                       transition-opacity duration-[320ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]
                       opacity-100
                       group-hover/prod:opacity-0
                       group-data-[focused=true]/card:opacity-0
                       absolute"
          />
          {/* Color logo — fades in on hover (desktop) OR when the parent
              <li data-focused="true"> is the centered card in the mobile
              snap-scroll carousel. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(logoColor)}
            alt=""
            aria-hidden="true"
            className="max-h-[69px] w-auto max-w-[68%] object-contain
                       transition-opacity duration-[320ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]
                       opacity-0
                       group-hover/prod:opacity-100
                       group-data-[focused=true]/card:opacity-100
                       absolute"
          />
        </div>
      </div>


      {/* ── Content section: white bg ── */}
      <div className="flex flex-col flex-1 bg-white px-6 pb-6 pt-2 md:px-8 md:pb-8">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="font-display font-medium leading-tight tracking-[-0.005em] text-fg-primary"
            style={{ fontSize: '22px' }}
          >
            {name}
          </h3>
          {tag ? (
            <span className="shrink-0 font-mono uppercase tracking-[0.16em] text-fg-muted"
              style={{ fontSize: '9.5px' }}>
              {tag}
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-fg-secondary text-pretty" style={{ fontSize: '14px' }}>
          {positioning}
        </p>

        <div className="mt-6">
          <p
            className="font-mono uppercase tracking-[0.22em] text-fg-muted"
            style={{ fontSize: '9.5px' }}
          >
            PROOF
          </p>
          <p className="mt-1.5 text-body-sm text-fg-primary">{proof}</p>
        </div>

        {/* CTA — text link with arrow, pinned to bottom via mt-auto */}
        <div className="mt-auto pt-6">
          <span className="text-accent text-body-sm font-medium inline-flex items-center gap-1">
            Visit {name} →
          </span>
        </div>
      </div>
    </a>
  );
}
