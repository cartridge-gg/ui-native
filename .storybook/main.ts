import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
	stories: [
		"../src/components/**/*.mdx",
		"../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
	],

	framework: {
		name: "@storybook/react-native-web-vite",
		options: {
			pluginReactOptions: {
				jsxRuntime: "automatic",
				jsxImportSource: "nativewind",
				babel: {
					plugins: ["react-native-reanimated/plugin"],
				},
			},
		},
	},

	docs: {
		autodocs: true,
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},

	async viteFinal(config) {
		// Configure esbuild to handle JSX in .mjs files from @rn-primitives/slot
		config.optimizeDeps = config.optimizeDeps || {};
		config.optimizeDeps.esbuildOptions =
			config.optimizeDeps.esbuildOptions || {};
		config.optimizeDeps.esbuildOptions.loader = {
			...config.optimizeDeps.esbuildOptions.loader,
			".mjs": "jsx",
		};

		// Also configure build esbuild options
		config.build = config.build || {};
		config.build.rollupOptions = config.build.rollupOptions || {};
		config.build.rollupOptions.external =
			config.build.rollupOptions.external || [];

		// Force include @rn-primitives/slot in dependency optimization
		config.optimizeDeps.include = config.optimizeDeps.include || [];
		config.optimizeDeps.include.push("@rn-primitives/slot");

		return config;
	},
};
export default config;
