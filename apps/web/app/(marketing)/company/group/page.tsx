// STSL group page (Phase 2C, brief §6.5).
// Frames STSL inside SystemSpecs Holdings: parent + sister companies via
// the existing GroupBlock component, then a second editorial section that
// names each subsidiary's role in the group.

import {
  Hero,
  GroupBlock,
  SectionHeader,
  groupCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export default function CompanyGroupPage() {
  const c = groupCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={{ label: c.hero.primaryCta.label, href: c.hero.primaryCta.href }}
        secondary={{ label: c.hero.secondaryCta.label, href: c.hero.secondaryCta.href }}
        atmosphereReactive
      />

      {/* Editorial intro about SystemSpecs Holdings. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">{c.intro.eyebrow}</p>
              <h2 className="font-display font-medium text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.holdings.name}
              </h2>
              <p className="mt-3 text-caption font-mono uppercase tracking-[0.22em] text-fg-muted">
                Operating since {c.holdings.founded}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pt-3">
              <p className="text-body-lg text-fg-secondary text-pretty max-w-2xl">
                {c.intro.body}
              </p>
              <p className="mt-5 text-body text-fg-secondary text-pretty max-w-2xl">
                {c.holdings.description}
              </p>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Group tree — parent + sister companies, via shared GroupBlock. We
          pass only the non-STSL subsidiaries so the strip reads as siblings
          of the current site, not a self-reference. */}
      <GroupBlock
        intro={c.hero.headline}
        parentName={c.holdings.name}
        parentHref={c.holdings.href}
        foundedYear={Number(c.holdings.founded)}
        companies={c.subsidiaries
          .filter((s) => s.name !== 'STSL')
          .map((s) => ({
            name: s.name,
            description: s.description,
            href: s.href,
          }))}
      />

      {/* Editorial subsidiary listing — each company's role in the group. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow="SUBSIDIARIES"
            headline="Each company, what it owns."
            intro="Four operating companies sit under SystemSpecs Holdings. Each runs its own product and operations under shared governance."
          />
          <ul className="mt-12 md:mt-16 divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
            {c.subsidiaries.map((s) => (
              <Grid
                as="li"
                key={s.name}
                cols={12}
                gap={4}
                mdGap={8}
                className="py-7 md:py-9 items-baseline"
              >
                <div className="col-span-12 md:col-span-3">
                  <h3 className="font-display font-medium text-heading-1 text-fg-primary leading-tight tracking-[-0.005em]">
                    {s.name}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                    {s.role}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-body text-fg-secondary text-pretty">
                    {s.description}
                  </p>
                  <a
                    href={s.href}
                    {...(s.external
                      ? { rel: 'noopener', target: '_blank' }
                      : {})}
                    className="mt-3 inline-flex items-center gap-2 text-body-sm font-medium text-fg-primary hover:text-accent transition-colors duration-base ease-expressive"
                  >
                    Visit {s.name}
                  </a>
                </div>
              </Grid>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
