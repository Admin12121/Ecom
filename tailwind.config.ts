import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        scroll:"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
    screens:{
      'sm': '660px',
      'max-sm': {'max': '639px'},
      'md': '768px',
      'mmd' : '1000px',
      'mid-mmd': {'max': '900px'},
      'max-mmd': {'max': '1000px'},
      'lg': '1024px',
      'max-lg': {'max': '1100px'},
      'max-llg': {'max': '1120px'},
      'xxl': '1200px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  darkMode: "class",
  plugins: [nextui()],

};
export default config;
