/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#19253D",
        "secondary": "#D9E8ED",
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ["Lato"]
      }
    },
  },
  plugins: [],
}

