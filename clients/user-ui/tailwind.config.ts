import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { Nanum_Gothic } from 'next/font/google';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      Nanum_Gothic: ['var(--font-Naum)'],
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
