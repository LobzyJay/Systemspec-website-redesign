# SystemSpecs Design System

> **STSL · Editorial Luxury for African Fintech Infrastructure**

The design system for **SystemSpecs Technology Solutions Limited (STSL)** — the parent company behind Nigeria's most widely-used payments, government, and HR infrastructure (Remita, Pouchii, HumanManager, FundACause, Whatadeal, Monicenta).

This design system anchors STSL as a **patient, premium, trust-first technology house**. It is deliberately *not* the chrome-and-gradient look of consumer fintech. The visual register is closer to Bloomberg, The Economist, or a private bank's annual report — warm cream paper, editorial typography, a single anchor accent (Brand Teal `#017A6A`), espresso shadows, and warm-toned hairlines.

---

## Sources

This system is reverse-engineered from the live STSL website redesign codebase, plus the official wordmarks the user supplied:

| Source | Path / Link |
|---|---|
| Wordmarks (uploaded) | `assets/systemspecs-wordmark-black.png`, `assets/systemspecs-wordmark-white.png` |
| Live redesign codebase | `github.com/LobzyJay/Systemspec-website-redesign` |
| Brand-token CSS | `packages/brand-stsl/src/styles.css` |
| Token JSON (W3C) | `packages/brand-stsl/src/tokens/index.ts` |
| Component library | `packages/brand-stsl/src/components/` |
| Build brief | `STSL-build-brief_1.md` (root of repo) |
| Group-brand assets | `apps/web/public/brand/group/` |

The reader is **not** assumed to have GitHub access — every design decision in this system has been transcribed into the local files below. The repo links are kept only for traceability if a future iteration needs to verify a specific value.

---

## Index

```
SystemSpecs Design System/
├── README.md                ← you are here
├── colors_and_type.css      ← all CSS variables (color, type, space, radius, shadow, motion)
├── SKILL.md                 ← Agent-Skills-compatible entrypoint
│
├── assets/                  ← raw brand visual assets (logos, product marks)
│   ├── systemspecs-wordmark-black.png
│   ├── systemspecs-wordmark-white.png
│   ├── favicon.svg
│   └── group/               ← STSL-group company logos (Pouchii, Remita, HM…)
│
├── preview/                 ← Design System tab cards (one HTML file per concept)
│   ├── colors-primary.html
│   ├── colors-neutrals.html
│   ├── colors-feedback.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-mono-overline.html
│   ├── spacing-radii.html
│   ├── shadows.html
│   ├── components-buttons.html
│   ├── components-pill-eyebrow.html
│   ├── components-card.html
│   ├── components-product-card.html
│   ├── components-stat-pill.html
│   ├── components-input.html
│   ├── brand-wordmark.html
│   ├── brand-dotmark.html
│   └── brand-group.html
│
└── ui_kits/
    └── stsl_website/        ← high-fidelity recreation of the corporate site
        ├── README.md
        ├── index.html
        ├── Nav.jsx
        ├── Hero.jsx
        ├── ProductCard.jsx
        ├── SolutionCard.jsx
        ├── InsightCard.jsx
        ├── StatPill.jsx
        ├── DottedGlobe.jsx
        ├── SectionHeader.jsx
        ├── Footer.jsx
        └── primitives.jsx
```

---

## What SystemSpecs is

SystemSpecs is a 30-year-old Nigerian software house that **built the rails** much of the country's salary-payment, tax-remittance, and HR-payroll systems run on. The flagship product, **Remita**, is the federal government's treasury-payment platform; collections from federal agencies flow through it. The portfolio also includes:

- **Pouchii** — consumer wallet & lifestyle payments app
- **HumanManager** — enterprise HR / payroll suite
- **FundACause** — donations & crowdfunding platform
- **Whatadeal** — group-buying / commerce
- **Monicenta** — micro-finance / lending platform

The parent brand (**STSL** — SystemSpecs Technology Solutions Limited) sits over all of these as the institutional, trust-oriented, government-and-enterprise face. The website redesign — and therefore this design system — is **the parent brand**, not any individual product.

---

## CONTENT FUNDAMENTALS

