// STSL marketing homepage. Wires Phase 1 deliverables together:
//   - homepageCopy from packages/brand-stsl/src/content/copy/homepage.ts
//   - Globe (cobe-based) hero visual per brief §6.1
//   - Existing brand-stsl components (Hero, ProofBar, SolutionCard, ProductCard,
//     CapabilityStrip, GroupBlock, InsightCard, SegmentedCTA)
//
// Nav + Footer come from the (marketing)/layout.tsx wrapper.
//
// Placeholders ({{LIKE_THIS}}) in copy are blocked on STSL comms approval per
// brief §11. They render as-is on this dev build so the gaps are visible.

import type { Metadata } from 'next';
import {
  Hero,
  StatPill,
  ProofBar,
  SolutionCard,
  ProductCard,
  CapabilityStrip,
  GroupBlock,
  InsightCard,
  SegmentedCTA,
  SectionHeader,
  Bank,
  Government,
  Users,
  Code,
  homepageCopy,
} from '@systemspecs/brand-stsl';
import { MobileSnapCarousel } from '../../components/MobileSnapCarousel';

// Page-specific metadata. Title falls into the root layout's `%s · …`
// template so the full <title> reads as a single string. Description and
// OpenGraph are page-scoped so social previews reflect this page, not the
// site default inherited from app/layout.tsx.
export const metadata: Metadata = {
  title: { absolute: 'SystemSpecs Technology Solutions — Infrastructure for Africa’s payments, government, and finance' },
  description:
    'STSL builds and operates the payment, e-government, and enterprise infrastructure used by Nigerian banks, federal MDAs, and the SystemSpecs group of companies since 1992.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SystemSpecs Technology Solutions',
    description:
      'Infrastructure for Africa’s payments, government, and finance. A SystemSpecs Holdings company since 1992.',
    url: '/',
    // Re-state images here — Next.js shallow-merges metadata.openGraph,
    // so any page that overrides it loses the parent's images.
    images: [
      {
        url:
          (process.env.GITHUB_PAGES === 'true'
            ? 'https://lobzyjay.github.io/Systemspec-website-redesign'
            : 'https://stsl.ng') + '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SystemSpecs Technology Solutions',
      },
    ],
  },
  twitter: {
    images: [
      (process.env.GITHUB_PAGES === 'true'
        ? 'https://lobzyjay.github.io/Systemspec-website-redesign'
        : 'https://stsl.ng') + '/og-image.png',
    ],
  },
};
import { Container, Grid, Section } from '@systemspecs/foundations/layout';
// Globe is the only consumer of the cobe runtime (~10KB+ minified) on the
// site. The .client shim dynamic-imports it client-only so cobe stays out
// of every other route's First Load JS. Keeps page.tsx a server component.
import { Globe } from '../../components/globe.client';

const solutionIcons = {
  banking: <Bank size={22} />,
  'e-government': <Government size={22} />,
  community: <Users size={22} />,
  'enterprise-software': <Code size={22} />,
} as const;

export default function HomePage() {
  const c = homepageCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={c.hero.primaryCta}
        secondary={c.hero.secondaryCta}
        visual={
          <div className="relative w-full h-full">
            <Globe />
            <div className="absolute left-5 bottom-5 z-10">
              <StatPill
                label="Trusted by"
                value="800+ institutions"
                avatars={[
                  { initial: 'AO' },
                  { initial: 'CN' },
                  { initial: 'FK' },
                ]}
              />
            </div>
          </div>
        }
        atmosphere
      />

      <ProofBar
        intro={c.proofBar.lede}
        metrics={c.proofBar.metrics.map((m) => ({ value: m.value, label: m.label }))}
        // Logos now ship with `src` paths from copy → marquee renders <img>
        // for each. Files live in apps/web/public/institutions/.
        logos={c.proofBar.logos.map((l) => ({ name: l.name, alt: l.alt, src: l.src }))}
      />

      {/* Solutions section — mirrors the dark styling on the Solutions
          overview page so the homepage and /solutions read as one
          family. Black bg, white headline, white/70 lede, white
          SolutionCards pop as deliberate editorial panels. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <Grid cols={12} gap={6} className="items-end mb-12 md:mb-16" data-reveal>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-overline uppercase text-accent mb-4">
                {c.solutions.eyebrow}
              </p>
              <h2 className="font-display font-medium text-display-md md:text-display-lg text-white text-balance leading-[1.05] tracking-[-0.02em]">
                {c.solutions.headline}
              </h2>
              {c.solutions.lede ? (
                <p className="mt-5 text-body-lg text-white/70 max-w-2xl">
                  {c.solutions.lede}
                </p>
              ) : null}
            </div>
          </Grid>
          <Grid cols={12} gap={4} mdGap={5}>
            {c.solutions.cards.map((card, i) => (
              <div
                key={card.slug}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6 lg:col-span-3 flex [&>*]:flex-1"
              >
                <SolutionCard
                  icon={solutionIcons[card.slug as keyof typeof solutionIcons]}
                  title={card.title}
                  description={card.description}
                  proof={card.proofPoint}
                  href={card.href}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.products.eyebrow}
            headline={c.products.headline}
            intro={c.products.lede}
          />
          <MobileSnapCarousel desktopItemClass="md:basis-auto md:col-span-4">
            {c.products.cards.map((card) => (
              <ProductCard
                key={card.slug}
                name={card.title}
                positioning={card.positioning}
                proof={card.proofPoint}
                href={card.href}
                logoColor={`/products/${card.slug}-color.png`}
                logoBw={`/products/${card.slug}-bw.png`}
              />
            ))}
          </MobileSnapCarousel>
        </Container>
      </Section>

      <CapabilityStrip
        eyebrow={c.capabilityStrip.eyebrow}
        headline={c.capabilityStrip.headline}
        body={c.capabilityStrip.body}
        capabilities={[...c.capabilityStrip.capabilities]}
      />

      <GroupBlock
        intro={c.group.headline}
        parentName="SystemSpecs Holdings"
        parentHref="https://systemspecs.com.ng"
        foundedYear={1992}
        companies={c.group.siblings.map((s) => ({
          name: s.name,
          description: s.description,
          href: s.href,
        }))}
      />

      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.insights.eyebrow}
            headline={c.insights.headline}
            intro={c.insights.lede}
          />
          <Grid cols={12} gap={4} mdGap={5} className="mt-12 md:mt-16">
            {c.insights.cards.map((card, i) => (
              <div
                key={`${card.kind}-${i}`}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-4 flex [&>*]:flex-1"
              >
                <InsightCard
                  kind={card.kind === 'article' ? 'blog' : (card.kind as 'press' | 'case-study')}
                  title={card.title}
                  href={card.href}
                  date={'date' in card ? card.date : ''}
                  publication={'outlet' in card ? card.outlet : undefined}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      <SegmentedCTA
        headline={c.closingCta.headline}
        segments={c.closingCta.routes.map((r) => ({
          audience: r.audience,
          outcome: r.description,
          href: r.href,
          cta: r.cta,
        }))}
      />
    </>
  );
}
