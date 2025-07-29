/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
      fontFamily: {
        sans: ["SF Pro Text", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
