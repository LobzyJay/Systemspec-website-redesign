// Monicenta product sub-page. Follows the §6.3 template:
//   1. Hero — value prop + brand-colour panel placeholder (espresso)
//   2. Who it's for — eyebrow + 4-up audience lineup
//   3. Features — 6 CapabilityBlocks in a 2-up grid
//   4. Getting started — 4-step engagement flow
//   5. Proof — short editorial block + metrics row
//   6. Pricing — short text block
//   7. CTA — primary "Request demo"
//
// Copy comes from packages/brand-stsl/src/content/copy/products/monicenta.ts.
// Most fields are still placeholders ({{LIKE_THIS}}) pending comms approval
// per §11. They are rendered as-is so reviewers can see the gaps clearly,
// per the same convention used on the homepage.

import {
  Hero,
  CapabilityBlock,
  SectionHeader,
  monicentaCopy,
  Building,
  Network,
  Document,
  Shield,
  Code,
  Users,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

// Feature → icon map. Six slots to match monicentaCopy.features.items. All
// titles are still placeholders so the icons here are intentionally generic
// "infrastructure" glyphs; swap when copy lands.
const featureIcons = [
  <Building size={28} key="m1" />,
  <Network size={28} key="m2" />,
  <Document size={28} key="m3" />,
  <Shield size={28} key="m4" />,
  <Code size={28} key="m5" />,
  <Users size={28} key="m6" />,
];

export default function MonicentaPage() {
  const c = monicentaCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={c.hero.primaryCta}
        secondary={c.hero.secondaryCta}
        visual={
          <div className="w-full h-full bg-bg-canvas flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/products/monicenta-color.png`} alt="Monicenta" className="max-h-20 w-auto object-contain" />
          </div>
        }
        atmosphereReactive
      />

      {/* Who it's for — eyebrow + 4-up audience lineup.
          Dark surface so the boundary against the cream Hero reads cleanly.
          Audience tiles keep their cream surface so they pop against the ink. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">
                {c.whoItsFor.eyebrow}
              </p>
              <h2 className="font-display text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
                {c.whoItsFor.headline}
              </h2>
              <p className="mt-5 text-body-lg text-white/70 text-pretty">
                {c.whoItsFor.body}
              </p>
            </div>
            <Grid as="ul" cols={12} gap={4} mdGap={5} className="col-span-12 lg:col-span-7">
              {c.whoItsFor.audiences.map((audience, i) => (
                <li
                  key={`mon-aud-${i}`}
                  className="col-span-12 sm:col-span-6 flex items-baseline gap-4 rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-6 shadow-e1"
                >
                  <span
                    aria-hidden="true"
                    className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent shrink-0 w-7"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body text-fg-primary text-pretty">{audience}</span>
                </li>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Features — 2-up CapabilityBlock grid. Six slots. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.features.eyebrow}
            headline={c.features.headline}
          />
          {/* Asymmetric gap-x / gap-y — pass `gap={0}` so the primitive emits
              no shorthand and our axis-specific overrides take effect cleanly. */}
          <Grid cols={12} gap={0} className="mt-4 gap-x-12 gap-y-12 md:gap-y-16">
            {c.features.items.map((item, i) => (
              <div
                key={`mon-feat-${i}`}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6"
              >
                <CapabilityBlock
                  icon={featureIcons[i] ?? <Code size={28} />}
                  title={item.title}
                  description={item.body}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Getting started — 4-step engagement flow. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.integration.eyebrow}
            headline={c.integration.headline}
          />
          <Grid as="ol" cols={12} gap={4} mdGap={5} className="mt-4">
            {c.integration.steps.map((step) => (
              <li
                key={step.n}
                className="col-span-12 md:col-span-6 lg:col-span-3 relative flex flex-col rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-7 md:p-8 shadow-e1"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                  Step {step.n}
                </span>
                <h3 className="mt-4 font-display font-medium text-heading-2 text-fg-primary leading-tight tracking-[-0.005em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm text-fg-secondary text-pretty">
                  {step.body}
                </p>
              </li>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Proof — short editorial block. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-6">
              <p className="text-overline uppercase text-accent mb-4">{c.proof.eyebrow}</p>
              <h2 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.proof.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty">
                {c.proof.body}
              </p>
              <p className="mt-6 text-body-sm text-fg-muted">
                Named clients: {c.proof.clients}
              </p>
            </div>
            <Grid as="dl" cols={12} gap={4} mdGap={5} className="col-span-12 lg:col-span-6">
              {c.proof.metrics.map((m, i) => (
                <div
                  key={`mon-metric-${i}`}
                  className="col-span-12 md:col-span-4 rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-6 shadow-e1"
                >
                  <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                    {m.label}
                  </dt>
                  <dd className="mt-3 font-display text-display-sm text-fg-primary tracking-tight">
                    {m.value}
                  </dd>
                </div>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Pricing — short text block. */}
      <Section surface="canvas" density="md">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-overline uppercase text-accent mb-4">{c.pricing.eyebrow}</p>
              <h2 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.pricing.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty max-w-2xl">
                {c.pricing.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a
                href={c.pricing.cta.href}
                className="inline-flex items-center h-12 px-6 rounded-pill bg-bg-surface text-fg-primary ring-1 ring-[color:var(--border-default)] text-body-sm font-medium transition-[background-color,border-color,color] duration-base ease-expressive hover:ring-accent hover:text-accent"
              >
                {c.pricing.cta.label}
              </a>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Pre-footer "Next step" band — pale green wash matches the
          marketing layout's page bg so it lands directly against the
          floating footer squircle without an empty buffer. */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent mb-4">
                {c.closingCta.eyebrow}
              </p>
              <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.closingCta.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty max-w-2xl">
                {c.closingCta.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a
                href={c.closingCta.primaryCta.href}
                className="inline-flex items-center h-13 px-6 rounded-pill bg-accent !text-white text-body font-medium shadow-e1 transition-[background-color,box-shadow] duration-base ease-expressive hover:bg-accent-default-hover hover:shadow-e2"
              >
                {c.closingCta.primaryCta.label}
              </a>
            </div>
          </Grid>
        </Container>
      </section>
    </>
  );
}
