import type {
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottablePressableProps & {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	disabled?: boolean;
	/**
	 * Platform: WEB ONLY
	 */
	onKeyDown?: (ev: React.KeyboardEvent) => void;
};

export type ThumbProps = SlottableViewProps;

export type RootRef = PressableRef;
export type ThumbRef = ViewRef;
