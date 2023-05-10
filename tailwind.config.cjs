/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				primary: "#ee4d2d",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
