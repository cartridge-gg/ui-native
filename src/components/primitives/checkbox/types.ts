import type {
	ForceMountable,
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottablePressableProps & {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	disabled?: boolean;
};

export type IndicatorProps = ForceMountable & SlottableViewProps;

export type RootRef = PressableRef;
export type IndicatorRef = ViewRef;
