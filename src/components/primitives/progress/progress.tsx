import * as Slot from "@rn-primitives/slot";
import { View } from "react-native";
import type { IndicatorProps, RootProps } from "./types";

// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

const DEFAULT_MAX = 100;

export function Root({
	asChild,
	value: valueProp,
	max: maxProp,
	getValueLabel = defaultGetValueLabel,
	...props
}: RootProps) {
	const max = maxProp ?? DEFAULT_MAX;
	const value = isValidValueNumber(valueProp, max) ? valueProp : 0;

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			role="progressbar"
			aria-valuemax={max}
			aria-valuemin={0}
			aria-valuenow={value}
			aria-valuetext={getValueLabel(value, max)}
			accessibilityValue={{
				min: 0,
				max,
				now: value,
				text: getValueLabel(value, max),
			}}
			{...props}
		/>
	);
}

export function Indicator({ asChild, ...props }: IndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="presentation" {...props} />;
}

function defaultGetValueLabel(value: number, max: number) {
	return `${Math.round((value / max) * 100)}%`;
}

function isValidValueNumber(value: unknown, max: number): value is number {
	return (
		typeof value === "number" &&
		!Number.isNaN(value) &&
		value <= max &&
		value >= 0
	);
}
