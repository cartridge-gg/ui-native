import type { SlottableViewProps, ViewRef } from "@rn-primitives/types";

export type RootProps = SlottableViewProps & {
	value?: number | null | undefined;
	max?: number;
	getValueLabel?(value: number, max: number): string;
};

export type IndicatorProps = SlottableViewProps;

export type RootRef = ViewRef;
export type IndicatorRef = ViewRef;
