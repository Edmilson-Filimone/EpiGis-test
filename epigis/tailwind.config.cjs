/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar": "#29333d",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
