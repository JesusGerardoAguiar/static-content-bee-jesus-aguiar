/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        black: "#1D1D1F",
        gray: "#F5F5F7",
        darkGray: "#A1A1A6",
        blue: "#0071E3",
        green: "#34C759",
        red: "#FF3B30",
        yellow: "#FFCC00",
      },
    },
  },
  plugins: [],
};
