/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: '#79b473',
        mutedteal: '#70a37f',
        baltic: '#41658a',
        twilight: '#414073',
        grape: '#4c3957',
        // Deep cohesive dark theme based on vintage-grape & twilight-indigo
        darkbg: '#18121e',
        cardbg: '#241a2c',
        borderdark: '#3d2e49',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
