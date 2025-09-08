import { controllerConfigs } from "@cartridge/presets";
import { usePathname } from "expo-router";
import { useColorScheme, vars } from "nativewind";
import { createContext, type PropsWithChildren, useMemo } from "react";
import { View } from "react-native";
import { useArcade } from "#clone/arcade/hooks/arcade";

export const themes = {
	default: {
		light: vars({
			"--background-100": "135 8% 9%",
			"--background-125": "135 8% 10%",
			"--background-150": "135 7% 11%",
			"--background-200": "135 6% 13%",
			"--background-300": "120 5% 15%",
			"--background-400": "120 6% 17%",
			"--background-500": "132 4% 23%",

			"--translucent-dark-100": "0 0% 0% / 0.078",
			"--translucent-dark-150": "0 0% 0% / 0.122",
			"--translucent-dark-200": "0 0% 0% / 0.478",
			"--translucent-dark-300": "0 0% 0% / 0.639",

			"--translucent-light-100": "0 0% 100% / 0.039",
			"--translucent-light-150": "0 0% 100% / 0.161",
			"--translucent-light-200": "0 0% 100% / 0.478",
			"--translucent-light-300": "0 0% 100% / 0.639",

			"--spacer-100": "132 14% 7%",

			"--foreground-100": "0 0% 100%",
			"--foreground-200": "0 0% 61%",
			"--foreground-300": "0 0% 50%",
			"--foreground-400": "0 0% 31%",

			"--primary-100": "44 96% 64%",
			"--primary-200": "44 58% 52%",
			"--primary-foreground-100": "132 14% 7%",

			"--wallet-theme-100": "249 76% 79%",
			"--wallet-theme-200": "233 89% 71%",
			"--wallet-theme-300": "28 79% 57%",
			"--wallet-theme-400": "16 100% 68%",
			"--wallet-theme-500": "227 58% 65%",
			"--wallet-theme-600": "211 97% 61%",

			"--secondary-100": "120 57% 78%",
			"--destructive-100": "0 72% 65%",
			"--constructive-100": "128 67% 66%",
		}),
		dark: vars({
			"--background-100": "135 8% 9%",
			"--background-125": "135 8% 10%",
			"--background-150": "135 7% 11%",
			"--background-200": "135 6% 13%",
			"--background-300": "120 5% 15%",
			"--background-400": "120 6% 17%",
			"--background-500": "132 4% 23%",

			"--translucent-dark-100": "0 0% 0% / 0.078",
			"--translucent-dark-150": "0 0% 0% / 0.122",
			"--translucent-dark-200": "0 0% 0% / 0.478",
			"--translucent-dark-300": "0 0% 0% / 0.639",

			"--translucent-light-100": "0 0% 100% / 0.039",
			"--translucent-light-150": "0 0% 100% / 0.161",
			"--translucent-light-200": "0 0% 100% / 0.478",
			"--translucent-light-300": "0 0% 100% / 0.639",

			"--spacer-100": "132 14% 7%",

			"--foreground-100": "0 0% 100%",
			"--foreground-200": "0 0% 61%",
			"--foreground-300": "0 0% 50%",
			"--foreground-400": "0 0% 31%",

			"--primary-100": "44 96% 64%",
			"--primary-200": "44 58% 52%",
			"--primary-foreground-100": "132 14% 7%",

			"--wallet-theme-100": "249 76% 79%",
			"--wallet-theme-200": "233 89% 71%",
			"--wallet-theme-300": "28 79% 57%",
			"--wallet-theme-400": "16 100% 68%",
			"--wallet-theme-500": "227 58% 65%",
			"--wallet-theme-600": "211 97% 61%",

			"--secondary-100": "120 57% 78%",
			"--destructive-100": "0 72% 65%",
			"--constructive-100": "128 67% 66%",
		}),
	},
} as const;

export const ThemeContext = createContext<{
	theme: "light" | "dark";
	isGameThemed: boolean;
}>({
	theme: "light",
	isGameThemed: false,
});

type ThemeProviderProps = PropsWithChildren<{ name?: "default" }>;

export function ThemeProvider({
	children,
	name = "default",
}: ThemeProviderProps) {
	const { colorScheme } = useColorScheme();
	const scheme = colorScheme ?? "light";
	const pathname = usePathname();
	const { games } = useArcade();

	const overrideVars = useMemo(() => {
		try {
			if (!pathname?.startsWith("/game/")) return undefined;
			const seg = pathname.split("/")[2];
			if (!seg) return undefined;

			const resolveConfig = () => {
				const direct = controllerConfigs[seg as keyof typeof controllerConfigs];
				if (direct) return direct;
				if (/^\d+$/.test(seg)) {
					const id = Number(seg);
					const byId = games.find((g) => g.id === id);
					const name = byId?.name?.toLowerCase?.();
					if (name) {
						const byName = Object.values(controllerConfigs).find(
							(c) => c?.theme?.name?.toLowerCase?.() === name,
						);
						if (byName) return byName;
					}
				}
				const slugified = seg.toLowerCase().replaceAll(" ", "-");
				return controllerConfigs[slugified as keyof typeof controllerConfigs];
			};

			const cfg = resolveConfig();
			const pick = (v?: string | { dark: string; light: string }) => {
				if (!v) return undefined;
				if (typeof v === "string") return v;
				return scheme === "dark" ? v.dark : v.light;
			};

			const primaryRaw = pick(cfg?.theme?.colors?.primary);
			const primaryFgRaw = pick(cfg?.theme?.colors?.primaryForeground);
			const primary = toTriplet(primaryRaw);
			const primaryForeground = toTriplet(primaryFgRaw);

			return primary || primaryForeground
				? vars({
						...(primary
							? { "--primary-100": primary, "--primary-200": primary }
							: {}),
						...(primaryForeground
							? { "--primary-foreground-100": primaryForeground }
							: {}),
					})
				: undefined;
		} catch {}
		return undefined;
	}, [pathname, games, scheme]);

	const isGameThemed = !!overrideVars;
	return (
		<ThemeContext.Provider value={{ theme: scheme, isGameThemed }}>
			<View style={[themes[name][scheme], overrideVars]} className="flex-1">
				{children}
			</View>
		</ThemeContext.Provider>
	);
}

function hexToHslTriplet(hex: string) {
	let c = hex.replace("#", "");
	if (c.length === 3)
		c = c
			.split("")
			.map((ch) => ch + ch)
			.join("");
	const r = parseInt(c.substring(0, 2), 16) / 255;
	const g = parseInt(c.substring(2, 4), 16) / 255;
	const b = parseInt(c.substring(4, 6), 16) / 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0;
	const l = (max + min) / 2;
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	const H = Math.round(h * 360);
	const S = Math.round(s * 100);
	const L = Math.round(l * 100);
	return `${H} ${S}% ${L}%`;
}

function toTriplet(color?: string) {
	if (!color) return undefined;
	const c = color.trim().toLowerCase();
	if (c.startsWith("#")) return hexToHslTriplet(c);
	if (c.startsWith("hsl(")) {
		const m = c.match(
			/hsl\((\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)%[,\s]+(\d+(?:\.\d+)?)%\)/,
		);
		if (m) return `${m[1]} ${m[2]}% ${m[3]}%`;
	}
	if (c === "white") return "0 0% 100%";
	if (c === "black") return "0 0% 0%";
	return undefined;
}
