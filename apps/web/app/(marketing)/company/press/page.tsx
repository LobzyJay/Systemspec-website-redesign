// STSL press page (Phase 2C, brief §6.5).
// Editorial press + analyst resources hub. Real third-party coverage and a
// downloadable media kit will replace the placeholders below once comms
// approval lands per brief §11.

import {
  Hero,
  SectionHeader,
  InsightCard,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

interface PressItem {
  title: string;
  publication: string;
  date: string;
  href: string;
}

const pressItems: ReadonlyArray<PressItem> = [
  {
    title: '{{PRESS_ITEM_1_TITLE}}',
    publication: 'TechCabal',
    date: '{{PRESS_ITEM_1_DATE}}',
    href: '{{PRESS_ITEM_1_URL}}',
  },
  {
    title: '{{PRESS_ITEM_2_TITLE}}',
    publication: 'Nairametrics',
    date: '{{PRESS_ITEM_2_DATE}}',
    href: '{{PRESS_ITEM_2_URL}}',
  },
  {
    title: '{{PRESS_ITEM_3_TITLE}}',
    publication: '{{PRESS_ITEM_3_PUBLICATION}}',
    date: '{{PRESS_ITEM_3_DATE}}',
    href: '{{PRESS_ITEM_3_URL}}',
  },
];

export default function CompanyPressPage() {
  return (
    <>
      <Hero
        eyebrow="PRESS"
        headline="Press and analyst resources."
        subhead="Third-party coverage, leadership interviews, and a downloadable media kit. For interviews and quotes, contact the office of the CEO."
        primary={{ label: 'Press enquiries', href: '/contact?audience=press' }}
        secondary={{ label: 'About STSL', href: '/company' }}
        atmosphereReactive
      />

      {/* Coverage strip — three InsightCards in press kind. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow="COVERAGE"
            headline="Recent press."
            intro="Selected third-party coverage of STSL, the SystemSpecs group, and the products we operate."
          />
          <Grid cols={12} gap={4} mdGap={5} className="mt-12 md:mt-16">
            {pressItems.map((item) => (
              <div
                key={item.href}
                className="col-span-12 md:col-span-4 flex [&>*]:flex-1"
              >
                <InsightCard
                  kind="press"
                  title={item.title}
                  href={item.href}
                  date={item.date}
                  publication={item.publication}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Media kit — single editorial block with download link. Inline JSX
          (no new component) per rules. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-center rounded-3xl bg-bg-surface ring-1 ring-[color:var(--border-subtle)] p-8 md:p-12 shadow-e1">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-overline uppercase text-accent mb-4">MEDIA KIT</p>
              <h2 className="font-display font-medium text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                Logos, leadership portraits, and brand guidelines.
              </h2>
              <p className="mt-4 text-body-lg text-fg-secondary text-pretty max-w-xl">
                Everything publishers and analysts need in one archive. Updated quarterly.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a
                href="{{MEDIA_KIT_URL}}"
                className="inline-flex items-center gap-3 h-13 pl-6 pr-6 rounded-pill bg-bg-inverse !text-white shadow-e1 transition-[background-color,box-shadow] duration-base ease-expressive hover:shadow-e2"
              >
                <span className="leading-none text-body font-medium">Download media kit</span>
              </a>
              <p className="mt-3 text-caption text-fg-muted">
                ZIP · approx 18 MB · last updated {'{{MEDIA_KIT_UPDATED}}'}
              </p>
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
