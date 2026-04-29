/**
 * Group page copy — STSL
 * Source: STSL-build-brief_1.md §6.5 (group), §2 (sister companies)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const groupCopy = {
  hero: {
    eyebrow: 'GROUP',
    headline: 'STSL inside SystemSpecs Holdings.',
    subheadline:
      'Four companies under one 30-year holding. STSL is the technology arm.',
    primaryCta: { label: 'Visit SystemSpecs Holdings', href: 'https://systemspecsholdings.com', external: true },
    secondaryCta: { label: 'About STSL', href: '/company' },
  },

  intro: {
    eyebrow: 'STRUCTURE',
    body: 'SystemSpecs Holdings is the parent. Underneath sit four operating companies: Remita, HumanManager, Whatadeal, and STSL. Each runs its own product and operations under shared governance, leadership, and a 30-year operating standard.',
  },

  holdings: {
    eyebrow: 'PARENT',
    name: 'SystemSpecs Holdings',
    founded: '1992',
    description:
      'The holding company. Sets governance, capital, and group strategy across the four operating subsidiaries.',
    href: 'https://systemspecsholdings.com',
  },

  subsidiaries: [
    {
      name: 'Remita',
      role: 'Payment services',
      description:
        'Payments and collections across Nigeria, including federal collections rails.',
      href: 'https://remita.net',
      external: true,
    },
    {
      name: 'HumanManager',
      role: 'HR and payroll software',
      description:
        'HR, payroll, and people management software used by enterprises across Africa.',
      href: 'https://humanmanager.com',
      external: true,
    },
    {
      name: 'Whatadeal',
      role: 'Lifestyle and member benefits',
      description: 'Lifestyle and member-benefit commerce platform inside the SystemSpecs group, serving cooperatives, federations, and corporate schemes.',
      href: 'https://whatadeal.ng',
      external: true,
    },
    {
      name: 'STSL',
      role: 'Technology arm',
      description:
        'Banking, e-government, community, and enterprise software infrastructure. Owns Pouchii, FundACause, and Monicenta.',
      href: '/',
      external: false,
    },
  ],

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Read the work.',
    primaryCta: { label: 'About STSL', href: '/company' },
    secondaryCta: { label: 'Press resources', href: '/contact?audience=press' },
  },
} as const

export type GroupCopy = typeof groupCopy
