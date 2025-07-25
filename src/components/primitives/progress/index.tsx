import type * as React from "react";
import { Platform } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";
import { cn } from "#utils";
import * as ProgressPrimitive from "./progress";
import type { RootProps, RootRef } from "./types";

export function Progress({
	className,
	value,
	indicatorClassName,
	...props
}: RootProps & {
	ref?: React.RefObject<RootRef>;
	indicatorClassName?: string;
}) {
	return (
		<ProgressPrimitive.Root
			className={cn(
				"relative h-2 w-full overflow-hidden rounded-full",
				className,
			)}
			{...props}
		>
			<Indicator value={value} className={indicatorClassName} />
		</ProgressPrimitive.Root>
	);
}

function Indicator({
	value,
	className,
}: {
	value: number | undefined | null;
	className?: string;
}) {
	const progress = useDerivedValue(() => value ?? 0);

	const indicator = useAnimatedStyle(() => {
		return {
			width: withSpring(
				`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
				{ overshootClamping: true },
			),
		};
	});

	if (Platform.OS === "web") {
		return (
			<ProgressPrimitive.Indicator
				className={cn(
					"h-full w-full flex-1 transition-all rounded-full bg-primary",
					className,
				)}
				style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
			/>
		);
	}

	return (
		<ProgressPrimitive.Indicator asChild>
			<Animated.View
				style={indicator}
				className={cn("h-full bg-primary rounded-full", className)}
			/>
		</ProgressPrimitive.Indicator>
	);
}
