import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        "instrument-serif": ["var(--font-instrument-serif)", "serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        brand: "#7b39fc",
        bg: {
          light: "#0f172a",
          dark: "#020617",
        },
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.55)",
      },
    },
  },
  plugins: [],
};
export default config;