import type * as React from "react";
import { TextClassContext } from "#components";
import { cn } from "#utils";
import * as TabsPrimitive from "./tabs";
import type * as TabsTypes from "./types";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
	className,
	...props
}: TabsTypes.ListProps & {
	ref?: React.RefObject<TabsTypes.ListRef>;
}) {
	return (
		<TabsPrimitive.List
			className={cn(
				"inline-flex flex-row h-9 items-center justify-center rounded-lg bg-background-200 p-1 text-foreground-400 self-start",
				className,
			)}
			{...props}
		/>
	);
}

export function TabsTrigger({
	className,
	...props
}: TabsTypes.TriggerProps & {
	ref?: React.RefObject<TabsTypes.TriggerRef>;
}) {
	const { value } = TabsPrimitive.useRootContext();
	return (
		<TextClassContext.Provider
			value={cn(
				"text-sm font-medium text-foreground-400 web:transition-all",
				value === props.value && "text-foreground",
			)}
		>
			<TabsPrimitive.Trigger
				className={cn(
					"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
					props.value === value && "bg-background text-foreground shadow",
					className,
				)}
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export function TabsContent({
	className,
	...props
}: TabsTypes.ContentProps & {
	ref?: React.RefObject<TabsTypes.ContentRef>;
}) {
	return <TabsPrimitive.Content className={cn("mt-2", className)} {...props} />;
}
