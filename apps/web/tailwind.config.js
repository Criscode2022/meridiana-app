/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F3EC',
        surface: '#FFFFFF',
        ink: '#1C2B2B',
        'ink-muted': '#5A6B6B',
        primary: { DEFAULT: '#0F6B66', soft: '#E3F2F1', strong: '#0A524E' },
        accent: '#C4785A',
        border: '#E2DBD2',
        danger: '#B42318',
      },
      fontFamily: {
        display: ['Literata', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
