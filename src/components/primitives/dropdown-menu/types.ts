import type {
	ForceMountable,
	PositionedContentProps,
	PressableRef,
	SlottablePressableProps,
	SlottableTextProps,
	SlottableViewProps,
	TextRef,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottableViewProps & {
	onOpenChange?: (open: boolean) => void;
};

export interface PortalProps extends ForceMountable {
	children: React.ReactNode;
	/**
	 * Platform: NATIVE ONLY
	 */
	hostName?: string;
	/**
	 * Platform: WEB ONLY
	 */
	container?: HTMLElement | null | undefined;
}

export type OverlayProps = ForceMountable &
	SlottablePressableProps & {
		closeOnPress?: boolean;
	};

export type ItemProps = SlottablePressableProps & {
	textValue?: string;
	closeOnPress?: boolean;
};

export type CheckboxItemProps = SlottablePressableProps & {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	closeOnPress?: boolean;
	textValue?: string;
};

export type RadioGroupProps = SlottableViewProps & {
	value: string | undefined;
	onValueChange: (value: string) => void;
};

export type RadioItemProps = SlottablePressableProps & {
	value: string;
	textValue?: string;
	closeOnPress?: boolean;
};

export type SeparatorProps = SlottableViewProps & {
	decorative?: boolean;
};

export type SubProps = SlottableViewProps & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (value: boolean) => void;
};

export type SubTriggerProps = SlottablePressableProps & {
	textValue?: string;
};

export type TriggerProps = SlottablePressableProps;
export type ContentProps = SlottablePressableProps & PositionedContentProps;
export type SubContentProps = SlottablePressableProps & ForceMountable;
export type ItemIndicatorProps = SlottableViewProps & ForceMountable;
export type GroupProps = SlottableViewProps;
export type LabelProps = SlottableTextProps;

export type CheckboxItemRef = PressableRef;
export type ContentRef = ViewRef;
export type GroupRef = ViewRef;
export type ItemIndicatorRef = ViewRef;
export type ItemRef = PressableRef;
export type LabelRef = TextRef;
export type OverlayRef = PressableRef;
export type RadioGroupRef = ViewRef;
export type RadioItemRef = PressableRef;
export type RootRef = ViewRef;
export type SeparatorRef = ViewRef;
export type SubContentRef = PressableRef;
export type SubRef = ViewRef;
export type SubTriggerRef = PressableRef;
export type TriggerRef = PressableRef & {
	open: () => void;
	close: () => void;
};
