// Tailwind preset generated from foundations tokens. Apps consume this preset
// rather than configuring Tailwind directly so the system stays the source of
// truth.
//
// We can't `require` the .ts source from a CJS Tailwind config without ts-node,
// so this file mirrors the token shape. If a token changes in src/tokens/*.ts,
// update both. The brand-swap smoke test catches drift fast.

const systemColors = {
  bg: {
    canvas: 'var(--bg-canvas)',
    surface: 'var(--bg-surface)',
    'surface-raised': 'var(--bg-surface-raised)',
    'surface-muted': 'var(--bg-surface-muted)',
    inverse: 'var(--bg-inverse)',
  },
  fg: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--text-muted)',
    'on-accent': 'var(--text-on-accent)',
    'on-inverse': 'var(--text-on-inverse)',
    link: 'var(--text-link)',
  },
  border: {
    subtle: 'var(--border-subtle)',
    DEFAULT: 'var(--border-default)',
    strong: 'var(--border-strong)',
    accent: 'var(--border-accent)',
  },
  accent: {
    DEFAULT: 'var(--accent-default)',
    'default-hover': 'var(--accent-default-hover)',
    emphasis: 'var(--accent-emphasis)',
    subtle: 'var(--accent-subtle)',
    contrast: 'var(--accent-contrast)',
  },
  feedback: {
    success: 'var(--feedback-success)',
    'success-subtle': 'var(--feedback-success-subtle)',
    warning: 'var(--feedback-warning)',
    'warning-subtle': 'var(--feedback-warning-subtle)',
    danger: 'var(--feedback-danger)',
    'danger-subtle': 'var(--feedback-danger-subtle)',
    info: 'var(--feedback-info)',
    'info-subtle': 'var(--feedback-info-subtle)',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  // Bind Tailwind's `dark:` variant to the docs ThemeToggle's data-attribute
  // (set on <html data-theme="dark">), not the user's OS preference. Lets
  // components opt into theme-aware swaps with `dark:hidden` / `dark:block`.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      0: '0',
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      13: '3.25rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      pill: '9999px',
      full: '9999px',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      sans:    ['var(--font-sans)',    'Geist', 'system-ui', 'sans-serif'],
      serif:   ['var(--font-serif)',   'Source Serif 4', 'Georgia', 'serif'],
      mono:    ['var(--font-mono)',    'JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    // Each size ships with its intended weight. Editorial restraint —
    // displays at 500 (medium), headings at 500/600, body at 400 (regular).
    // This pulls the page back from "bold everywhere" to "weight by role."
    fontSize: {
      'display-2xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em',  fontWeight: '500' }],
      'display-xl':  ['3.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em',  fontWeight: '500' }],
      'display-lg':  ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.015em', fontWeight: '500' }],
      'display-md':  ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em',  fontWeight: '500' }],
      'heading-1':   ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.005em', fontWeight: '500' }],
      'heading-2':   ['1.5rem',  { lineHeight: '1.25', fontWeight: '500' }],
      'heading-3':   ['1.25rem', { lineHeight: '1.3',  fontWeight: '500' }],
      'heading-4':   ['1.125rem',{ lineHeight: '1.35', fontWeight: '500' }],
      'body-lg':     ['1.125rem',{ lineHeight: '1.55', fontWeight: '400' }],
      'body':        ['1rem',    { lineHeight: '1.6',  fontWeight: '400' }],
      'body-sm':     ['0.875rem',{ lineHeight: '1.55', fontWeight: '400' }],
      'caption':     ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.005em', fontWeight: '400' }],
      'overline':    ['0.75rem', { lineHeight: '1.4',  letterSpacing: '0.08em',   fontWeight: '500' }],
      'mono':        ['0.875rem',{ lineHeight: '1.55', fontWeight: '400' }],
    },
    extend: {
      colors: systemColors,
      maxWidth: {
        prose: '44rem',
        container: '76rem',
      },
      // Editorial Luxury elevation. Diffuse, warm-tinted ambient drops — no
      // harsh dark drop shadows (skill anti-pattern). Two layers per step:
      // a tight "contact" shadow + a wide ambient bloom in the espresso ink
      // hue. Inset highlight is provided by components that want it (Doppelrand
      // outer shells), via shadow-inner-hi.
      boxShadow: {
        e0: 'none',
        e1: '0 1px 0 0 rgba(34, 28, 16, 0.04), 0 6px 18px -10px rgba(34, 28, 16, 0.10)',
        e2: '0 1px 0 0 rgba(34, 28, 16, 0.04), 0 12px 28px -14px rgba(34, 28, 16, 0.14)',
        e3: '0 2px 0 0 rgba(34, 28, 16, 0.05), 0 22px 48px -20px rgba(34, 28, 16, 0.20)',
        e4: '0 2px 0 0 rgba(34, 28, 16, 0.06), 0 36px 72px -28px rgba(34, 28, 16, 0.28)',
        // Inner highlight for Doppelrand inner cores — simulates the glass-on-
        // metal seam where the inner panel meets the outer shell.
        'inner-hi':       'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        'inner-hi-dark':  'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      borderRadius: {
        // Doppelrand outer shells use these exaggerated radii. Inner cores
        // compute their own radius via calc() so curves stay concentric.
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      transitionDuration: {
        instant: '80ms',
        fast: '160ms',
        base: '220ms',
        slow: '360ms',
        slower: '520ms',
        cinematic: '700ms',
      },
      // Custom cubic-beziers — the skill demands non-linear, non-ease-in-out
      // curves. `expressive` is the Vercel/Linear "0.32, 0.72, 0, 1" curve;
      // `editorial` is a slower, weightier counterpart for entrance moves.
      transitionTimingFunction: {
        standard:   'cubic-bezier(0.2, 0.0, 0, 1)',
        emphasized: 'cubic-bezier(0.3, 0.0, 0, 1.05)',
        expressive: 'cubic-bezier(0.32, 0.72, 0, 1)',
        editorial:  'cubic-bezier(0.16, 1, 0.3, 1)',
        exit:       'cubic-bezier(0.4, 0.0, 1, 1)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translate3d(0, 16px, 0)', filter: 'blur(6px)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)',    filter: 'blur(0)' },
        },
        // Dialog motion — matches `.kit-sheet` in the prototype kit.
        // Backdrop fades; content scales 0.96 → 1.0 with opacity, both on the
        // `expressive` curve (cubic-bezier(0.32, 0.72, 0, 1)).
        'stsl-dialog-overlay-in':  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'stsl-dialog-overlay-out': { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
        'stsl-dialog-content-in': {
          '0%':   { opacity: 0, transform: 'translate(-50%, -50%) scale(0.96) translateY(8px)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)    translateY(0)' },
        },
        'stsl-dialog-content-out': {
          '0%':   { opacity: 1, transform: 'translate(-50%, -50%) scale(1)    translateY(0)' },
          '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.96) translateY(8px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        // Dialog — 220ms expressive in, slightly faster exit. `motion-reduce`
        // variants drop to a 100ms linear crossfade per the brief.
        'stsl-dialog-overlay-in':          'stsl-dialog-overlay-in 220ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'stsl-dialog-overlay-out':         'stsl-dialog-overlay-out 180ms cubic-bezier(0.4, 0.0, 1, 1) both',
        'stsl-dialog-content-in':          'stsl-dialog-content-in 220ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'stsl-dialog-content-out':         'stsl-dialog-content-out 180ms cubic-bezier(0.4, 0.0, 1, 1) both',
        'stsl-dialog-overlay-in-reduced':  'stsl-dialog-overlay-in 100ms linear both',
        'stsl-dialog-overlay-out-reduced': 'stsl-dialog-overlay-out 100ms linear both',
        'stsl-dialog-content-in-reduced':  'stsl-dialog-overlay-in 100ms linear both',
        'stsl-dialog-content-out-reduced': 'stsl-dialog-overlay-out 100ms linear both',
      },
    },
  },
  plugins: [],
};
