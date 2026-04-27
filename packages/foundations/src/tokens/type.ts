// Type scale. Names are role-based, not size-based, so type can be re-tuned
// without renaming uses across the codebase.

export const fontFamily = {
  display: 'var(--font-display)',
  sans:    'var(--font-sans)',
  mono:    'var(--font-mono)',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// [size, lineHeight, letterSpacing?]
export const fontSize = {
  'display-2xl': ['4.5rem',  '1.05', '-0.02em'],
  'display-xl':  ['3.5rem',  '1.05', '-0.02em'],
  'display-lg':  ['2.75rem', '1.1',  '-0.015em'],
  'display-md':  ['2.25rem', '1.15', '-0.01em'],
  'heading-1':   ['1.875rem','1.2',  '-0.005em'],
  'heading-2':   ['1.5rem',  '1.25'],
  'heading-3':   ['1.25rem', '1.3'],
  'heading-4':   ['1.125rem','1.35'],
  'body-lg':     ['1.125rem','1.55'],
  'body':        ['1rem',    '1.6'],
  'body-sm':     ['0.875rem','1.55'],
  'caption':     ['0.8125rem','1.5', '0.005em'],
  'overline':    ['0.75rem', '1.4',  '0.08em'],
  'mono':        ['0.875rem','1.55'],
} as const satisfies Record<
  string,
  readonly [string, string] | readonly [string, string, string]
>;

export type FontSizeToken = keyof typeof fontSize;
