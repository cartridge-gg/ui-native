import type { VariantProps } from "class-variance-authority";
import type Svg from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import type { iconVariants } from "#components/icons/utils";

export type IconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		ref?: React.Ref<Svg>;
	};

export type DirectionalIconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		variant: Direction;
		ref?: React.Ref<Svg>;
	};

export type Direction = "up" | "right" | "down" | "left";

export type StateIconProps = SvgProps &
	VariantProps<typeof iconVariants> & {
		variant: "solid" | "line";
		ref?: React.Ref<Svg>;
	};
