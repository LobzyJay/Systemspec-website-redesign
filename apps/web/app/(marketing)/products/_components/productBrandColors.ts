// Single source of truth for product brand colours across the Products
// sub-tree. Mirrors the map declared on the homepage so a colour change ripples
// through the overview hero panel + all 3 sub-pages without drift.
//
// Pouchii teal · FundACause gold · Monicenta espresso.

export const productBrandColors = {
  pouchii: '#017A6A',
  fundacause: '#D4A82C',
  monicenta: '#3A3F4D',
} as const;

export type ProductSlug = keyof typeof productBrandColors;
