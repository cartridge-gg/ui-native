import { useColorScheme } from "nativewind";
import type React from "react";
import { createContext, type ReactNode, useContext } from "react";
import { type ColorTheme, darkColors, lightColors } from "./colors";

interface ThemeContextType {
	colors: ColorTheme;
	isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
	colors: lightColors,
	isDark: false,
});

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const { colorScheme } = useColorScheme();
	// Force dark mode to match UI web version
	const isDark = true; // colorScheme === 'dark';

	return (
		<ThemeContext.Provider
			value={{
				colors: isDark ? darkColors : lightColors,
				isDark,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
