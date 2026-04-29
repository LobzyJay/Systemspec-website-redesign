/**
 * Developers landing page copy — STSL
 * Source: STSL-build-brief_1.md §6.4 (developers v1)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const developersCopy = {
  hero: {
    eyebrow: 'DEVELOPERS',
    headline: 'Build on Pouchii Infrastructure.',
    subheadline:
      'A consolidated API for accounts, payments, and service aggregation, on rails STSL has operated for Nigerian banks since 1992.',
    primaryCta: { label: 'Request sandbox', href: '/contact?audience=fintech&intent=sandbox' },
    secondaryCta: { label: 'Read API overview', href: '#api-surface' },
  },

  apiSurface: {
    eyebrow: 'API SURFACE',
    headline: 'Three categories. One contract.',
    lede: 'Endpoints are grouped into the three things product teams actually need: hold money, move money, deliver services.',
    categories: [
      {
        title: 'Accounts',
        endpoints: [
          'Create virtual account',
          'List accounts',
          'Retrieve balance',
          'Webhook: account credited',
        ],
        body: 'Programmable virtual accounts on CBN-licensed financial institutions, with reconciliation and reporting built in.',
      },
      {
        title: 'Payments',
        endpoints: [
          'Initiate transfer',
          'Retrieve transfer status',
          'List transfers',
          'Webhook: transfer settled',
        ],
        body: 'Inter-bank and intra-bank transfers across every Nigerian institution, with signed webhooks for state changes.',
      },
      {
        title: 'Service aggregation',
        endpoints: [
          'Purchase airtime / data',
          'Pay utility bill',
          'Quote and bind insurance',
          'Initiate loan disbursement',
        ],
        body: 'Airtime, data, utilities, bills, lending, and insurance behind a single integration.',
      },
    ],
  },

  codeSample: {
    eyebrow: 'EXAMPLE',
    headline: 'Create a virtual account.',
    description: 'Authenticated POST against the sandbox. Returns a virtual account ready to receive funds.',
    language: 'bash',
    code: `curl https://sandbox.pouchii.com/v1/accounts \\
  -H "Authorization: Bearer $POUCHII_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_reference": "cust_8821",
    "name": "Adaeze Okeke",
    "bvn": "22212345678"
  }'`,
    response: `{
  "id": "acct_01HFXJ2K8R",
  "account_number": "9035124417",
  "bank": "Polaris Bank",
  "status": "active",
  "customer_reference": "cust_8821"
}`,
  },

  sandbox: {
    eyebrow: 'SANDBOX',
    headline: 'Live sandbox, in under a day.',
    body: 'Sandbox credentials are issued inside one business day. No procurement gate to start building. Production credentials follow standard KYB.',
    primaryCta: { label: 'Request sandbox', href: '/contact?audience=fintech&intent=sandbox' },
    secondaryCta: { label: 'Talk to a solutions engineer', href: '/contact?audience=fintech&intent=engineering' },
  },

  partners: {
    eyebrow: 'INTEGRATION PARTNERS',
    headline: 'In production with operators across the stack.',
    body: 'Pouchii powers wallets, lending products, biller flows, and white-label apps for partners across Nigerian fintech and beyond.',
    partners: [
      { name: 'Polaris', useCase: 'Virtual account issuance and collections at scale.' },
      { name: 'IBILEHUB', useCase: 'Embedded payments inside an SME operating platform.' },
      { name: 'Unicoop', useCase: 'White-label wallet and scheme payouts for cooperative members.' },
      { name: 'NASD', useCase: 'Settlement and beneficiary disbursement for market operations.' },
    ],
  },

  docs: {
    eyebrow: 'REFERENCE',
    headline: 'Full docs are coming.',
    body: 'A full developer portal with live API reference and interactive tooling is in build. Until it ships, request the current PDF reference and the team will walk you through it.',
    primaryCta: { label: 'Request reference docs', href: '/contact?audience=fintech&intent=docs' },
    secondaryCta: { label: 'Join the developer waitlist', href: '/contact?audience=fintech&intent=waitlist' },
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Get a key. Start building.',
    body: 'Sandbox in under a day. Named integration support while you build.',
    primaryCta: { label: 'Request sandbox', href: '/contact?audience=fintech&intent=sandbox' },
    secondaryCta: { label: 'See Pouchii', href: '/products/pouchii' },
  },
} as const

export type DevelopersCopy = typeof developersCopy
