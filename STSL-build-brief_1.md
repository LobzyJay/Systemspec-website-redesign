# STSL Website — Audit + Build Brief

**Status:** v2 — internal working doc
**For:** Adewale (Layout Studio) + Claude
**Site:** stsl.ng
**Last updated:** April 2026

---

## What this is

Working document for the STSL site rebuild. Trimmed to issues that customers, partners, and investors will actually feel. Deep-UX nitpicks (form structure, baseline alignment of two-column modules, button padding tokens) are out — those get fixed in build by default and don't need to be argued for upfront.

What stayed:
- Strategy and positioning gaps that cost STSL credibility
- Visual identity and iconography (these impact perception directly)
- IA and content gaps that block buyers from converting
- A short list of craft issues that read as "cheap" on first glance

---

## 1. The core problem

STSL is the technology arm of SystemSpecs Holdings — same group as Remita and HumanManager. They built TSA-adjacent infrastructure, run Pouchii's API stack, ship FundACause (award-winning), and serve banks, federal MDAs, PSPs, and ecosystem operators. The parent company has been operating since 1992 and is a real institution in Nigerian fintech.

The current stsl.ng site does not look like that company's site. It looks like a Webflow template. That gap — between who STSL actually is and how the site presents them — is the entire reason for the rebuild.

> The brief: rebuild the site so a banker, a federal CIO, or a fintech product lead arrives at the same conclusion in under 30 seconds — *this is a serious infrastructure company, we should be talking to them*.

---

## 2. Who STSL really is (so we have something to measure against)

- Subsidiary of SystemSpecs Holdings, established 1992
- Sister companies: Remita Payment Services, HumanManager, Whatadeal
- Built federal e-budgeting and warranting solutions, TSA-adjacent work
- Owns Pouchii (digital wallet + service aggregation API), FundACause (won Best Crowdfunding Platform 2022), Monicenta
- Awards: NECA Excellence Award 2024, NITMA, Beacon of ICT, Payment Technology Company of the Year
- Buyers: bank product/digital leads, federal MDA ICT directors, PSP product leads, cooperative/scheme operators, enterprise IT buyers, partners

What buyers expect to see when they land:
- Evidence of scale (transactions, institutions, MDAs, uptime)
- Regulatory posture (CBN, NDPR, ISO, security)
- Named clients and case studies
- Architecture credibility (APIs, integration depth)
- A clear sales path segmented by who they are

---

## 3. What's actually broken (buyer-facing)

Reduced to issues that a customer or investor will register, consciously or not.

### 3.1 — The hero says nothing

"Get Ahead with Our Tailored Solutions" + "We provide technology solutions for diverse industries and initiatives" + a generic spinning globe.

A federal CIO, a banker, or a PSP lead reads those eleven words and learns nothing about what STSL does or why they should keep scrolling. The headline could describe a tailoring company. The globe is decorative — not a coverage map, not a transaction flow, not anchored to anything STSL actually does.

The two stats floating on the globe (5,000+ businesses, 15,153+ customers) are the wrong numbers for an infrastructure company. Buyers care about transaction volume, institutions integrated, MDAs served, uptime, API call volume — not retail user counts.

The single CTA — "Learn More" — is the weakest CTA in the SaaS playbook. There's no path for a banker, no path for government, no path for a partner.

### 3.2 — There is no proof

Partner logos are there (Polaris Bank, NASD, Unicoop, IBILEHUB, government seals) but presented silently — no claim like "Trusted by tier-2 Nigerian banks" or "Powering payment infrastructure for X federal MDAs." The logos are evidence of a story the page never tells.

Beyond the logo strip, the entire site contains:
- Zero metrics (transaction volume, uptime, MDAs served, institutions integrated)
- Zero case studies
- Zero awards mentioned (FundACause won Best Crowdfunding Platform 2022, NECA 2024, etc.)
- Zero named projects (TSA work, e-budgeting solution)
- Zero compliance signals (CBN, NDPR, ISO)

