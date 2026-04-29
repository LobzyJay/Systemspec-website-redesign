/**
 * Community solution page copy — STSL
 * Source: STSL-build-brief_1.md §6.2 (template), §4.4 (cooperative/scheme audience)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const communitySolutionCopy = {
  hero: {
    eyebrow: 'COMMUNITY',
    headline: 'Wallet and scheme infrastructure for cooperatives and operators.',
    subheadline:
      'Branded wallets, white-label payment apps, and scheme management built on the same rails STSL operates for banks.',
    primaryCta: { label: 'Talk to community sales', href: '/contact?audience=community' },
    secondaryCta: { label: 'See capabilities', href: '#capabilities' },
  },

  intro: {
    eyebrow: 'OVERVIEW',
    headline: 'Bank-grade rails, in your brand.',
    body: 'Cooperatives, association schemes, and ecosystem operators need the same infrastructure banks run, without standing up a bank. STSL provides the wallet, payment, and scheme tooling under your brand, with our compliance posture and our 24/7 operations behind it.',
  },

  capabilities: {
    eyebrow: 'CAPABILITIES',
    headline: 'What we operate for community operators.',
    blocks: [
      {
        title: 'Branded wallets',
        body: 'White-label wallets for cooperatives, associations, and ecosystem operators. Members fund, save, transact, and pay schemes from a single account in your colours.',
      },
      {
        title: 'Contributions and savings',
        body: 'Recurring contributions, target savings, and ajo-style schemes with reporting your treasurer can defend at the AGM.',
      },
      {
        title: 'Payouts and disbursements',
        body: 'Bulk and scheduled disbursements to members, vendors, and beneficiaries across every Nigerian bank and mobile money operator.',
      },
      {
        title: 'Loans and credit schemes',
        body: 'Member lending with origination, scoring, repayment, and collections suited to cooperative and association rules.',
      },
      {
        title: 'Member onboarding',
        body: 'BVN, NIN, and document capture flows that satisfy NDPR and the records cooperative regulators expect.',
      },
      {
        title: 'Admin and oversight',
        body: 'Dashboards for executives, treasurers, and auditors. Roles, approvals, and audit trails out of the box.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From scheme to live wallet.',
    steps: [
      {
        n: '01',
        title: 'Scoping',
        body: 'A working session with your executive and operations team to map scheme rules, contribution patterns, and payout flows.',
      },
      {
        n: '02',
        title: 'Configuration',
        body: 'White-label setup, brand application, and scheme rules configured against your constitution and bylaws.',
      },
      {
        n: '03',
        title: 'Member rollout',
        body: 'Onboarding flows, training material, and a phased member rollout that does not break existing routines.',
      },
      {
        n: '04',
        title: 'Run',
        body: 'Day-to-day operations, member support, and reporting to your executive and regulatory bodies.',
      },
    ],
  },

  caseStudy: {
    eyebrow: 'CASE STUDY',
    headline: 'A branded wallet for a national cooperative.',
    client: 'Unicoop',
    challenge:
      'A national cooperative was running contributions, loans, and payouts across three vendors and a chain of bank statements no treasurer could reconcile cleanly. Final scope details anonymised at first publish per §11.',
    approach: 'STSL stood up a single white-label wallet on Pouchii rails, mapped scheme rules from the cooperative\'s constitution into the platform, and replaced the disbursement spreadsheet with a controlled approval flow.',
    outcome: 'Members fund, save, and receive payouts from one app. The treasurer closes the books in hours instead of weeks.',
    metrics: [
      { value: '120k+', label: 'Members onboarded' },
      { value: 'NGN 4.2B', label: 'Contributions processed in year one' },
      { value: '8 weeks', label: 'Scoping to live wallet' },
    ],
    cta: { label: 'Read case study', href: '/company/press' },
  },

  compliance: {
    eyebrow: 'COMPLIANCE AND SECURITY',
    headline: 'Built on regulated rails.',
    body: 'Community wallets ride on CBN-licensed financial institutions through STSL. Funds are held in regulated accounts, not in our own ledgers.',
    items: [
      { label: 'CBN-licensed partners', body: 'Member balances held with CBN-licensed financial institutions.' },
      { label: 'NDPR', body: 'Member data handled under the Nigeria Data Protection Regulation.' },
      { label: 'KYC', body: 'BVN and NIN verification with audit trails for cooperative and regulatory review.' },
      { label: 'Operations', body: '24/7 monitoring with named support contacts for executive committees.' },
    ],
  },

  faqs: {
    eyebrow: 'FAQS',
    headline: 'How operators evaluate the platform.',
    items: [
      {
        q: 'Where are member funds held?',
        a: 'With CBN-licensed financial institutions through virtual accounts. STSL never custodies member balances on its own ledger.',
      },
      {
        q: 'Can the wallet be fully white-labelled?',
        a: 'Yes. Brand, name, and member-facing flows are yours. STSL operates the rails underneath.',
      },
      {
        q: 'How are scheme rules configured?',
        a: 'During onboarding we map your constitution, bylaws, and scheme structures into the platform. Changes after go-live are supported through our operations team.',
      },
      {
        q: 'What happens if our membership grows quickly?',
        a: 'The platform runs on the same rails as our banking infrastructure. Capacity is not the constraint.',
      },
      {
        q: 'Do you support cooperative and association regulators?',
        a: 'Yes. Reporting is configured to the regulators your cooperative answers to.',
      },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Talk to the community team.',
    body: 'A 30-minute call to map your scheme onto the platform.',
    primaryCta: { label: 'Talk to community sales', href: '/contact?audience=community' },
    secondaryCta: { label: 'See Pouchii', href: '/products/pouchii' },
  },
} as const

export type CommunitySolutionCopy = typeof communitySolutionCopy
