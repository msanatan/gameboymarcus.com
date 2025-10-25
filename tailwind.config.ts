import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFDE59",
        link: "#597AFF",
        accent: "#00cdac",
        "code-bg": "#000000",
        "code-text": "#79c0ff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        retro: ["var(--font-press-start)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
