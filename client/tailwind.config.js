import { text } from "body-parser";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode using a CSS class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
          light: "#1e293b", // Light mode text (Tailwind slate-800)
          dark: "#f8fafc", // Dark mode text (Tailwind slate-50)
        },
        border: {
          default: "#CFCFCF",
          border1: "#eaeaea",
          border2: "#bbbbbb",
          border3: "#dddddd",
        },
        text: {
          primary: "#2d2d2d",
          secondary: "#5E5E5E",
        },
        textfiels: {
          field1: "#eaeaea",
          field2: "#eaeaea",
          field3: "#bbbbbb",
        },
      },
    },
  },
  plugins: [],
};
