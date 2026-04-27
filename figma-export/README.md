# Figma export

Two token formats. Pick the one that matches your Figma plugin.

## `tokens.tokens-studio.json`

Use with **Tokens Studio for Figma** (formerly Figma Tokens). Recommended.

1. Install Tokens Studio plugin in Figma
2. Plugin → Import → JSON file → pick this file
3. The four token sets land as separate "themes":
   - `global` — neutral scales, spacing, radius, elevation, type metrics
   - `brand-stsl` — brand teals, extended palette (forest/gold/cream), product brand colors
   - `stsl-light` — light-theme bindings (canvas, surface, text, borders, accent)
   - `stsl-dark` — dark-theme bindings
4. Apply the right set order; the plugin will generate Figma styles + variables.

## `tokens.w3c.json`

Use with any plugin that reads the W3C Design Tokens Community Group format
(Style Dictionary, Specify, Supernova, etc.).

Structure follows the v0.x spec — `$type` at group level, `$value` per token.

## What's in here vs the source

These are exports — the source of truth lives in:
- `packages/foundations/src/tokens/*.ts` — TypeScript token authoring
- `packages/foundations/tailwind.preset.cjs` — Tailwind theme
- `packages/brand-stsl/src/styles.css` — STSL brand bindings as CSS variables

Regenerate if you change tokens upstream.

## Components on the docs page (for Figma library mirroring)

Map of design-system components → file paths, so a Figma rebuild can reference
the source. Names are stable.

**Foundations / primitives** (`packages/foundations/src/primitives/`)
- Button (4 variants × 3 sizes, magnetic arrow chip)
- Link (default / subtle / standalone)
- Card (flat / raised / outline)
- Input + Textarea + Field (label / hint / error)
- Badge (6 tones)
- Tabs (segmented pill list)
- Accordion (chevron chip)
- Dialog
- Tooltip
- Select
- Checkbox / Radio
- Skeleton (text / heading / card / circle)

**Brand** (`packages/brand-stsl/src/brand/`)
- DotMark (3 sizes, brand + mono)
- SystemSpecsWordmark (theme-aware: black on light, white on dark)
- Icon set — 24 icons, 1.25 stroke, 24×24 (`packages/brand-stsl/src/icons/`)

**Composed** (`packages/brand-stsl/src/components/`)
- Nav, Footer
- Hero (eyebrow + headline + subhead + 2 CTAs + visual frame)
- ProofBar (intro + 4 metrics + logo strip)
- SolutionCard (icon + title + description + proof + CTA)
- ProductCard (brand panel + paper panel + brand-color CTA)
- CapabilityStrip (eyebrow + headline + serif lede + capability list)
- GroupBlock (lineage strip — parent wordmark + 3 sister-brand columns)
- InsightCard (kind dot + title + publication·date + arrow chip)
- LeadershipCard (4:5 portrait + role/name plate + LinkedIn icon)
- TeamMember (square portrait + name/role, compact for 15+ grids)
- StatPill (avatars + label + big number)
- SegmentedCTA (3-up dark pathway cards)
- Globe (cobe live), DottedGlobe (SVG, with mask + filled variants), GlobeAsset
- WaveBackdrop / WaveBackdrop2 / WaveBackdrop3 (3 motion loops)

## Notes for the Figma rebuild

- **Vibe**: Editorial Luxury. Warm cream canvas (`bg-canvas` #FBF8F2), warm-tone hairlines, ambient espresso shadows (no harsh greys).
- **Type pairing**: Plus Jakarta Sans (display, weight 500) + Geist (body, 400) + Source Serif 4 italic (lede / pull-quotes) + JetBrains Mono (eyebrows + tokens).
- **CTA vocabulary**: pill button with magnetic arrow chip (button-in-button) is the signature interaction. Pill `h-12`, chip `h-9`, `pl-6 pr-1.5`.
- **No nested rounded corners** inside Stage / palette / chip surfaces — single-radius containers.
