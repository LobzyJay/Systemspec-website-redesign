import type { Config } from 'tailwindcss';
import preset from '@systemspecs/foundations/tailwind-preset';

const config: Config = {
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './content/**/*.{ts,tsx}',
    '../../packages/foundations/src/**/*.{ts,tsx}',
    '../../packages/brand-stsl/src/**/*.{ts,tsx}',
  ],
};

export default config;
