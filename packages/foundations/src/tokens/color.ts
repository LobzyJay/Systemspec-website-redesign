// Layer 1: reference color scales. Brand-neutral. Components MUST NOT
// reference these directly — they read system tokens, which are bound to
// these scales by a brand package (e.g. @systemspecs/brand-stsl).

export const reference = {
  neutral: {
    0:   '#ffffff',
    50:  '#f7f8f9',
    100: '#eef0f2',
    200: '#dde1e6',
    300: '#c4cad1',
    400: '#a0a8b2',
    500: '#7a828d',
    600: '#5b626c',
    700: '#41464e',
    800: '#272a30',
    900: '#16181c',
    950: '#0b0c0f',
  },
  teal: {
    50:  '#eafaf6',
    100: '#cdf2e7',
    200: '#9ae5cf',
    300: '#62d3b3',
    400: '#2fb893',
    500: '#179a78',
    600: '#0d7a60',
    700: '#0c604c',
    800: '#0c4d3e',
    900: '#0a3e33',
    950: '#04221c',
  },
  // Deeper supporting accent — per brief §7, "deeper supporting accent"
  // alongside the brand teal so teal isn't doing every job.
  ink: {
    50:  '#eef3fb',
    100: '#d7e2f4',
    200: '#b0c4e7',
    300: '#7e9fd4',
    400: '#4f78bd',
    500: '#2e58a4',
    600: '#1f4385',
    700: '#1a356a',
    800: '#172b54',
    900: '#101e3b',
    950: '#0a1428',
  },
  amber: {
    50:  '#fff8e7',
    500: '#d99a00',
    700: '#8a5e00',
  },
  red: {
    50:  '#fdebec',
    500: '#c0353a',
    700: '#7d1f23',
  },
  green: {
    50:  '#e7f6ec',
    500: '#2e8b57',
    700: '#1e5f3b',
  },
  blue: {
    50:  '#e7f0fb',
    500: '#2769c4',
    700: '#1a4683',
  },
} as const;
