/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#138B31',
        secondary: '#F6F6F6',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true
}
