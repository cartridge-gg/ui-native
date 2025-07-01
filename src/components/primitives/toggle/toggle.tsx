import * as Slot from "@rn-primitives/slot";
import { type GestureResponderEvent, Pressable } from "react-native";
import type { RootProps } from "./types";

export function Root({
	asChild,
	pressed,
	onPressedChange,
	disabled,
	onPress: onPressProp,
	...props
}: RootProps) {
	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		const newValue = !pressed;
		onPressedChange(newValue);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			aria-disabled={disabled}
			role="switch"
			aria-selected={pressed}
			onPress={onPress}
			accessibilityState={{
				selected: pressed,
				disabled,
			}}
			disabled={disabled}
			data-state={pressed ? "on" : "off"}
			{...props}
		/>
	);
}
