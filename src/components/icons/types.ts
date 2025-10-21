import type { VariantProps } from "class-variance-authority";
import type Svg from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import type { iconVariants } from "#components/icons/utils";

export type IconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		ref?: React.Ref<Svg>;
		color?: string;
	};

export type DirectionalIconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		variant: Direction;
		ref?: React.Ref<Svg>;
		color?: string;
	};

export type Direction = "up" | "right" | "down" | "left";

export type StateIconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		variant: "solid" | "line";
		ref?: React.Ref<Svg>;
		color?: string;
	};

export type OlmechIconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		variant:
			| "one"
			| "two"
			| "three"
			| "four"
			| "five"
			| "six"
			| "seven"
			| "eight";
		ref?: React.Ref<Svg>;
		color?: string;
	};
