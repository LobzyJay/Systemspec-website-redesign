export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const containerMax = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '76rem',
  // 1280 max content width for editorial layouts; tracks the brief's
  // restraint principle.
  prose: '44rem',
} as const;
