import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";
import { AlertIcon, SpinnerIcon } from "../../../icons/utility";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

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
	className,
}) => {
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

	const getSizeClasses = () => {
		switch (size) {
			case "xs":
				return "w-5 h-5 min-w-5 min-h-5";
			case "sm":
				return "w-6 h-6 min-w-6 min-h-6";
			case "md":
				return "w-8 h-8 min-w-8 min-h-8";
			case "lg":
				return "w-10 h-10 min-w-10 min-h-10";
			case "xl":
				return "w-12 h-12 min-w-12 min-h-12";
			case "xxl":
				return "w-20 h-20 min-w-20 min-h-20";
			default:
				return "w-8 h-8 min-w-8 min-h-8";
		}
	};

	const getPaddingClasses = () => {
		const base = centered ? "p-1" : "p-0.5";
		switch (size) {
			case "xs":
				return centered ? "p-0.5" : "p-0.5";
			case "sm":
				return centered ? "p-1" : "p-0.5";
			case "md":
				return centered ? "p-1" : "p-0.5";
			case "lg":
				return "p-1";
			case "xl":
				return centered ? "p-1.5" : "p-1";
			case "xxl":
				return centered ? "p-1.5" : "p-1";
			default:
				return base;
		}
	};

	const getVariantClasses = () => {
		switch (variant) {
			case "darkest":
			case "darker":
			case "dark":
				return "bg-theme-background";
			case "default":
				return "bg-theme-background-subtle";
			case "light":
				return "bg-theme-border";
			case "lighter":
				return "bg-theme-background-muted";
			case "lightest":
				return "bg-theme-background-accent";
			case "ghost":
				return "bg-transparent";
			default:
				return "bg-theme-background-subtle";
		}
	};

	const getSizeValue = () => {
		switch (size) {
			case "xs":
				return 20;
			case "sm":
				return 24;
			case "md":
				return 32;
			case "lg":
				return 40;
			case "xl":
				return 48;
			case "xxl":
				return 80;
			default:
				return 32;
		}
	};

	const sizeValue = getSizeValue();

	if (error) {
		return (
			<View
				className={cn(
					"relative justify-center items-center",
					getSizeClasses(),
					getPaddingClasses(),
					getVariantClasses(),
					rounded ? "rounded-full" : "rounded-md",
					className,
				)}
			>
				<View className="w-full h-full justify-center items-center">
					<AlertIcon size="default" />
				</View>
				{subIcon && (
					<View
						className="absolute z-20"
						style={{
							top: "75%",
							left: "75%",
							transform: [{ translateX: -10 }, { translateY: -10 }],
						}}
					>
						{subIcon}
					</View>
				)}
			</View>
		);
	}

	if (loading) {
		const spin = spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"],
		});

		return (
			<View
				className={cn(
					"relative justify-center items-center",
					getSizeClasses(),
					getPaddingClasses(),
					getVariantClasses(),
					rounded ? "rounded-full" : "rounded-md",
					className,
				)}
			>
				<View className="w-full h-full justify-center items-center">
					<Animated.View style={{ transform: [{ rotate: spin }] }}>
						<SpinnerIcon size="default" />
					</Animated.View>
				</View>
				{subIcon && (
					<View
						className="absolute z-20"
						style={{
							top: "75%",
							left: "75%",
							transform: [{ translateX: -10 }, { translateY: -10 }],
						}}
					>
						{subIcon}
					</View>
				)}
			</View>
		);
	}

	return (
		<View
			className={cn(
				"relative justify-center items-center",
				getSizeClasses(),
				getPaddingClasses(),
				getVariantClasses(),
				rounded ? "rounded-full" : "rounded-md",
				className,
			)}
		>
			<View className="w-full h-full justify-center items-center">
				{typeof icon === "string" ? (
					icon.startsWith("http") ? (
						<Image
							source={{ uri: icon }}
							className={cn(
								"w-full h-full",
								rounded ? "rounded-full" : "rounded",
							)}
						/>
					) : icon.includes("fa-") ? (
						<Text
							className="text-theme-foreground"
							style={{ fontSize: sizeValue * 0.4 }}
						>
							{icon === "fa-seedling" ? "🌱" : "🌱"}
						</Text>
					) : (
						<Text
							className="text-theme-foreground"
							style={{ fontSize: sizeValue * 0.5 }}
						>
							{icon}
						</Text>
					)
				) : (
					icon
				)}
			</View>
			{subIcon && (
				<View
					className="absolute z-20"
					style={{
						top: "75%",
						left: "75%",
						transform: [{ translateX: -10 }, { translateY: -10 }],
					}}
				>
					{subIcon}
				</View>
			)}
		</View>
	);
};
