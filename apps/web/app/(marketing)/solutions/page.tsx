// STSL Solutions overview page. Wires Phase 2A deliverables together:
//   - Editorial intro hero (no visual slot per brief §6.2 — sub-page template)
//   - 4 SolutionCards in a grid sourced from homepageCopy.solutions.cards
//   - SegmentedCTA at the bottom reusing homepageCopy.closingCta.routes
//
// Nav + Footer come from the (marketing)/layout.tsx wrapper.

import type { Metadata } from 'next';
import {
  Hero,
  SolutionCard,
  SegmentedCTA,
  SectionHeader,
  Bank,
  Government,
  Users,
  Code,
  homepageCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'STSL solutions for banking, e-government, community schemes, and enterprise software — built on the same operating platform that has served Nigerian institutions since 1992.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Solutions · SystemSpecs Technology Solutions',
    description:
      'Four lines of business, one platform underneath. Banking, e-government, community, enterprise software.',
    url: '/solutions',
  },
};

const solutionIcons = {
  banking: <Bank size={22} />,
  'e-government': <Government size={22} />,
  community: <Users size={22} />,
  'enterprise-software': <Code size={22} />,
} as const;

export default function SolutionsOverviewPage() {
  const c = homepageCopy;

  return (
    <>
      <Hero
        eyebrow="SOLUTIONS"
        headline="Four lines of business. One platform underneath."
        subhead="STSL builds and operates infrastructure for the institutions that move money, deliver public services, and run the schemes Nigerians rely on every day."
        primary={{ label: 'Talk to sales', href: '/contact?audience=sales' }}
        secondary={{ label: 'Government enquiries', href: '/contact?audience=government' }}
        atmosphereReactive
      />

      {/* Dark section under the hero — breaks the same-bg-twice issue
          (hero cream → cards section cream looked flat). Black surface
          makes the white SolutionCards pop as deliberate editorial
          panels, and the page now reads cream → black → next.
          Headline + lede inlined here (rather than via SectionHeader)
          so we can use on-inverse type colors without bending the
          shared SectionHeader API. */}
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
