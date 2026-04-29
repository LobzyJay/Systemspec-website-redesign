---
name: systemspecs-design
description: Use this skill to generate well-branded interfaces and assets for SystemSpecs (STSL — SystemSpecs Technology Solutions Limited), the parent technology house behind Remita, Pouchii, HumanManager, FundACause, Whatadeal, and Monicenta. Use it for production work, prototypes, marketing pages, decks, and throwaway mocks. Contains essential design guidelines, colors, type, fonts, brand assets, and a UI kit recreating the corporate website.
user-invocable: true
---

# SystemSpecs / STSL — Design Skill

Read the **`README.md`** at the root of this skill first; it covers the brand at a high level (Content Fundamentals, Visual Foundations, Iconography). Then explore the other files as needed:

- **`colors_and_type.css`** — drop-in CSS variables for color, type, spacing, radii, shadow, motion. Import this and you have the system.
- **`assets/`** — official wordmarks (black + white), favicon, and the six STSL group product logos (Remita, Pouchii, HumanManager, FundACause, Whatadeal, Monicenta). **Copy these out — never redraw them.**
- **`preview/`** — small HTML cards that document each token in context (color swatches, type specimens, the Doppelrand card, button anatomy, etc). Read these to see the system *applied*, not just defined.
- **`ui_kits/stsl_website/`** — pixel-faithful recreation of the SystemSpecs corporate marketing site, with reusable JSX components: `Nav`, `Hero`, `SolutionCard`, `ProductCard`, `InsightCard`, `StatPill`, `Footer`, `DottedGlobe`, plus `primitives.jsx` (`Button`, `Eyebrow`, `Container`, `Doppelrand`, `Icon`).

## When using this skill

- **Visual artifacts (slides, mocks, throwaway prototypes, marketing pages):** copy assets out of `assets/`, link `colors_and_type.css`, and produce static HTML. Lift JSX components verbatim from `ui_kits/stsl_website/` when the user asks for anything site-shaped.
- **Production code:** copy assets and read the rules in `README.md` to become an expert in designing with this brand. Don't ship the UI kit components as-is — they're cosmetic; reimplement against your real design system.
- **No guidance from the user:** ask what they want to build, ask 3–5 sharp questions (audience, surface, fidelity, length), then act as an expert designer who outputs HTML artifacts *or* production code.

## Brand non-negotiables

These are the rules that, if broken, immediately make the work feel "not-SystemSpecs":

1. **Cream canvas (`#FBF8F2`), never white.** White is for cards, not pages.
2. **One anchor accent — Brand Teal `#017A6A`.** Use it sparingly. No bluish-purple gradients. No second saturated color in the same view.
3. **Doppelrand cards.** Outer 28px shell + 6px gap + inner 22px white core, on every card. No flat single-radius cards.
4. **Espresso shadows (`rgba(11,12,15,...)`)**, never grey.
5. **Warm-toned hairlines (`#E6DFCE`)**, never `#E5E5E5`.
6. **Sentence-case headlines. No emoji. No exclamation marks.**
7. **Concrete proof over adjectives.** Every solution gets a number, an institution, or a year. Banned words: innovative, world-class, best-in-class, cutting-edge.
8. **Pill buttons with the magnetic arrow chip** for primary CTAs — see `ui_kits/stsl_website/primitives.jsx`.

If anything you produce contradicts these, redo it.
