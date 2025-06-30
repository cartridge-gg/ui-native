import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import { cn } from "../../../utils/cn";
import type { ContentProps, ListProps, RootProps, TriggerProps } from "./types";

interface RootContext extends RootProps {
	nativeID: string;
}

const TabsContext = React.createContext<RootContext | null>(null);

export function Root({
	asChild,
	value,
	onValueChange,
	orientation: _orientation,
	dir: _dir,
	activationMode: _activationMode,
	className,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const Component = asChild ? Slot.View : View;
	return (
		<TabsContext.Provider
			value={{
				value,
				onValueChange,
				nativeID,
			}}
		>
			<Component className={cn(className)} {...viewProps} />
		</TabsContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(TabsContext);
	if (!context) {
		throw new Error(
			"Tabs compound components cannot be rendered outside the Tabs component",
		);
	}
	return context;
}

export function List({ asChild, className, ...props }: ListProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Component
			role="tablist"
			className={cn(
				"inline-flex h-9 items-center justify-center rounded-lg bg-background-200 p-1 text-foreground-400",
				className,
			)}
			{...props}
		/>
	);
}

const TriggerContext = React.createContext<{ value: string } | null>(null);

export function Trigger({
	asChild,
	onPress: onPressProp,
	disabled,
	value: tabValue,
	className,
	...props
}: TriggerProps) {
	const { onValueChange, value: rootValue, nativeID } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		onValueChange(tabValue);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	const isActive = rootValue === tabValue;

	return (
		<TriggerContext.Provider value={{ value: tabValue }}>
			<Component
				nativeID={`${nativeID}-tab-${tabValue}`}
				aria-disabled={!!disabled}
				aria-selected={isActive}
				role="tab"
				onPress={onPress}
				accessibilityState={{
					selected: isActive,
					disabled: !!disabled,
				}}
				disabled={!!disabled}
				className={cn(
					"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
					isActive && "bg-background text-foreground shadow",
					className,
				)}
				{...props}
			/>
		</TriggerContext.Provider>
	);
}

export function useTriggerContext() {
	const context = React.useContext(TriggerContext);
	if (!context) {
		throw new Error(
			"Tabs.Trigger compound components cannot be rendered outside the Tabs.Trigger component",
		);
	}
	return context;
}

export function Content({
	asChild,
	forceMount,
	value: tabValue,
	className,
	...props
}: ContentProps) {
	const { value: rootValue, nativeID } = useRootContext();

	if (!forceMount) {
		if (rootValue !== tabValue) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			aria-hidden={!(forceMount || rootValue === tabValue)}
			aria-labelledby={`${nativeID}-tab-${tabValue}`}
			role="tabpanel"
			className={cn("mt-2", className)}
			{...props}
		/>
	);
}
