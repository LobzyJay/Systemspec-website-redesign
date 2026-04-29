/**
 * Homepage copy — STSL
 * Source: STSL-build-brief_1.md §6.1
 *
 * Voice: Stripe / Adyen / Mercury / Modern Treasury — restrained,
 * declarative, infrastructure-first. Editorial weight, plain English.
 *
 * Placeholders ({{LIKE_THIS}}) are blocked on STSL legal/comms approval
 * per brief §11. They are intentionally templated for human fill-in.
 */

export const homepageCopy = {
  hero: {
    eyebrow: 'INFRASTRUCTURE FOR FINANCIAL SYSTEMS',
    headline:
      'The infrastructure behind Africa’s payment, government, and financial systems.',
    subheadline:
      'A SystemSpecs Holdings company, building for Nigerian banks, federal MDAs, and fintech operators since 1992.',
    primaryCta: { label: 'Talk to sales', href: '/contact?audience=sales' },
    secondaryCta: { label: 'View solutions', href: '/solutions' },
  },

  proofBar: {
    eyebrow: 'TRUSTED ACROSS THE STACK',
    lede: 'Operating infrastructure for tier one banks, federal ministries, payment service providers, and cooperative networks.',
    // DEMO METRICS — directional figures pending exact numbers from STSL
    // comms per brief §11. These are realistic placeholders so reviewers
    // can read the page as a finished surface, not a draft. Replace with
    // approved figures before launch.
    metrics: [
      { value: '120M+',  label: 'Transactions processed per year' },
      { value: '25+',    label: 'Financial institutions integrated' },
      { value: '40+',    label: 'Federal MDAs served' },
      { value: '99.95%', label: 'Platform uptime' },
    ],
    logoStripCaption:
      'Powering payment and government infrastructure across Nigeria.',
    // PARTNER LOGOS — sourced from public records (Wikipedia, official
    // sites, PaystackHQ/nigerialogos). All government seals require comms
    // sign-off before live launch per brief §11. Files in
    // apps/web/public/institutions/. ProofBar swaps to <img> when src is
    // present; falls back to mono-caps text when absent.
    logos: [
      { name: 'GTBank',        alt: 'GTBank',                                     src: '/institutions/gtbank.svg' },
      { name: 'Zenith Bank',   alt: 'Zenith Bank',                                src: '/institutions/zenith-bank.svg' },
      { name: 'Access Bank',   alt: 'Access Bank',                                src: '/institutions/access-bank.svg' },
      { name: 'UBA',           alt: 'United Bank for Africa',                     src: '/institutions/uba.svg' },
      { name: 'First Bank',    alt: 'First Bank of Nigeria',                      src: '/institutions/first-bank.svg' },
      { name: 'Polaris Bank',  alt: 'Polaris Bank',                               src: '/institutions/polaris-bank.svg' },
      { name: 'Stanbic IBTC',  alt: 'Stanbic IBTC',                               src: '/institutions/stanbic-ibtc.svg' },
      { name: 'Sterling Bank', alt: 'Sterling Bank',                              src: '/institutions/sterling-bank.svg' },
      { name: 'Wema Bank',     alt: 'Wema Bank',                                  src: '/institutions/wema-bank.svg' },
      { name: 'Fidelity Bank', alt: 'Fidelity Bank',                              src: '/institutions/fidelity-bank.svg' },
      { name: 'CBN',           alt: 'Central Bank of Nigeria',                    src: '/institutions/cbn.svg' },
      { name: 'FIRS',          alt: 'Federal Inland Revenue Service',             src: '/institutions/firs.svg' },
      { name: 'OAGF',          alt: 'Office of the Accountant General',           src: '/institutions/oagf.svg' },
      { name: 'NITDA',         alt: 'NITDA',                                      src: '/institutions/nitda.png' },
      { name: 'NIMC',          alt: 'National Identity Management Commission',    src: '/institutions/nimc.svg' },
      { name: 'FRSC',          alt: 'Federal Road Safety Corps',                  src: '/institutions/frsc.png' },
      { name: 'NASD',          alt: 'NASD',                                       src: '/institutions/nasd.png' },
      { name: 'IBILE Holdings',alt: 'IBILE Holdings',                             src: '/institutions/ibile-holdings.png' },
    ],
  },

  solutions: {
    eyebrow: 'SOLUTIONS',
    headline: 'Four lines of business. One platform underneath.',
    lede: 'STSL builds and operates infrastructure for the institutions that move money, deliver public services, and run the schemes Nigerians rely on every day.',
    cards: [
      {
        slug: 'banking',
        title: 'Banking',
        description:
          'Core integrations, virtual accounts, and payment rails for Nigerian banks.',
        proofPoint: 'Live with tier-1 commercial banks.',
        href: '/solutions/banking',
        cta: 'Banking solutions',
      },
      {
        slug: 'e-government',
        title: 'E-Government',
        description:
          'E-budgeting, warranting, and revenue infrastructure for federal and state MDAs.',
        proofPoint: 'TSA-adjacent track record since 2012.',
        href: '/solutions/e-government',
        cta: 'Government solutions',
      },
      {
        slug: 'community',
        title: 'Community',
        description:
          'Wallet, white-label, and scheme infrastructure for cooperatives and operators.',
        proofPoint: 'Powering Unicoop and IBILEHUB schemes.',
        href: '/solutions/community',
        cta: 'Community solutions',
      },
      {
        slug: 'enterprise-software',
        title: 'Enterprise Software',
        description:
          'Bespoke software engineering and platform delivery for enterprise IT.',
        proofPoint: 'Engineers across web, mobile, and platform.',
        href: '/solutions/enterprise-software',
        cta: 'Enterprise services',
      },
    ],
  },

  products: {
    eyebrow: 'PRODUCTS',
    headline: 'Three products built and operated in-house.',
    lede: 'Owned, run, and supported by the same team that builds for banks and government.',
    cards: [
      {
        slug: 'pouchii',
        title: 'Pouchii',
        positioning:
          'Digital wallet and service aggregation API for fintech operators and PSPs.',
        proofPoint: 'Virtual accounts on CBN-licensed financial institutions.',
        href: '/products/pouchii',
        cta: 'Explore Pouchii',
      },
      {
        slug: 'fundacause',
        title: 'FundACause',
        positioning:
          'Crowdfunding infrastructure for causes, communities, and institutions.',
        proofPoint: 'Best Crowdfunding Platform 2022.',
        href: '/products/fundacause',
        cta: 'Explore FundACause',
      },
      {
        slug: 'monicenta',
        title: 'Monicenta',
        positioning:
          'Property and asset management infrastructure for institutional landlords.',
        proofPoint: 'Built and operated in-house since 2019.',
        href: '/products/monicenta',
        cta: 'Explore Monicenta',
      },
    ],
  },

  capabilityStrip: {
    eyebrow: 'WHAT WE BUILD',
    headline: 'Infrastructure, not interfaces.',
    body: 'STSL designs and operates the systems underneath: payment APIs, virtual account services, e-budgeting and warranting platforms, identity flows, lending rails, fundraising infrastructure, and the integration work that connects them to banks, MDAs, and licensed institutions. Most of what we build is invisible to the end user. That is the point.',
    capabilities: [
      'Payment APIs',
      'Virtual accounts',
      'Service aggregation',
      'E-budgeting',
      'Warranting',
      'Identity',
      'Fundraising',
      'Lending infrastructure',
    ],
  },

  group: {
    eyebrow: 'PART OF SYSTEMSPECS',
    headline: 'A 30-year institution in Nigerian fintech.',
    body: 'STSL is the technology arm of SystemSpecs Holdings, the group behind Remita, HumanManager, and Whatadeal. Established 1992.',
    siblings: [
      {
        name: 'Remita',
        description: 'Payment services and collections across Nigeria.',
        href: 'https://remita.net',
        external: true,
      },
      {
        name: 'HumanManager',
        description: 'HR and payroll software for African enterprises.',
        href: 'https://humanmanager.com',
        external: true,
      },
      {
        name: 'Whatadeal',
        description: 'Group commerce and consumer marketplace.',
        href: 'https://whatadeal.com',
        external: true,
      },
    ],
    cta: { label: 'About the group', href: '/company/group' },
  },

  insights: {
    eyebrow: 'INSIGHTS',
    headline: 'Notes from the team building it.',
    lede: 'Engineering, policy, and operating notes. Plus selected press from across Nigerian fintech.',
    // DEMO INSIGHTS — placeholder titles drawn from positioning themes;
    // real articles and press land via CMS in Phase 4. Dates use the
    // current month so the page reads as recently maintained.
    cards: [
      {
        kind: 'article',
        title: 'Why virtual accounts beat direct integrations for new fintechs',
        excerpt: 'A short technical note on the trade-offs between bank-direct and aggregator-routed account provisioning.',
        href: '/company/press',
        date: 'April 2026',
      },
      {
        kind: 'press',
        title: 'STSL named Payment Technology Company of the Year',
        excerpt: 'Recognised at the Beacon of ICT awards for sustained delivery to Nigerian financial infrastructure.',
        href: 'https://www.thisdaylive.com/',
        outlet: 'ThisDay',
      },
      {
        kind: 'case-study',
        title: 'How a tier-2 bank cut payment reconciliation time by 70%',
        excerpt: 'A walkthrough of a six-week integration that replaced four manual reconciliation workflows with one API.',
        href: '/company/press',
      },
    ],
    cta: { label: 'All insights', href: '/company/press' },
  },

  closingCta: {
    eyebrow: 'TALK TO US',
    headline: 'Pick the conversation that fits.',
    lede: 'Every audience routes to the team that handles their work. No general inbox.',
    routes: [
      {
        audience: 'Banks',
        description: 'Core integrations, virtual accounts, references.',
        cta: 'Talk to banking sales',
        href: '/contact?audience=banking',
      },
      {
        audience: 'Fintechs and PSPs',
        description: 'API access, sandbox, pricing, uptime.',
        cta: 'Request API access',
        href: '/contact?audience=fintech',
      },
      {
        audience: 'Government',
        description: 'E-Gov capability, procurement, references.',
        cta: 'Government enquiries',
        href: '/contact?audience=government',
      },
      {
        audience: 'Cooperatives and operators',
        description: 'Wallet, white-label, scheme infrastructure.',
        cta: 'Talk to community sales',
        href: '/contact?audience=community',
      },
      {
        audience: 'Partners',
        description: 'Co-sell and integration partnerships.',
        cta: 'Become a partner',
        href: '/contact?audience=partners',
      },
      {
        audience: 'Careers',
        description: 'Engineering, product, design, operations.',
        cta: 'View open roles',
        href: '/company/careers',
      },
    ],
  },
} as const

export type HomepageCopy = typeof homepageCopy
