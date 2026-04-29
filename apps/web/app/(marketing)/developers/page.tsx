// STSL developers landing — Phase 2D.
// Wires:
//   - developersCopy (packages/brand-stsl/src/content/copy/developers.ts)
//   - Hero, CapabilityBlock, CodeSample, SectionHeader from @systemspecs/brand-stsl
//   - Container, Section, Stack from @systemspecs/foundations/layout
//
// Per brief §6.4: single-page landing that establishes API credibility before
// the full developer portal ships. No visual slot on the hero — the CodeSample
// further down does the heavy lifting on developer credibility.
//
// Placeholder tokens ({{LIKE_THIS}}) inside copy are blocked on STSL comms
// approval per brief §11 and render as-is so the gaps are visible.

import {
  Hero,
  CapabilityBlock,
  CodeSample,
  SectionHeader,
  Wallet,
  Card,
  Network,
  ArrowUpRight,
  ArrowRight,
  developersCopy,
  type CodeLanguage,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section, Stack } from '@systemspecs/foundations/layout';
import type { ReactNode } from 'react';

const categoryIcons: ReadonlyArray<ReactNode> = [
  <Wallet key="wallet" size={22} />,
  <Card key="card" size={22} />,
  <Network key="network" size={22} />,
];

export default function DevelopersPage() {
  const c = developersCopy;
  // The copy file marks the response as a JS-shaped JSON literal — render it
  // with the `js` tokenizer so braces / strings / numbers get the syntax
  // theme. The bash sample is rendered with the `bash` tokenizer.
  const sampleLanguage: CodeLanguage = c.codeSample.language === 'bash' ? 'bash' : 'js';

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={c.hero.primaryCta}
        secondary={c.hero.secondaryCta}
        atmosphereReactive
      />

      {/* API surface — three categories rendered as bare CapabilityBlocks on
          the muted floor. Bullets lift the listed endpoints into the
          editorial system without nesting another card surface. */}
      <Section id="api-surface" surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.apiSurface.eyebrow}
            headline={c.apiSurface.headline}
            intro={c.apiSurface.lede}
          />
          <Grid cols={12} gap={8} mdGap={10} className="mt-12 md:mt-16">
            {c.apiSurface.categories.map((cat, i) => (
              <div
                key={cat.title}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <CapabilityBlock
                  icon={categoryIcons[i] ?? <Network size={22} />}
                  title={cat.title}
                  description={cat.body}
                  bullets={[...cat.endpoints]}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Code sample — bash request followed by the JSON-shaped response.
          Both render on espresso ink so they read as developer artefacts
          against the cream page floor. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.codeSample.eyebrow}
            headline={c.codeSample.headline}
            intro={c.codeSample.description}
          />
          <Grid cols={12} gap={6} mdGap={8} className="mt-10 md:mt-12">
            <div className="col-span-12 lg:col-span-6">
              <CodeSample
                language={sampleLanguage}
                code={c.codeSample.code}
                filename="POST /v1/accounts"
                caption="Authenticated request against the sandbox."
              />
            </div>
            {c.codeSample.response ? (
              <div className="col-span-12 lg:col-span-6">
                <CodeSample
                  language="js"
                  code={c.codeSample.response}
                  filename="201 Created"
                  caption="Response returns a virtual account ready to receive funds."
                />
              </div>
            ) : null}
          </Grid>
        </Container>
      </Section>

      {/* Sandbox CTA — single primary path. We render the pill as a native
          anchor so the magnetic arrow chip stays attached (matches the
          Hero button vocabulary). */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} lgGap={12} className="items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-overline uppercase text-accent mb-4">{c.sandbox.eyebrow}</p>
              <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.sandbox.headline}
              </h2>
              <p className="mt-5 text-body md:text-body-lg text-fg-secondary text-pretty max-w-2xl">
                {c.sandbox.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <Stack direction="row" gap={3} wrap>
                <a
                  href={c.sandbox.primaryCta.href}
                  className="group/dbtn inline-flex items-center gap-3 h-13 pl-6 pr-1.5 rounded-pill
                             bg-accent !text-white shadow-e1
                             transition-[background-color,box-shadow] duration-base ease-expressive
                             hover:bg-accent-default-hover hover:shadow-e2"
                >
                  <span className="leading-none text-body font-medium">{c.sandbox.primaryCta.label}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-pill bg-white/15
                               transition-[transform] duration-base ease-expressive
                               group-hover/dbtn:translate-x-0.5 group-hover/dbtn:-translate-y-px"
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </Stack>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Integration partners — short editorial roll. Names + use cases are
          placeholders pending STSL comms approval (brief §11). */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.partners.eyebrow}
            headline={c.partners.headline}
            intro={c.partners.body}
          />
          {/* Asymmetric gap-x / gap-y — pass `gap={0}` so the primitive emits
              no shorthand and our axis-specific overrides take effect cleanly. */}
          <Grid as="ul" cols={12} gap={0} className="mt-10 md:mt-14 gap-x-10 gap-y-8 border-t border-[color:var(--border-subtle)] pt-10">
            {c.partners.partners.map((p) => (
              <li
                key={p.name}
                className="col-span-12 md:col-span-6 flex flex-col gap-2 border-b border-[color:var(--border-subtle)] pb-8"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                  Partner
                </span>
                <p className="font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em]">
                  {p.name}
                </p>
                <p className="text-body text-fg-secondary text-pretty">{p.useCase}</p>
              </li>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Docs link — small footer-area block with the "coming soon" reference
          + the standing alternative routes from the copy file. */}
      <Section surface="muted" density="md">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
            <div className="max-w-2xl">
              <p className="text-overline uppercase text-accent mb-3">{c.docs.eyebrow}</p>
              <h3 className="font-display font-medium text-heading-1 text-fg-primary tracking-[-0.01em] text-balance">
                {c.docs.headline}
              </h3>
              <p className="mt-3 text-body text-fg-secondary text-pretty">{c.docs.body}</p>
            </div>
            <Stack direction="row" gap={4} wrap>
              <a
                href={c.docs.primaryCta.href}
                className="group/dlink inline-flex items-center gap-2 text-body font-medium text-fg-primary
                           transition-[color] duration-base ease-expressive hover:text-accent"
              >
                <span>{c.docs.primaryCta.label}</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-base ease-expressive group-hover/dlink:translate-x-0.5"
                />
              </a>
              <a
                href={c.docs.secondaryCta.href}
                className="group/dlink inline-flex items-center gap-2 text-body font-medium text-fg-secondary
                           transition-[color] duration-base ease-expressive hover:text-accent"
              >
                <span>{c.docs.secondaryCta.label}</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-base ease-expressive group-hover/dlink:translate-x-0.5"
                />
              </a>
            </Stack>
          </div>
        </Container>
      </Section>
    </>
  );
}
