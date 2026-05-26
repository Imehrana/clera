import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange:  "#E8651A",
        brown:   "#2C1810",
        cream:   "#FAF7F2",
        beige:   "#F0E6D3",
        sand:    "#E0D9CF",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans:  ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        "logo":  "0.25em",
        "wide2": "0.2em",
        "wide3": "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
