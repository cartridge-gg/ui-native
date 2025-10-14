import * as TabsPrimitive from "@rn-primitives/tabs";
import type * as React from "react";
import { Platform } from "react-native";
import { SvgClassContext, TextClassContext } from "#components";
import { cn } from "#utils";

// Wrapper components following react-native-reusables API while preserving
// existing styles and theme tokens used across the app.

function Tabs({
	className,
	...props
}: TabsPrimitive.RootProps & React.RefAttributes<TabsPrimitive.RootRef>) {
	return (
		<TabsPrimitive.Root
			className={cn("flex-col gap-2", className)}
			{...props}
		/>
	);
}

function TabsList({
	className,
	...props
}: TabsPrimitive.ListProps & React.RefAttributes<TabsPrimitive.ListRef>) {
	return (
		<TabsPrimitive.List
			className={cn(
				// Keep current app styling
				"w-full flex-row items-center justify-center gap-2 text-foreground-400 self-start",
				// Enhance focus/width behaviors on web similar to reusables
				Platform.select({ web: "inline-flex w-fit", native: "mr-auto" }),
				className,
			)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: TabsPrimitive.TriggerProps & React.RefAttributes<TabsPrimitive.TriggerRef>) {
	const { value } = TabsPrimitive.useRootContext();
	return (
		<TextClassContext.Provider
			value={cn(
				// Preserve text theming
				"text-sm font-medium text-foreground-400 web:transition-all",
				value === props.value && "text-primary",
			)}
		>
			<SvgClassContext.Provider
				value={value === props.value ? "fill-primary" : "fill-foreground-400"}
			>
				<TabsPrimitive.Trigger
					className={cn(
						// Preserve current container styles
						"flex-1 flex-row gap-2 items-center justify-center whitespace-nowrap rounded py-2.5 transition-all disabled:pointer-events-none disabled:opacity-50",
						// Add web focus styles from reusables without changing look
						Platform.select({
							web: "focus-visible:outline-ring focus-visible:ring-ring/50 inline-flex cursor-default transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
						}),
						props.disabled && "opacity-50",
						props.value === value
							? "bg-background-200"
							: "border-b border-background-200",
						className,
					)}
					{...props}
				/>
			</SvgClassContext.Provider>
		</TextClassContext.Provider>
	);
}

function TabsContent({
	className,
	...props
}: TabsPrimitive.ContentProps & React.RefAttributes<TabsPrimitive.ContentRef>) {
	return (
		<TabsPrimitive.Content className={cn("flex-1", className)} {...props} />
	);
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
