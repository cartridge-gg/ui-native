import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Slot from "@rn-primitives/slot";
import { ToggleGroupUtils } from "@rn-primitives/utils";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { ItemProps, RootProps } from "./types";

const ToggleGroupContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	type,
	value,
	onValueChange,
	disabled = false,
	rovingFocus,
	orientation,
	dir,
	loop,
	...viewProps
}: RootProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<ToggleGroupContext.Provider
			value={
				{
					type,
					value,
					disabled,
					onValueChange,
				} as RootProps
			}
		>
			<ToggleGroup.Root
				// biome-ignore lint/suspicious/noExplicitAny: either multiple or single
				type={type as any}
				// biome-ignore lint/suspicious/noExplicitAny: either multiple or single
				value={value as any}
				// biome-ignore lint/suspicious/noExplicitAny: either multiple or single
				onValueChange={onValueChange as any}
				disabled={disabled}
				rovingFocus={rovingFocus}
				orientation={orientation}
				dir={dir}
				loop={loop}
				asChild
			>
				<Component {...viewProps} />
			</ToggleGroup.Root>
		</ToggleGroupContext.Provider>
	);
}

Root.displayName = "RootToggleGroup";

export function useRootContext() {
	const context = React.useContext(ToggleGroupContext);
	if (!context) {
		throw new Error(
			"ToggleGroup compound components cannot be rendered outside the ToggleGroup component",
		);
	}
	return context;
}

const ItemContext = React.createContext<ItemProps | null>(null);

export function Item({
	asChild,
	value: itemValue,
	disabled: disabledProp = false,
	onPress: onPressProp,
	...props
}: ItemProps) {
	const { type, disabled, value, onValueChange } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		onPressProp?.(ev);
		if (type === "single") {
			onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
		}
		if (type === "multiple") {
			onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<ItemContext.Provider value={{ value: itemValue }}>
			<ToggleGroup.Item value={itemValue} asChild>
				<Component
					onPress={onPress}
					disabled={disabled || disabledProp}
					role="button"
					{...props}
				/>
			</ToggleGroup.Item>
		</ItemContext.Provider>
	);
}

export function useItemContext() {
	const context = React.useContext(ItemContext);
	if (!context) {
		throw new Error(
			"ToggleGroupItem compound components cannot be rendered outside the ToggleGroupItem component",
		);
	}
	return context;
}

export const utils = ToggleGroupUtils;
