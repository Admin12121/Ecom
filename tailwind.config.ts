import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    backgroundImage: {
      "radial-gradient": "radial-gradient(circle at 50% 40%, white, black)",
      'custom-gradient': 'linear-gradient(135deg, #A97CF8, #F38CB8, #FDCC92)',
    },
    extend: {
      colors: {
        custom: "hsl(var(--custom))",
        main: "#9353d3",
        themeBlack: "#09090B",
        themeGray: "#27272A",
        themeDarkGray: "#27272A",
        themeTextGray: "#B4B0AE",
        themeTextWhite: "#F7ECE9",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100px)", opacity: "0" },
        },
        ripple: {
          "0%": {
            width: "0",
            height: "0",
            opacity: "0.5",
          },
          "100%": {
            width: "520px",
            height: "520px",
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        ripple: "ripple 1.4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.5s ease-in-out",
      },
      transitionTimingFunction: {
        gooey: "var(--spring-easing)",
      },
      fontFamily: {
        light: ["var(--font-geist-sans-light)"],
        normal: ["var(--font-geist-sans-regular)"],
        medium: ["var(--font-geist-sans-medium)"],
        semibold: ["var(--font-geist-sans-semibold)"],
        bold: ["var(--font-geist-sans-bold)"],
      },
    },
    screens: {
      sm: "660px",
      "max-sm": { max: "639px" },
      "max-sm-2": { max: "660px" },
      md: "768px",
      "max-md": { max: "767px" },
      "custom-md": { min: "800px", max: "1100px" },
      mmd: "1000px",
      "mid-mmd": { max: "900px" },
      "max-mmd": { max: "1000px" },
      lg: "1024px",
      "max-lg": { max: "1100px" },
      "max-llg": { max: "1120px" },
      xxl: "1200px",
      xl: "1280px",
      "max-2xl": { max: "1400px" },
      "2xl": "1536px",
      "3xl": "1636px",
      "4xl": "1736px",
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};
export default config;
