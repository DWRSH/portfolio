/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add a custom font, e.g., Inter
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
