import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { cn } from "../../utils/cn";

// Check if we're in a test environment
const isTestEnvironment =
	typeof process !== "undefined" &&
	(process.env.NODE_ENV === "test" ||
		process.env.STORYBOOK_TEST_RUNNER === "true" ||
		// Check for headless browser (common in screenshot tests)
		(typeof window !== "undefined" &&
			window.navigator?.userAgent?.includes("HeadlessChrome")));

export interface ProgressProps {
	value?: number;
	completed?: boolean;
	className?: string;
	indicatorClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({
	value = 0,
	completed = false,
	className,
	indicatorClassName,
}) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const targetValue = value && value > 0 ? value : 0;

		if (isTestEnvironment) {
			// Set value immediately in test environment
			animatedValue.setValue(targetValue);
			return;
		}

		Animated.timing(animatedValue, {
			toValue: targetValue,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [value, animatedValue]);

	const progressWidth = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ["0%", "100%"],
		extrapolate: "clamp",
	});

	return (
		<View
			className={cn(
				"h-2 w-full bg-background-300 rounded overflow-hidden",
				className,
			)}
		>
			<Animated.View
				className={cn(
					"h-full rounded",
					completed ? indicatorClassName || "bg-primary-100" : "bg-primary-100",
					indicatorClassName,
				)}
				style={{
					width: progressWidth,
				}}
			/>
		</View>
	);
};
