import type {
	ForceMountable,
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottableViewProps & {
	value: string | undefined;
	onValueChange: (val: string) => void;
	disabled?: boolean;
};

export type ItemProps = SlottablePressableProps & {
	value: string;
	/**
	 * nativeID of the label element that describes this radio group item
	 */
	"aria-labelledby"?: string;
};

export type IndicatorProps = SlottableViewProps & ForceMountable;

export type RootRef = ViewRef;
export type ItemRef = PressableRef;
export type IndicatorRef = ViewRef;
