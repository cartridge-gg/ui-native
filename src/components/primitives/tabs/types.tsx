import type {
	ForceMountable,
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottableViewProps & {
	value: string;
	onValueChange: (value: string) => void;
	/**
	 * Platform: WEB ONLY
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Platform: WEB ONLY
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Platform: WEB ONLY
	 */
	activationMode?: "automatic" | "manual";
};

export type ListProps = SlottableViewProps;
export type TriggerProps = SlottablePressableProps & {
	value: string;
};
export type ContentProps = SlottableViewProps &
	ForceMountable & {
		value: string;
	};

export type RootRef = ViewRef;
export type ListRef = ViewRef;
export type TriggerRef = PressableRef;
export type ContentRef = ViewRef;
