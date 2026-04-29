/**
 * Teams page copy — STSL
 * Source: STSL-build-brief_1.md §6.5 (teams), §11 (bios pending comms approval)
 *
 * Re-validated 2026-04-28 against systemspecs.com.ng (group homepage —
 * "Our Board" + subsidiary MD grids). All eight board members and all
 * three subsidiary MDs (Atanda / Ngele / Bank-Olemoh) confirmed
 * present, with names, titles, and bios matching the live source. All
 * eleven existing portrait files in /apps/web/public/teams/ were
 * byte-for-byte identical to the live media-library JPGs (MD5
 * verified).
 *
 * STSL note: stsl.ng remained unreachable on this pass (DNS/TCP
 * timeout, same as prior pass). The SystemSpecs Holdings homepage
 * lists STSL as a subsidiary but does NOT publish a named MD or
 * portrait for it. Demola (Ademola) Igbalajobi is corroborated as
 * STSL MD by the August 2025 ThisDay press release ("SystemSpecs
 * Deepens Synergy to Advance Cashless Fuel Payment"), the SystemSpecs
 * blog post on the 2024 IoDCCG Corporate Governance Summit keynote,
 * and his LinkedIn (titled "Managing Director at SystemSpecs
 * Technology Services"). No public portrait-cropped headshot is
 * available — flagged with portraitMissing: true so the card renders
 * an initials placeholder. Verify currency with STSL comms before
 * launch per brief §11.
 */

