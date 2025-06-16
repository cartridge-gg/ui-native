import type { ViewStyle } from "react-native";

export type IconSize = "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl";

export interface IconProps {
	size?: IconSize;
	color?: string;
	style?: ViewStyle;
}

export interface DirectionalIconProps extends IconProps {
	variant: Direction;
}

export type Direction = "up" | "right" | "down" | "left";

export interface StateIconProps extends IconProps {
	variant: "solid" | "line";
}
