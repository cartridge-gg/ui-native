import * as Slot from "@rn-primitives/slot";
import type { SlottablePressableProps } from "@rn-primitives/types";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type { IndicatorProps, RootProps } from "./types";

interface RootContext extends RootProps {
	nativeID?: string;
}

const CheckboxContext = React.createContext<RootContext | null>(null);

export function Root({
	asChild,
	disabled = false,
	checked,
	onCheckedChange,
	nativeID,
	...props
}: RootProps) {
	return (
		<CheckboxContext.Provider
			value={{
				disabled,
				checked,
				onCheckedChange,
				nativeID,
			}}
		>
			<Trigger {...props} />
		</CheckboxContext.Provider>
	);
}

function useCheckboxContext() {
	const context = React.useContext(CheckboxContext);
	if (!context) {
		throw new Error(
			"Checkbox compound components cannot be rendered outside the Checkbox component",
		);
	}
	return context;
}

export function Trigger({
	asChild,
	onPress: onPressProp,
	...props
}: SlottablePressableProps) {
	const { disabled, checked, onCheckedChange, nativeID } = useCheckboxContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		const newValue = !checked;
		onCheckedChange(newValue);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			nativeID={nativeID}
			aria-disabled={disabled}
			role="checkbox"
			aria-checked={checked}
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

export function Indicator({ asChild, forceMount, ...props }: IndicatorProps) {
	const { checked, disabled } = useCheckboxContext();

	if (!forceMount) {
		if (!checked) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			aria-disabled={disabled}
			aria-hidden={!(forceMount || checked)}
			role={"presentation"}
			{...props}
		/>
	);
}
