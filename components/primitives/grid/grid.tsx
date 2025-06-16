import React from "react";
import { Dimensions, View, type ViewProps } from "react-native";

export interface GridProps extends ViewProps {
	columns?: number | "auto";
	spacing?: number;
	columnSpacing?: number;
	rowSpacing?: number;
	minChildWidth?: number;
	children: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get("window");

export const Grid: React.FC<GridProps> = ({
	columns = "auto",
	spacing = 8,
	columnSpacing,
	rowSpacing,
	minChildWidth = 100,
	style,
	children,
	...props
}) => {
	const childrenArray = React.Children.toArray(children);

	// Calculate columns if auto
	const getColumns = () => {
		if (columns === "auto" && minChildWidth) {
			// Simple calculation - in a real app, you'd measure the container width
			return Math.floor(
				screenWidth / (minChildWidth + (columnSpacing || spacing)),
			);
		}
		return columns as number;
	};

	const numColumns = getColumns();
	const gap = spacing;
	const colGap = columnSpacing ?? spacing;
	const rowGap = rowSpacing ?? spacing;

	return (
		<View
			style={[{ flexDirection: "row", flexWrap: "wrap" }, style]}
			{...props}
		>
			{React.Children.map(children, (child, index) => (
				<View
					key={index}
					style={{
						width: `${100 / numColumns}%`,
						paddingLeft: index % numColumns !== 0 ? colGap / 2 : 0,
						paddingRight:
							index % numColumns !== numColumns - 1 ? colGap / 2 : 0,
						paddingBottom: rowGap,
					}}
				>
					{child}
				</View>
			))}
		</View>
	);
};

// GridItem component for more control
export interface GridItemProps extends ViewProps {
	colSpan?: number;
	children: React.ReactNode;
}

export const GridItem: React.FC<GridItemProps> = ({
	colSpan = 1,
	style,
	children,
	...props
}) => {
	return (
		<View style={[{ width: `${colSpan * 100}%` }, style]} {...props}>
			{children}
		</View>
	);
};
