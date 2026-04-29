/**
 * Audience-segmented CTA modal copy — STSL
 * Source: STSL-build-brief_1.md §3.4 (CTA leak), §4.4 (audience table)
 *
 * This is the modal that opens from the site-wide "Talk to sales" button.
 * Audience names match brief §4.4 verbatim.
 */

export const audienceCtasCopy = {
  modal: {
    eyebrow: 'TALK TO US',
    headline: 'Pick the conversation that fits.',
    subheadline:
      'Every audience routes to the team that handles their work. No general inbox.',
    closeLabel: 'Close',
  },

  routes: [
    {
      slug: 'banking',
      audience: 'Banks',
      summary: 'Core integrations, virtual accounts, references.',
      cta: 'Talk to banking sales',
      href: '/contact?audience=banking',
    },
    {
      slug: 'fintech',
      audience: 'Fintechs and PSPs',
      summary: 'API access, sandbox, pricing, uptime.',
      cta: 'Request API access',
      href: '/contact?audience=fintech',
    },
    {
      slug: 'government',
      audience: 'Government',
      summary: 'E-Gov capability, procurement, references.',
      cta: 'Government enquiries',
      href: '/contact?audience=government',
    },
    {
      slug: 'community',
      audience: 'Cooperatives and operators',
      summary: 'Wallet, white-label, scheme infrastructure.',
      cta: 'Talk to community sales',
      href: '/contact?audience=community',
    },
    {
      slug: 'enterprise',
      audience: 'Enterprise IT',
      summary: 'Software services, team depth.',
      cta: 'Discuss a project',
      href: '/contact?audience=enterprise',
    },
    {
      slug: 'partners',
      audience: 'Partners',
      summary: 'Co-sell and integration partnerships.',
      cta: 'Become a partner',
      href: '/contact?audience=partners',
    },
    {
      slug: 'press',
      audience: 'Press and analysts',
      summary: 'Media kit, leadership comment, group context.',
      cta: 'Press resources',
      href: '/contact?audience=press',
    },
    {
      slug: 'careers',
      audience: 'Candidates',
      summary: 'Open roles in engineering, product, and operations.',
      cta: 'View open roles',
      href: '/company/careers',
    },
  ],

  fallback: {
    label: 'Not sure where to start?',
    cta: 'Send a general enquiry',
    href: '/contact?audience=general',
  },

  navTriggers: {
    primary: { label: 'Talk to sales', ariaLabel: 'Open audience-segmented sales menu' },
    secondary: { label: 'Government enquiries', href: '/contact?audience=government' },
  },

  footerCta: {
    eyebrow: 'TALK TO US',
    headline: 'Find the right room.',
    body: 'A 30-minute call with the team that handles your work, not a generic inbox.',
    cta: 'Talk to sales',
  },
} as const

export type AudienceCtasCopy = typeof audienceCtasCopy
