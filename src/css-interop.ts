import { LinearGradient } from "expo-linear-gradient";
import { cssInterop, remapProps } from "nativewind";
import { FlatList } from "react-native";
import Svg, { Circle, Path, Rect, SvgUri } from "react-native-svg";

// Configure LinearGradient to accept className
cssInterop(LinearGradient, {
	className: {
		target: "style",
	},
});

// Configure FlatList to accept className for both style and contentContainerStyle
// Using remapProps as recommended for components with multiple style props
remapProps(FlatList, {
	className: "style",
	contentContainerClassName: "contentContainerStyle",
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
		nativeStyleToProp: {
			width: true,
			height: true,
			stroke: true,
			strokeWidth: true,
			fill: true,
		},
	},
});

cssInterop(SvgUri, {
	className: {
		target: "style",
	},
});
