import { cva } from "class-variance-authority";
import { cssInterop } from "nativewind";
import Svg from "react-native-svg";

const base = "inline-block";

export const size = {
	"2xs": "size-3",
	xs: "size-4",
	sm: "size-5",
	default: "size-6",
	lg: "size-8",
	xl: "size-12",
	"2xl": "size-14",
	"3xl": "size-[72px]",
};

export const iconVariants = cva(base, {
	variants: {
		size,
	},
	defaultVariants: {
		size: "default",
	},
});

// Configure cssInterop for SVG components
cssInterop(Svg, {
	className: {
		target: "style",
	},
});
