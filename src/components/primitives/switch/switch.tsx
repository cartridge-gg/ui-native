import * as Slot from "@rn-primitives/slot";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { RootProps, ThumbProps } from "./types";

export function Root({
	asChild,
	checked,
	onCheckedChange,
	disabled,
	onPress: onPressProp,
	"aria-valuetext": ariaValueText,
	...props
}: RootProps) {
	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		onCheckedChange(!checked);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			aria-disabled={disabled}
			role="switch"
			aria-checked={checked}
			aria-valuetext={(ariaValueText ?? checked) ? "on" : "off"}
			onPress={onPress}
			accessibilityState={{
				checked,
				disabled,
			}}
			disabled={disabled}
			{...props}
		/>
	);
}

export function Thumb({ asChild, ...props }: ThumbProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="presentation" {...props} />;
}
