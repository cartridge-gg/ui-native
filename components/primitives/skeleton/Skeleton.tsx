import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, type DimensionValue, View } from "react-native";
import { cn } from "../../utils/cn";

// Check if we're in a test environment
const isTestEnvironment =
	typeof process !== "undefined" &&
	(process.env.NODE_ENV === "test" ||
		process.env.STORYBOOK_TEST_RUNNER === "true" ||
		// Check for headless browser (common in screenshot tests)
		(typeof window !== "undefined" &&
			window.navigator?.userAgent?.includes("HeadlessChrome")));

export interface SkeletonProps {
	width?: DimensionValue;
	height?: DimensionValue;
	borderRadius?: number;
	className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
	width = "100%",
	height = 20,
	borderRadius = 4,
	className,
}) => {
	const shimmerValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Skip animation in test environment
		if (isTestEnvironment) {
			shimmerValue.setValue(0.5); // Set to middle value for consistent screenshots
			return;
		}

		const shimmerAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(shimmerValue, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(shimmerValue, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			]),
		);

		shimmerAnimation.start();

		return () => shimmerAnimation.stop();
	}, [shimmerValue]);

	const shimmerOpacity = shimmerValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0.3, 0.7],
	});

	return (
		<View
			className={cn("bg-background-300 overflow-hidden", className)}
			style={{
				width,
				height,
				borderRadius,
			}}
		>
			<Animated.View
				className="absolute inset-0 bg-background-400"
				style={{
					opacity: isTestEnvironment ? 0.5 : shimmerOpacity,
				}}
			/>
		</View>
	);
};

// Pre-defined skeleton variants
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
	lines = 1,
	className,
}) => (
	<View className={cn("gap-2", className)}>
		{Array.from({ length: lines }, (_, i) => (
			<Skeleton key={i} height={16} width={i === lines - 1 ? "75%" : "100%"} />
		))}
	</View>
);

export const SkeletonAvatar: React.FC<{
	size?: number;
	className?: string;
}> = ({ size = 40, className }) => (
	<Skeleton
		width={size}
		height={size}
		borderRadius={size / 2}
		className={className}
	/>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
	className,
}) => {
	return (
		<View className={cn("p-4 bg-background-200 rounded-lg gap-3", className)}>
			<View className="flex-row gap-3 items-center">
				<SkeletonAvatar size={48} />
				<View className="flex-1 gap-2">
					<Skeleton height={16} width="60%" />
					<Skeleton height={14} width="40%" />
				</View>
			</View>
			<SkeletonText lines={3} />
		</View>
	);
};
