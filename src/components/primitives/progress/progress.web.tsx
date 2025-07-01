import * as Progress from "@radix-ui/react-progress";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { View } from "react-native";
import type { IndicatorProps, RootProps } from "./types";

const ProgressContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	value,
	max,
	getValueLabel,
	...props
}: RootProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<ProgressContext.Provider value={{ value, max }}>
			<Progress.Root
				value={value}
				max={max}
				getValueLabel={getValueLabel}
				asChild
			>
				<Component {...props} />
			</Progress.Root>
		</ProgressContext.Provider>
	);
}

export function Indicator({ asChild, ...props }: IndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Progress.Indicator asChild>
			<Component {...props} />
		</Progress.Indicator>
	);
}
