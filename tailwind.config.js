/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        mainColor: 'var(--Tedooo-Main-Main-color)',
        grey5: 'var(--Grayscale-Gray-5)',
        grey50: 'var(--Grayscale-Gray-50)',
        grey65: 'var(--Grayscale-Gray-65)',
        grey85: 'var(--Grayscale-Gray-85)',
        indigo: 'var(--indigo-indigo-primary-cta)'
      },
    },
  },
  plugins: [],
}