A 30-year institution with award-winning products, federal track record, and tier-1 banking integrations is showing none of that. This is the single highest-impact problem on the site.

### 3.3 — IA buries the most important offerings

Seven solution categories — Pouchii Infrastructure, Platforms, E-Gov, Software Development, Community, Services, Banking — are crammed into a tab row on the homepage. Tabs are for parallel in-page content, not for primary navigation between major business lines.

E-Gov (a flagship business given STSL's federal track record) sits as a peer to "Services" — the most generic word possible. Banking Solutions, which should have a dedicated landing page, is hidden behind a tab click that most users never make.

No primary nav surfaces these categories properly. The whole site funnels through `Solutions → tab`, which means:
- Federal buyers can't find E-Gov in 5 seconds
- Bank buyers can't find Banking in 5 seconds
- Each major business line gets one screen of attention max

### 3.4 — One CTA path for every visitor type

"Get Started" in the nav and "Send" on the homepage form route every visitor — banker, federal CIO, fintech lead, partner, recruiter, press — into the same inbox.

For B2B/B2G enterprise sales this is a real revenue leak. A bank evaluating a multi-year contract wants to talk to someone senior, not file a generic enquiry. A government buyer wants procurement-ready material. A partner wants channel team contact. None of those paths exist.

### 3.5 — Solutions and product pages have no depth

The Pouchii Infrastructure page contains real substance buried in two prose paragraphs ("virtual account service riding on CBN-licensed financial institutions," "API suite comprising airtime, data, utilities, bills payment, loans, insurance"), then bottoms out in two cards with one or two bullets each.

For a product that sits adjacent to Flutterwave's APIs, OnePipe, Mono, and direct-to-bank integrations, this is roughly 5% of what a technical evaluator needs.

What's missing per product/solution page:
- Capability detail beyond a one-liner
- Architecture or integration patterns (even one diagram)
- One curl or code sample for developer-facing products
- Named customers or use cases
- Compliance and security posture
- A clear sales path

### 3.6 — About page lacks the proof points that make STSL credible

Photography is genuinely strong. The Board and Management leadership grid is the best-executed module on the site.

But the supporting content is empty:
- Cards have name and title only — no bios, no LinkedIn, no past tenure (e.g. Dr. John Obaro's founding role, recent honorary doctorates, ThisDay Titan of the Year)
- No timeline (1992 founding, TSA, group restructuring, subsidiary launches)
- No numbers (years, MDAs, institutions, transactions)
- No awards block
- No group context — Remita, HumanManager, Whatadeal are not even mentioned
- No press, no compliance, no certifications

Closing block is a Values grid including "Dependence on God for success" — a real cultural value but presented next to enterprise solutions without context. That belongs in a careers/culture page, not as the last thing a bank buyer sees on About.

### 3.7 — Footer is alarmingly thin

Resources column = About Us + Contact Us. That's it.

For a 30-year institution, the footer should carry: Careers, Press, Security, Compliance, Developer docs, Partner portal, Group company links (Remita, HumanManager), Investor relations. None of these exist.

### 3.8 — Visual identity reads as small-business

Ranking these because Adewale flagged they impact buyers directly:

**Illustration system** — Three competing illustration styles on one site. The hero globe is a photoreal-ish dotted globe. The lead form uses flat character illustration (woman at laptop). The Pouchii solution image uses isometric flat with a warmer palette. None of them depict what STSL actually does. They're stock visual filler that ships with template kits.

**Iconography** — Two icon systems running side by side. The Values block on About uses bright multicolour filled circles (purple, pink, green, red, blue, orange) with white pictograms inside. The Pouchii Offers cards use single-colour teal-filled circles with white icons. There's no rule for when each style is used. Both styles read as low-effort.

**Colour usage** — The brand teal is used for: primary CTAs, link text, tab actives, social icons, footer band, footer separator, big numbers (01/02/03), and most decorative elements. When everything is the brand colour, nothing is. The colour stops functioning as an action signal.

**Typography** — Single typeface, used at three or four sizes with two weights. No display style, no editorial moments, no monospace for technical content. No type contrast does any work for the hierarchy.

**Why this matters to buyers, not just designers:** This isn't about whether the site is "beautiful." It's that the visual system reads as a tier below Stripe, Adyen, Flutterwave, Paystack, OnePipe, Mono — every direct or adjacent competitor STSL gets compared to. Bank product leads and federal CIOs make snap judgements about institutional seriousness from visual identity. The current system codes "small SaaS company" not "30-year infrastructure institution."

### 3.9 — A few craft issues worth fixing (not nitpicks)

These three are visible enough that buyers will register them as "cheap":

1. **Monicenta thumbnail clipped** — on the homepage products list, the Monicenta product mock is visibly cut off at the bottom of its row. Not a deep-UX issue; an everyone-can-see-it issue.

2. **Hero text against the viewport edge** — headline starts essentially flush against the left edge with no real left margin. On wide screens this looks broken, not deliberate.

3. **Empty space below Pouchii cards on Solutions page** — almost a full viewport of nothing between the two cards and the footer. The page template was built for more content and never adjusted. Reads as unfinished.

The rest of the spacing/padding/baseline issues get fixed naturally during build. They don't need to be in the brief.

---

## 4. What we're building

### 4.1 — Objective

Reposition stsl.ng visually and verbally from "generic technology vendor" to "enterprise infrastructure provider," and give every audience a clear path through the site to the right sales conversation.

### 4.2 — Primary goals

1. Land STSL's actual position in the first 30 seconds — group lineage, scale, government track record, fintech infrastructure depth
2. Surface proof: clients, metrics, awards, regulatory posture, leadership credentials
3. Segment CTAs by audience (banks, government, PSPs, partners) instead of one form for everyone
4. Give every solution and product line a real page with depth
5. Build a visual identity system that reads as Nigerian, indigenous, sophisticated, infrastructural — not generic SaaS

### 4.3 — Non-goals

- Not a rebrand of the SystemSpecs group identity. STSL is a subsidiary; group brand stays intact.
- Not a developer portal build. v1 has a developer landing; full portal is a separate workstream.
- Not e-commerce or self-service signup. STSL is enterprise-sales-led; the site supports the motion, doesn't replace it.

### 4.4 — Audiences and primary CTAs

| Audience | Wants | CTA |
|---|---|---|
| Bank product/digital lead | Banking solutions, integration patterns, security, references | Talk to banking sales |
| PSP / fintech product lead | API surface, sandbox, pricing, uptime, support | Request API access |
| Federal MDA / state ICT director | E-Gov capability, TSA track record, procurement readiness | Government enquiries |
| Cooperative / scheme operator | Community Solutions, wallet infrastructure, white-label | Talk to community sales |
| Enterprise IT buyer | Software development services, team depth | Discuss a project |
| Partner / channel | Co-sell, integration partnerships | Become a partner |
| Press / analyst / investor | Group context, news, leadership | Press resources |
| Candidate | Culture, openings | View open roles |

---

## 5. Information architecture

Replace the tab-based homepage navigation with a real top-level structure. Every primary nav item leads to its own page.

```
Solutions     →   overview + Banking, E-Government, Community, Enterprise Software
Products      →   overview + Pouchii, FundACause, Monicenta
Developers    →   landing for API + sandbox + integration patterns (v1 stub OK)
Company       →   About, Leadership, Group (links out to Remita/HumanManager), Press, Careers
Resources     →   Case studies, Blog, Security, Compliance
Contact       →   segmented (sales / government / partners / press / support)
```

Top-right CTAs in the nav:
- **Talk to sales** (primary, opens segmented modal)
- **Government enquiries** (secondary, surfaces only on Solutions and Home)

---

## 6. Page-level requirements

### 6.1 — Homepage

**Hero**
- Headline that names the position. Working line: *"The infrastructure behind Africa's payment, government, and financial technology systems."*
- Sub-headline: one sentence that names the proof — group lineage + years + scale
- Primary CTA: Talk to sales · Secondary: View solutions
- Visual: replace the globe. Three options to design and pick from:
  1. Live or simulated transaction-flow visualisation
  2. Nigeria-anchored network/coverage map (banks, MDAs as nodes)
  3. Editorial typographic hero with leadership portrait grid as supporting visual

**Proof bar**
- Replaces the silent partner logo strip
- Each logo or grouping paired with a number (institutions integrated, MDAs served, transactions/year)
- If figures are sensitive, use approximations comms is comfortable with

**Solutions overview**
- 4 cards: Banking, E-Government, Community, Enterprise Software
- Each card: one-line description, one named client or use case, link to sub-page

**Products overview**
- 3 cards: Pouchii, FundACause, Monicenta
- Each card: positioning sentence, one proof point (e.g. FundACause — Best Crowdfunding Platform 2022), CTA to product page

**Capability strip**
- Editorial section naming what STSL builds: APIs, virtual accounts, payment aggregation, e-budgeting, warranting, identity, fundraising, lending infrastructure
- Single paragraph + diagram or list, not a card grid

**Group context**
- Short "Part of SystemSpecs" block — group, sister companies (Remita, HumanManager, Whatadeal), founding year
- Three logos with one-line descriptions and outbound links

**Insights / press**
- 3 editorial cards from blog or press
- If content is light at launch, surface third-party press (TechCabal, Nairametrics)

**Closing CTA block**
- Audience-segmented in one block — bank, fintech, government, partner, careers — each links to the right path

### 6.2 — Solutions overview + 4 sub-pages (Banking, E-Government, Community, Enterprise Software)

Each sub-page uses the same template:
- Hero — audience + outcome ("E-Government infrastructure for Nigerian MDAs")
- Capabilities — 4–6 capability blocks with real depth, not single-line bullets
- How it works — diagram or numbered flow
- Case study or named client (at least one, anonymised at first if needed)
- Compliance and security relevant to that solution
- FAQs — procurement, integration, support
- CTA — segmented to the right sales pod

### 6.3 — Products (Pouchii, FundACause, Monicenta)

Same template per product:
- Hero — value prop + screenshot or product visual
- Who it's for
- Features — 4–8 feature blocks with imagery
- How to get started / integrate
- Proof — clients, awards, metrics
- Pricing model (or "contact for pricing")
- CTA — request demo, request API access, or visit live product

### 6.4 — Developers (v1)

Single-page landing. Establishes API credibility before the full portal exists.
- Hero — "Build on Pouchii Infrastructure"
- API surface overview — endpoint categories (accounts, payments, services aggregation)
- One curl or code sample (even a stub)
- Sandbox CTA (or waitlist if not live)
- Integration partners and case studies
- Link to full docs (when available)

### 6.5 — Company

**About**
- STSL's specific role within SystemSpecs Holdings
- Timeline — milestones from 1992 to today, named projects (TSA, group restructuring, subsidiary launches)
- Numbers — years, MDAs, institutions, awards
- Group context — Remita, HumanManager, Whatadeal
- CSR — Children's Day Essay Competition, internship programmes (briefly with link)

**Leadership**
- Keep the existing photography — it's the strongest asset on the site
- Each card opens or links to a real bio (credentials, prior roles, LinkedIn)
- Highlight industry positions (e.g. Demola Igbalajobi's panels, Dr. Obaro's recent honours)

**Press, Careers, Group**
- Press — third-party coverage links + downloadable media kit
- Careers — open roles or talent-pool form
- Group — short page on SystemSpecs Holdings structure with outbound links

### 6.6 — Contact

- Segmented landing — sales, government, partners, support, press, careers
- Each segment routes to a tailored form or direct contact
- Office locations
- Phone, email, social preserved from current footer

---

## 7. Visual identity direction

Principles for the system:

- **Editorial over decorative** — typography carries the brand, illustrations support
- **Specific over generic** — every visual element refers to something STSL actually does. No globes, no flat character illustrations, no stock fintech tropes
- **Calm over busy** — restraint signals seniority. No spinning globes, no parade of animations
- **Indigenous and global** — design should not hide that STSL is Nigerian. Should amplify it confidently

System components to define in design phase:

- **Type** — pairing of an editorial display (likely serif) with a precise neutral sans
- **Colour** — keep SystemSpecs teal as anchor; introduce a deeper supporting accent and a real neutral system. Move away from teal-on-everything
- **Iconography** — single custom line-icon set. Kill the multicolour filled circles
- **Imagery** — leadership portraits + real product UI screenshots + custom diagrams. Stock illustrations removed entirely
- **Motion** — quiet, intentional. One or two signature moments (e.g. transaction-flow visualisation in the hero)

References to align on early in the design phase:
- Stripe — editorial structure + developer credibility
- Adyen — enterprise tone + audience-segmented CTAs
- Mercury / Modern Treasury — restrained typography-led identity
- Flutterwave — African enterprise reference point

---

## 8. Functional + technical

**Functional**
- Segmented contact forms with backend routing to the right sales pod
- Demo/sales meeting booking via Calendly or similar
- Newsletter or insights subscription
- Press kit downloads
- CMS-managed: blog, press, case studies, careers
- NDPR-compliant cookie consent

**Technical**
- Stack TBC with STSL eng. Default rec: Next.js + headless CMS (Sanity / Contentful / Strapi)
- Hosting on CDN-backed platform (Vercel, Netlify, or self-hosted via Cloudflare)
- Lighthouse > 90 across all pillars
- WCAG 2.1 AA
- GA4 + privacy-respecting alternative (Plausible / Fathom)
- SEO — server-rendered, structured data for org/products/articles
- 301s on all changed URLs to preserve SEO equity

---

## 9. Scope

**v1 in**
- Homepage
- Solutions overview + 4 sub-pages
- Products overview + 3 sub-pages
- Developers landing (v1 stub)
- Company: About, Leadership, Press, Careers, Group
- Contact (segmented)
- Blog template + 6 launch articles
- Case studies template + 3 launch case studies
- Privacy, terms, cookie policy

**v1 out**
- Full developer portal with live API reference
- Customer login or self-service portal
- Multi-language (English only at launch)
- Investor relations sub-site

---

## 10. Success metrics

- Qualified contact form submissions/month, segmented by audience type — target 3× baseline within 90 days
- Time on solution + product pages > 90 sec median
- Homepage bounce rate < 50%
- Reduction in "what does STSL do?" inbound (sales team feedback)
- Inbound from outside Nigeria as a directional signal
- Lighthouse > 90 across performance, accessibility, best practices, SEO

---

## 11. Risks + dependencies

- **Content gathering** — proof, case studies, named clients depend on STSL legal/comms approval. Identify approver before kickoff.
- **Number disclosure** — STSL needs to decide which scale metrics it will publish. Without this the proof bar is weakened.
- **Group brand alignment** — new STSL identity must coordinate with SystemSpecs Holdings. 30-min alignment with holdings comms in week 1.
- **Photography** — leadership shoot is excellent. Any new product/environment photography needs early scheduling.
- **Migration** — preserve SEO equity through 301s on all changed URLs.

---

## 12. Build order (suggested)

If going straight to build:

1. Design system first — type scale, colour, grid, spacing tokens, button system, card system
2. Homepage — proves the system works
3. Solutions sub-pages (use the same template four times)
4. Product pages (same template three times)
5. Company (About, Leadership)
6. Contact (segmented)
7. Developers landing
8. Press, Careers, Group, Resources

Templates first means once Solutions is designed, the other three sub-pages are mostly content swap.

---
