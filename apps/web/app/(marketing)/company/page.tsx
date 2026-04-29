// STSL company / About page (Phase 2C, brief §6.5).
// Wires existing brand-stsl primitives to aboutCopy + the closingCta.routes
// from homepageCopy so the About page closes with the same audience-segmented
// pathways the homepage uses.
//
// Placeholders ({{LIKE_THIS}}) in copy are blocked on STSL comms approval per
// brief §11. They render as-is on this dev build so the gaps stay visible.

import {
  Hero,
  SectionHeader,
  Timeline,
  SegmentedCTA,
  aboutCopy,
  homepageCopy,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';

export default function CompanyAboutPage() {
  const c = aboutCopy;

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subheadline}
        primary={c.hero.primaryCta}
        secondary={c.hero.secondaryCta}
        atmosphereReactive
      />

      {/* Group context — short editorial paragraph naming Remita / HumanManager
          / Whatadeal. Inline JSX (no new component) per rules.
          Dark surface so the boundary against the cream Hero reads cleanly. */}
      <section className="relative bg-black text-fg-on-inverse py-20 md:py-28">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">{c.intro.eyebrow}</p>
              <h2 className="font-display font-medium text-display-md text-white text-balance leading-[1.05] tracking-[-0.02em]">
                {c.intro.lede}
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pt-3">
              <p className="text-body-lg text-white/70 text-pretty max-w-2xl">
                {c.intro.body}
              </p>
              <p className="mt-5 text-body text-white/70 text-pretty max-w-2xl">
                {c.group.body}
              </p>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Numbers grid — 4-up stat tiles. Inline mono+display layout per brief
          spec. We render the first four entries as the headline grid. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.numbers.eyebrow}
            headline={c.numbers.headline}
          />
          <Grid as="ul" cols={12} gap="px" className="mt-12 md:mt-16 bg-[color:var(--border-subtle)] ring-1 ring-[color:var(--border-subtle)] rounded-3xl overflow-hidden">
            {c.numbers.items.slice(0, 4).map((item) => (
              <li
                key={item.label}
                className="col-span-6 lg:col-span-3 flex flex-col gap-3 bg-bg-surface p-7 md:p-9"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
                  {item.label}
                </span>
                <span className="font-display font-medium text-display-md md:text-display-lg text-fg-primary leading-[1] tracking-[-0.02em] tabular-nums break-words overflow-hidden">
                  {item.value}
                </span>
              </li>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Timeline — 1992 → today. */}
      <Section surface="surface" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={c.timeline.eyebrow}
            headline={c.timeline.headline}
            intro={c.timeline.lede}
          />
          <div className="mt-12 md:mt-16">
            <Timeline
              items={c.timeline.milestones.map((m) => ({
                year: m.year,
                title: m.title,
                description: m.body,
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* CSR mention — Children's Day Essay Competition + internships. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12} className="items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-overline uppercase text-accent mb-4">{c.csr.eyebrow}</p>
              <h2 className="font-display font-medium text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.02em]">
                {c.csr.headline}
              </h2>
              <p className="mt-5 text-body-lg text-fg-secondary text-pretty max-w-xl">
                {c.csr.body}
              </p>
            </div>
            <Grid as="ul" cols={12} gap={4} className="col-span-12 lg:col-span-7">
              {c.csr.items.map((item) => (
                <li
                  key={item.title}
                  className="col-span-12 md:col-span-6 flex flex-col rounded-3xl bg-bg-surface p-7 md:p-8 ring-1 ring-[color:var(--border-subtle)] shadow-e1"
                >
                  <h3 className="font-display font-medium text-heading-2 text-fg-primary leading-tight tracking-[-0.005em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-body text-fg-secondary text-pretty flex-1">
                    {item.body}
                  </p>
                  <a
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-fg-primary hover:text-accent transition-colors duration-base ease-expressive"
                  >
                    Learn more
                  </a>
                </li>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Section>

      <SegmentedCTA
        headline={homepageCopy.closingCta.headline}
        segments={homepageCopy.closingCta.routes.map((r) => ({
          audience: r.audience,
          outcome: r.description,
          href: r.href,
          cta: r.cta,
        }))}
      />
    </>
  );
}
