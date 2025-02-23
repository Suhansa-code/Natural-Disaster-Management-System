// Import the utility with ES modules syntax
import withMT from "@material-tailwind/react/utils/withMT";

// Export configuration as default
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flip: {
          "0%, 50%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(180deg)" },
        },
      },
      animation: {
        flip: "flip 4s infinite alternate ease-in-out",
      },
      colors: {
        primary: "#FFFFFF",
        secondary: {
          100: "#523B2F",
          200: "#EBE2DB",
          "100-low": "rgba(82, 59, 47, 0.8)",
          "200-low": "rgba(235, 226, 219, 0.3)",
        },
        accent: {
          DEFAULT: "#FF5733",
          low: "rgba(255, 87, 51, 0.4)",
        },
      },
      fontFamily: {
        primaryFont: ["primaryFont", "serif"],
      },
    },
  },
  plugins: [],
});
