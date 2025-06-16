/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

export default {
  darkMode: 'class',  
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Your existing custom properties
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT:"var(--primary)",
          foreground:"var(--primary-foreground)",
          "50": "var(--primary-50)",
          "100": "var(--primary-100)",
          "200": "var(--primary-200)",
          "300": "var(--primary-300)",
          "400": "var(--primary-400)",
          "500": "var(--primary-500)",
          "600": "var(--primary-600)",
          "700": "var(--primary-700)",
          "800": "var(--primary-800)",
          "900": "var(--primary-900)",
        },
        "background-level-1": "var(--background-level-1)",
        "background-level-2": "var(--background-level-2)",
        "background-level-3": "var(--background-level-3)",
        "background-level-4": "var(--background-level-4)",
        "foreground-level-1": "var(--foreground-level-1)",
        "foreground-level-2": "var(--foreground-level-2)",
        "foreground-level-3": "var(--foreground-level-3)",
        "foreground-level-4": "var(--foreground-level-4)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
      fontSize: {
        "1000": "var(--text-1000)",
        "900": "var(--text-900)",
        "800": "var(--text-800)",
        "750": "var(--text-750)",
        "700": "var(--text-700)",
        "600": "var(--text-600)",
        "550": "var(--text-550)",
        "500": "var(--text-500)",
        "450": "var(--text-450)",
        "400": "var(--text-400)",
        "350": "var(--text-350)",
        "325": "var(--text-325)",
        "300": "var(--text-300)",
        "275": "var(--text-275)",
      },
      lineHeight: {
        "display": "var(--leading-display)", 

        "heading": "var(--leading-heading)",
        "title": "var(--leading-title)",
        "normal": "var(--leading-normal)",
        "body": "var(--leading-body)",
        "comfortable": "var(--leading-comfortable)",
      },
      letterSpacing: {
        "display": "var(--tracking-display)",
        "heading": "var(--tracking-heading)",
        "title": "var(--tracking-title)",
        "normal": "var(--tracking-normal)",
        "body": "var(--tracking-body)",
        "wide": "var(--tracking-wide)",
        "wider": "var(--tracking-wider)",
      }
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
      }
    })
  ]
}
