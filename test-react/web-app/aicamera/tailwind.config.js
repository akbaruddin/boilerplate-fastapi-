/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./hooks/*.{tsx,ts}",
    "./components/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./stores/*.{tsx,ts}",
    "./router/*.{tsx,ts}",
    "./router/**/*.{tsx,ts}",
    "./main.tsx",
    "./../../app/templates/aicamera_index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
