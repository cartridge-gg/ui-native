import type React from "react";
import {
	Text as RNText,
	type TextProps as RNTextProps,
	StyleSheet,
} from "react-native";
import { FONT_STYLES, type FontStyleKey } from "../theme/fonts";

export interface TextProps extends Omit<RNTextProps, "children"> {
	variant?: FontStyleKey;
	color?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "muted"
		| "destructive"
		| "constructive";
	children: React.ReactNode;
}

export function Text({
	variant = "body",
	color = "primary",
	style,
	children,
	...props
}: TextProps) {
	const fontStyle = FONT_STYLES[variant];
	const colorStyle = getColorStyle(color);

	return (
		<RNText style={[fontStyle, colorStyle, style]} {...props}>
			{children}
		</RNText>
	);
}

const getColorStyle = (color: TextProps["color"]) => {
	switch (color) {
		case "primary":
			return styles.colorPrimary;
		case "secondary":
			return styles.colorSecondary;
		case "tertiary":
			return styles.colorTertiary;
		case "muted":
			return styles.colorMuted;
		case "destructive":
			return styles.colorDestructive;
		case "constructive":
			return styles.colorConstructive;
		default:
			return styles.colorPrimary;
	}
};

const styles = StyleSheet.create({
	// Colors
	colorPrimary: {
		color: "#ffffff",
	},
	colorSecondary: {
		color: "#9c9c9c",
	},
	colorTertiary: {
		color: "#808080",
	},
	colorMuted: {
		color: "#505050",
	},
	colorDestructive: {
		color: "#e66666",
	},
	colorConstructive: {
		color: "#6de27c",
	},
});
