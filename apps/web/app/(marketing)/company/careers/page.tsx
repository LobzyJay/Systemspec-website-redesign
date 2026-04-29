// STSL careers page (Phase 2C, brief §6.5).
// "Build for the institutions that matter" — three editorial value props,
// a placeholder open-roles list, and a talent-pool newsletter CTA. Roles are
// blocked on hiring approval per brief §11 and render placeholders inline.

import {
  Hero,
  SectionHeader,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';
import { CareersNewsletter } from './CareersNewsletter';

interface ValueBlock {
  eyebrow: string;
  title: string;
  body: string;
}

interface OpenRole {
  title: string;
  team: string;
  location: string;
  href: string;
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

const openRoles: ReadonlyArray<OpenRole> = [
  {
    title: '{{ROLE_1_TITLE}}',
    team: '{{ROLE_1_TEAM}}',
    location: 'Lagos, Nigeria',
    href: '{{ROLE_1_URL}}',
  },
  {
    title: '{{ROLE_2_TITLE}}',
    team: '{{ROLE_2_TEAM}}',
    location: 'Lagos, Nigeria',
    href: '{{ROLE_2_URL}}',
  },
  {
    title: '{{ROLE_3_TITLE}}',
    team: '{{ROLE_3_TEAM}}',
    location: 'Remote · Nigeria',
    href: '{{ROLE_3_URL}}',
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

      {/* What we look for — three editorial blocks, inline JSX. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow="WHAT WE LOOK FOR"
            headline="Three things, every hire."
            intro="The work is technical, but the bar is editorial. We look for craft, ownership, and a sense of the institution we are building inside."
          />
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
      </Section>

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
          <ul className="mt-12 md:mt-16 divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
            {openRoles.map((role) => (
              <Grid
                as="li"
                key={role.href}
                cols={12}
                gap={4}
                mdGap={8}
                className="py-6 md:py-8 items-center"
              >
                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-display font-medium text-heading-2 text-fg-primary leading-tight tracking-[-0.005em]">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                    {role.team}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <p className="text-body text-fg-secondary">{role.location}</p>
                </div>
                <div className="col-span-12 md:col-span-3 md:text-right">
                  <a
                    href={role.href}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-pill bg-bg-surface text-fg-primary ring-1 ring-[color:var(--border-default)] transition-[background-color,border-color,color] duration-base ease-expressive hover:ring-accent hover:text-accent"
                  >
                    <span className="leading-none text-body-sm font-medium">Apply</span>
                  </a>
                </div>
              </Grid>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Talent pool newsletter — wraps the client component. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <CareersNewsletter />
        </Container>
      </Section>
    </>
  );
}
