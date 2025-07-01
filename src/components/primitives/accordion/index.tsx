import type * as React from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, {
	Extrapolation,
	FadeIn,
	FadeOutUp,
	interpolate,
	LayoutAnimationConfig,
	LinearTransition,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from "react-native-reanimated";
import { TextClassContext, WedgeIcon } from "#components";
import { cn } from "#utils";
import * as AccordionPrimitive from "./accordion";
import type * as AccordionTypes from "./types";

export function Accordion({
	children,
	...props
}: Omit<AccordionTypes.RootProps, "asChild">) {
	return (
		<LayoutAnimationConfig skipEntering>
			<AccordionPrimitive.Root
				{...(props as AccordionTypes.RootProps)}
				asChild={Platform.OS !== "web"}
			>
				<Animated.View layout={LinearTransition.duration(200)}>
					{children}
				</Animated.View>
			</AccordionPrimitive.Root>
		</LayoutAnimationConfig>
	);
}

export function AccordionItem({
	className,
	value,
	...props
}: AccordionTypes.ItemProps) {
	return (
		<Animated.View
			className={"overflow-hidden"}
			layout={LinearTransition.duration(200)}
		>
			<AccordionPrimitive.Item
				className={cn("border-b border-border", className)}
				value={value}
				{...props}
			/>
		</Animated.View>
	);
}

const Trigger = Platform.OS === "web" ? View : Pressable;

export function AccordionTrigger({
	className,
	children,
	...props
}: AccordionTypes.TriggerProps & {
	children?: React.ReactNode;
}) {
	const { isExpanded } = AccordionPrimitive.useItemContext();

	const progress = useDerivedValue(() =>
		isExpanded
			? withTiming(1, { duration: 250 })
			: withTiming(0, { duration: 200 }),
	);
	const chevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${progress.value * 90}deg` }],
		opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
	}));

	return (
		<TextClassContext.Provider value="text-sm text-foreground-400">
			<AccordionPrimitive.Header className="flex">
				<AccordionPrimitive.Trigger {...props} asChild>
					<Trigger
						className={cn(
							"w-full flex flex-row items-center justify-between text-sm text-foreground-400 web:transition-all web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-foreground",
							className,
						)}
					>
						{children}
						<Animated.View style={chevronStyle}>
							<WedgeIcon
								variant="right"
								className="text-foreground-400 shrink-0"
							/>
						</Animated.View>
					</Trigger>
				</AccordionPrimitive.Trigger>
			</AccordionPrimitive.Header>
		</TextClassContext.Provider>
	);
}

export function AccordionContent({
	className,
	children,
	...props
}: AccordionTypes.ContentProps) {
	const { isExpanded } = AccordionPrimitive.useItemContext();
	return (
		<TextClassContext.Provider value="text-sm">
			<AccordionPrimitive.Content
				className={cn(
					"overflow-hidden text-sm web:transition-all",
					isExpanded
						? "web:animate-accordion-down"
						: "web:animate-accordion-up",
				)}
				{...props}
			>
				<InnerContent className={cn("flex flex-col gap-px", className)}>
					{children}
				</InnerContent>
			</AccordionPrimitive.Content>
		</TextClassContext.Provider>
	);
}

function InnerContent({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	if (Platform.OS === "web") {
		return <View className={className}>{children}</View>;
	}
	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOutUp.duration(200)}
			className={className}
		>
			{children}
		</Animated.View>
	);
}
