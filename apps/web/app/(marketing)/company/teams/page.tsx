// STSL teams page (Phase 2C, brief §6.5).
// Renders a Board grid of LeadershipCard plus compact TeamMember grids for
// the management roster and broader operating teams. Bios are placeholdered
// ({{COMMS_APPROVAL_REQUIRED}}) per brief §11 and render as-is so the gaps
// stay visible on this dev build.

import type { Metadata } from 'next';
import {
  Hero,
  SectionHeader,
  LeadershipCard,
  TeamMember,
  teamsCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export const metadata: Metadata = {
  title: 'Teams',
  description:
    'The board, management, and operating teams behind STSL. People who have shipped to Nigerian banks, federal MDAs, and the SystemSpecs group of companies.',
  alternates: { canonical: '/company/teams' },
  openGraph: {
    title: 'Teams · SystemSpecs Technology Solutions',
    description: 'Board, management, and operating teams behind STSL.',
    url: '/company/teams',
  },
};

export default function CompanyTeamsPage() {
  const c = teamsCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={{ label: 'Talk to the team', href: c.closingCta.primaryCta.href }}
        secondary={{ label: 'About STSL', href: '/company' }}
        atmosphereReactive
      />

      {/* Overview lede — single editorial column above the grids.
          Dark surface so the boundary against the cream Hero reads cleanly. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">{c.intro.eyebrow}</p>
            <p className="font-serif italic text-[1.5rem] md:text-[1.75rem] text-white leading-snug text-balance">
              {c.intro.body}
            </p>
          </div>
        </Container>
      </section>

      {/* Board grid — full LeadershipCard. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.board.eyebrow}
            headline={c.board.headline}
            intro={c.board.note}
          />
          <Grid cols={12} gap={8} mdGap={10} className="mt-12 md:mt-16">
            {c.board.members.map((m, i) => (
              <div
                key={m.slug}
                data-reveal-card
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-12 md:col-span-6 lg:col-span-4 flex [&>*]:flex-1"
              >
                <LeadershipCard
                  name={m.name}
                  role={m.role}
                  photo={m.photo}
                  bio={m.shortBio}
                  credentials={
                    m.recognition.length > 0 ? [...m.recognition] : undefined
                  }
                  linkedin={m.linkedin}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Management grid — compact TeamMember cards. */}
      <Section surface="surface" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.management.eyebrow}
            headline={c.management.headline}
            intro={c.management.note}
          />
          <Grid cols={12} gap={6} mdGap={8} className="mt-12 md:mt-16">
            {c.management.members.map((m, i) => (
              <div
                key={m.slug}
                data-reveal-card
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-6 md:col-span-4 lg:col-span-3 flex [&>*]:flex-1"
              >
                <TeamMember
                  name={m.name}
                  role={m.role}
                  photo={m.photo}
                  linkedin={m.linkedin}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Operating team grid — division heads, compact TeamMember cards
          tagged with their department. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.operating.eyebrow}
            headline={c.operating.headline}
            intro={c.operating.note}
          />
          <Grid cols={12} gap={6} mdGap={8} className="mt-12 md:mt-16">
            {c.operating.members.map((m, i) => (
              <div
                key={m.slug}
                data-reveal-card
                style={{ '--stagger': Math.min(i, 5) } as React.CSSProperties}
                className="col-span-6 md:col-span-4 lg:col-span-3 flex [&>*]:flex-1"
              >
                <TeamMember
                  name={m.name}
                  role={m.role}
                  photo={m.photo}
                  linkedin={m.linkedin}
                  department={m.department}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Closing — open roles link per brief.
          Pale green pre-footer band, matches marketing layout's page bg. */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--accent-default) 12%, var(--bg-canvas)) 0%, color-mix(in srgb, var(--accent-default) 18%, var(--bg-canvas)) 100%)',
        }}
      >
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-overline uppercase text-accent mb-4">{c.closingCta.eyebrow}</p>
              <h2 className="font-display font-medium text-display-md md:text-display-lg text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.closingCta.headline}
              </h2>
              <p className="mt-4 text-body-lg text-fg-secondary text-pretty max-w-xl">
                {c.closingCta.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a
                href="/company/careers"
                className="inline-flex items-center gap-3 h-13 pl-6 pr-6 rounded-pill bg-bg-inverse !text-white shadow-e1 transition-[background-color,box-shadow] duration-base ease-expressive hover:shadow-e2"
              >
                <span className="leading-none text-body font-medium">Open roles</span>
              </a>
            </div>
          </Grid>
        </Container>
      </section>
    </>
  );
}
