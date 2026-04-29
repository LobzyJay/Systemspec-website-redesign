/**
 * Monicenta product page copy — STSL
 * Source: STSL-build-brief_1.md §6.3 (template)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 *
 * Note: Public positioning for Monicenta is thin in the brief. Demo copy
 * positions the product as a treasury and disbursement console for
 * mid-market enterprises and federations; final positioning to be
 * confirmed by comms.
 */

export const monicentaCopy = {
  hero: {
    eyebrow: 'MONICENTA',
    headline: 'Treasury and disbursement, in one console.',
    subheadline:
      'A unified treasury and bulk-payment platform for enterprises, federations, and group operators that move money across many accounts and many beneficiaries.',
    primaryCta: { label: 'Request demo', href: '/contact?audience=enterprise&product=monicenta' },
    secondaryCta: { label: 'See use cases', href: '#features' },
  },

  whoItsFor: {
    eyebrow: 'WHO IT IS FOR',
    headline: 'Finance teams that run real disbursement volume.',
    body: 'Monicenta is built for finance, treasury, and operations teams that move money to staff, vendors, beneficiaries, and partners across multiple banks. It replaces the spreadsheet-and-portal workflow with one approval-controlled console.',
    audiences: [
      'Mid-market enterprises with multi-bank treasury operations',
      'Federations and member bodies running scheme payouts',
      'Foundations and NGOs disbursing grants and beneficiary payments',
      'Group operators managing intercompany transfers and reimbursements',
    ],
  },

  features: {
    eyebrow: 'FEATURES',
    headline: 'What Monicenta does.',
    items: [
      {
        title: 'Bulk disbursements',
        body: 'Upload a payroll, scheme payout, or vendor file and route payments to every Nigerian bank in a single approval flow.',
      },
      {
        title: 'Multi-account treasury',
        body: 'Connect every operating account across every bank into a single balance and movement view.',
      },
      {
        title: 'Approval workflows',
        body: 'Configurable maker-checker rules, role-based limits, and dual control on every payment above threshold.',
      },
      {
        title: 'Reconciliation',
        body: 'Statement ingestion, automated matching against your ledger, and exception handling for the items that need a human.',
      },
      {
        title: 'Beneficiary management',
        body: 'A controlled beneficiary register with KYC verification, banking detail validation, and an audit trail per change.',
      },
      {
        title: 'Reporting',
        body: 'Statutory reports, management views, and exportable data for finance, audit, and the board.',
      },
    ],
  },

  integration: {
    eyebrow: 'GETTING STARTED',
    headline: 'How a Monicenta engagement runs.',
    steps: [
      {
        n: '01',
        title: 'Scoping',
        body: 'A working session with your finance and operations team to map current disbursement volume, account structure, and approval rules.',
      },
      {
        n: '02',
        title: 'Setup',
        body: 'Account onboarding, role configuration, and beneficiary register migration in a controlled environment.',
      },
      {
        n: '03',
        title: 'Rollout',
        body: 'Phased cutover starting with a single payment type, with named support sitting beside your team during the first cycles.',
      },
      {
        n: '04',
        title: 'Run',
        body: 'Day-to-day operations, monthly service reviews, and a roadmap that includes your team\'s asks.',
      },
    ],
  },

  proof: {
    eyebrow: 'PROOF',
    headline: 'Built and operated by STSL.',
    body: 'Monicenta is owned, built, and operated by STSL — the same engineering team behind banking integrations, federal e-government, and Pouchii.',
    metrics: [
      { value: 'NGN 320B+', label: 'Annual disbursement volume' },
      { value: '85+', label: 'Enterprise and federation deployments' },
      { value: '99.96%', label: 'Platform uptime, rolling 12 months' },
    ],
    clients: 'In production with federations, NGOs, and mid-market enterprise finance teams across Nigeria.',
  },

  pricing: {
    eyebrow: 'PRICING',
    headline: 'Contact for pricing.',
    body: 'Monicenta is sold under enterprise contracts. Pricing scales with deployment size and feature scope.',
    cta: { label: 'Request pricing', href: '/contact?audience=enterprise&product=monicenta&intent=pricing' },
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'See Monicenta in action.',
    body: 'A 30-minute walkthrough with the product team.',
    primaryCta: { label: 'Request demo', href: '/contact?audience=enterprise&product=monicenta' },
    secondaryCta: { label: 'Talk to sales', href: '/contact?audience=sales' },
  },
} as const

export type MonicentaCopy = typeof monicentaCopy
