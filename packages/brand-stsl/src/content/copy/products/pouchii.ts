/**
 * Pouchii product page copy — STSL
 * Source: STSL-build-brief_1.md §6.3 (template), §3.5 (Pouchii substance)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const pouchiiCopy = {
  hero: {
    eyebrow: 'POUCHII',
    headline: 'A wallet and service aggregation API for fintech operators.',
    subheadline:
      'Virtual accounts on CBN-licensed institutions, plus a consolidated API for airtime, data, utilities, bills, transfers, lending, and insurance.',
    primaryCta: { label: 'Request API access', href: '/contact?audience=fintech&product=pouchii' },
    secondaryCta: { label: 'Read developer docs', href: '/developers' },
  },

  whoItsFor: {
    eyebrow: 'WHO IT IS FOR',
    headline: 'Operators who need rails, not a roadmap.',
    body: 'Pouchii is built for fintech product teams, payment service providers, cooperative wallets, and ecosystem operators who need licensed banking rails and a wide service surface without negotiating six direct integrations.',
    audiences: [
      'Fintech product teams shipping wallets and consumer apps',
      'Payment service providers building merchant or biller flows',
      'Cooperative and scheme operators needing branded wallets',
      'Enterprise platforms embedding payments inside other workflows',
    ],
  },

  features: {
    eyebrow: 'FEATURES',
    headline: 'What is in the box.',
    items: [
      {
        title: 'Virtual accounts',
        body: 'Programmable virtual accounts on CBN-licensed financial institutions, with reference, settlement, and reconciliation built in.',
      },
      {
        title: 'Bills and utilities',
        body: 'Airtime, data, electricity, cable, and government bills under one consolidated API.',
      },
      {
        title: 'Transfers',
        body: 'Inter-bank and intra-bank transfers across every Nigerian institution, with status webhooks and audit trails.',
      },
      {
        title: 'Lending rails',
        body: 'Origination, disbursement, and repayment endpoints for retail and SME lending products.',
      },
      {
        title: 'Insurance',
        body: 'Policy quoting, issuance, and claims orchestration with licensed insurance partners.',
      },
      {
        title: 'Identity',
        body: 'BVN, NIN, and KYC verification with documented audit trails for regulator review.',
      },
      {
        title: 'Webhooks and reporting',
        body: 'Signed webhooks, event replay, and a reporting layer your finance team can read directly.',
      },
      {
        title: 'Sandbox',
        body: 'A live sandbox with realistic test data, available before contract. Production credentials follow due diligence.',
      },
    ],
  },

  code: {
    eyebrow: 'API SAMPLE',
    headline: 'Issue a virtual account in one call.',
    body: 'Pouchii\'s account-creation endpoint provisions a CBN-licensed virtual account against any KYC-verified identity. Sandbox credentials are live before contract.',
    sample: {
      language: 'bash' as const,
      filename: 'create-virtual-account.sh',
      code: `curl -X POST https://api.pouchii.io/v1/accounts \\
  -H "Authorization: Bearer $POUCHII_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer": {
      "bvn": "22212345678",
      "first_name": "Adaeze",
      "last_name": "Okafor"
    },
    "currency": "NGN",
    "purpose": "collections"
  }'`,
    },
  },

  integration: {
    eyebrow: 'INTEGRATION',
    headline: 'Four steps from sandbox to production.',
    steps: [
      {
        n: '01',
        title: 'Request access',
        body: 'Tell us who you are and what you are building. Sandbox credentials inside one business day.',
      },
      {
        n: '02',
        title: 'Build in sandbox',
        body: 'Live API, realistic test data, and named integration support while you build.',
      },
      {
        n: '03',
        title: 'Due diligence',
        body: 'Standard KYB, compliance review, and contracting in parallel with your build.',
      },
      {
        n: '04',
        title: 'Go live',
        body: 'Production credentials, runbooks, and a 24/7 operations team behind the rails.',
      },
    ],
  },

  proof: {
    eyebrow: 'PROOF',
    headline: 'Built on rails that already run.',
    body: 'Pouchii rides on the same infrastructure STSL operates for banks and federal MDAs. The team behind it has been shipping payment systems in Nigeria since 1992.',
    metrics: [
      { value: 'NGN 1.8T+', label: 'Transactions processed' },
      { value: '40+', label: 'Active integrators' },
      { value: '99.97%', label: 'Platform uptime, rolling 12 months' },
    ],
    clients: 'In production with Polaris, IBILEHUB, and a roster of fintech operators across wallets, lending, and biller flows.',
  },

  pricing: {
    eyebrow: 'PRICING',
    headline: 'Volume-based, contract-led.',
    body: 'Pouchii is priced per transaction with volume tiers, plus an optional platform fee for white-label and dedicated capacity. Custom pricing for high-volume operators and PSPs.',
    cta: { label: 'Request pricing', href: '/contact?audience=fintech&product=pouchii&intent=pricing' },
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Get sandbox access.',
    body: 'Live sandbox in under 24 hours. No procurement gate to start building.',
    primaryCta: { label: 'Request API access', href: '/contact?audience=fintech&product=pouchii' },
    secondaryCta: { label: 'Read developer docs', href: '/developers' },
  },
} as const

export type PouchiiCopy = typeof pouchiiCopy
