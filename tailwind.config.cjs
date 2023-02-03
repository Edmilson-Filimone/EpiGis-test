/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar": "#29333d",
        "title":"#202020",
        "light":"#AAAAAA"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
