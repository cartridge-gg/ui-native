import type React from "react";
import { type DimensionValue, ScrollView, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// Table Root Component
interface TableProps {
	children: React.ReactNode;
	className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View className={cn("w-full overflow-hidden", className)}>
				<View className="w-full border border-border-200 rounded-lg bg-background-100">
					{children}
				</View>
			</View>
		</ScrollView>
	);
};

// Table Header Component
interface TableHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
	children,
	className,
}) => {
	return (
		<View
			className={cn("border-b border-border-200 bg-background-200", className)}
		>
			{children}
		</View>
	);
};

// Table Body Component
interface TableBodyProps {
	children: React.ReactNode;
	className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
	children,
	className,
}) => {
	return <View className={className}>{children}</View>;
};

// Table Footer Component
interface TableFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const TableFooter: React.FC<TableFooterProps> = ({
	children,
	className,
}) => {
	return (
		<View
			className={cn("border-t border-border-200 bg-background-100", className)}
		>
			{children}
		</View>
	);
};

// Table Row Component
interface TableRowProps {
	children: React.ReactNode;
	className?: string;
	onPress?: () => void;
	selected?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
	children,
	className,
	onPress,
	selected = false,
}) => {
	return (
		<View
			className={cn(
				"flex-row border-b border-border-200 min-h-12 items-center",
				selected && "bg-background-200",
				className,
			)}
		>
			{children}
		</View>
	);
};

// Table Head Component
interface TableHeadProps {
	children: React.ReactNode;
	className?: string;
	textClassName?: string;
	width?: DimensionValue;
	align?: "left" | "center" | "right";
}

export const TableHead: React.FC<TableHeadProps> = ({
	children,
	className,
	textClassName,
	width,
	align = "left",
}) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<View
			className={cn(
				"px-2 py-2.5 justify-center",
				width ? "" : "flex-1",
				className,
			)}
			style={{ width }}
		>
			<Text
				variant="sans-medium-12"
				className={cn(
					"text-foreground-400",
					alignClasses[align],
					textClassName,
				)}
			>
				{children}
			</Text>
		</View>
	);
};

// Table Cell Component
interface TableCellProps {
	children: React.ReactNode;
	className?: string;
	textClassName?: string;
	width?: DimensionValue;
	align?: "left" | "center" | "right";
	colSpan?: number;
}

export const TableCell: React.FC<TableCellProps> = ({
	children,
	className,
	textClassName,
	width,
	align = "left",
	colSpan = 1,
}) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<View
			className={cn(
				"px-2 py-2 justify-center",
				width ? "" : `flex-${colSpan}`,
				className,
			)}
			style={{ width }}
		>
			{typeof children === "string" ? (
				<Text
					variant="body"
					className={cn(
						"text-foreground-100",
						alignClasses[align],
						textClassName,
					)}
				>
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
	className?: string;
}

export const TableCaption: React.FC<TableCaptionProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("py-2 px-4", className)}>
			<Text variant="caption" className="text-foreground-400 text-center">
				{children}
			</Text>
		</View>
	);
};