The voice is **patient, declarative, infrastructural**. STSL writes the way a 30-year institution speaks: confident, calm, evidence-led. Marketing tropes are conspicuously absent.

### Voice rules

- **No "we" chest-beating.** The brand speaks in third-person institutional voice or implicit second-person ("Built for…"). Avoid "We are excited to…".
- **No "you" salesmanship either.** Direct address is reserved for clear, functional CTAs ("Talk to sales", "Visit Remita").
- **Sentence case for headlines and buttons.** Title Case is reserved for proper nouns and product names. (`Talk to sales`, *not* `Talk To Sales`.)
- **Numerals over prose.** "₦400 trillion in flows", not "four hundred trillion".
- **Concrete proof over adjectives.** Every solution card has a `proof` field — a number, an institution, a year. Adjectives like "innovative", "best-in-class", "world-class" are banned.
- **No emoji.** Anywhere. Period.
- **No exclamation marks.** Anywhere. Period.

### Tone examples (exact strings from the system)

| Surface | Copy |
|---|---|
| Hero headline | *"Infrastructure for Africa's payments, government, and HR systems."* |
| Hero subhead | *"For three decades, SystemSpecs has built and operated the platforms institutions trust to move money, manage people, and serve citizens."* |
| Eyebrow | *"Established 1992"* |
| Solution proof | *"Powering federal collections since 2012"* |
| Section header | *"Built for the institutions that move Africa."* |
| Footer descriptor | *"The infrastructure behind Africa's payment, government, and financial technology systems."* |

### Casing & punctuation

- Eyebrows / overlines: `UPPERCASE` with `letter-spacing: 0.22em`, mono font, weight 500.
- Headlines: sentence case, `text-wrap: balance`, tracking `-0.02em` at display sizes.
- Body: sentence case, `text-wrap: pretty`, `max-width: 65ch`.
- Proof labels (the small caps above a stat): `UPPERCASE` mono, 10px, `letter-spacing: 0.22em`.
- Em dashes are used liberally — the way an editorial writer would.

### Vibe in one paragraph

If The Economist redesigned a Nigerian fintech holding company's site, this is what it would look and read like. Cream paper. Two-column editorial grids. A single anchor color used sparingly. Numbers do the work words usually do. Trust is the product.

---

## VISUAL FOUNDATIONS

### Background

- **Primary canvas: warm cream `#FBF8F2`.** Not white. The cream is the single most important visual decision; it signals "paper / editorial / patient" rather than "SaaS / chrome / energetic". Use `--bg-canvas`.
- **Surface white `#FFFFFF`.** Cards and modals only.
- **Raised surface `#F5F1E8`.** Recessed UI (input fills, secondary panels). Slightly warmer than canvas.
- **Inverse `#0B0C0F`.** Near-black, not pure black; used for the footer and high-contrast moments only.
- No gradients on backgrounds. No imagery stretched full-bleed behind text. The canvas is *itself* the texture.

### Color

- **One anchor accent: Brand Teal `#017A6A` (`--accent-default`).** It earns its weight by being almost the only saturated color in any given view. Hover deepens to `#014E44` (in-hue, never a hue jump).
- **Supporting emphasis: Navy Ink `#1A356A` (`--accent-emphasis`)** — pull-quotes, hero numerals, occasional accent.
- **Brand-teal trio** for marks only: `#017A6A` / `#83BFB7` / `#B6D8D4` — the three dots in the wordmark, sized largest-to-smallest.
- Feedback colors are muted (`#2E8B57` success, `#D99A00` warning, `#C0353A` danger, `#2769C4` info) so they don't out-shout the cream canvas.
- **Imagery is warm, photographic, slightly desaturated.** No b&w. No grain. No cool blue-gray stock photography. Think: morning-light-on-paper.

### Type

