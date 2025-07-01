import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { IndicatorProps, RootProps } from "./types";

const CheckboxContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	disabled,
	checked,
	onCheckedChange,
	onPress: onPressProp,
	role: _role,
	...props
}: RootProps) {
	function onPress(ev: GestureResponderEvent) {
		onPressProp?.(ev);
		onCheckedChange(!checked);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<CheckboxContext.Provider value={{ checked, disabled, onCheckedChange }}>
			<Checkbox.Root
				checked={checked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
				asChild
			>
				<Component
					role="button"
					onPress={onPress}
					disabled={disabled}
					{...props}
				/>
			</Checkbox.Root>
		</CheckboxContext.Provider>
	);
}

export function Indicator({ asChild, forceMount, ...props }: IndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Checkbox.Indicator forceMount={forceMount} asChild>
			<Component {...props} />
		</Checkbox.Indicator>
	);
}
