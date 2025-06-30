import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { IndicatorProps, ItemProps, RootProps } from "./types";

const RadioGroupContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	value,
	onValueChange,
	disabled = false,
	...viewProps
}: RootProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<RadioGroupContext.Provider
			value={{
				value,
				disabled,
				onValueChange,
			}}
		>
			<RadioGroup.Root
				value={value}
				onValueChange={onValueChange}
				disabled={disabled}
				asChild
			>
				<Component {...viewProps} />
			</RadioGroup.Root>
		</RadioGroupContext.Provider>
	);
}
export function useRadioGroupContext() {
	const context = React.useContext(RadioGroupContext);
	if (!context) {
		throw new Error(
			"RadioGroup compound components cannot be rendered outside the RadioGroup component",
		);
	}
	return context;
}

export function Item({
	asChild,
	value,
	onPress: onPressProps,
	...props
}: ItemProps) {
	const { onValueChange } = useRadioGroupContext();

	function onPress(ev: GestureResponderEvent) {
		if (onPressProps) {
			onPressProps(ev);
		}
		onValueChange(value);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<RadioGroup.Item value={value} asChild>
			<Component onPress={onPress} {...props} />
		</RadioGroup.Item>
	);
}

export function Indicator({ asChild, forceMount, ...props }: IndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<RadioGroup.Indicator asChild>
			<Component {...props} />
		</RadioGroup.Indicator>
	);
}