- **Display: Plus Jakarta Sans** (Source Serif 4 in the live site; Plus Jakarta is the licensed substitute used here). Weights 500/600. Tight tracking (`-0.02em` at display, `-0.005em` at heading).
- **Body: Geist** (the licensed face — loaded locally as a variable font from `fonts/Geist-VariableFont_wght.ttf`; the live site renders Inter Tight, Geist is the closest licensable equivalent). 400/500/600.
- **Editorial accents: Source Serif 4 italic.** Used for ledes and pull-quotes only.
- **Mono: JetBrains Mono.** Eyebrows, overlines, proof-labels, code.
- See `colors_and_type.css` for the role-token scale.

> **Font substitution flag:** the live site uses *Inter Tight* (sans) and *Source Serif 4* (serif) under a commercial license. **Geist** ships locally from `fonts/Geist-VariableFont_wght.ttf` (the variable font you uploaded — closest licensable match for Inter Tight at body sizes). **Plus Jakarta Sans** + **Source Serif 4** come from Google as free-tier display & serif matches. **If exact-match fidelity is required, drop the licensed Inter-Tight `.woff2` files into `fonts/` and update `colors_and_type.css`.**

### Spacing

- 4px base, 8-step semantic scale (`--space-1` through `--space-32`).
- Generous: hero sections `pt-36 pb-32` (≈144px / 128px) at desktop. The cream canvas is *given air*.
- Card inner padding: `p-8` (32px). Card outer ring: `p-1.5` (6px) — see Doppelrand below.

### The Doppelrand (Card-in-card)

The single most distinctive structural decision. Every card is two concentric rounded rectangles:

1. **Outer shell.** `rounded-3xl` (28px), `p-1.5` (6px), `ring-1 ring-[--border-subtle]`, warm-tinted ground (`color-mix` of canvas + raised), `shadow-e1`.
2. **Inner core.** `rounded-[calc(1.75rem-0.375rem)]` (22px), white, `shadow-inner-hi` (inset highlight).

The 6px gap between them is the brand's signature "frame". Echoed at the micro-scale on icon chips (12px outer, 8px inner). Hero visuals use the same vocabulary.

### Borders

- Hairlines are **warm-toned** (`--border-subtle: #E6DFCE`, `--border-default: #D4CCB6`). Never cold `#E5E5E5`.
- 1px only. Heavier strokes feel anti-editorial.
- Borders separate; they do not contain. (Section dividers, card hairlines — yes. Boxing in headlines — no.)

### Shadows

- **Espresso, not grey.** `rgba(11,12,15,...)` not `rgba(0,0,0,...)`. The cream canvas would render a pure-grey shadow as cold/dirty.
- Five-level scale: `--shadow-e1` through `--shadow-e4` plus `--shadow-inner-hi` for the card inner glow.
- Cards rest at e1, hover-lift to e3, modals at e4.

### Radii

- 4 / 8 / 12 / 16 / 24 / 28 px plus pill (9999). The 28px outer + 22px inner combo is the Doppelrand signature.
- Pills are reserved for buttons, badges, eyebrows, and stat-pills.

### Hover states

- **Cards:** `translate-y(-0.5)` (≈2px lift) + shadow-e1 → shadow-e3. Duration 360ms, ease-expressive (`cubic-bezier(0.3, 0, 0, 1.05)`).
- **Buttons (primary):** background darkens to in-hue `--accent-default-hover`; the magnetic arrow chip translates `+0.5px x` and `-1px y` (the chip "leans forward").
- **Buttons (secondary):** ring color and text color transition to accent-default. No background fill until press.
- **Links:** color → accent-default-hover. No underline-on-hover (links are already `--text-link` colored).
- Opacity changes are reserved for disabled/dimmed states — never used as a hover affordance.

### Press states

- Buttons: no scale shrink. Shadow drops one level (e1 → e0). Background deepens marginally.
- Cards: same — translate returns to 0, shadow returns to e1. Press feels like the lift is "undone".

### Animation

- **Durations:** instant 80ms, fast 160ms, base 220ms, slow 360ms, slower 520ms. Scroll-reveal uses 520ms with a 60–120ms stagger.
- **Easings:** `--ease-standard` (most), `--ease-expressive` (hovers, buttons — has a tiny overshoot), `--ease-exit` (leaving the screen).
- **Bounces are forbidden.** Spring physics are forbidden. Motion is calm, brief, and authoritative.
- **Reveals on scroll:** subtle `opacity 0 → 1` + `translateY(8px → 0)`, never more than that.

