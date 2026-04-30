// STSL press page (Phase 2C, brief §6.5).
// Editorial press + analyst resources hub. Real third-party coverage and a
// downloadable media kit will replace the placeholders below once comms
// approval lands per brief §11.

import type { Metadata } from 'next';
import {
  Hero,
} from '@systemspecs/brand-stsl';
import { Container, Grid } from '@systemspecs/foundations/layout';

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Press and analyst resources for STSL. Third-party coverage, leadership interviews, and a downloadable media kit on request.',
  alternates: { canonical: '/company/press' },
  openGraph: {
    title: 'Press · SystemSpecs Technology Solutions',
    description: 'Press and analyst resources, coverage, and media kit.',
    url: '/company/press',
  },
};

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

      {/* Coverage strip — three InsightCards in press kind.
          Dark surface so the boundary against the cream Hero reads cleanly.
          SectionHeader replaced with inline JSX (white headlines on ink). */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">COVERAGE</p>
            <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
              Recent press.
            </h2>
            <p className="mt-4 text-body-lg text-white/70 text-pretty max-w-xl">
              Selected third-party coverage of STSL, the SystemSpecs group, and the products we operate.
            </p>
          </div>
          <div className="mt-12 md:mt-16 rounded-3xl border border-dashed border-white/25 bg-white/5 px-8 py-12 md:px-12 md:py-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">Coming soon</p>
            <p className="mt-3 font-display text-heading-2 text-white">Coverage roundup is being curated.</p>
            <p className="mt-3 text-body text-white/70 max-w-xl mx-auto">
              Selected third-party coverage from TechCabal, Nairametrics, and other publications will land here. For interview requests in the meantime, contact the office of the CEO.
            </p>
            <a
              href="/contact?audience=press"
              className="mt-6 inline-flex items-center gap-2 text-body font-medium text-white hover:text-accent transition-colors"
            >
              <span>Press enquiries</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </section>

      {/* Media kit — single editorial block with download link. Inline JSX
          (no new component) per rules.
          Pale green pre-footer band, matches marketing layout's page bg. */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
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
                href="/contact?audience=press"
                className="inline-flex items-center gap-3 h-13 pl-6 pr-6 rounded-pill bg-bg-inverse !text-white shadow-e1 transition-[background-color,box-shadow] duration-base ease-expressive hover:shadow-e2"
              >
                <span className="leading-none text-body font-medium">Request media kit</span>
              </a>
              <p className="mt-3 text-caption text-fg-muted">
                Available on request via the press contact form.
              </p>
            </div>
          </Grid>
        </Container>
      </section>
    </>
  );
}
