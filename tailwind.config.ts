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
      colors:{
        themeBlack: "#09090B",
        themeGray: "#27272A",
        themeDarkGray: "#27272A",
        themeTextGray: "#B4B0AE",
        themeTextWhite: "#F7ECE9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        scroll:"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"        
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }        
      },
    },
    screens:{
      'sm': '660px',
      'max-sm': {'max': '639px'},
      'max-sm-2': {'max': '660px'},
      'md': '768px',
      'max-md': {'max': '767px'},
      'custom-md': { 'min': '800px', 'max': '1100px' },
      'mmd' : '1000px',
      'mid-mmd': {'max': '900px'},
      'max-mmd': {'max': '1000px'},
      'lg': '1024px',
      'max-lg': {'max': '1100px'},
      'max-llg': {'max': '1120px'},
      'xxl': '1200px',
      'xl': '1280px',
      'max-2xl': {'max': '1400px'},
      '2xl': '1536px',
    }
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-animate")],

};
export default config;