### Transparency & blur

- The sticky nav uses `bg-bg-canvas/85` + `backdrop-blur-md`. This is the *only* place blur appears in the entire system.
- Card tints (the warm ground behind a Doppelrand outer shell) use `color-mix(in srgb, var(--bg-canvas) 55%, var(--bg-surface-muted) 45%)` — never `rgba()` with alpha. The cream canvas underneath would read incorrectly through alpha.
- No glass-morphism. No frosted overlays. No "elevated tinted layer" tropes.

### Layout rules

- **Three container widths:** `narrow` (max 720px, body content), `default` (max 1120px, marketing sections), `wide` (max 1400px, full marketing layouts).
- **12-column grid at lg.** Hero is `7 / 5`. Section headers are `8 / 4`. Card rows are 3- or 4-up.
- **Sticky nav.** No other fixed elements. No floating chat bubbles. No scroll-progress bars.
- **Footer is full-bleed inverse**, the only inverse-color section in any given page.

---

## ICONOGRAPHY

The repository's `packages/brand-stsl/src/icons/index.tsx` ships **27 hand-rolled SVG icons** as named React exports — `ArrowRight`, `ArrowUpRight`, `Menu`, `Close`, `Mail`, `Phone`, `LinkedIn`, `Twitter`, `Globe`, etc. They share a tight visual contract:

- **24×24 viewBox.**
- **1.6px stroke**, `stroke-linecap: round`, `stroke-linejoin: round`.
- **`currentColor` only** — no fills, no two-tone, no embedded color.
- Geometric, almost engineering-blueprint quality. No flourishes, no two-pixel details, no quirky personality. Closer to **Phosphor "thin"** or **Lucide** than Heroicons.

This design system uses **Lucide** as a CDN-friendly, near-pixel-identical substitute. Lucide ships the same 24px / `currentColor` / round-cap aesthetic, has all 27 of the originals, and means we don't have to ship a custom font.

> **Substitution flag:** swapped the project's hand-rolled icons for Lucide (CDN). If you need pixel-exact parity, copy the SVGs out of `packages/brand-stsl/src/icons/index.tsx` and inline them.

### Icon usage rules

- **Default size: 16px.** Body-inline icons sit 2–3px below the text baseline.
- **Inside chips: 14px.** The button-chip pattern always ships a 14px icon.
- **Hero / feature: 22–24px.** Larger-than-text only when the icon is doing semantic work (e.g. menu toggle).
- **Stroke 1.6px is non-negotiable.** Lucide ships at `stroke-width="2"` by default — set it to `1.6` in CSS or via the `<i data-lucide="…" stroke-width="1.6">` attribute.
- **Color: always `currentColor`.** Icons take their tint from the parent. Never assign explicit `fill` or `stroke` colors on icons inside components.

### Logo / wordmark assets

| Asset | Where | Use |
|---|---|---|
| `assets/systemspecs-wordmark-black.png` | dark text on light bg | Default header / business cards / press |
| `assets/systemspecs-wordmark-white.png` | light text on dark bg | Footer / inverse moments only |
| `assets/favicon.svg` | browser tab | The wordmark dot motif at 16×16 |
| `assets/group/*.svg` `assets/group/*.png` | product cards | Product-tier brand panels |

The **wordmark dot motif** (three teal dots descending in size, replacing the "y" tail in "Specs") is the one element that should never be redrawn or substituted — copy `assets/favicon.svg` or build a `DotMark` component from the trio of brand-teal vars (`--brand-teal`, `--brand-teal-light`, `--brand-teal-pale`).

### Emoji & unicode

- **No emoji.** Anywhere. Including loading states and empty states.
- **No unicode dingbats** (★ ✓ → ↗ etc.) used as icons. Use Lucide's `Star`, `Check`, `ArrowRight`, `ArrowUpRight`. The single exception: the typographic em dash (—), which is encouraged.

---

*Last revised: April 2026.*
