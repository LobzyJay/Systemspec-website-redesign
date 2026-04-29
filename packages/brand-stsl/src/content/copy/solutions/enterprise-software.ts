/**
 * Enterprise Software solution page copy — STSL
 * Source: STSL-build-brief_1.md §6.2 (template), §4.4 (enterprise IT buyer)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const enterpriseSoftwareSolutionCopy = {
  hero: {
    eyebrow: 'ENTERPRISE SOFTWARE',
    headline: 'Software engineering for serious enterprise systems.',
    subheadline:
      'A SystemSpecs Holdings team that has shipped to banks, federal MDAs, and ecosystem operators since 1992.',
    primaryCta: { label: 'Discuss a project', href: '/contact?audience=enterprise' },
    secondaryCta: { label: 'See capabilities', href: '#capabilities' },
  },

  intro: {
    eyebrow: 'OVERVIEW',
    headline: 'Engineering teams that have run in production.',
    body: 'STSL provides product engineering, platform engineering, and software services to enterprise IT buyers. Our teams have shipped systems that run inside banks and federal ministries, and we structure engagements around outcomes rather than headcount.',
  },

  capabilities: {
    eyebrow: 'CAPABILITIES',
    headline: 'What we deliver.',
    blocks: [
      {
        title: 'Product engineering',
        body: 'Full-stack web and mobile delivery with product management, design, and engineering on the same team.',
      },
      {
        title: 'Platform and infrastructure',
        body: 'Cloud architecture, DevOps, observability, and the operational tooling enterprise platforms need to run quietly.',
      },
      {
        title: 'Integration and middleware',
        body: 'API design, ESB and middleware work, and the unglamorous integration that connects core systems to everything else.',
      },
      {
        title: 'Data and analytics',
        body: 'Data warehousing, ETL, and reporting layers built so that finance and operations can answer their own questions.',
      },
      {
        title: 'Modernization',
        body: 'Replatforming and refactoring of legacy enterprise systems with the operational discipline to do it without a freeze.',
      },
      {
        title: 'Managed delivery',
        body: 'Time-and-materials, fixed-scope, or managed-service engagement models with named delivery leads.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From scoping to running system.',
    steps: [
      {
        n: '01',
        title: 'Discovery',
        body: 'A short paid discovery to scope the work, pick the engagement model, and align on outcomes.',
      },
      {
        n: '02',
        title: 'Team formation',
        body: 'A named delivery lead and a team sized to the work, drawn from our standing engineering pool.',
      },
      {
        n: '03',
        title: 'Delivery',
        body: 'Sprint-based delivery with weekly demos, transparent metrics, and direct access to engineers.',
      },
      {
        n: '04',
        title: 'Handover or run',
        body: 'Either a clean handover with documentation and runbooks, or an ongoing managed-service relationship. Your call.',
      },
    ],
  },

  caseStudy: {
    eyebrow: 'CASE STUDY',
    headline: 'Replatforming a regulator portal.',
    client: 'NASD OTC Securities Exchange',
    challenge:
      'A market operator portal had outgrown its original stack and was blocking new instrument types and reporting flows. Specifics pending client approval per §11.',
    approach: 'STSL ran a paid discovery, formed a six-person team across product, design, and engineering, and replatformed the portal in phased releases without a market freeze.',
    outcome: 'New instruments shipped on the modern stack within the first quarter. The operator now ships changes weekly instead of quarterly.',
    metrics: [
      { value: '6 months', label: 'Discovery to first production release' },
      { value: '0', label: 'Market downtime windows during cutover' },
      { value: '40%', label: 'Reduction in regulatory reporting cycle time' },
    ],
    cta: { label: 'Read case study', href: '/resources/case-studies/nasd-replatform' },
  },

  compliance: {
    eyebrow: 'POSTURE',
    headline: 'Operating standards your CIO will recognise.',
    body: 'We bring the engineering discipline an enterprise CIO expects: source control, code review, automated testing, environment hygiene, and incident process.',
    items: [
      { label: 'Source and code review', body: 'Trunk-based development with mandatory review and signed commits.' },
      { label: 'Testing', body: 'Unit, integration, and end-to-end testing with coverage reported per release.' },
      { label: 'NDPR', body: 'Data handled under the Nigeria Data Protection Regulation, with documented controls.' },
      { label: 'Security', body: 'SAST and DAST tooling in CI; annual third-party testing on platforms we operate.' },
      { label: 'Documentation', body: 'Architecture decision records, runbooks, and onboarding docs delivered as part of the work.' },
    ],
  },

  faqs: {
    eyebrow: 'FAQS',
    headline: 'How CIOs evaluate us.',
    items: [
      {
        q: 'What engagement models do you support?',
        a: 'Time-and-materials, fixed-scope, and managed-service. We will recommend the model that fits your risk and budget.',
      },
      {
        q: 'How quickly can a team start?',
        a: 'Two to four weeks from contract for most engagements, sooner if the scope is small.',
      },
      {
        q: 'Where do your engineers sit?',
        a: 'Lagos, with hybrid and on-site options for engagements where physical presence matters.',
      },
      {
        q: 'How do you handle IP and code ownership?',
        a: 'Code and IP are yours, contracted explicitly. We retain rights only over reusable libraries we contribute back to our internal toolset.',
      },
      {
        q: 'Can you work alongside our internal team?',
        a: 'Yes. Most of our engagements are alongside an internal team, not in place of one.',
      },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Discuss a project.',
    body: 'A 30-minute conversation to scope the work and the engagement model.',
    primaryCta: { label: 'Discuss a project', href: '/contact?audience=enterprise' },
    secondaryCta: { label: 'See the team', href: '/company/teams' },
  },
} as const

export type EnterpriseSoftwareSolutionCopy = typeof enterpriseSoftwareSolutionCopy
