import type React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

export interface FlexProps extends ViewProps {
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	align?: "start" | "center" | "end" | "stretch" | "baseline";
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	wrap?: "wrap" | "nowrap" | "wrap-reverse";
	gap?: number;
	flex?: number;
	children: React.ReactNode;
}

const alignMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline",
} as const;

const justifyMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
} as const;

export const Flex: React.FC<FlexProps> = ({
	direction = "row",
	align = "stretch",
	justify = "start",
	wrap = "nowrap",
	gap,
	flex,
	style,
	children,
	...props
}) => {
	const flexStyles = {
		flexDirection: direction,
		alignItems: alignMap[align],
		justifyContent: justifyMap[justify],
		flexWrap: wrap,
		...(gap !== undefined && { gap }),
		...(flex !== undefined && { flex }),
	};

	return (
		<View style={[flexStyles, style]} {...props}>
			{children}
		</View>
	);
};
