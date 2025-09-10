import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import Svg, { Circle, Path, Rect } from "react-native-svg";

// Configure LinearGradient to accept className
cssInterop(LinearGradient, {
	className: {
		target: "style",
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
