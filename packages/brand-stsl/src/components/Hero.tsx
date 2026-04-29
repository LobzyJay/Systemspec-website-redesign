import { Container, Grid, Stack } from '@systemspecs/foundations/layout';
import { ArrowUpRight } from '../icons';
// Atmosphere is loaded via a client-only dynamic shim so the canvas
// physics + sweep code split into their own chunk. Hero stays a server
// component; the shim is the only client payload added here.
import { HeroAtmosphere } from './HeroAtmosphere.client';

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subhead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  // Slot for the visual (3D globe lives here on the live site).
  visual?: React.ReactNode;
  // Opt-in Braille atmosphere. Default ON — every hero gets the bg
  // pattern. Pages with a Globe/visual leave `atmosphereReactive` off
  // (visual already responds to the user); pages without a visual turn
  // it on so the empty visual side reacts to the cursor.
  atmosphere?: boolean;
  atmosphereReactive?: boolean;
}

// Editorial typographic hero. Headline scaled DOWN — was display-2xl at lg
// which read as marketing shouting; now display-md → display-lg, still
// commanding without dominating the page. Subhead drops from a 1.5rem serif
// statement to body-lg paragraph for legibility.
//
// Buttons render as native pills with the magnetic arrow chip — Button
// primitive's asChild path drops the chip, so hero buttons need to render
// their own to keep the chip behavior across the whole system.
export function Hero({
  eyebrow,
  headline,
  subhead,
  primary,
  secondary,
  visual,
  atmosphere = true,
  atmosphereReactive = false,
}: HeroProps) {
  // Mobile alignment: when there's NO visual slot (most non-homepage
  // heroes), the headline column anchors to the bottom-LEFT of the
  // hero on mobile so the empty top half breathes with braille texture
  // and the content sits aligned with the rest of the page. lg+ keeps
  // the current centered editorial layout. Pages WITH a visual stay
  // centered/stacked at every breakpoint (visual fills the space).
  const mobileAnchorBottomLeft = !visual;

  return (
    <section
      className={[
        'relative overflow-hidden bg-bg-canvas isolate',
        'min-h-[calc(100svh-4rem)] flex flex-col',
        mobileAnchorBottomLeft ? 'justify-end lg:justify-center' : 'justify-center',
      ].join(' ')}
    >
      {atmosphere ? <HeroAtmosphere reactive={atmosphereReactive} /> : null}
      <Container
        size="wide"
        className={[
          'relative z-10 w-full',
          mobileAnchorBottomLeft
            ? 'pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-28 lg:pb-28'
            : 'pt-12 pb-10 md:pt-24 md:pb-20 lg:pt-28 lg:pb-28',
        ].join(' ')}
      >
        <Grid cols={12} gap={8} mdGap={12} className="items-center">
          {/* Default left-alignment is what we want for bottom-LEFT — only
              the section's `justify-end` shifts content vertically. Text
              alignment, button row alignment, and subhead margin all stay
              at their natural left-flush defaults. */}
          <div className="col-span-12 lg:col-span-7" data-reveal>
            {eyebrow ? (
              <span className="inline-flex items-center h-6 px-3 rounded-pill bg-accent-subtle text-accent text-[10px] uppercase tracking-[0.22em] font-mono font-medium ring-1 ring-[color:var(--accent-default)]/15 mb-6">
                <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 rounded-pill bg-accent" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="font-display font-medium text-display-md md:text-display-lg lg:text-display-xl text-fg-primary text-balance tracking-[-0.02em] leading-[1.05]">
              {headline}
            </h1>
            <p className="mt-4 md:mt-5 text-body md:text-body-lg text-fg-secondary text-pretty max-w-xl">
              {subhead}
            </p>
            <Stack direction="row" gap={3} className="mt-6 md:mt-8" wrap>
              <HeroButton href={primary.href} label={primary.label} variant="primary" />
              {secondary ? (
                <HeroButton href={secondary.href} label={secondary.label} variant="secondary" />
              ) : null}
            </Stack>
          </div>

          {visual ? (
            // Visual frame — Doppelrand vocabulary so the hero matches the
            // card system. The visual itself owns its 1:1 aspect. Capped on
            // mobile so the square doesn't dominate the viewport when stacked.
            <div className="col-span-12 lg:col-span-5 lg:pl-6 mx-auto w-full max-w-md lg:max-w-none" data-reveal>
              <div className="rounded-3xl p-1.5 ring-1 ring-[color:var(--border-subtle)]
                              bg-[color-mix(in_srgb,var(--bg-canvas)_55%,var(--bg-surface-muted)_45%)]
                              shadow-e2">
                <div className="aspect-square rounded-[calc(1.75rem-0.375rem)] overflow-hidden bg-bg-surface shadow-inner-hi">
                  {visual}
                </div>
              </div>
            </div>
          ) : null}
        </Grid>
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
                   transition-[background-color,box-shadow,transform] duration-base ease-expressive
                   hover:bg-accent-default-hover hover:shadow-e2
                   motion-safe:active:scale-[0.98] motion-safe:active:duration-100"
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
                 transition-[background-color,border-color,color,transform] duration-base ease-expressive
                 hover:ring-accent hover:text-accent
                 motion-safe:active:scale-[0.98] motion-safe:active:duration-100"
    >
      <span className="leading-none text-body font-medium">{label}</span>
    </a>
  );
}
