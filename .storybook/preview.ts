import type { Preview } from "@storybook/react";
import React from "react";
import "../global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "#161a17",
				},
			],
		},
	},
	decorators: [
		(Story) => {
			// Force dark mode to match UI web version
			React.useEffect(() => {
				document.documentElement.classList.add("dark");
				document.documentElement.style.colorScheme = "dark";
				document.body.style.backgroundColor = "#161a17";
			}, []);

			return Story();
		},
	],
	tags: ["autodocs"],
};

export default preview;
