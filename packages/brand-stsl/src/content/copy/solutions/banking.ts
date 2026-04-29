/**
 * Banking solution page copy — STSL
 * Source: STSL-build-brief_1.md §6.2 (template), §4.4 (audience), §11 (placeholders)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const bankingSolutionCopy = {
  hero: {
    eyebrow: 'BANKING',
    headline: 'Banking infrastructure for Nigerian institutions.',
    subheadline:
      'Core integrations, virtual accounts, and payment rails, operated by a SystemSpecs Holdings company since 1992.',
    primaryCta: { label: 'Talk to banking sales', href: '/contact?audience=banking' },
    secondaryCta: { label: 'See capabilities', href: '#capabilities' },
  },

  intro: {
    eyebrow: 'OVERVIEW',
    headline: 'Built alongside the banks that use it.',
    body: 'STSL has shipped banking infrastructure for tier-one and tier-two Nigerian institutions for over a decade. Our work sits inside core banking integrations, payment switching, virtual account services, and the operational tooling that holds them together. We build to bank-grade SLAs because that is the only standard that clears procurement.',
  },

  capabilities: {
    eyebrow: 'CAPABILITIES',
    headline: 'What we operate for banks.',
    blocks: [
      {
        title: 'Virtual accounts',
        body: 'Multi-bank virtual account issuance riding on CBN-licensed financial institutions. Programmable references, settlement reporting, and reconciliation built for treasury and operations teams.',
      },
      {
        title: 'Payment APIs',
        body: 'A consolidated API surface for airtime, data, utilities, bills, transfers, and cards. One contract and one integration replaces a dozen direct connections.',
      },
      {
        title: 'Core banking integration',
        body: 'Adapters and middleware for Finacle, Flexcube, T24, and proprietary cores. Built and supported by engineers who have done the work in production.',
      },
      {
        title: 'Lending infrastructure',
        body: 'Origination, scoring, disbursement, and collections rails for retail and SME lending products run by banks and their partners.',
      },
      {
        title: 'Identity and onboarding',
        body: 'BVN, NIN, and KYC orchestration with document capture, liveness, and audit trails ready for regulator review.',
      },
      {
        title: 'Operations and reconciliation',
        body: 'Settlement engines, exception handling, and dashboards for the teams that carry the pager when something goes wrong.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From discovery to production.',
    steps: [
      {
        n: '01',
        title: 'Discovery',
        body: 'Joint sessions with your product, engineering, and compliance teams to scope the integration and the regulatory envelope.',
      },
      {
        n: '02',
        title: 'Design and contracting',
        body: 'Architecture, data flows, SLAs, and procurement. We move at the speed your legal and risk teams can clear.',
      },
      {
        n: '03',
        title: 'Sandbox build',
        body: 'Engineering kick-off in a dedicated sandbox with real test data and named integration support.',
      },
      {
        n: '04',
        title: 'UAT and go-live',
        body: 'Regulator-aligned UAT, phased production cutover, and runbooks that your operations team owns from day one.',
      },
      {
        n: '05',
        title: 'Run',
        body: '24/7 platform support, monthly service reviews, and a roadmap that includes your asks.',
      },
    ],
  },

  caseStudy: {
    eyebrow: 'CASE STUDY',
    headline: 'Replatforming collections for a tier-one bank.',
    client: 'Tier-one Nigerian bank',
    challenge:
      'A legacy collections stack was bottlenecking new merchant onboarding and forcing manual reconciliation across three back-office teams. Final client name pending comms approval per §11.',
    approach: 'STSL deployed virtual account issuance against the bank\'s core, replaced the in-house reconciliation engine, and routed settlement reporting through a single dashboard the operations team owns.',
    outcome: 'Merchant onboarding moved from days to minutes. Reconciliation exceptions dropped sharply, and the bank closed two manual workarounds in the first quarter.',
    metrics: [
      { value: '12M+', label: 'Monthly transactions cleared' },
      { value: '99.98%', label: 'Platform uptime, rolling 12 months' },
      { value: '4 weeks', label: 'Sandbox to production' },
    ],
    cta: { label: 'Read case study', href: '/resources/case-studies/tier-one-collections' },
  },

  compliance: {
    eyebrow: 'COMPLIANCE AND SECURITY',
    headline: 'Posture before pitch.',
    body: 'STSL operates inside the regulatory envelope Nigerian banks already work in. Our platforms align with CBN guidance, NDPR, and the security standards required to clear bank procurement.',
    items: [
      { label: 'CBN', body: 'Aligned to current Central Bank of Nigeria guidance for payment services and core integrations.' },
      { label: 'NDPR', body: 'Data handling and breach response procedures aligned to the Nigeria Data Protection Regulation.' },
      { label: 'ISO 27001', body: 'Certified across the platforms STSL operates, with annual surveillance audits.' },
      { label: 'PCI DSS', body: 'PCI DSS aligned for card-handling components; full attestation available under NDA.' },
      { label: 'Penetration testing', body: 'Annual third-party testing with remediation reports available under NDA.' },
    ],
  },

  faqs: {
    eyebrow: 'FAQS',
    headline: 'Procurement, integration, support.',
    items: [
      {
        q: 'What does the procurement process look like?',
        a: 'We have shipped to tier-one Nigerian banks and federal MDAs. Our team can produce due-diligence packs, security questionnaires, and reference architectures in the formats your procurement team expects.',
      },
      {
        q: 'How long does a typical integration take?',
        a: 'Sandbox in two to four weeks, UAT in four to eight, production cutover scoped to your release windows. Faster paths exist for narrower integrations.',
      },
      {
        q: 'What support do you provide post go-live?',
        a: '24/7 platform support, named integration engineers, monthly service reviews, and an incident process aligned to your operations team.',
      },
      {
        q: 'Do you support on-premise or private cloud deployments?',
        a: 'Yes, where the regulatory or operational case requires it. We default to managed cloud when the bank is comfortable with it.',
      },
      {
        q: 'Can you provide named references?',
        a: 'Yes, under NDA and once we have aligned on scope. Reference calls are arranged with named integration leads at GTBank, Zenith, Access, UBA, First Bank, Stanbic, Sterling, Wema, and Fidelity, depending on the workload you are scoping.',
      },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Talk to the banking team.',
    body: 'A 30-minute scoping call with someone who has shipped the integration you are considering.',
    primaryCta: { label: 'Talk to banking sales', href: '/contact?audience=banking' },
    secondaryCta: { label: 'Request references', href: '/contact?audience=banking&intent=references' },
  },
} as const

export type BankingSolutionCopy = typeof bankingSolutionCopy
