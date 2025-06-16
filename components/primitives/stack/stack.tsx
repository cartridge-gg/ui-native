import type React from "react";
import { View, type ViewProps } from "react-native";

export interface StackProps extends ViewProps {
	direction?: "horizontal" | "vertical";
	spacing?: number | "xs" | "sm" | "md" | "lg" | "xl";
	align?: "start" | "center" | "end" | "stretch";
	children: React.ReactNode;
}

const spacingMap = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
} as const;

const alignMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
} as const;

export const Stack: React.FC<StackProps> = ({
	direction = "vertical",
	spacing = "md",
	align = "stretch",
	style,
	children,
	...props
}) => {
	const gap = typeof spacing === "number" ? spacing : spacingMap[spacing];

	const stackStyles = {
		flexDirection: direction === "horizontal" ? "row" : "column",
		alignItems: alignMap[align],
		gap,
	} as const;

	return (
		<View style={[stackStyles, style]} {...props}>
			{children}
		</View>
	);
};

// Convenience components
export const VStack: React.FC<Omit<StackProps, "direction">> = (props) => (
	<Stack direction="vertical" {...props} />
);

export const HStack: React.FC<Omit<StackProps, "direction">> = (props) => (
	<Stack direction="horizontal" {...props} />
);
