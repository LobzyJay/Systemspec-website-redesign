/**
 * Contact page copy — STSL
 * Source: STSL-build-brief_1.md §6.6 (segmented contact), §4.4 (audience names)
 *
 * Audience names match brief §4.4 verbatim where applicable.
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const contactCopy = {
  hero: {
    eyebrow: 'CONTACT',
    headline: 'Pick the conversation that fits.',
    subheadline:
      'Every audience routes to the team that handles their work. Replies inside one business day.',
  },

  routes: [
    {
      slug: 'banking',
      audience: 'Bank product / digital lead',
      title: 'Talk to banking sales',
      description:
        'Core integrations, virtual accounts, payment rails, references, and procurement support for Nigerian banks.',
      ctaLabel: 'Talk to banking sales',
      successMessage:
        'Your enquiry is with the banking team. Expect a reply inside one business day from a named integration lead.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Work email', type: 'email', required: true },
        { key: 'institution', label: 'Bank / institution', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'topic', label: 'What you are looking at', type: 'select', required: true, options: ['Core integration', 'Virtual accounts', 'Payment rails', 'Lending', 'Identity', 'Other'] },
        { key: 'message', label: 'Anything else we should know', type: 'textarea', required: false },
      ],
    },
    {
      slug: 'fintech',
      audience: 'PSP / fintech product lead',
      title: 'Request API access',
      description:
        'Sandbox, pricing, uptime, and support for fintechs and payment service providers building on Pouchii.',
      ctaLabel: 'Request API access',
      successMessage:
        'Your request is with the developer team. Sandbox credentials inside one business day for qualifying use cases.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Work email', type: 'email', required: true },
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'useCase', label: 'What you are building', type: 'textarea', required: true },
        { key: 'expectedVolume', label: 'Expected monthly volume', type: 'select', required: false, options: ['<10k', '10k–100k', '100k–1M', '>1M'] },
      ],
    },
    {
      slug: 'government',
      audience: 'Federal MDA / state ICT director',
      title: 'Government enquiries',
      description:
        'E-Gov capability, TSA-adjacent track record, procurement-ready material for federal and state MDAs.',
      ctaLabel: 'Send government enquiry',
      successMessage:
        'Your enquiry is with the government team. A capability statement and named contact inside one business day.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Official email', type: 'email', required: true },
        { key: 'mda', label: 'MDA / agency', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'topic', label: 'Area of interest', type: 'select', required: true, options: ['E-budgeting', 'Warranting / AIE', 'Revenue collection', 'Identity', 'Reporting', 'Other'] },
        { key: 'message', label: 'Anything else we should know', type: 'textarea', required: false },
      ],
    },
    {
      slug: 'community',
      audience: 'Cooperative / scheme operator',
      title: 'Talk to community sales',
      description:
        'Wallet, white-label, and scheme infrastructure for cooperatives, associations, and ecosystem operators.',
      ctaLabel: 'Talk to community sales',
      successMessage:
        'Your enquiry is with the community team. A scoping call invite inside one business day.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Email', type: 'email', required: true },
        { key: 'organisation', label: 'Cooperative / scheme', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'memberCount', label: 'Approximate membership', type: 'select', required: false, options: ['<500', '500–5,000', '5,000–50,000', '>50,000'] },
        { key: 'message', label: 'Tell us about your scheme', type: 'textarea', required: false },
      ],
    },
    {
      slug: 'enterprise',
      audience: 'Enterprise IT buyer',
      title: 'Discuss a project',
      description:
        'Software development, platform engineering, and managed delivery for enterprise IT.',
      ctaLabel: 'Discuss a project',
      successMessage:
        'Your enquiry is with the enterprise team. A scoping call invite inside one business day.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Work email', type: 'email', required: true },
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'engagement', label: 'Engagement model', type: 'select', required: false, options: ['Time and materials', 'Fixed scope', 'Managed service', 'Not sure yet'] },
        { key: 'message', label: 'Project brief', type: 'textarea', required: true },
      ],
    },
    {
      slug: 'partners',
      audience: 'Partner / channel',
      title: 'Become a partner',
      description:
        'Co-sell, integration partnerships, and channel arrangements with STSL.',
      ctaLabel: 'Become a partner',
      successMessage:
        'Your enquiry is with the partnerships team. An intro call invite inside one business day.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Work email', type: 'email', required: true },
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'partnershipType', label: 'Partnership type', type: 'select', required: true, options: ['Reseller / channel', 'Technology integration', 'Referral', 'Other'] },
        { key: 'message', label: 'Tell us about the fit', type: 'textarea', required: false },
      ],
    },
    {
      slug: 'press',
      audience: 'Press / analyst / investor',
      title: 'Press resources',
      description:
        'Media kit, leadership comment, analyst briefings, and group context.',
      ctaLabel: 'Send press request',
      successMessage:
        'Your request is with the press office. A reply inside one business day, or sooner for time-sensitive items.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Email', type: 'email', required: true },
        { key: 'outlet', label: 'Outlet / firm', type: 'text', required: true },
        { key: 'topic', label: 'Topic', type: 'text', required: true },
        { key: 'deadline', label: 'Deadline', type: 'date', required: false },
        { key: 'message', label: 'Request', type: 'textarea', required: true },
      ],
    },
    {
      slug: 'careers',
      audience: 'Candidate',
      title: 'View open roles',
      description:
        'Engineering, product, design, and operations roles across STSL and the SystemSpecs group.',
      ctaLabel: 'View open roles',
      successMessage:
        'Your application is with the people team. A reply inside one business week.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'role', label: 'Role applying for', type: 'text', required: true },
        { key: 'cv', label: 'CV / portfolio link', type: 'url', required: true },
        { key: 'message', label: 'Anything else we should know', type: 'textarea', required: false },
      ],
    },
    {
      slug: 'support',
      audience: 'Existing customer',
      title: 'Customer support',
      description:
        'Live customers and operators get routed to the support team that owns their account.',
      ctaLabel: 'Open a support request',
      successMessage:
        'Your ticket is with support. Response times follow your service agreement.',
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'workEmail', label: 'Work email', type: 'email', required: true },
        { key: 'accountId', label: 'Account / institution ID', type: 'text', required: false },
        { key: 'severity', label: 'Severity', type: 'select', required: true, options: ['P1 — production down', 'P2 — degraded', 'P3 — question', 'P4 — feature request'] },
        { key: 'message', label: 'Describe the issue', type: 'textarea', required: true },
      ],
    },
  ],

  offices: {
    eyebrow: 'OFFICES',
    headline: 'Where we are.',
    locations: [
      {
        city: 'Lagos',
        addressLines: ['Plot B22, Oniru Estate', 'Victoria Island, Lagos'],
        phone: '+234 1 279 2900',
        email: 'lagos@stsl.com.ng',
      },
      {
        city: 'Abuja',
        addressLines: ['Plot 779, Cadastral Zone A0', 'Central Business District, Abuja'],
        phone: '+234 9 461 2900',
        email: 'abuja@stsl.com.ng',
      },
    ],
  },

  channels: {
    eyebrow: 'OTHER CHANNELS',
    items: [
      { label: 'General enquiries', value: 'hello@stsl.com.ng', href: 'mailto:hello@stsl.com.ng' },
      { label: 'LinkedIn', value: 'SystemSpecs Technology Services', href: 'https://www.linkedin.com/company/systemspecs/' },
      { label: 'X', value: '@systemspecs', href: 'https://x.com/systemspecs' },
    ],
  },
} as const

export type ContactCopy = typeof contactCopy
