import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { cn } from "#utils";

// Platform-aware skeleton component
export function Skeleton({
	className,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
	// Always call hooks at the top level, regardless of platform
	const shimmerValue = useSharedValue(0);

	React.useEffect(() => {
		// Only animate on native platforms
		if (Platform.OS !== "web") {
			shimmerValue.value = withRepeat(
				withTiming(1, {
					duration: 1500,
					easing: Easing.inOut(Easing.ease),
				}),
				-1,
				true,
			);
		}
	}, [shimmerValue]);

	const animatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(shimmerValue.value, [0, 0.5, 1], [1, 0.6, 1]);

		return {
			opacity,
		};
	});

	// For web/Storybook, use CSS-based animation with nativewind
	if (Platform.OS === "web") {
		return (
			<View
				className={cn(
					"rounded-md bg-background-150 min-h-2",
					"bg-gradient-to-r from-background-150 via-background-200 to-background-150",
					"bg-[length:200%_100%]",
					"animate-shimmer",
					className,
				)}
				{...(props as React.ComponentPropsWithoutRef<typeof View>)}
			/>
		);
	}

	// For native platforms, use react-native-reanimated
	return (
		<Animated.View
			className={cn(
				"rounded-md bg-background-150 overflow-hidden relative min-h-2",
				className,
			)}
			{...props}
		>
			<Animated.View
				style={[
					{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(255, 255, 255, 0.05)",
					},
					animatedStyle,
				]}
			/>
		</Animated.View>
	);
}