export const teamsCopy = {
  hero: {
    eyebrow: 'TEAMS',
    headline: 'The people running the work.',
    subheadline:
      'A board and management team that has shipped to banks, federal MDAs, and the Nigerian fintech ecosystem for three decades.',
  },

  intro: {
    eyebrow: 'OVERVIEW',
    body: 'STSL sits inside SystemSpecs Holdings, governed by the group board and run day-to-day by an executive team with deep tenure across payments, HR technology, and public-sector software. The roster below is drawn from the public SystemSpecs Holdings record.',
  },

  board: {
    eyebrow: 'BOARD',
    headline: 'Board of Directors.',
    note: 'SystemSpecs Holdings board, as published on systemspecs.com.ng. Bios are abbreviated from the source and pending final comms approval per §11.',
    members: [
      {
        slug: 'ernest-ndukwe',
        name: 'Dr. Ernest Ndukwe, OFR',
        role: 'Chairman, Board of Directors',
        photo: '/teams/ernest-ndukwe.jpg',
        shortBio:
          'A nationally acclaimed engineer and one of the foremost figures in Nigeria’s ICT evolution. Recognised for his contributions to telecommunications, regulatory practice, and technology policy.',
        fullBio:
          'Dr. Ernest Ndukwe chairs the SystemSpecs Holdings board. He is recognised across Nigeria’s ICT sector for his work in telecommunications, regulatory practice, and technology policy, and brings governance depth and industry insight to the group.',
        linkedin: '',
        recognition: ['Officer of the Federal Republic (OFR)'],
      },
      {
        slug: 'john-obaro',
        name: 'Dr. John Obaro',
        role: 'Founder & Group Managing Director',
        photo: '/teams/john-obaro.jpg',
        shortBio:
          'A pioneering force in Nigeria’s software ecosystem, known for championing indigenous technology development. Has guided SystemSpecs’ evolution into a leading African technology group.',
        fullBio:
          'Dr. John Obaro founded SystemSpecs and serves as Group Managing Director. With decades of leadership in digital finance and enterprise software, he has guided the group’s evolution into a leading African technology business and continues to direct its product and market strategy.',
        linkedin: '',
        recognition: ['Founder, SystemSpecs Holdings', 'Honorary Doctorate recipient'],
      },
      {
        slug: 'ifeoma-idigbe',
        name: 'Ifeoma I. Idigbe',
        role: 'Non-Executive Director',
        photo: '/teams/ifeoma-idigbe.jpg',
        shortBio:
          'A finance, restructuring, and governance professional with strong credentials in banking and advisory services. Contributes expertise in enterprise change, organisational effectiveness, and capacity-building.',
        fullBio:
          'Ifeoma I. Idigbe is a finance, restructuring, and governance professional with credentials across banking and advisory services. She brings expertise in enterprise change, organisational effectiveness, and capacity-building to the SystemSpecs Holdings board.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'emmanuel-ocholi',
        name: 'Emmanuel Ocholi',
        role: 'Non-Executive Director',
        photo: '/teams/emmanuel-ocholi.jpg',
        shortBio:
          'An economist and financial-markets expert with over three decades of experience across banking, investment management, and capital markets.',
        fullBio:
          'Emmanuel Ocholi has provided strategic leadership across banking, investment management, and capital markets over more than three decades. He brings financial governance and business change expertise to the SystemSpecs Holdings board.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'waheed-olagunju',
        name: 'Dr. Waheed Olagunju',
        role: 'Non-Executive Director',
        photo: '/teams/waheed-olagunju.jpg',
        shortBio:
          'A development finance specialist whose career has shaped Nigeria’s industrial and SME landscape. Brings deep knowledge of economic development, enterprise financing, and institutional strengthening.',
        fullBio:
          'Dr. Waheed Olagunju has spent his career in Nigerian development finance, with significant influence on the country’s industrial and SME landscape. He brings expertise in enterprise financing and institutional strengthening to the SystemSpecs Holdings board.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'oladapo-fafemi',
        name: 'Dr. Oladapo Fafemi',
        role: 'Non-Executive Director',
        photo: '/teams/oladapo-fafemi.jpg',
        shortBio:
          'A clinical leader with extensive experience in healthcare management, governance, and organisational effectiveness. Brings a global perspective on leadership, discipline, and strategic planning.',
        fullBio:
          'Dr. Oladapo Fafemi is a clinical leader with extensive experience in healthcare management, governance, and organisational effectiveness. He contributes a global perspective on leadership and strategic planning to the SystemSpecs Holdings board.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'kehinde-lawanson',
        name: 'Kehinde Lawanson',
        role: 'Non-Executive Director',
        photo: '/teams/kehinde-lawanson.jpg',
        shortBio:
          'A banking and finance professional with more than 27 years’ experience across investment and commercial banking. Contributes governance, risk oversight, and financial strategy.',
        fullBio:
          'Kehinde Lawanson has more than 27 years of experience across investment and commercial banking. He brings governance capability, risk oversight, and financial strategy to the SystemSpecs Holdings board.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'sola-oni',
        name: 'Dr. Sola Oni',
        role: 'Non-Executive Director',
        photo: '/teams/sola-oni.jpg',
        shortBio:
          'An Information Systems expert whose work intersects digital change, business performance, and organisational strategy. Blends academic rigour with industry practice.',
        fullBio:
          'Dr. Sola Oni is an Information Systems expert whose work spans digital change, business performance, and organisational strategy. He blends academic rigour with industry practice and strengthens the group’s digital innovation focus.',
        linkedin: '',
        recognition: [],
      },
    ],
  },

  management: {
    eyebrow: 'MANAGEMENT',
    headline: 'Executive team.',
    note: 'STSL operating leadership and the group MDs of sister companies in the SystemSpecs Holdings portfolio.',
    members: [
      {
        slug: 'demola-igbalajobi',
        name: 'Demola Igbalajobi',
        role: 'Managing Director, SystemSpecs Technology Services Limited',
        photo: '/teams/demola-igbalajobi.png',
        shortBio:
          'Managing Director of STSL since the 2022 group restructure. A chartered accountant and IBM-trained project manager with 25+ years across electronic payments and enterprise software delivery.',
        fullBio:
          'Demola Igbalajobi leads STSL as Managing Director, appointed at the 2022 group restructure. He is a chartered accountant and seasoned project manager with over 25 years of multi-industry experience working with blue-chip firms to implement strategic, business-focused solutions. Prior to SystemSpecs he had a long tenure with IBM UK in software implementation, application development, programme management, and ERP consulting, and earlier worked as a Tax Inspector with the UK Government. He previously led the International Business Division and Business Development & Service Delivery for the Remita platform in Nigeria, and served as Project Executive for the platform’s delivery.',
        linkedin: '',
        recognition: [
          'Keynote speaker, IoDCCG National Corporate Governance Summit (2024)',
          'Speaker, AG Mortgage Bank Retreat (2024)',
        ],
      },
      {
        slug: 'deremi-atanda',
        name: '’Deremi Atanda',
        role: 'Managing Director, Remita Payment Services Limited',
        photo: '/teams/deremi-atanda.jpg',
        shortBio:
          'A fintech strategist with over 25 years’ experience in digital finance, enterprise consulting, and ecosystem development. Brings expertise in product, policy, and large-scale execution.',
        fullBio:
          '’Deremi Atanda runs Remita Payment Services Limited, the SystemSpecs Holdings payments subsidiary. He has more than 25 years of experience across digital finance, enterprise consulting, and ecosystem development, with deep expertise in product, policy engagement, and large-scale execution.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'udo-ngele',
        name: 'Udo Ngele',
        role: 'Managing Director, HumanManager Limited',
        photo: '/teams/udo-ngele.jpg',
        shortBio:
          'A technology leader with deep expertise in HR automation, payments, and cybersecurity. Leads HumanManager in delivering HR and payroll solutions across Africa.',
        fullBio:
          'Udo Ngele runs HumanManager Limited, the SystemSpecs Holdings HR and payroll subsidiary. He brings deep expertise in HR automation, payments, and cybersecurity, and leads the company’s pan-African product and customer work.',
        linkedin: '',
        recognition: [],
      },
      {
        slug: 'fela-bank-olemoh',
        name: 'Fela Bank-Olemoh',
        role: 'Managing Director, SystemSpecs WhataDeal Limited',
        photo: '/teams/fela-bank-olemoh.jpg',
        shortBio:
          'An executive with leadership experience across government, private sector, and technology ventures. Brings strategic depth and a strong commitment to development.',
        fullBio:
          'Fela Bank-Olemoh runs SystemSpecs WhataDeal Limited. He has held leadership roles across government, private sector, and technology ventures, and brings strategic depth and a strong commitment to institutional development.',
        linkedin: '',
        recognition: [],
      },
    ],
  },

  // Operating heads — names, titles, and bios verified 2026-04-28
  // against the live stsl.com.ng SPA (about page entries; data
  // recovered from the React bundle’s name/title/description tuples).
  // Portraits sourced from the stsl.com.ng /assets/ media library and
  // saved to /apps/web/public/teams/.
  operating: {
    eyebrow: 'OPERATING TEAM',
    headline: 'Heads of practice.',
    note: 'STSL division heads driving product, technology, business, and public-sector engagement day to day. Source: stsl.com.ng.',
    members: [
      {
        slug: 'leke-ogunbanwo',
        name: 'Leke Ogunbanwo',
        role: 'Chief Technology Officer',
        photo: '/teams/leke-ogunbanwo.png',
        department: 'Engineering',
        shortBio:
          'A seasoned IT professional with deep experience in business process automation, enterprise application integration, workflow design, and large-scale systems engineering across FinTech, InvestTech, and EduTech.',
        fullBio:
          'Leke leads engineering at STSL as Chief Technology Officer. He specialises in integrating large-scale enterprise systems and infrastructure, with expertise spanning FinTech, InvestTech, and EduTech, and has played a pivotal role in developing some of Nigeria’s most notable investment and financial systems. His work encompasses ATMs, self-service kiosks, POS devices, integrated systems, and embedded systems. He holds a BSc (Hons) in Computing from the University of Portsmouth, UK.',
        linkedin: '',
      },
      {
        slug: 'anu-oyeleye',
        name: 'Anu Oyeleye',
        role: 'Head, Product Management',
        photo: '/teams/anu-oyeleye.png',
        department: 'Product',
        shortBio:
          'An agile and lean product leader who has launched and grown consumer and enterprise-facing products across banking and financial technology.',
        fullBio:
          'Anu Oyeleye heads Product Management at STSL. A certified Data Analyst and Product Manager with over 8 years’ experience, she has broad banking and financial-services experience spanning Risk Management, Business Banking, Product Management, and Financial Technology. She is proficient with JIRA, Scrum and agile methodologies, and data analytics. Before STSL she was a Credit Risk Analyst at Guaranty Trust Bank, a Business Banking Analyst at Access Bank, and Senior Product Manager at Herconomy. She holds a BSc in Economics from Redeemer’s University, an MSc in Economics from Lancaster University, and an MSc in Strategic Business Management from the University of Law Business School, Germany.',
        linkedin: '',
      },
      {
        slug: 'etereigho-ozakpo',
        name: 'Etereigho “Tereigh” Ozakpo',
        role: 'Head, Business',
        photo: '/teams/etereigho-ozakpo.png',
        department: 'Business',
        shortBio:
          'A business management enthusiast and revenue leader who calls himself the Digital Economy Evangelist, helping ecosystems and organisations digitise to deliver 10x revenue growth.',
        fullBio:
          'Etereigho “Tereigh” Banks Ozakpo heads the Business division at STSL. He has traversed Nigeria’s six geo-political zones leading the company’s digital ecosystems campaign — including Pouchii Infrastructure, Pouchii Schools, Pouchii Estates, and FundACause. He sits in the faculty of SalesRuby Academy, HRBP Academy, and TheBossOffice Academy. Earlier in his career he worked with brands including P&G, eTranzact Plc, CWG Plc (Diamond Bank, MTN), and InfoWARE Ltd. He is an alumnus of Leadership & Vision Academy, the University of Benin, Lagos Business School, Ausso Leadership Academy, and Tufts University.',
        linkedin: '',
      },
      {
        slug: 'ahabue-borha',
        name: 'Ahabue Borha',
        role: 'Head, Public Sector',
        photo: '/teams/ahabue-borha.png',
        department: 'Public Sector',
        shortBio:
          'A strategic business analyst and Senior Business Development Manager with experience across UK retail banking, insurance, and Nigerian public-sector reform.',
        fullBio:
          'Ahabue Borha heads STSL’s Public Sector practice, overseeing public-sector and ad-hoc engagements. His experience spans UK retail banking and insurance — Capita, Royal Bank of Scotland, NatWest, and Co-operative Insurance — and Nigerian government reform, where he served as a principal aide to a former Lagos State Governor on Digital Media and Public-Private Partnerships. He holds a BSc in Insurance from the University of Lagos and an MSc in International Business from Salford Business School, Manchester. He is a member of the Nigerian Institute of Management.',
        linkedin: '',
      },
      {
        slug: 'uche-obiofuma',
        name: 'Uche Obiofuma',
        role: 'Divisional Head, PAPSS & Operations',
        photo: '/teams/uche-obiofuma.png',
        department: 'Operations',
        shortBio:
          'Manages STSL’s System Operations Services for the Pan-African Payment and Settlement System (PAPSS), with two decades of leadership in public-sector reform and human-capital programmes.',
        fullBio:
          'Uche Obiofuma is Divisional Head, PAPSS & Operations at STSL, managing System Operations Services for the Pan-African Payment and Settlement System — the cross-border financial-market infrastructure enabling payments across Africa. He previously led the company’s public-sector reform and human-capital projects for nearly two decades, with deep experience in institutional development, reform, strategy, process facilitation, and training. He holds a degree in Computer Science and Engineering from Enugu State University of Science and Technology, and is an alumnus of Lagos Business School, the Maastricht Institute of Management, and the Learning Tree Institute, UK.',
        linkedin: '',
      },
    ],
  },

  bioTemplate: {
    // Reference template the CMS or content editor fills in for each leader.
    fields: [
      { key: 'name', label: 'Full name', required: true },
      { key: 'role', label: 'Role at STSL or the group', required: true },
      { key: 'photo', label: 'Portrait (existing photography preserved)', required: true },
      { key: 'portraitMissing', label: 'Set true if no portrait is available — card renders initials placeholder', required: false },
      { key: 'shortBio', label: 'Short bio (1–2 sentences)', required: true, maxWords: 40 },
      { key: 'fullBio', label: 'Full bio (3–5 paragraphs, prior tenure, credentials)', required: true },
      { key: 'linkedin', label: 'LinkedIn URL', required: false },
      { key: 'recognition', label: 'Awards, panels, board seats, honorary positions', required: false },
    ],
  },

  closingCta: {
    eyebrow: 'NEXT STEP',
    headline: 'Talk to the team.',
    body: 'Press, analyst, and investor enquiries route to the office of the CEO.',
    primaryCta: { label: 'Press resources', href: '/contact?audience=press' },
    secondaryCta: { label: 'About STSL', href: '/company/about' },
  },
} as const

export type TeamsCopy = typeof teamsCopy
