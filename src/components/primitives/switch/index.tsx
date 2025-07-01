import type * as React from "react";
import { Platform } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from "react-native-reanimated";
import { useColorScheme } from "#hooks";
import { cn } from "#utils";
import * as SwitchPrimitives from "./switch";
import type * as SwitchTypes from "./types";

function SwitchWeb({
	className,
	...props
}: SwitchTypes.RootProps & {
	ref?: React.RefObject<SwitchTypes.RootRef>;
}) {
	return (
		<SwitchPrimitives.Root
			className={cn(
				"peer flex-row h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
				props.checked ? "bg-primary" : "bg-background-400",
				className,
			)}
			{...props}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block h-4 w-4 rounded-full bg-translucent-dark-300 shadow-lg ring-0 transition-transform",
					props.checked ? "translate-x-4" : "translate-x-0",
				)}
			/>
		</SwitchPrimitives.Root>
	);
}

const RGB_COLORS = {
	light: {
		primary: "rgb(24, 24, 27)",
		background400: "rgb(161, 161, 170)",
		translucentDark300: "rgb(39, 39, 42)",
	},
	dark: {
		primary: "rgb(250, 250, 250)",
		background400: "rgb(161, 161, 170)",
		translucentDark300: "rgb(39, 39, 42)",
	},
} as const;

function SwitchNative({
	className,
	...props
}: SwitchTypes.RootProps & {
	ref?: React.RefObject<SwitchTypes.RootRef>;
}) {
	const { colorScheme } = useColorScheme();
	const translateX = useDerivedValue(() => (props.checked ? 16 : 0));
	const animatedRootStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				translateX.value,
				[0, 16],
				[
					RGB_COLORS[colorScheme].background400,
					RGB_COLORS[colorScheme].primary,
				],
			),
		};
	});
	const animatedThumbStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: withTiming(translateX.value, { duration: 200 }) },
		],
	}));
	return (
		<Animated.View
			style={animatedRootStyle}
			className={cn("h-5 w-9 rounded-full", props.disabled && "opacity-50")}
		>
			<SwitchPrimitives.Root
				className={cn(
					"flex-row h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent",
					props.checked ? "bg-primary" : "bg-background-400",
					className,
				)}
				{...props}
			>
				<Animated.View style={animatedThumbStyle}>
					<SwitchPrimitives.Thumb
						className={
							"h-4 w-4 rounded-full bg-translucent-dark-300 shadow-lg ring-0"
						}
					/>
				</Animated.View>
			</SwitchPrimitives.Root>
		</Animated.View>
	);
}

export const Switch = Platform.select({
	web: SwitchWeb,
	default: SwitchNative,
});
