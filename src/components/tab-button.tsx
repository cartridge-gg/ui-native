import type { TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, View } from "react-native";
import Animated, { 
	useSharedValue, 
	useAnimatedStyle, 
	withTiming,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";
import { useEffect } from "react";
import { SvgClassContext } from "#components/icons";
import type { StateIconProps } from "#components/icons/types";
import { cn } from "#utils";

export type IconComponent = React.ComponentType<StateIconProps>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.View;

export function TabButton({
	isFocused,
	Icon,
	className,
	accentColor,
	...props
}: TabTriggerSlotProps & { Icon: IconComponent; className?: string; accentColor?: string }) {
	// Default to yellow if no accent color provided
	const color = accentColor || "hsl(44, 96%, 64%)";
	
	const progress = useSharedValue(isFocused ? 1 : 0);
	
	useEffect(() => {
		progress.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
	}, [isFocused, progress]);
	
	const containerStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(progress.value, [0, 1], [0.7, 1], Extrapolation.CLAMP),
		};
	});
	
	const indicatorStyle = useAnimatedStyle(() => {
		return {
			opacity: progress.value,
			transform: [
				{ scaleX: interpolate(progress.value, [0, 1], [0.5, 1], Extrapolation.CLAMP) },
			],
		};
	});
	
	const iconContainerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.1, 1], Extrapolation.CLAMP) },
			],
		};
	});
	
	return (
		<AnimatedPressable
			{...props}
			className={cn(
				"flex-1 h-full relative",
				className,
			)}
			style={containerStyle}
			accessibilityRole="tab"
			accessibilityState={{ selected: !!isFocused }}
		>
			<AnimatedView 
				className="absolute top-0 left-0 right-0 h-0.5" 
				style={[{ backgroundColor: color }, indicatorStyle]} 
			/>
			<AnimatedView 
				className="flex-1 w-full h-full items-center justify-center"
				style={iconContainerStyle}
			>
				<Icon 
					variant={isFocused ? "solid" : "line"} 
					size="lg"
					color={isFocused ? color : "#ffffff"}
				/>
			</AnimatedView>
		</AnimatedPressable>
	);
}
