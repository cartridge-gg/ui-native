import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

export interface ProgressBarProps {
	value: number; // 0-100
	max?: number;
	variant?: "default" | "success" | "warning" | "error";
	size?: "sm" | "md" | "lg";
	showLabel?: boolean;
	label?: string;
	animated?: boolean;
	className?: string;
	trackColor?: string;
	fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	max = 100,
	variant = "default",
	size = "md",
	showLabel = false,
	label,
	animated = true,
	className,
	trackColor,
	fillColor,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	useEffect(() => {
		if (animated) {
			Animated.timing(animatedValue, {
				toValue: percentage,
				duration: 300,
				useNativeDriver: false,
			}).start();
		} else {
			animatedValue.setValue(percentage);
		}
	}, [percentage, animated, animatedValue]);

	const getVariantClasses = () => {
		switch (variant) {
			case "success":
				return "bg-theme-constructive";
			case "warning":
				return "bg-orange-500";
			case "error":
				return "bg-theme-destructive";
			default:
				return "bg-theme-primary";
		}
	};

	const getSizeClasses = () => {
		switch (size) {
			case "sm":
				return "h-1 rounded-sm";
			case "lg":
				return "h-3 rounded-md";
			default:
				return "h-2 rounded";
		}
	};

	const getSizeBorderRadius = () => {
		switch (size) {
			case "sm":
				return 2;
			case "lg":
				return 6;
			default:
				return 4;
		}
	};

	return (
		<View className={cn("w-full", className)}>
			{(showLabel || label) && (
				<View className="flex-row justify-between items-center mb-1">
					<Text className="text-sm text-theme-foreground-subtle">
						{label || "Progress"}
					</Text>
					<Text className="text-xs text-theme-foreground-muted">
						{Math.round(percentage)}%
					</Text>
				</View>
			)}
			<View
				className={cn(
					"w-full bg-theme-border overflow-hidden",
					getSizeClasses(),
				)}
				style={{
					backgroundColor: trackColor || undefined,
				}}
			>
				<Animated.View
					className={cn("h-full", getVariantClasses())}
					style={{
						backgroundColor: fillColor || undefined,
						borderRadius: getSizeBorderRadius(),
						width: animatedValue.interpolate({
							inputRange: [0, 100],
							outputRange: ["0%", "100%"],
							extrapolate: "clamp",
						}),
					}}
				/>
			</View>
		</View>
	);
};

// Circular Progress Bar
export interface CircularProgressProps {
	value: number; // 0-100
	max?: number;
	size?: number;
	strokeWidth?: number;
	variant?: "default" | "success" | "warning" | "error";
	showLabel?: boolean;
	animated?: boolean;
	className?: string;
	trackColor?: string;
	fillColor?: string;
	children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
	value,
	max = 100,
	size = 120,
	strokeWidth = 8,
	variant = "default",
	showLabel = true,
	animated = true,
	className,
	trackColor,
	fillColor,
	children,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	useEffect(() => {
		if (animated) {
			Animated.timing(animatedValue, {
				toValue: percentage,
				duration: 500,
				useNativeDriver: false,
			}).start();
		} else {
			animatedValue.setValue(percentage);
		}
	}, [percentage, animated, animatedValue]);

	const getVariantColor = () => {
		switch (variant) {
			case "success":
				return fillColor || "#10b981"; // green-500
			case "warning":
				return fillColor || "#f59e0b"; // amber-500
			case "error":
				return fillColor || "#ef4444"; // red-500
			default:
				return fillColor || "#3b82f6"; // blue-500
		}
	};

	const variantColor = getVariantColor();
	const trackColorValue = trackColor || "#e5e7eb"; // gray-200

	return (
		<View
			className={cn("justify-center items-center relative", className)}
			style={{ width: size, height: size }}
		>
			{/* Track circle */}
			<View
				className="absolute rounded-full"
				style={{
					width: size,
					height: size,
					borderWidth: strokeWidth,
					borderColor: trackColorValue,
				}}
			/>

			{/* Progress circle - simplified for React Native */}
			<Animated.View
				className="absolute rounded-full"
				style={{
					width: size,
					height: size,
					borderWidth: strokeWidth,
					borderColor: variantColor,
					transform: [{ rotate: "-90deg" }],
				}}
			/>

			{/* Content */}
			<View className="justify-center items-center">
				{children ||
					(showLabel && (
						<Text
							className="font-bold text-theme-foreground-subtle"
							style={{ fontSize: size * 0.15 }}
						>
							{Math.round(percentage)}%
						</Text>
					))}
			</View>
		</View>
	);
};

// Step Progress Bar
export interface StepProgressProps {
	steps: string[];
	currentStep: number;
	variant?: "default" | "success" | "warning" | "error";
	className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
	steps,
	currentStep,
	variant = "default",
	className,
}) => {
	const getVariantColor = () => {
		switch (variant) {
			case "success":
				return "#10b981"; // green-500
			case "warning":
				return "#f59e0b"; // amber-500
			case "error":
				return "#ef4444"; // red-500
			default:
				return "#3b82f6"; // blue-500
		}
	};

	const variantColor = getVariantColor();

	return (
		<View className={cn("flex-row items-center justify-between", className)}>
			{steps.map((step, index) => {
				const isCompleted = index < currentStep;
				const isCurrent = index === currentStep;
				const isUpcoming = index > currentStep;

				return (
					<React.Fragment key={index}>
						<View className="items-center flex-1">
							<View
								className="w-8 h-8 rounded-full justify-center items-center border-2 mb-2"
								style={{
									backgroundColor:
										isCompleted || isCurrent ? variantColor : "#f3f4f6", // gray-100
									borderColor:
										isCompleted || isCurrent ? variantColor : "#d1d5db", // gray-300
								}}
							>
								<Text
									className="text-sm font-bold"
									style={{
										color: isCompleted || isCurrent ? "white" : "#6b7280", // gray-500
									}}
								>
									{isCompleted ? "✓" : index + 1}
								</Text>
							</View>
							<Text className="text-xs text-center text-theme-foreground-muted">
								{step}
							</Text>
						</View>

						{index < steps.length - 1 && (
							<View
								className="h-0.5 flex-1 mx-2 mb-6"
								style={{
									backgroundColor: isCompleted ? variantColor : "#d1d5db", // gray-300
								}}
							/>
						)}
					</React.Fragment>
				);
			})}
		</View>
	);
};
