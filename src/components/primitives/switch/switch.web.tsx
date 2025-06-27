import * as Switch from "@radix-ui/react-switch";
import * as Slot from "@rn-primitives/slot";
import type * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { RootProps, ThumbProps } from "./types";

export function Root({
	asChild,
	checked,
	onCheckedChange,
	disabled,
	onPress: onPressProp,
	onKeyDown: onKeyDownProp,
	...props
}: RootProps) {
	function onPress(ev: GestureResponderEvent) {
		onCheckedChange(!checked);
		onPressProp?.(ev);
	}

	function onKeyDown(ev: React.KeyboardEvent) {
		onKeyDownProp?.(ev);
		if (ev.key === " ") {
			onCheckedChange(!checked);
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Switch.Root
			checked={checked}
			onCheckedChange={onCheckedChange}
			disabled={disabled}
			asChild
		>
			<Component
				disabled={disabled}
				onPress={onPress}
				// @ts-expect-error Web only
				onKeyDown={onKeyDown}
				{...props}
			/>
		</Switch.Root>
	);
}

export function Thumb({ asChild, ...props }: ThumbProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Switch.Thumb asChild>
			<Component {...props} />
		</Switch.Thumb>
	);
}
