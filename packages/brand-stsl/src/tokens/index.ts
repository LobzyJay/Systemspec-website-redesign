// Layer 2: STSL brand bindings. Maps Layer 1 reference scales to system
// tokens that components actually consume.
//
// To re-skin for SystemSpecs Holdings: copy this file into packages/brand-shl/
// and rebind. Component code stays untouched.

import { reference } from '@systemspecs/foundations/tokens';

const r = reference;

// Teal hex values sampled directly from the SystemSpecs Holdings parent
// wordmark dot motif. Pinned as literals here (rather than via the reference
// scale) because the reference scale is brand-neutral and serves all future
// brand packages. STSL specifically owns these three teals.
const brandTeal = {
  pale:  '#b6d8d4', // smallest dot — UI use: --accent-subtle ground tints
  light: '#83bfb7', // medium dot — UI use: hover/focus ring on inverse
  deep:  '#017a6a', // large dot — UI use: --accent-default, links, borders
} as const;

export const brandTokens = brandTeal;

export const stslLight = {
  // Backgrounds
  '--bg-canvas':         r.neutral[0],
  '--bg-surface':        r.neutral[0],
  '--bg-surface-raised': r.neutral[50],
  '--bg-surface-muted':  r.neutral[100],
  '--bg-inverse':        r.neutral[950],

  // Text
  '--text-primary':    r.neutral[900],
  '--text-secondary':  r.neutral[700],
  '--text-muted':      r.neutral[500],
  '--text-on-accent':  r.neutral[0],
  '--text-on-inverse': r.neutral[50],
  '--text-link':       brandTeal.deep,

  // Borders
  '--border-subtle':  r.neutral[100],
  '--border-default': r.neutral[200],
  '--border-strong':  r.neutral[400],
  '--border-accent':  brandTeal.deep,

  // Accent — STSL anchor teal sampled from the parent mark, with a deeper
  // supporting "ink" used sparingly for high-emphasis editorial moments.
  // Per brief §3.8 we explicitly stop using teal for everything; emphasis
  // pulls from ink instead.
  '--accent-default':  brandTeal.deep,
  '--accent-emphasis': r.ink[700],
  '--accent-subtle':   '#e6f4f1',
  '--accent-contrast': r.neutral[0],

  // Brand teal trio — exposed for marks that need the literal source teals
  // (e.g. <DotMark> in brand tone). UI consumers should still go through
  // --accent-* so theme swaps remain a single rebind.
  '--brand-teal':       brandTeal.deep,
  '--brand-teal-light': brandTeal.light,
  '--brand-teal-pale':  brandTeal.pale,

  // Feedback
  '--feedback-success':         r.green[500],
  '--feedback-success-subtle':  r.green[50],
  '--feedback-warning':         r.amber[500],
  '--feedback-warning-subtle':  r.amber[50],
  '--feedback-danger':          r.red[500],
  '--feedback-danger-subtle':   r.red[50],
  '--feedback-info':            r.blue[500],
  '--feedback-info-subtle':     r.blue[50],

  // Type — placeholder stack until a typeface is licensed. Brief §7 calls for
  // editorial display (serif) + precise neutral sans pairing. References for
  // the licensing decision: Stripe, Adyen, Mercury, Modern Treasury.
  '--font-display': '"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif',
  '--font-sans':    'Inter, "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  '--font-mono':    '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

// Dark mapping is plumbed but not designed yet — proves the token layer is
// theme-capable without committing to a dark surface palette in v1.
export const stslDark = {
  ...stslLight,
  '--bg-canvas':         r.neutral[950],
  '--bg-surface':        r.neutral[900],
  '--bg-surface-raised': r.neutral[800],
  '--bg-surface-muted':  r.neutral[800],
  '--bg-inverse':        r.neutral[0],
  '--text-primary':      r.neutral[50],
  '--text-secondary':    r.neutral[200],
  '--text-muted':        r.neutral[400],
  '--text-on-inverse':   r.neutral[900],
  '--text-link':         brandTeal.light,
  '--border-subtle':     r.neutral[800],
  '--border-default':    r.neutral[700],
  '--border-strong':     r.neutral[500],
  '--accent-default':    r.teal[400],
  '--accent-emphasis':   r.ink[300],
  '--accent-subtle':     r.teal[950],
} as const;

export type BrandTokenSet = typeof stslLight;
