/** @type {import('tailwindcss').Config} */
const { cartridgeTWPreset } = require("./ui/src/preset");
const { platformSelect } = require("nativewind/theme");

module.exports = {
	content: [
		"./src/**/*.{js,ts,tsx}",
		"./app/**/*.{js,ts,tsx}",
	],
	presets: [require("nativewind/preset"), cartridgeTWPreset],
	theme: {
		extend: {
			// Port animations and keyframes from ui/tailwind.config.ts
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				shimmer: {
					"0%": { backgroundPosition: "100% 0%" },
					"20%": { backgroundPosition: "-100% 0%" },
					"100%": { backgroundPosition: "-100% 0%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shimmer: "shimmer 2s linear infinite",
			},
		},
	},
	plugins: [],
};
