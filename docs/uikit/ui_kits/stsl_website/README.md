# STSL Corporate Website — UI Kit

A high-fidelity recreation of the **SystemSpecs Technology Solutions Limited** corporate site. This is **the parent-brand marketing surface** — the institutional, government-and-enterprise face of the SystemSpecs group.

Built from the live redesign in `LobzyJay/Systemspec-website-redesign`. Components are pixel-faithful to the originals (`packages/brand-stsl/src/components/`) but factored as small, simple JSX with cosmetic-only logic — no production hooks, build tooling, or Tailwind plugin chain.

## Files

```
ui_kits/stsl_website/
├── README.md
├── index.html        ← interactive single-page recreation (Hero + Capabilities + Products + Insights + Footer)
├── primitives.jsx    ← Button, Pill, Eyebrow, Container, Stack, Icon helpers
├── Nav.jsx           ← sticky cream-blur header
├── Hero.jsx          ← editorial hero w/ globe visual frame
├── DottedGlobe.jsx   ← brand globe (SVG dot-grid)
├── SectionHeader.jsx ← eyebrow + headline + intro + side-link
├── ProductCard.jsx   ← Doppelrand card w/ brand panel + paper info
├── SolutionCard.jsx  ← icon-chip card with proof footer
├── InsightCard.jsx   ← press / insight / case-study cards
├── StatPill.jsx      ← inverse floating callout (avatar stack + value)
└── Footer.jsx        ← inverse footer with columns + group + contact
```

## Components covered

| Component | Source | Behavior |
|---|---|---|
| **Nav** | `Nav.tsx` | Sticky, `bg-canvas/85 + backdrop-blur-md`. Links + Talk-to-sales pill. |
| **Hero** | `Hero.tsx` | Editorial split. Eyebrow → headline → subhead → 2 buttons. Visual slot on right. |
| **Capability Strip** | `CapabilityStrip.tsx` | Comma-separated list of capabilities under hero. |
| **SectionHeader** | `SectionHeader.tsx` | 8/4 split: eyebrow + headline + intro on left, side-link on right. |
| **ProductCard** | `ProductCard.tsx` | Brand-panel + paper-info + branded CTA pill. |
| **SolutionCard** | `SolutionCard.tsx` | Icon-chip + title + desc + proof + CTA. Pinned-to-bottom CTA. |
| **InsightCard** | `InsightCard.tsx` | Cover image + kind-tag + headline + meta + chip. |
| **StatPill** | `StatPill.tsx` | Inverse pill, avatar stack + label + value. |
| **Footer** | `Footer.tsx` | Inverse, 6-col grid: brand+social, link cols, group cos, contact. |

## What clicks

The recreation is interactive but cosmetic:

- Mobile menu toggles open/close.
- Buttons hover with the magnetic-arrow chip translation.
- Cards lift `2px` on hover with shadow ramp e1 → e3.
- "Talk to sales" CTA opens an inline contact panel with field validation (email format only).
- Product-card hover shifts the brand-color CTA ring.

This is **not** a production site. It is a click-through visual reference for designers and agents recreating STSL marketing surfaces.

## Substitutions vs. live site

| Original | Substituted with | Reason |
|---|---|---|
| Inter Tight | Geist (Google Fonts) | License-free near-match |
| Source Serif Pro | Source Serif 4 | Identical, Google-hosted |
| 27 hand-rolled SVG icons | Lucide CDN (1.6px stroke) | Same 24/`currentColor`/round vocabulary |
| `react-three-fiber` 3D globe | SVG `DottedGlobe` | No 3D dependency in static HTML |
| Next.js Image | plain `<img>` | Static HTML |

## How to use

Open `index.html` directly. All styles inherit from `../../colors_and_type.css`. Components are loaded as Babel-transpiled `.jsx` script tags — no bundler required.
