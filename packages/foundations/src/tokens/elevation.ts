// Restrained shadow set — five steps, layered for use in cards, dialogs,
// and tooltips. Editorial-over-decorative means we lean on borders before
// we reach for shadow.

export const elevation = {
  '0': 'none',
  '1': '0 1px 2px 0 rgba(11, 12, 15, 0.06), 0 1px 3px 0 rgba(11, 12, 15, 0.04)',
  '2': '0 2px 6px -1px rgba(11, 12, 15, 0.08), 0 2px 4px -2px rgba(11, 12, 15, 0.05)',
  '3': '0 8px 18px -6px rgba(11, 12, 15, 0.12), 0 4px 8px -4px rgba(11, 12, 15, 0.06)',
  '4': '0 18px 36px -10px rgba(11, 12, 15, 0.18), 0 8px 18px -8px rgba(11, 12, 15, 0.08)',
} as const;
