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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1f2937',
            a: {
              color: '#597AFF',
              '&:hover': {
                color: '#4560d9',
              },
              textDecoration: 'underline',
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
              fontSize: '1.875em',
              marginTop: '1.5555556em',
              marginBottom: '0.8888889em',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            code: {
              color: '#e11d48',
              backgroundColor: '#fef2f2',
              borderRadius: '0.25rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0',
              borderRadius: '0',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#374151',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#FFDE59',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
              backgroundColor: '#fffbeb',
              padding: '1rem',
              borderRadius: '0.25rem',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.625em',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.625em',
            },
            'ul > li': {
              paddingLeft: '0.375em',
            },
            'ol > li': {
              paddingLeft: '0.375em',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2em',
              marginBottom: '2em',
            },
            strong: {
              color: '#111827',
              fontWeight: '700',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
