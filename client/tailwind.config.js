/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode using a CSS class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Paths to your files
  theme: {
    extend: {
      fontFamily: {
        proxima: ["Proxima Nova", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#1BB66E", // Light mode primary background
          dark: "#1BB66E",
          red: "#ff4070",
          yellow: "#edc41f",
        },
        hover: {
          light: "#0FE07F",
          dark: "#0FE07F",
        },
        secondary: {
          light: "#38bdf8", // Light mode (Sky Blue - sky-500)
          dark: "#0ea5e9", // Dark mode (Darker Sky Blue - sky-600)
        },
        text: {
          primary: "#2d2d2d",
          secondary: "#5E5E5E",
          light: "#1e293b", // Light mode text (Tailwind slate-800)
          dark: "#f8fafc", // Dark mode text (Tailwind slate-50)
        },
        border: {
          default: "#CFCFCF",
          border1: "#eaeaea",
          border2: "#bbbbbb",
          border3: "#dddddd",
        },
        textfields: {
          field1: "#eaeaea",
          field2: "#eaeaea",
          field3: "#bbbbbb",
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, and Edge
        },
      });
    },
  ],
};
