// STSL careers page (Phase 2C, brief §6.5).
// "Build for the institutions that matter" — three editorial value props,
// a placeholder open-roles list, and a talent-pool newsletter CTA. Roles are
// blocked on hiring approval per brief §11 and render placeholders inline.

import type { Metadata } from 'next';
import {
  Hero,
  SectionHeader,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';
import { CareersNewsletter } from './CareersNewsletter';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Careers at STSL. Build the systems that move money, payroll, and public services for Nigerian institutions. Hiring engineers, product, banking, and government delivery.',
  alternates: { canonical: '/company/careers' },
  openGraph: {
    title: 'Careers · SystemSpecs Technology Solutions',
    description: 'Build for the institutions that matter. Hiring at STSL.',
    url: '/company/careers',
  },
};

interface ValueBlock {
  eyebrow: string;
  title: string;
  body: string;
}

const valueBlocks: ReadonlyArray<ValueBlock> = [
  {
    eyebrow: 'CRAFT',
    title: 'Care about the systems behind the systems.',
    body: 'The work moves money, payroll, and public services for tens of millions of people. We hire people who treat that as the job, not the perk.',
  },
  {
    eyebrow: 'OWNERSHIP',
    title: 'Take a problem and finish it.',
    body: 'Small teams, long horizons. You will own a surface end-to-end — design, ship, operate, learn from production — for years, not sprints.',
  },
  {
    eyebrow: 'INSTITUTION',
    title: 'Build at a 30-year operating standard.',
    body: 'STSL has shipped to banks and federal MDAs since 1992. That standard sets the bar for the work and for how the team treats each other.',
  },
];

export default function CompanyCareersPage() {
  return (
    <>
      <Hero
        eyebrow="CAREERS"
        headline="Build for the institutions that matter."
        subhead="STSL has shipped payments, government, and enterprise infrastructure since 1992. The work is mostly invisible to the people it serves. That is the standard we hire to."
        primary={{ label: 'See open roles', href: '#open-roles' }}
        secondary={{ label: 'About STSL', href: '/company' }}
        atmosphereReactive
      />

      {/* What we look for — three editorial blocks, inline JSX.
          Dark surface so the boundary against the cream Hero reads cleanly.
          SectionHeader replaced with inline JSX (white headlines on ink).
          Value tiles keep their cream surface so they pop against the ink. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">WHAT WE LOOK FOR</p>
            <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
              Three things, every hire.
            </h2>
            <p className="mt-4 text-body-lg text-white/70 text-pretty max-w-xl">
              The work is technical, but the bar is editorial. We look for craft, ownership, and a sense of the institution we are building inside.
            </p>
          </div>
          <Grid as="ul" cols={12} gap="px" className="mt-12 md:mt-16 bg-[color:var(--border-subtle)] ring-1 ring-[color:var(--border-subtle)] rounded-3xl overflow-hidden">
            {valueBlocks.map((b) => (
              <li
                key={b.eyebrow}
                className="col-span-12 md:col-span-4 flex flex-col gap-4 bg-bg-surface p-7 md:p-9"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                  {b.eyebrow}
                </span>
                <h3 className="font-display font-medium text-heading-1 text-fg-primary leading-tight tracking-[-0.005em] text-balance">
                  {b.title}
                </h3>
                <p className="text-body text-fg-secondary text-pretty">{b.body}</p>
              </li>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Open roles — placeholder list. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <div id="open-roles">
            <SectionHeader
              eyebrow="OPEN ROLES"
              headline="Where the team is hiring."
              intro="A short list, kept honest. If nothing fits today, leave your details below and we will reach out when a role opens."
            />
          </div>
          <div className="mt-12 md:mt-16 rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-bg-surface px-8 py-12 md:px-12 md:py-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">No open roles right now</p>
            <p className="mt-3 font-display text-heading-2 text-fg-primary">The team isn’t actively hiring.</p>
            <p className="mt-3 text-body text-fg-secondary max-w-xl mx-auto">
              We hire in small bursts when the work calls for it — engineering, product, banking, and government delivery. Leave your details below and we’ll reach out when something opens that fits.
            </p>
            <a
              href="/contact?audience=careers"
              className="mt-6 inline-flex items-center gap-2 text-body font-medium text-fg-primary hover:text-accent transition-colors"
            >
              <span>Send us your CV</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </Section>

      {/* Talent pool newsletter — wraps the client component.
          Pale green pre-footer band, matches marketing layout's page bg. */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
        <Container size="wide">
          <CareersNewsletter />
        </Container>
      </section>
    </>
  );
}
