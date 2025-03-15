/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        black: "#1D1D1F", // Deep black
        gray: "#F5F5F7", // Light gray
        darkGray: "#A1A1A6", // Subtle dark gray
        blue: "#0071E3", // Signature blue
        green: "#34C759", // Success green
        red: "#FF3B30", // Alert red
        yellow: "#FFCC00", // Warning yellow
      },
    },
  },
  plugins: [],
};
