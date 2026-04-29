// Pouchii product sub-page. Follows the §6.3 template:
//   1. Hero — value prop + brand-colour panel placeholder (no real product UI yet)
//   2. Who it's for — eyebrow + audience lineup
//   3. Features — 8 CapabilityBlocks in a 2-up grid
//   4. Integration — numbered flow (4 steps from sandbox to production)
//   5. Proof — short editorial block + metrics row
//   6. Pricing — short text block (placeholders rendered as-is per §11)
//   7. CTA — primary "Request API access"
//
// Copy comes from packages/brand-stsl/src/content/copy/products/pouchii.ts.
// Brand colour comes from the shared productBrandColors map so the hero panel,
// the homepage card, and the products overview card all carry the same teal.
//
// CodeSample now wired — pouchiiCopy.code carries a curl example for
// virtual-account creation. Renders between Integration and Proof so the
// "show me an actual call" reflex of API evaluators is satisfied without
// scrolling.

import {
  Hero,
  CapabilityBlock,
  CodeSample,
  SectionHeader,
  pouchiiCopy,
  Wallet,
  Card,
  Network,
  Document,
  Shield,
  Lock,
  Code,
  Award,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

// Feature → icon map. Ordered to match pouchiiCopy.features.items so the
// glyph beside each block reads as the capability, not as decoration.
const featureIcons = [
  <Wallet size={28} key="virtual-accounts" />,
  <Card size={28} key="bills" />,
  <Network size={28} key="transfers" />,
  <Document size={28} key="lending" />,
  <Shield size={28} key="insurance" />,
  <Lock size={28} key="identity" />,
  <Code size={28} key="webhooks" />,
  <Award size={28} key="sandbox" />,
];

export default function PouchiiPage() {
  const c = pouchiiCopy;

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
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/products/pouchii-color.png`} alt="Pouchii" className="max-h-20 w-auto object-contain" />
          </div>
        }
        atmosphereReactive
      />

      {/* Who it's for — eyebrow + 4-up audience lineup. Inline JSX (no shared
          component) per the brief's "short editorial section" guidance. */}
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
                  key={`pouchii-aud-${i}`}
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

      {/* Features — 2-up CapabilityBlock grid. Eight items in copy. */}
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
                key={`pouchii-feat-${i}`}
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

      {/* Integration — numbered flow, same inline pattern as Solutions
          sub-pages would use. Four steps: request → build → diligence → live. */}
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

      {/* API sample — single curl call to issue a virtual account. The
          first-call reflex check for any API evaluator. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">{c.code.eyebrow}</p>
              <h2 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.code.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty">
                {c.code.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <CodeSample
                language={c.code.sample.language}
                code={c.code.sample.code}
                filename={c.code.sample.filename}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Proof — short editorial block. Placeholders render as-is per §11. */}
      <Section surface="canvas" density="lg">
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
                  key={`pouchii-metric-${i}`}
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

      {/* Final CTA — single primary button per §6.3. */}
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
