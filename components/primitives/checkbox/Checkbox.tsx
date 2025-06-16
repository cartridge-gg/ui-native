import type React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export type CheckboxVariant =
	| "line"
	| "solid"
	| "minus-solid"
	| "minus-line"
	| "plus-solid"
	| "plus-line"
	| "unchecked-solid"
	| "unchecked-line";

export type CheckboxSize =
	| "2xs"
	| "xs"
	| "sm"
	| "default"
	| "lg"
	| "xl"
	| "2xl";

export interface CheckboxProps {
	checked?: boolean | "indeterminate";
	onCheckedChange?: (checked: boolean) => void;
	variant?: CheckboxVariant;
	size?: CheckboxSize;
	disabled?: boolean;
	style?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked = false,
	onCheckedChange,
	variant = "line",
	size = "default",
	disabled = false,
	style,
}) => {
	const { colors } = useTheme();

	const getSizeStyles = (size: CheckboxSize) => {
		const sizeMap = {
			"2xs": 12,
			xs: 14,
			sm: 16,
			default: 20,
			lg: 24,
			xl: 28,
			"2xl": 32,
		};

		const dimension = sizeMap[size];
		return {
			width: dimension,
			height: dimension,
		};
	};

	const getIconVariant = () => {
		if (checked === "indeterminate") {
			return "minus-line";
		}
		if (checked) {
			return variant || "line";
		}
		return "unchecked-line";
	};

	const sizeStyles = getSizeStyles(size);
	const iconVariant = getIconVariant();

	const styles = StyleSheet.create({
		container: {
			...sizeStyles,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 2,
			opacity: disabled ? 0.5 : 1,
		},
		checkIcon: {
			position: "absolute",
		},
	});

	const renderIcon = () => {
		const iconSize = sizeStyles.width * 0.7;
		const strokeWidth = 2;

		if (iconVariant === "unchecked-line") {
			return (
				<View
					style={{
						width: sizeStyles.width,
						height: sizeStyles.height,
						borderWidth: 1,
						borderColor: colors.foreground[400],
						borderRadius: 2,
						backgroundColor: "transparent",
					}}
				/>
			);
		}

		if (iconVariant === "line" || iconVariant === "solid") {
			return (
				<View
					style={{
						width: sizeStyles.width,
						height: sizeStyles.height,
						borderWidth: 1,
						borderColor: colors.foreground[100],
						borderRadius: 2,
						backgroundColor:
							iconVariant === "solid" ? colors.foreground[100] : "transparent",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* Checkmark */}
					<View
						style={{
							width: iconSize * 0.6,
							height: iconSize * 0.3,
							borderLeftWidth: strokeWidth,
							borderBottomWidth: strokeWidth,
							borderColor:
								iconVariant === "solid"
									? colors.background[100]
									: colors.foreground[100],
							transform: [{ rotate: "-45deg" }],
							marginTop: -iconSize * 0.1,
							marginLeft: iconSize * 0.1,
						}}
					/>
				</View>
			);
		}

		if (iconVariant === "minus-line" || iconVariant === "minus-solid") {
			return (
				<View
					style={{
						width: sizeStyles.width,
						height: sizeStyles.height,
						borderWidth: 1,
						borderColor: colors.foreground[100],
						borderRadius: 2,
						backgroundColor:
							iconVariant === "minus-solid"
								? colors.foreground[100]
								: "transparent",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* Minus line */}
					<View
						style={{
							width: iconSize * 0.6,
							height: strokeWidth,
							backgroundColor:
								iconVariant === "minus-solid"
									? colors.background[100]
									: colors.foreground[100],
						}}
					/>
				</View>
			);
		}

		if (iconVariant === "plus-line" || iconVariant === "plus-solid") {
			return (
				<View
					style={{
						width: sizeStyles.width,
						height: sizeStyles.height,
						borderWidth: 1,
						borderColor: colors.foreground[100],
						borderRadius: 2,
						backgroundColor:
							iconVariant === "plus-solid"
								? colors.foreground[100]
								: "transparent",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* Plus horizontal line */}
					<View
						style={{
							position: "absolute",
							width: iconSize * 0.6,
							height: strokeWidth,
							backgroundColor:
								iconVariant === "plus-solid"
									? colors.background[100]
									: colors.foreground[100],
						}}
					/>
					{/* Plus vertical line */}
					<View
						style={{
							position: "absolute",
							width: strokeWidth,
							height: iconSize * 0.6,
							backgroundColor:
								iconVariant === "plus-solid"
									? colors.background[100]
									: colors.foreground[100],
						}}
					/>
				</View>
			);
		}

		return null;
	};

	return (
		<Pressable
			style={[styles.container, style]}
			onPress={() => {
				if (!disabled && onCheckedChange) {
					onCheckedChange(!checked);
				}
			}}
			disabled={disabled}
		>
			{renderIcon()}
		</Pressable>
	);
};
