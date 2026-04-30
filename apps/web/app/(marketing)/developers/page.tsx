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

import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Developers',
  description:
    'STSL APIs for accounts, payments, and verification. Sandbox access, code samples, and integration partners for fintech and enterprise builders.',
  alternates: { canonical: '/developers' },
  openGraph: {
    title: 'Developers · SystemSpecs Technology Solutions',
    description:
      'APIs, sandbox access, and the code paths used by Nigerian fintech and enterprise teams.',
    url: '/developers',
  },
};

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
          the dark floor. Bullets lift the listed endpoints into the
          editorial system without nesting another card surface.
          Dark surface so the boundary against the cream Hero reads cleanly.
          SectionHeader replaced with inline JSX (white headlines on ink). */}
      <section id="api-surface" className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">{c.apiSurface.eyebrow}</p>
            <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
              {c.apiSurface.headline}
            </h2>
            <p className="mt-4 text-body-lg text-white/70 text-pretty max-w-xl">
              {c.apiSurface.lede}
            </p>
          </div>
          <Grid cols={12} gap={8} mdGap={10} className="mt-12 md:mt-16">
            {c.apiSurface.categories.map((cat, i) => (
              <div
                key={cat.title}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                {/* Inline card on dark surface — CapabilityBlock is light-mode
                    tuned so we hand-roll on dark to keep text contrast. */}
                {/* h-full + flex-col with the body wrapping mt-auto on the
                    endpoints list pins the hairline divider to the same
                    horizontal line across all three cards regardless of
                    body-text length variance — clean editorial baseline. */}
                <div className="flex flex-col h-full">
                  <div className="inline-flex items-center justify-start h-10 w-10 text-accent shrink-0">
                    {categoryIcons[i] ?? <Network size={22} />}
                  </div>
                  <p className="mt-4 font-display font-medium text-heading-1 text-white tracking-[-0.01em]">
                    {cat.title}
                  </p>
                  <p className="mt-3 text-body text-white/70 text-pretty">
                    {cat.body}
                  </p>
                  <ul className="mt-auto pt-6 space-y-2.5 border-t border-white/15 mt-6">
                    {cat.endpoints.map((ep) => (
                      <li
                        key={ep}
                        className="text-body-sm font-mono text-white/85 flex items-baseline gap-2.5 leading-relaxed"
                      >
                        <span aria-hidden="true" className="text-accent shrink-0 leading-none">→</span>
                        <span className="min-w-0 break-all">{ep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

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

      {/* Integration partners — flipped to dark theme so it visually
          breaks from the green References section directly below. Page
          rhythm now reads: black API surface → muted code sample →
          dark partners → green references → footer. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          {/* Inline header — SectionHeader is light-mode tuned, so we
              hand-roll on dark so the eyebrow/headline/intro all read
              against the black surface. */}
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">{c.partners.eyebrow}</p>
            <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
              {c.partners.headline}
            </h2>
            <p className="mt-5 text-body-lg text-white/70 text-pretty">{c.partners.body}</p>
          </div>
          <Grid as="ul" cols={12} gap={0} className="mt-10 md:mt-14 gap-x-10 gap-y-8 border-t border-white/15 pt-10">
            {c.partners.partners.map((p) => (
              <li
                key={p.name}
                className="col-span-12 md:col-span-6 flex flex-col gap-2 border-b border-white/15 pb-8"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                  Partner
                </span>
                <p className="font-display font-medium text-heading-1 text-white tracking-[-0.01em]">
                  {p.name}
                </p>
                <p className="text-body text-white/70 text-pretty">{p.useCase}</p>
              </li>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Docs link — small footer-area block with the "coming soon" reference
          + the standing alternative routes from the copy file.
          Pale green pre-footer band, matches marketing layout's page bg. */}
      <section
        className="py-16 md:py-20"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
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
      </section>
    </>
  );
}
