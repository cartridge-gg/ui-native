const isDev = process.env.APP_VARIANT === "development";

export default {
	name: isDev ? "Cartridge Arcade (Dev)" : "Cartridge Arcade",
	slug: "arcade",
	scheme: "cartridge-arcade",
	version: "1.0.0",
	owner: "cartridge",
	web: {
		favicon: "./assets/favicon.png",
	},
	experiments: {
		tsconfigPaths: true,
	},
	plugins: [
		"expo-dev-client",
		[
			"expo-font",
			{
				fonts: [
					"node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf",
					"node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf",
					"node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf",
					"node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf",
					"node_modules/@expo-google-fonts/ibm-plex-mono/400Regular/IBMPlexMono_400Regular.ttf",
					"node_modules/@expo-google-fonts/ibm-plex-mono/500Medium/IBMPlexMono_500Medium.ttf",
					"node_modules/@expo-google-fonts/ibm-plex-mono/600SemiBold/IBMPlexMono_600SemiBold.ttf",
					"node_modules/@expo-google-fonts/ibm-plex-mono/700Bold/IBMPlexMono_700Bold.ttf",
				],
			},
		],
		"expo-router",
		"expo-web-browser",
		[
			"expo-secure-store",
			{
				configureAndroidBackup: true,
				faceIDPermission:
					"Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
			},
		],
	],
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "light",
	splash: {
		image: "./assets/icon.png",
		resizeMode: "contain",
		backgroundColor: "#151916",
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true,
		bundleIdentifier: isDev
			? "com.cartridge.arcade.dev"
			: "com.cartridge.arcade",
		associatedDomains: ["webcredentials:x.cartridge.gg"],
		config: {
			usesNonExemptEncryption: false,
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/icon.png",
			backgroundColor: "#151916",
		},
		package: isDev ? "com.cartridge.arcade.dev" : "com.cartridge.arcade",
	},
	extra: {
		eas: {
			projectId: "a5a9815c-f840-4afa-a861-b8cbc251e9c2",
		},
	},
};
