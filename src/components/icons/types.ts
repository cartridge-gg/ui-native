import type { VariantProps } from "class-variance-authority";
import type { ViewProps } from "react-native";
import type { iconVariants } from "./utils";

export type IconProps = ViewProps & VariantProps<typeof iconVariants>;

export type DirectionalIconProps = ViewProps &
	VariantProps<typeof iconVariants> & { variant: Direction };

export type Direction = "up" | "right" | "down" | "left";

export type StateIconProps = ViewProps &
	VariantProps<typeof iconVariants> & { variant: "solid" | "line" };
