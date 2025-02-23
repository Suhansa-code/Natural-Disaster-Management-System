/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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
					// Adding low-opacity versions
					"100-low": "rgba(82, 59, 47, 0.8)", // 50% opacity
					"200-low": "rgba(235, 226, 219, 0.3)", // 30% opacity
				},
				// Example for adding other low-opacity custom colors
				accent: {
					DEFAULT: "#FF5733",
					low: "rgba(255, 87, 51, 0.4)", // 40% opacity
				},
			},
			fontFamily: {
				primaryFont: ["primaryFont", "serif"],
			},
		},
	},
	plugins: [],
});
