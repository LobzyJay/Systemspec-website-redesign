// STSL Products overview page. Wires Phase 2B deliverables together:
//   - Editorial intro hero (no visual slot per brief §6.3 — the visual slots
//     live on the product sub-pages, not on the overview)
//   - 3 ProductCards in a grid sourced from homepageCopy.products.cards
//   - SegmentedCTA at the bottom reusing homepageCopy.closingCta.routes
//
// Brand colours come from the shared productBrandColors map so the overview
// row and the sub-page hero panels stay in sync.
//
// Nav + Footer come from the (marketing)/layout.tsx wrapper.

import type { Metadata } from 'next';
import {
  Hero,
  ProductCard,
  SegmentedCTA,
  SectionHeader,
  homepageCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Three products built and operated in-house at STSL. Pouchii powers fintech rails. FundACause runs regulated giving. Monicenta serves enterprise.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Products · SystemSpecs Technology Solutions',
    description:
      'Pouchii, FundACause, and Monicenta — owned, run, and supported by the same team that builds for banks and government.',
    url: '/products',
  },
};

export default function ProductsOverviewPage() {
  const c = homepageCopy;

  return (
    <>
      <Hero
        eyebrow="PRODUCTS"
        headline="Three products built and operated in-house."
        subhead="Owned, run, and supported by the same team that builds for banks and government. Pouchii powers fintech rails. FundACause runs regulated giving. Monicenta serves enterprise."
        primary={{ label: 'Talk to sales', href: '/contact?audience=sales' }}
        secondary={{ label: 'Request API access', href: '/contact?audience=fintech' }}
        atmosphereReactive
      />

      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.products.eyebrow}
            headline={c.products.headline}
            intro={c.products.lede}
          />
          <Grid cols={12} gap={4} mdGap={5} className="mt-12 md:mt-16">
            {c.products.cards.map((card, i) => (
              <div
                key={card.slug}
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-4 flex [&>*]:flex-1"
              >
                <ProductCard
                  name={card.title}
                  positioning={card.positioning}
                  proof={card.proofPoint}
                  href={card.href}
                  logoColor={`/products/${card.slug}-color.png`}
                  logoBw={`/products/${card.slug}-bw.png`}
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
