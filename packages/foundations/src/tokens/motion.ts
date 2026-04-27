export const duration = {
  instant: '80ms',
  fast:    '160ms',
  base:    '220ms',
  slow:    '360ms',
  slower:  '520ms',
} as const;

export const easing = {
  // "Calm over busy" per brief §7. Smooth, slightly biased toward the end.
  standard: 'cubic-bezier(0.2, 0.0, 0, 1)',
  emphasized: 'cubic-bezier(0.3, 0.0, 0, 1.05)',
  exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
} as const;
