/**
 * About page copy — STSL
 * Source: STSL-build-brief_1.md §6.5 (about), §2 (group context), §11 (placeholders)
 *
 * DEMO COPY — placeholders replaced with realistic content based on
 * public records of SystemSpecs Holdings group history. All names,
 * metrics, and claims must be verified by STSL comms before launch
 * per brief §11.
 */

export const aboutCopy = {
  hero: {
    eyebrow: 'ABOUT',
    headline: 'The technology arm of SystemSpecs Holdings.',
    subheadline:
      'Building Nigerian payment, government, and financial infrastructure since 1992.',
    primaryCta: { label: 'Meet the team', href: '/company/teams' },
    secondaryCta: { label: 'See the group', href: '/company/group' },
  },

  intro: {
    eyebrow: 'WHO WE ARE',
    lede: 'STSL is the technology subsidiary of SystemSpecs Holdings — the group behind Remita, HumanManager, and Whatadeal.',
    body: 'We design, build, and operate the systems that move money, deliver public services, and run the schemes Nigerians rely on. Our work is mostly invisible to the people it serves. That is the standard we hold it to.',
  },

  numbers: {
    eyebrow: 'BY THE NUMBERS',
    headline: 'A 30-year institution.',
    items: [
      { value: '1992', label: 'Group founded' },
      { value: '25+', label: 'Financial institutions integrated' },
      { value: '60+', label: 'Federal MDAs served' },
      { value: 'NGN 6T+', label: 'Transactions per year, group-wide' },
      { value: '500+', label: 'People' },
      { value: '2', label: 'Offices' },
    ],
  },

  timeline: {
    eyebrow: 'TIMELINE',
    headline: 'Three decades of Nigerian software infrastructure.',
    lede: 'Drawn from the SystemSpecs Holdings group history; STSL is the dedicated technology arm.',
    milestones: [
      { year: '1991', title: 'Registered SystemSpecs Ltd', body: 'The group is incorporated in Lagos.' },
      { year: '1992', title: 'Commenced business', body: 'Operations begin at 241 Igbosere Street, operating as a reseller of SunSystems ERP.' },
      { year: '1993', title: 'Proprietary software begins', body: 'In-house development starts with SpecPay, SpecMan, and SpecPen.' },
      { year: '1994', title: 'New HQ on Lewis Street', body: 'Group moves to a Y3K headquarters on Lewis Street under a 50-year property lease.' },
      { year: '1998', title: 'African Agent of the Year', body: 'Recognised as African Agent of the Year under the SunSystems partnership.' },
      { year: '2000', title: 'HumanManager is born', body: 'Y2K-compliant product line ships; SpecPay, SpecMan, and SpecPen merge to form HumanManager (HM).' },
      { year: '2002', title: 'KPMG appointed as auditors', body: 'Group brings on KPMG to audit the books.' },
      { year: '2006', title: 'Remita launches', body: 'Remita launches as the group’s payments and collections platform; SystemSpecs is featured as a Lagos Business School case study.' },
      { year: '2007', title: 'Dr Christopher Kolade chairs the board', body: 'Dr Christopher Kolade is appointed Chairman of the Board.' },
      { year: '2010', title: 'HumanManager Ghana', body: 'HumanManager launches in Ghana.' },
      { year: '2011', title: 'HumanManager Zimbabwe', body: 'HumanManager launches in Zimbabwe.' },
      { year: '2013', title: 'HumanManager Rwanda', body: 'HumanManager launches in Rwanda.' },
      { year: '2015', title: 'NIBSS NAPS + Stanford SEED', body: 'Group deploys the NIBSS Automated Payment System (NAPS); SystemSpecs is selected for Stanford SEED.' },
      { year: '2017', title: 'Proprietary-only + Remita Mobile', body: 'Reseller agreement with SunSystems ends; group focuses on proprietary products and launches the Remita Mobile App.' },
      { year: '2019', title: 'Partnership with CyberSource', body: 'Group enters payments partnership with CyberSource.' },
      { year: '2020', title: 'New HQ at Plot B22 Oniru', body: 'Group relocates to a new headquarters at Plot B22, Oniru, Lagos.' },
      { year: '2021', title: 'Holdings restructure', body: 'SystemSpecs Holdings Limited is formed, with Remita Payment Services Limited and SystemSpecs Technology Services Limited as subsidiaries.' },
      { year: '2022', title: 'Tier-1 PSP licence + eNaira', body: 'Group obtains Tier-1 Payment Service Provider licence; partners with the CBN on eNaira; HumanManager Limited and SystemSpecs Geelaa Limited incorporated; Dr Ernest Ndukwe appointed Chairman.' },
      { year: '2023', title: 'Remita Agency Business launches', body: 'Group launches the Remita Agency Business.' },
    ],
  },

  group: {
    eyebrow: 'PART OF SYSTEMSPECS',
    headline: 'Three sister companies.',
    body: 'STSL sits inside SystemSpecs Holdings alongside Remita, HumanManager, and Whatadeal. Each company runs its own product and operations; we share infrastructure, leadership, and a 30-year operating standard.',
    siblings: [
      {
        name: 'Remita',
        description: 'Payment services and collections across Nigeria, including federal collections rails.',
        href: 'https://remita.net',
        external: true,
      },
      {
        name: 'HumanManager',
        description: 'HR and payroll software used by enterprises across Africa.',
        href: 'https://humanmanager.com',
        external: true,
      },
      {
        name: 'Whatadeal',
        description: 'Lifestyle and member-benefit commerce platform inside the SystemSpecs group.',
        href: 'https://whatadeal.ng',
        external: true,
      },
    ],
    cta: { label: 'See the group', href: '/company/group' },
  },

  awards: {
    eyebrow: 'AWARDS',
    headline: 'Recognition across industry and government.',
    items: [
      { year: '2024', title: 'NECA Excellence Award', body: 'Nigeria Employers’ Consultative Association.' },
      { year: '2022', title: 'Best Crowdfunding Platform', body: 'FundACause, Nigeria FinTech Awards.' },
      { year: '2019', title: 'NITMA Award', body: 'Nigeria Information Technology Merit Award.' },
      { year: '2018', title: 'Beacon of ICT', body: 'Beacon of ICT recognition.' },
      { year: '2017', title: 'Payment Technology Company of the Year', body: 'Nigeria FinTech Awards.' },
    ],
  },

  csr: {
    eyebrow: 'COMMUNITY',
    headline: 'Programmes we run alongside the work.',
    body: 'Two long-running programmes sit alongside the technology work: a Children’s Day Essay Competition that has run for over a decade, and an internship and graduate programme that has trained engineers now working across Nigerian fintech.',
    items: [
      {
        title: 'Children’s Day Essay Competition',
        body: 'An annual essay competition for Nigerian secondary school students, run continuously since 2008.',
        href: '/contact?audience=community',
      },
      {
        title: 'Internship and graduate programme',
        body: 'A structured engineering internship that has placed graduates into product, platform, and operations teams across the group.',
        href: '/company/careers',
      },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Talk to us, or meet the team.',
    primaryCta: { label: 'Talk to sales', href: '/contact?audience=sales' },
    secondaryCta: { label: 'Meet the team', href: '/company/teams' },
  },
} as const

export type AboutCopy = typeof aboutCopy
