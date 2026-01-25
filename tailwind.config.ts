/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  plugins: [
    require('tailwindcss-logical'),
    require('./src/ui/core/tailwind/plugin'),
  ],
  theme: {
    extend: {},
  },
} as Config;

export default config;
