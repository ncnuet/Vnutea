/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#19253D",
        "secondary": "#D9E8ED",
        "blue-sea": "#92D5E6",
        "green-patel": "#ACDFB2"
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ["Lato"]
      }
    },
  },
  plugins: [],
}

