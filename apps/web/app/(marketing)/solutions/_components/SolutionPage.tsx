// Shared sub-page renderer for Solutions sub-pages (Banking, E-Gov, Community,
// Enterprise Software). Per brief §6.2 — every sub-page uses the same template:
//   1. Hero (no visual slot, narrower)
//   2. Capabilities — 4–6 CapabilityBlocks in a 2-up grid
//   3. How it works — inline numbered flow (mono-caps step labels, serif italic titles)
//   4. Case study — anonymised quote-style block on muted surface
//   5. Compliance — short list using the capability strip pattern
//   6. FAQs — Accordion
//   7. SegmentedCTA — closing CTA, filtered to relevant audiences
//
// All copy comes from the *SolutionCopy file passed in. Field names are the
// shared shape from packages/brand-stsl/src/content/copy/solutions/*.ts.
//
// Local-only — do NOT promote to brand-stsl. Lives under _components per the
// Phase 2A scope rules.

import {
  Hero,
  CapabilityBlock,
  Accordion,
  SegmentedCTA,
  SectionHeader,
  homepageCopy,
  type AccordionEntry,
} from '@systemspecs/brand-stsl';
import { Container, Grid, Section } from '@systemspecs/foundations/layout';
import type { CSSProperties, ReactNode } from 'react';

interface CtaLink {
  readonly label: string;
  readonly href: string;
}

interface CapabilityCopy {
  readonly title: string;
  readonly body: string;
}

interface StepCopy {
  readonly n: string;
  readonly title: string;
  readonly body: string;
}

interface ComplianceItem {
  readonly label: string;
  readonly body: string;
}

interface FaqItem {
  readonly q: string;
  readonly a: string;
}

interface CaseStudyMetric {
  readonly value: string;
  readonly label: string;
}

export interface SolutionPageCopy {
  readonly hero: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly subheadline: string;
    readonly primaryCta: CtaLink;
    readonly secondaryCta: CtaLink;
  };
  readonly intro: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
  };
  readonly capabilities: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly blocks: ReadonlyArray<CapabilityCopy>;
  };
  readonly howItWorks: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly steps: ReadonlyArray<StepCopy>;
  };
  readonly caseStudy: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly client: string;
    readonly challenge: string;
    readonly approach: string;
    readonly outcome: string;
    readonly metrics: ReadonlyArray<CaseStudyMetric>;
    readonly cta: CtaLink;
  };
  readonly compliance: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
    readonly items: ReadonlyArray<ComplianceItem>;
  };
  readonly faqs: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly items: ReadonlyArray<FaqItem>;
  };
  readonly closingCta: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
    readonly primaryCta: CtaLink;
    readonly secondaryCta: CtaLink;
  };
}

export interface SolutionPageProps {
  /** Copy object for this solution sub-page. */
  copy: SolutionPageCopy;
  /** Capability icons indexed by capability title. Order-aligned with copy. */
  capabilityIcons: ReadonlyArray<ReactNode>;
  /**
   * Filter the closing SegmentedCTA to the audiences relevant to this
   * solution. Match against the audience label (case-insensitive substring).
   * Pass `undefined` to render all routes.
   */
  segmentedCtaAudienceSlugs?: ReadonlyArray<string>;
}

/**
 * Renders the full solution sub-page from a single typed copy object.
 * Sections render with sensible inline fallbacks if a copy field is empty.
 */
