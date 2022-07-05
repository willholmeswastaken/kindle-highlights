/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBackground: "#f7f7f7",
        brandText: "#191c1f",
      },
      letterSpacing: {
        normal: ".025em",
      },
    },
  },
  plugins: [],
};
