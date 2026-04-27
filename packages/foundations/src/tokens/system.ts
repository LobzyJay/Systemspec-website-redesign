// Layer 1.5: semantic system tokens — the names components actually use.
// Each entry is a CSS custom property; brand packages bind values to these.
//
// Naming: `<role>.<modifier?>`. Avoid hue names here ("teal", "blue"); the
// whole point is to force the question "what role does this color play?"

export const systemTokenNames = {
  bg: {
    canvas: '--bg-canvas',
    surface: '--bg-surface',
    surfaceRaised: '--bg-surface-raised',
    surfaceMuted: '--bg-surface-muted',
    inverse: '--bg-inverse',
  },
  text: {
    primary: '--text-primary',
    secondary: '--text-secondary',
    muted: '--text-muted',
    onAccent: '--text-on-accent',
    onInverse: '--text-on-inverse',
    link: '--text-link',
  },
  border: {
    subtle: '--border-subtle',
    default: '--border-default',
    strong: '--border-strong',
    accent: '--border-accent',
  },
  accent: {
    default: '--accent-default',
    emphasis: '--accent-emphasis',
    subtle: '--accent-subtle',
    contrast: '--accent-contrast',
  },
  feedback: {
    success: '--feedback-success',
    successSubtle: '--feedback-success-subtle',
    warning: '--feedback-warning',
    warningSubtle: '--feedback-warning-subtle',
    danger: '--feedback-danger',
    dangerSubtle: '--feedback-danger-subtle',
    info: '--feedback-info',
    infoSubtle: '--feedback-info-subtle',
  },
} as const;

// A flat list of every system token (used by the Tailwind preset to expose
// `bg-canvas`, `text-primary`, `border-subtle`, etc.).
export const flattenedSystemTokens: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const [group, members] of Object.entries(systemTokenNames)) {
    for (const [name, varName] of Object.entries(members)) {
      out[`${group}-${kebab(name)}`] = `var(${varName})`;
    }
  }
  return out;
})();

function kebab(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
