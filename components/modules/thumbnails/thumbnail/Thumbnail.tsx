import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { AlertIcon, SpinnerIcon } from "../../../icons/utility";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

export type ThumbnailVariant =
	| "darkest"
	| "darker"
	| "dark"
	| "default"
	| "light"
	| "lighter"
	| "lightest"
	| "ghost";
export type ThumbnailSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ThumbnailProps {
	icon?: string | React.ReactNode;
	subIcon?: React.ReactNode;
	rounded?: boolean;
	centered?: boolean;
	loading?: boolean;
	error?: boolean;
	variant?: ThumbnailVariant;
	size?: ThumbnailSize;
	className?: string;
	style?: ViewStyle;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
	icon,
	subIcon,
	rounded = false,
	centered = false,
	loading = false,
	error = false,
	variant = "default",
	size = "md",
	style,
}) => {
	const { colors } = useTheme();
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (loading) {
			const spinAnimation = Animated.loop(
				Animated.timing(spinValue, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			);
			spinAnimation.start();
			return () => spinAnimation.stop();
		}
	}, [loading, spinValue]);

	const getSizeStyles = () => {
		const basePadding = centered ? 1 : 0;
		switch (size) {
			case "xs":
				return {
					width: 20,
					height: 20,
					minWidth: 20,
					minHeight: 20,
					padding: centered ? 2 : 2,
				}; // w-5 h-5
			case "sm":
				return {
					width: 24,
					height: 24,
					minWidth: 24,
					minHeight: 24,
					padding: centered ? 3 : 2,
				}; // w-6 h-6
			case "md":
				return {
					width: 32,
					height: 32,
					minWidth: 32,
					minHeight: 32,
					padding: centered ? 4 : 2,
				}; // w-8 h-8
			case "lg":
				return {
					width: 40,
					height: 40,
					minWidth: 40,
					minHeight: 40,
					padding: 3,
				}; // w-10 h-10 (web default)
			case "xl":
				return {
					width: 48,
					height: 48,
					minWidth: 48,
					minHeight: 48,
					padding: centered ? 6 : 3,
				}; // w-12 h-12
			case "xxl":
				return {
					width: 80,
					height: 80,
					minWidth: 80,
					minHeight: 80,
					padding: centered ? 6 : 4,
				}; // w-20 h-20
			default:
				return {
					width: 32,
					height: 32,
					minWidth: 32,
					minHeight: 32,
					padding: centered ? 4 : 2,
				};
		}
	};

	const getBackgroundColor = () => {
		switch (variant) {
			case "darkest":
				return colors.background[100];
			case "darker":
				return colors.background[100];
			case "dark":
				return colors.background[100];
			case "default":
				return colors.background[200];
			case "light":
				return colors.background[300];
			case "lighter":
				return colors.background[400];
			case "lightest":
				return colors.background[500];
			case "ghost":
				return "transparent";
			default:
				return colors.background[200];
		}
	};

	const sizeStyles = getSizeStyles();
	const backgroundColor = getBackgroundColor();

	const styles = StyleSheet.create({
		container: {
			position: "relative",
			...sizeStyles,
			backgroundColor,
			borderRadius: rounded ? sizeStyles.width / 2 : 6,
			justifyContent: "center",
			alignItems: "center",
		},
		iconContainer: {
			width: "100%",
			height: "100%",
			justifyContent: "center",
			alignItems: "center",
		},
		image: {
			width: "100%",
			height: "100%",
			borderRadius: rounded ? sizeStyles.width / 2 : 4,
		},
		subIconContainer: {
			position: "absolute",
			top: "75%",
			left: "75%",
			transform: [{ translateX: -10 }, { translateY: -10 }],
			zIndex: 20,
		},
	});

	if (error) {
		return (
			<View style={[styles.container, style]}>
				<View style={styles.iconContainer}>
					<AlertIcon size="default" color={colors.destructive[100]} />
				</View>
				{subIcon && <View style={styles.subIconContainer}>{subIcon}</View>}
			</View>
		);
	}

	if (loading) {
		const spin = spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"],
		});

		return (
			<View style={[styles.container, style]}>
				<View style={styles.iconContainer}>
					<Animated.View style={{ transform: [{ rotate: spin }] }}>
						<SpinnerIcon size="default" color={colors.foreground[300]} />
					</Animated.View>
				</View>
				{subIcon && <View style={styles.subIconContainer}>{subIcon}</View>}
			</View>
		);
	}

	return (
		<View style={[styles.container, style]}>
			<View style={styles.iconContainer}>
				{typeof icon === "string" ? (
					icon.startsWith("http") ? (
						<Image source={{ uri: icon }} style={styles.image} />
					) : icon.includes("fa-") ? (
						<Text
							style={{
								fontSize: sizeStyles.width * 0.4,
								color: colors.foreground[100],
							}}
						>
							{icon === "fa-seedling" ? "🌱" : "🌱"}
						</Text>
					) : (
						<Text
							style={{
								fontSize: sizeStyles.width * 0.5,
								color: colors.foreground[100],
							}}
						>
							{icon}
						</Text>
					)
				) : (
					icon
				)}
			</View>
			{subIcon && <View style={styles.subIconContainer}>{subIcon}</View>}
		</View>
	);
};