export function SolutionPage({
  copy,
  capabilityIcons,
  segmentedCtaAudienceSlugs,
}: SolutionPageProps) {
  const closingRoutes = segmentedCtaAudienceSlugs
    ? homepageCopy.closingCta.routes.filter((r) =>
        segmentedCtaAudienceSlugs.some((slug) =>
          r.audience.toLowerCase().includes(slug.toLowerCase()),
        ),
      )
    : homepageCopy.closingCta.routes;

  // If filtering nukes everything, fall back to all routes so the page never
  // ships an empty CTA grid.
  const safeRoutes = closingRoutes.length > 0 ? closingRoutes : homepageCopy.closingCta.routes;

  const accordionItems: AccordionEntry[] = copy.faqs.items.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  const caseStudyHasContent =
    !copy.caseStudy.headline.startsWith('{{') ||
    !copy.caseStudy.challenge.startsWith('{{');

  return (
    <>
      <Hero
        eyebrow={copy.hero.eyebrow}
        headline={copy.hero.headline}
        subhead={copy.hero.subheadline}
        primary={copy.hero.primaryCta}
        // Sub-page hero — no `secondary` and no `visual` per brief §6.2.
        atmosphereReactive
      />

      {/* Intro / overview band — short editorial preface above the capability grid. */}
      <Section surface="canvas" density="md">
        <Container size="wide">
          <Grid cols={12} gap={6} lgGap={12}>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-overline uppercase text-accent">{copy.intro.eyebrow}</p>
              <h2 className="mt-4 font-display font-medium text-heading-1 md:text-display-md text-fg-primary text-balance leading-[1.1] tracking-[-0.015em]">
                {copy.intro.headline}
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <p className="text-body-lg text-fg-secondary text-pretty">{copy.intro.body}</p>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Capabilities — 2-up grid of CapabilityBlocks. */}
      <Section surface="canvas" density="lg" id="capabilities">
        <Container size="wide">
          <SectionHeader
            eyebrow={copy.capabilities.eyebrow}
            headline={copy.capabilities.headline}
          />
          <Grid cols={12} gap={8} mdGap={10} lgGap={12} className="mt-12 md:mt-16">
            {copy.capabilities.blocks.map((block, i) => (
              <div
                key={block.title}
                style={{ '--stagger': Math.min(i, 5) } as CSSProperties}
                className="col-span-12 lg:col-span-6"
              >
                <CapabilityBlock
                  icon={capabilityIcons[i] ?? capabilityIcons[0] ?? null}
                  title={block.title}
                  description={block.body}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* How it works — inline numbered flow per brief §6.2. */}
      <Section surface="muted" density="lg">
        <Container size="wide">
          <SectionHeader
            eyebrow={copy.howItWorks.eyebrow}
            headline={copy.howItWorks.headline}
          />
          <Grid as="ol" cols={12} gap={8} mdGap={10} lgGap={12} className="mt-12 md:mt-16">
            {copy.howItWorks.steps.map((step, i) => (
              <li
                key={step.n}
                data-reveal-card
                style={{ '--stagger': Math.min(i, 5) } as CSSProperties}
                className="col-span-12 md:col-span-6 flex flex-col"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                    Step {step.n}
                  </span>
                  <span className="flex-1 h-px bg-[color:var(--border-subtle)]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display italic font-medium text-heading-2 md:text-heading-1 text-fg-primary text-balance tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-fg-secondary text-pretty max-w-prose">
                  {step.body}
                </p>
              </li>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Case study — anonymised quote-style block. Skips the metrics row when
          the values are still placeholder tokens. */}
      {caseStudyHasContent ? (
        <Section surface="muted" density="lg">
          <Container size="wide">
            <Grid cols={12} gap={8} mdGap={12}>
              <div className="col-span-12 lg:col-span-4">
                <p className="text-overline uppercase text-accent">{copy.caseStudy.eyebrow}</p>
                <h2 className="mt-4 font-display font-medium text-heading-1 md:text-display-md text-fg-primary text-balance leading-[1.1] tracking-[-0.015em]">
                  {copy.caseStudy.headline}
                </h2>
                <p className="mt-4 text-body-sm font-mono uppercase tracking-[0.18em] text-fg-muted">
                  {copy.caseStudy.client}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <CaseStudyField label="Challenge" body={copy.caseStudy.challenge} />
                <CaseStudyField label="Approach" body={copy.caseStudy.approach} />
                <CaseStudyField label="Outcome" body={copy.caseStudy.outcome} />

                <CaseStudyMetricsRow metrics={copy.caseStudy.metrics} />
              </div>
            </Grid>
          </Container>
        </Section>
      ) : null}

      {/* Compliance — short list, capability-strip pattern. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12}>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-overline uppercase text-accent">{copy.compliance.eyebrow}</p>
              <h2 className="mt-4 font-display font-medium text-heading-1 md:text-display-md text-fg-primary text-balance leading-[1.1] tracking-[-0.015em]">
                {copy.compliance.headline}
              </h2>
              <p className="mt-4 text-body text-fg-secondary text-pretty">
                {copy.compliance.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <ul className="flex flex-col">
                {copy.compliance.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5 border-b border-[color:var(--border-subtle)] first:border-t first:border-[color:var(--border-subtle)]"
                  >
                    <span className="md:w-44 shrink-0 text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                      {item.label}
                    </span>
                    <span className="text-body text-fg-primary text-pretty">{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* FAQs — Accordion. */}
      <Section surface="canvas" density="lg">
        <Container size="wide">
          <Grid cols={12} gap={8} mdGap={12}>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-overline uppercase text-accent">{copy.faqs.eyebrow}</p>
              <h2 className="mt-4 font-display font-medium text-heading-1 md:text-display-md text-fg-primary text-balance leading-[1.1] tracking-[-0.015em]">
                {copy.faqs.headline}
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Accordion items={accordionItems} />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Closing SegmentedCTA — filtered to relevant audiences if requested. */}
      <SegmentedCTA
        headline={copy.closingCta.headline}
        segments={safeRoutes.map((r) => ({
          audience: r.audience,
          outcome: r.description,
          href: r.href,
          cta: r.cta,
        }))}
      />
    </>
  );
}

function CaseStudyField({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-6 first:mt-0">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">{label}</p>
      <p className="mt-2 text-body text-fg-primary text-pretty">{body}</p>
    </div>
  );
}

function CaseStudyMetricsRow({ metrics }: { metrics: ReadonlyArray<CaseStudyMetric> }) {
  // Only render the metrics row if at least one metric value is non-placeholder.
  const realMetrics = metrics.filter((m) => !m.value.startsWith('{{'));
  if (realMetrics.length === 0) return null;

  return (
    <Grid as="dl" cols={12} gap={6} className="mt-10 pt-8 border-t border-[color:var(--border-subtle)]">
      {realMetrics.map((m) => (
        <div key={m.label} className="col-span-12 sm:col-span-4">
          <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted">
            {m.label}
          </dt>
          <dd className="mt-2 font-display text-heading-1 text-fg-primary tracking-tight">
            {m.value}
          </dd>
        </div>
      ))}
    </Grid>
  );
}
