import type React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

export interface ToggleProps {
	children: React.ReactNode;
	pressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	variant?: ToggleVariant;
	size?: ToggleSize;
	disabled?: boolean;
	style?: any;
}

export const Toggle: React.FC<ToggleProps> = ({
	children,
	pressed = false,
	onPressedChange,
	variant = "default",
	size = "default",
	disabled = false,
	style,
}) => {
	const { colors } = useTheme();

	const getVariantStyles = (variant: ToggleVariant, pressed: boolean) => {
		const baseStyles = {
			backgroundColor: "transparent",
			borderWidth: 0,
		};

		if (pressed) {
			return {
				...baseStyles,
				backgroundColor: colors.background[500],
			};
		}

		switch (variant) {
			case "outline":
				return {
					...baseStyles,
					borderWidth: 1,
					borderColor: colors.input,
				};
			default:
				return baseStyles;
		}
	};

	const getSizeStyles = (size: ToggleSize) => {
		switch (size) {
			case "sm":
				return {
					height: 32,
					paddingHorizontal: 8,
				};
			case "lg":
				return {
					height: 40,
					paddingHorizontal: 12,
				};
			default:
				return {
					height: 36,
					paddingHorizontal: 12,
				};
		}
	};

	const variantStyles = getVariantStyles(variant, pressed);
	const sizeStyles = getSizeStyles(size);

	const styles = StyleSheet.create({
		toggle: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 6,
			...variantStyles,
			...sizeStyles,
		},
		text: {
			fontSize: 14,
			fontWeight: "500",
			color: pressed ? colors.foreground[200] : colors.foreground[400],
		},
	});

	return (
		<Pressable
			style={[styles.toggle, style]}
			onPress={() => onPressedChange?.(!pressed)}
			disabled={disabled}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
};
