import { cva } from "class-variance-authority";
import { cssInterop } from "nativewind";
import { createContext, useContext } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

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

cssInterop(Path, {
	className: {
		// @ts-expect-error
		target: "style",
		// @ts-expect-error
		nativeStyleToProp: {
			width: true,
			height: true,
			stroke: true,
			strokeWidth: true,
			fill: true,
		},
	},
});

cssInterop(Circle, {
	className: {
		// @ts-expect-error
		target: "style",
		// @ts-expect-error
		nativeStyleToProp: {
			width: true,
			height: true,
			stroke: true,
			strokeWidth: true,
			fill: true,
		},
	},
});

cssInterop(Rect, {
	className: {
		// @ts-expect-error
		target: "style",
		// @ts-expect-error
		nativeStyleToProp: {
			width: true,
			height: true,
			stroke: true,
			strokeWidth: true,
			fill: true,
		},
	},
});

// Context for SVG content styling - provides CSS custom property for fill
export const SvgClassContext = createContext<string | undefined>(undefined);

export const useSvgClass = () => useContext(SvgClassContext);
