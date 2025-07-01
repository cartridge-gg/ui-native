import * as Tabs from "@radix-ui/react-tabs";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Pressable, View } from "react-native";
import type { ContentProps, ListProps, RootProps, TriggerProps } from "./types";

const TabsContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	value,
	onValueChange,
	orientation,
	dir,
	activationMode,
	...viewProps
}: RootProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<TabsContext.Provider
			value={{
				value,
				onValueChange,
			}}
		>
			<Tabs.Root
				value={value}
				onValueChange={onValueChange}
				orientation={orientation}
				dir={dir}
				activationMode={activationMode}
				asChild
			>
				<Component {...viewProps} />
			</Tabs.Root>
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

export function List({ asChild, ...props }: ListProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Tabs.List asChild>
			<Component {...props} />
		</Tabs.List>
	);
}

const TriggerContext = React.createContext<{ value: string } | null>(null);

export function Trigger({ asChild, value: tabValue, ...props }: TriggerProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<TriggerContext.Provider value={{ value: tabValue }}>
			<Tabs.Trigger value={tabValue} asChild>
				<Component {...props} />
			</Tabs.Trigger>
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
	value,
	tabIndex = -1,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Tabs.Content value={value} asChild>
			<Component {...props} tabIndex={tabIndex} />
		</Tabs.Content>
	);
}
