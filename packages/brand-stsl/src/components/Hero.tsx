import { Container, Stack } from '@systemspecs/foundations/layout';
import { ArrowUpRight } from '../icons';

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subhead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  // Slot for the visual (3D globe lives here on the live site).
  visual?: React.ReactNode;
}

// Editorial typographic hero. Headline scaled DOWN — was display-2xl at lg
// which read as marketing shouting; now display-md → display-lg, still
// commanding without dominating the page. Subhead drops from a 1.5rem serif
// statement to body-lg paragraph for legibility.
//
// Buttons render as native pills with the magnetic arrow chip — Button
// primitive's asChild path drops the chip, so hero buttons need to render
// their own to keep the chip behavior across the whole system.
export function Hero({ eyebrow, headline, subhead, primary, secondary, visual }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-bg-canvas">
      <Container size="wide" className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7" data-reveal>
            {eyebrow ? (
              <span className="inline-flex items-center h-6 px-3 rounded-pill bg-accent-subtle text-accent text-[10px] uppercase tracking-[0.22em] font-mono font-medium ring-1 ring-[color:var(--accent-default)]/15 mb-6">
                <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-accent" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance tracking-[-0.02em] leading-[1.05]">
              {headline}
            </h1>
            <p className="mt-5 text-body-lg text-fg-secondary text-pretty max-w-xl">
              {subhead}
            </p>
            <Stack direction="row" gap={3} className="mt-8" wrap>
              <HeroButton href={primary.href} label={primary.label} variant="primary" />
              {secondary ? (
                <HeroButton href={secondary.href} label={secondary.label} variant="secondary" />
              ) : null}
            </Stack>
          </div>

          {visual ? (
            // Visual frame — Doppelrand vocabulary so the hero matches the
            // card system. The visual itself owns its 1:1 aspect.
            <div className="lg:col-span-5 lg:pl-6" data-reveal>
              <div className="rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                              bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                              shadow-e2">
                <div className="aspect-square rounded-[calc(1.75rem-0.375rem)] overflow-hidden bg-bg-surface shadow-inner-hi">
                  {visual}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

// Native pill button with the magnetic arrow chip — same vocabulary as the
// foundations Button primitive, but rendered as an anchor so it can host an
// href without needing asChild (which drops the chip).
function HeroButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: 'primary' | 'secondary';
}) {
  if (variant === 'primary') {
    return (
      <a
        href={href}
        className="group/hbtn inline-flex items-center gap-3 h-13 pl-6 pr-1.5 rounded-pill
                   bg-accent !text-white shadow-e1
                   transition-[background-color,box-shadow] duration-base ease-expressive
                   hover:bg-accent-default-hover hover:shadow-e2"
      >
        <span className="leading-none text-body font-medium">{label}</span>
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center h-10 w-10 rounded-pill bg-white/15
                     transition-[transform] duration-base ease-expressive
                     group-hover/hbtn:translate-x-0.5 group-hover/hbtn:-translate-y-px"
        >
          <ArrowUpRight size={16} />
        </span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="group/hbtn inline-flex items-center h-13 px-6 rounded-pill
                 bg-bg-surface text-fg-primary ring-1 ring-[color:var(--border-default)]
                 transition-[background-color,border-color,color] duration-base ease-expressive
                 hover:ring-accent hover:text-accent"
    >
      <span className="leading-none text-body font-medium">{label}</span>
    </a>
  );
}
