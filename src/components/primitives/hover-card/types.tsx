import type {
	ForceMountable,
	PositionedContentProps,
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export interface SharedRootContext {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	openDelay?: number;
	closeDelay?: number;
}

export type RootProps = SlottableViewProps & {
	onOpenChange?: (open: boolean) => void;
	/**
	 * Platform: WEB ONLY
	 * @default 700
	 */
	openDelay?: number;
	/**
	 * Platform: WEB ONLY
	 * @default 300
	 */
	closeDelay?: number;
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

export type TriggerProps = SlottablePressableProps;
export type ContentProps = SlottableViewProps & PositionedContentProps;

export type OverlayRef = PressableRef;
export type RootRef = ViewRef;
export type TriggerRef = PressableRef & {
	open: () => void;
	close: () => void;
};
export type ContentRef = ViewRef;
