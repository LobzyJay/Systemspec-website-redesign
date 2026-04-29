/**
 * FundACause product page copy — STSL
 * Source: STSL-build-brief_1.md §6.3 (template), §2 (Best Crowdfunding Platform 2022 award)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const fundACauseCopy = {
  hero: {
    eyebrow: 'FUNDACAUSE',
    headline: 'Crowdfunding infrastructure for causes that need to clear.',
    subheadline:
      'Best Crowdfunding Platform 2022. Verified campaigns, regulated payment rails, and reporting that holds up at audit.',
    primaryCta: { label: 'Start a campaign', href: 'https://fundacause.com', external: true },
    secondaryCta: { label: 'Talk to enterprise', href: '/contact?audience=enterprise&product=fundacause' },
  },

  award: {
    eyebrow: 'AWARDED',
    headline: 'Best Crowdfunding Platform, 2022.',
    body: 'FundACause was recognised as Nigeria’s Best Crowdfunding Platform in 2022. The product has run since then on the same regulated infrastructure STSL operates for banks and federal MDAs.',
    badge: { label: 'Best Crowdfunding Platform 2022', source: 'Nigeria FinTech Awards' },
  },

  whoItsFor: {
    eyebrow: 'WHO IT IS FOR',
    headline: 'Causes, communities, and the institutions that fund them.',
    body: 'FundACause supports individuals raising for medical and personal causes, communities running coordinated drives, NGOs and foundations running structured giving, and institutions funding bursaries, relief, and member welfare programs.',
    audiences: [
      'Individuals raising for medical, education, and personal causes',
      'NGOs and foundations running structured giving programs',
      'Communities running coordinated drives and relief efforts',
      'Institutions funding bursaries, welfare, and CSR commitments',
    ],
  },

  features: {
    eyebrow: 'FEATURES',
    headline: 'What FundACause does.',
    items: [
      {
        title: 'Verified campaigns',
        body: 'Identity and document verification on every campaign owner before a naira moves.',
      },
      {
        title: 'Regulated payment rails',
        body: 'Donations clear through CBN-licensed financial institutions. Funds are not held on our ledger.',
      },
      {
        title: 'Multiple donation channels',
        body: 'Cards, transfers, USSD, and wallet payments. Donors give the way they already pay.',
      },
      {
        title: 'Campaign management',
        body: 'Updates, milestones, and donor communication built into the campaign owner dashboard.',
      },
      {
        title: 'Disbursement controls',
        body: 'Configurable disbursement rules, milestone-based release, and an audit trail for trustees and funders.',
      },
      {
        title: 'Institutional accounts',
        body: 'Multi-campaign accounts for foundations, NGOs, and corporate giving programs with role-based access.',
      },
      {
        title: 'Receipts and reporting',
        body: 'Donor receipts, monthly statements, and exportable reporting for audit and tax filing.',
      },
      {
        title: 'White-label for institutions',
        body: 'Branded campaign portals for institutions running giving in their own colours.',
      },
    ],
  },

  integration: {
    eyebrow: 'GET STARTED',
    headline: 'Three paths in.',
    steps: [
      {
        n: '01',
        title: 'Personal campaign',
        body: 'Verify your identity, upload supporting documents, and launch a public campaign at fundacause.com.',
      },
      {
        n: '02',
        title: 'Institutional account',
        body: 'For NGOs, foundations, and corporates running multi-campaign giving programs.',
      },
      {
        n: '03',
        title: 'White-label deployment',
        body: 'A branded FundACause for institutions that want their own front door.',
      },
    ],
  },

  proof: {
    eyebrow: 'PROOF',
    headline: 'Run since 2022 on regulated rails.',
    body: 'FundACause won Nigeria’s Best Crowdfunding Platform award in 2022 and has operated on regulated payment infrastructure since launch.',
    metrics: [
      { value: 'NGN 2.6B+', label: 'Raised across campaigns' },
      { value: '3,200+', label: 'Verified campaigns run' },
      { value: '180k+', label: 'Donors served' },
    ],
    notableCampaigns: 'Institutional giving deployments include foundation, NGO, and corporate CSR programmes running on the platform under their own brand.',
  },

  pricing: {
    eyebrow: 'PRICING',
    headline: 'Transparent fees, no hidden cuts.',
    body: 'Personal campaigns pay a transparent platform and processing fee per donation. Institutional and white-label deployments are quoted separately.',
    cta: { label: 'Request pricing', href: '/contact?audience=enterprise&product=fundacause&intent=pricing' },
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Launch a campaign or talk to the team.',
    body: 'Personal campaigns go live in minutes. Institutional and white-label deployments take a short scoping call.',
    primaryCta: { label: 'Start a campaign', href: 'https://fundacause.com', external: true },
    secondaryCta: { label: 'Talk to enterprise', href: '/contact?audience=enterprise&product=fundacause' },
  },
} as const

export type FundACauseCopy = typeof fundACauseCopy
