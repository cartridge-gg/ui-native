import * as Toggle from "@radix-ui/react-toggle";
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
		onPressProp?.(ev);
		onPressedChange(!pressed);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Toggle.Root
			pressed={pressed}
			onPressedChange={onPressedChange}
			disabled={disabled}
			asChild
		>
			<Component
				onPress={onPress}
				disabled={disabled}
				role="button"
				{...props}
			/>
		</Toggle.Root>
	);
}
