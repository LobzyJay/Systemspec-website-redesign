// FundACause product sub-page. Follows the §6.3 template:
//   1. Hero — value prop + brand-colour panel placeholder (gold)
//   2. Who it's for — eyebrow + 4-up audience lineup
//   3. Features — 8 CapabilityBlocks in a 2-up grid
//   4. Get started — 3-path numbered flow (personal / institutional / white-label)
//   5. Proof — short editorial block with the "Best Crowdfunding Platform 2022"
//      award badge pinned ABOVE the section headline (per the brief's §6.3
//      FundACause-specific note)
//   6. Pricing — short text block
//   7. CTA — primary "Start a campaign"
//
// Copy comes from packages/brand-stsl/src/content/copy/products/fundacause.ts.
// Brand colour comes from the shared productBrandColors map (FundACause gold).

import {
  Hero,
  CapabilityBlock,
  SectionHeader,
  fundACauseCopy,
  Shield,
  Wallet,
  Card,
  Document,
  Award,
  Users,
  Lock,
  Network,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

// Feature → icon map, ordered to match fundACauseCopy.features.items.
const featureIcons = [
  <Shield size={28} key="verified" />,
  <Wallet size={28} key="rails" />,
  <Card size={28} key="channels" />,
  <Document size={28} key="management" />,
  <Lock size={28} key="disbursement" />,
  <Users size={28} key="institutional" />,
  <Award size={28} key="receipts" />,
  <Network size={28} key="white-label" />,
];

export default function FundACausePage() {
  const c = fundACauseCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={{ label: c.hero.primaryCta.label, href: c.hero.primaryCta.href }}
        secondary={{ label: c.hero.secondaryCta.label, href: c.hero.secondaryCta.href }}
        visual={
          <div className="w-full h-full bg-bg-canvas flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/products/fundacause-color.png`} alt="FundACause" className="max-h-20 w-auto object-contain" />
          </div>
        }
        atmosphereReactive
      />

      {/* Who it's for — eyebrow + 4-up audience lineup. */}
      <Section surface="canvas" density="md">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">
                {c.whoItsFor.eyebrow}
              </p>
              <h2 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.whoItsFor.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty">
                {c.whoItsFor.body}
              </p>
            </div>
            <Grid as="ul" cols={12} gap={4} mdGap={5} className="col-span-12 lg:col-span-7">
              {c.whoItsFor.audiences.map((audience, i) => (
                <li
                  key={`fac-aud-${i}`}
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
      </Section>

      {/* Features — 2-up CapabilityBlock grid. */}
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
                key={`fac-feat-${i}`}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6"
              >
                <CapabilityBlock
                  icon={featureIcons[i] ?? <Award size={28} />}
                  title={item.title}
                  description={item.body}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Get started — 3 paths in. */}
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
                className="col-span-12 md:col-span-4 relative flex flex-col rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-7 md:p-8 shadow-e1"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                  Path {step.n}
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

      {/* Proof — award badge sits ABOVE the headline per §6.3 FundACause note. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-7">
              <p className="text-overline uppercase text-accent mb-4">{c.proof.eyebrow}</p>

              {/* Dedicated mono-caps award badge — pinned above the section
                  headline as called out in the brief. Source line under the
                  badge label honours the {{AWARD_BODY_NAME}} placeholder. */}
              <div className="mb-6 inline-flex items-center gap-3 rounded-pill bg-bg-surface ring-1 ring-[color:var(--border-default)] pl-4 pr-5 h-10 shadow-e1">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center h-6 w-6 text-accent"
                >
                  <Award size={20} />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-primary">
                  {c.award.badge.label}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                  · {c.award.badge.source}
                </span>
              </div>

              <h2 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.proof.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty">
                {c.proof.body}
              </p>
              <p className="mt-6 text-body-sm text-fg-muted">
                Notable campaigns: {c.proof.notableCampaigns}
              </p>
            </div>
            <Grid as="dl" cols={12} gap={4} mdGap={5} className="col-span-12 lg:col-span-5">
              {c.proof.metrics.map((m, i) => (
                <div
                  key={`fac-metric-${i}`}
                  className="col-span-12 md:col-span-4 lg:col-span-12 rounded-[1.5rem] bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-6 shadow-e1"
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

      {/* Final CTA — primary button only per §6.3. "Visit live product" maps
          to the primary "Start a campaign" CTA in copy (external link). */}
      <Section surface="inverse" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-accent mb-4">
                {c.closingCta.eyebrow}
              </p>
              <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-on-inverse text-balance leading-[1.05] tracking-[-0.02em]">
                {c.closingCta.headline}
              </h2>
              <p className="mt-5 text-body-lg text-white/70 text-pretty max-w-2xl">
                {c.closingCta.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a
                href={c.closingCta.primaryCta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center h-13 px-6 rounded-pill bg-accent !text-white text-body font-medium shadow-e1 transition-[background-color,box-shadow] duration-base ease-expressive hover:bg-accent-default-hover hover:shadow-e2"
              >
                {c.closingCta.primaryCta.label}
              </a>
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
