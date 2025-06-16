import type React from "react";
import {
	type DimensionValue,
	ScrollView,
	StyleSheet,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

// Table Root Component
interface TableProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const Table: React.FC<TableProps> = ({ children, style }) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			overflow: "hidden",
		},
		table: {
			width: "100%",
			borderWidth: 1,
			borderColor: colors.border[200],
			borderRadius: 8,
			backgroundColor: colors.background[100],
		},
	});

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={[styles.container, style]}>
				<View style={styles.table}>{children}</View>
			</View>
		</ScrollView>
	);
};

// Table Header Component
interface TableHeaderProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
	children,
	style,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		header: {
			borderBottomWidth: 1,
			borderBottomColor: colors.border[200],
			backgroundColor: colors.background[200],
		},
	});

	return <View style={[styles.header, style]}>{children}</View>;
};

// Table Body Component
interface TableBodyProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, style }) => {
	return <View style={style}>{children}</View>;
};

// Table Footer Component
interface TableFooterProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const TableFooter: React.FC<TableFooterProps> = ({
	children,
	style,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		footer: {
			borderTopWidth: 1,
			borderTopColor: colors.border[200],
			backgroundColor: colors.background[100],
		},
	});

	return <View style={[styles.footer, style]}>{children}</View>;
};

// Table Row Component
interface TableRowProps {
	children: React.ReactNode;
	style?: ViewStyle;
	onPress?: () => void;
	selected?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
	children,
	style,
	onPress,
	selected = false,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		row: {
			flexDirection: "row",
			borderBottomWidth: 1,
			borderBottomColor: colors.border[200],
			minHeight: 48,
			alignItems: "center",
		},
		selected: {
			backgroundColor: colors.background[200],
		},
		lastRow: {
			borderBottomWidth: 0,
		},
	});

	return (
		<View style={[styles.row, selected && styles.selected, style]}>
			{children}
		</View>
	);
};

// Table Head Component
interface TableHeadProps {
	children: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
	width?: DimensionValue;
	align?: "left" | "center" | "right";
}

export const TableHead: React.FC<TableHeadProps> = ({
	children,
	style,
	textStyle,
	width,
	align = "left",
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		head: {
			flex: width ? 0 : 1,
			width: width,
			paddingHorizontal: 8,
			paddingVertical: 10,
			justifyContent: "center",
		},
		text: {
			color: colors.foreground[400],
			textAlign: align,
		},
	});

	return (
		<View style={[styles.head, style]}>
			<Text variant="sans-medium-12" style={[styles.text, textStyle]}>
				{children}
			</Text>
		</View>
	);
};

// Table Cell Component
interface TableCellProps {
	children: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
	width?: DimensionValue;
	align?: "left" | "center" | "right";
	colSpan?: number;
}

export const TableCell: React.FC<TableCellProps> = ({
	children,
	style,
	textStyle,
	width,
	align = "left",
	colSpan = 1,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		cell: {
			flex: width ? 0 : colSpan,
			width: width,
			paddingHorizontal: 8,
			paddingVertical: 8,
			justifyContent: "center",
		},
		text: {
			color: colors.foreground[100],
			textAlign: align,
		},
	});

	return (
		<View style={[styles.cell, style]}>
			{typeof children === "string" ? (
				<Text variant="body" style={[styles.text, textStyle]}>
					{children}
				</Text>
			) : (
				children
			)}
		</View>
	);
};

// Table Caption Component
interface TableCaptionProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const TableCaption: React.FC<TableCaptionProps> = ({
	children,
	style,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		caption: {
			paddingVertical: 8,
			paddingHorizontal: 16,
		},
		text: {
			color: colors.foreground[400],
			textAlign: "center",
		},
	});

	return (
		<View style={[styles.caption, style]}>
			<Text variant="caption" style={styles.text}>
				{children}
			</Text>
		</View>
	);
};
