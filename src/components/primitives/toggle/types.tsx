import type {
	PressableRef,
	SlottablePressableProps,
} from "@rn-primitives/types";

export type RootProps = SlottablePressableProps & {
	pressed: boolean;
	onPressedChange: (pressed: boolean) => void;
	disabled?: boolean;
};

export type RootRef = PressableRef;
