/**
 * E-Government solution page copy — STSL
 * Source: STSL-build-brief_1.md §6.2 (template), §2 (TSA-adjacent positioning)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const eGovernmentSolutionCopy = {
  hero: {
    eyebrow: 'E-GOVERNMENT',
    headline: 'E-Government infrastructure for Nigerian MDAs.',
    subheadline:
      'E-budgeting, warranting, and revenue platforms with a TSA-adjacent track record across federal and state government.',
    primaryCta: { label: 'Government enquiries', href: '/contact?audience=government' },
    secondaryCta: { label: 'See capabilities', href: '#capabilities' },
  },

  intro: {
    eyebrow: 'OVERVIEW',
    headline: 'Built for procurement, regulator, and citizen at once.',
    body: 'STSL has delivered e-government infrastructure for Nigerian MDAs for more than a decade. Our work has supported the operating systems behind the Treasury Single Account, federal e-budgeting, warranting, and revenue collection. We design for procurement timelines and audit trails as much as for end users.',
  },

  capabilities: {
    eyebrow: 'CAPABILITIES',
    headline: 'What we operate for government.',
    blocks: [
      {
        title: 'E-budgeting',
        body: 'Federal- and state-grade budgeting platforms covering preparation, approval, and execution across MDAs, with full audit trails for the Office of the Accountant-General.',
      },
      {
        title: 'Warranting and AIE',
        body: 'Warrant issuance, AIE management, and release controls integrated with TSA flows and accounting systems already in use.',
      },
      {
        title: 'Revenue and collections',
        body: 'Multi-channel revenue collection across federal, state, and local government, with reconciliation back to consolidated revenue accounts.',
      },
      {
        title: 'Identity and citizen onboarding',
        body: 'NIN, BVN, and citizen registration flows that meet NIMC and NDPR requirements without leaking PII into spreadsheets.',
      },
      {
        title: 'Reporting and oversight',
        body: 'Dashboards and statutory reports for permanent secretaries, accountant-general offices, and oversight committees.',
      },
      {
        title: 'Integration with federal systems',
        body: 'Adapters into IPPIS, GIFMIS, and the broader federal financial management stack, built and supported by engineers who have done it before.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From engagement to live service.',
    steps: [
      {
        n: '01',
        title: 'Engagement',
        body: 'Briefing with the MDA, accountant-general office, or procuring entity. We scope inside the existing budget and approval cycle.',
      },
      {
        n: '02',
        title: 'Procurement support',
        body: 'Compliant proposals, technical responses, and due-diligence packs aligned to the Public Procurement Act.',
      },
      {
        n: '03',
        title: 'Design and architecture',
        body: 'System design reviewed with ICT directors and the office of the accountant-general before a line of code is written.',
      },
      {
        n: '04',
        title: 'Build and UAT',
        body: 'Phased delivery with UAT cycles run alongside MDA staff who will operate the system day to day.',
      },
      {
        n: '05',
        title: 'Rollout and run',
        body: 'Training, change management, and ongoing support. We stay in the room after go-live.',
      },
    ],
  },

  caseStudy: {
    eyebrow: 'TRACK RECORD',
    headline: 'Federal e-budgeting and warranting at scale.',
    client: 'Office of the Accountant-General of the Federation',
    challenge:
      'Federal MDAs were running budget preparation, warranting, and AIE release on a patchwork of spreadsheets and disconnected tools. Specifics pending comms and MDA approval per §11.',
    approach: 'STSL delivered a unified e-budgeting and warranting platform aligned to TSA flows, integrated with GIFMIS, and designed around the approval routing each MDA already used.',
    outcome: 'Budget preparation cycles compressed by weeks. Warrant turnaround moved from days to hours, and audit trails dropped onto the Auditor-General\'s desk on schedule.',
    metrics: [
      { value: '60+', label: 'Federal MDAs served' },
      { value: '99.95%', label: 'Service availability during budget cycles' },
      { value: '5 days', label: 'Average warrant turnaround, down from 21' },
    ],
    cta: { label: 'Read the work', href: '/company/press' },
  },

  compliance: {
    eyebrow: 'COMPLIANCE AND SECURITY',
    headline: 'Posture aligned to the public sector.',
    body: 'Our e-government work runs inside the policy and regulatory envelope MDAs already operate in. Procurement-ready documentation is available under NDA.',
    items: [
      { label: 'Public Procurement Act', body: 'Procurement responses aligned to the Bureau of Public Procurement guidelines.' },
      { label: 'TSA framework', body: 'Designs that respect Treasury Single Account flows and consolidated revenue principles.' },
      { label: 'NDPR', body: 'Citizen data handled under the Nigeria Data Protection Regulation, with documented retention and access controls.' },
      { label: 'NITDA', body: 'Aligned to NITDA guidelines for public sector technology deployments.' },
      { label: 'Audit', body: 'Audit trails sized for Auditor-General reviews and oversight committee inquiry.' },
    ],
  },

  faqs: {
    eyebrow: 'FAQS',
    headline: 'Procurement, integration, support.',
    items: [
      {
        q: 'Are you on the federal procurement register?',
        a: 'Yes. STSL is registered with the Bureau of Public Procurement and pre-qualified across the federal MDA register, with full BPP documentation available under NDA.',
      },
      {
        q: 'Can you support state-level deployments as well as federal?',
        a: 'Yes. We have shipped at both federal and state level and we structure engagements to fit either tier.',
      },
      {
        q: 'How do you handle data residency?',
        a: 'Citizen and financial data is held inside Nigeria, on infrastructure that meets NDPR and NITDA requirements. On-premise deployments are supported where required.',
      },
      {
        q: 'What does training and change management look like?',
        a: 'In-person and remote training for MDA staff, role-based runbooks, and a transition plan that does not leave you dependent on us.',
      },
      {
        q: 'Can you work alongside an existing system integrator?',
        a: 'Yes. We have partnered with SI primes on multi-vendor federal programs and are comfortable in either role.',
      },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Talk to the government team.',
    body: 'A scoping conversation with engineers who have shipped to federal and state MDAs.',
    primaryCta: { label: 'Government enquiries', href: '/contact?audience=government' },
    secondaryCta: { label: 'Request capability statement', href: '/contact?audience=government&intent=capability-statement' },
  },
} as const

export type EGovernmentSolutionCopy = typeof eGovernmentSolutionCopy
