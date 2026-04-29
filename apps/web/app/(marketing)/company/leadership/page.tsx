// STSL leadership page (Phase 2C, brief §6.5).
// Renders a Board grid of LeadershipCard plus a compact TeamMember grid for
// the management roster. Bios are placeholdered ({{COMMS_APPROVAL_REQUIRED}})
// per brief §11 and render as-is so the gaps stay visible on this dev build.

import {
  Hero,
  SectionHeader,
  LeadershipCard,
  TeamMember,
  leadershipCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export default function CompanyLeadershipPage() {
  const c = leadershipCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={{ label: 'Talk to leadership', href: c.closingCta.primaryCta.href }}
        secondary={{ label: 'About STSL', href: '/company' }}
        atmosphereReactive
      />

      {/* Overview lede — single editorial column above the grids. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-overline uppercase text-accent mb-4">{c.intro.eyebrow}</p>
            <p className="font-serif italic text-[1.5rem] md:text-[1.75rem] text-fg-primary leading-snug text-balance">
              {c.intro.body}
            </p>
          </div>
        </Container>
      </Section>

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

      {/* Closing — open roles link per brief. */}
      <Section surface="muted" density="lg">
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
      </Section>
    </>
  );
}
