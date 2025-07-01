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
	rovingFocus: _rovingFocus,
	orientation: _orientation,
	dir: _dir,
	loop: _loop,
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
			<Component role="group" {...viewProps} />
		</ToggleGroupContext.Provider>
	);
}

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
		if (disabled || disabledProp) return;
		if (type === "single") {
			onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
		}
		if (type === "multiple") {
			onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
		}
		onPressProp?.(ev);
	}

	const isChecked =
		type === "single"
			? ToggleGroupUtils.getIsSelected(value, itemValue)
			: undefined;
	const isSelected =
		type === "multiple"
			? ToggleGroupUtils.getIsSelected(value, itemValue)
			: undefined;

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<ItemContext.Provider value={{ value: itemValue }}>
			<Component
				aria-disabled={disabled}
				role={type === "single" ? "radio" : "checkbox"}
				onPress={onPress}
				aria-checked={isChecked}
				aria-selected={isSelected}
				disabled={(disabled || disabledProp) ?? false}
				accessibilityState={{
					disabled: (disabled || disabledProp) ?? false,
					checked: isChecked,
					selected: isSelected,
				}}
				{...props}
			/>
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
