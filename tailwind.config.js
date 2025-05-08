/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: 'var(--or-primary-color)',
        background: {
          light: 'var(--or-background-light)',
          white: 'var(--or-background-white)',
        },
        text: {
          dark: 'var(--or-text-dark)',
          muted: 'var(--or-text-muted)',
        },
        border: 'var(--or-border-color)',
        accent: 'var(--or-accent-color)',
      },
      fontFamily: {
        oriya: ['Noto Sans Oriya', 'system-ui', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
  },
  plugins: [],
}