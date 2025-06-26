import type {
	ForceMountable,
	PositionedContentProps,
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";

export type RootProps = SlottableViewProps & {
	onOpenChange?: (open: boolean) => void;
	/**
	 * Platform: WEB ONLY
	 * @default 700
	 */
	delayDuration?: number;
	/**
	 * Platform: WEB ONLY
	 * @default 300
	 */
	skipDelayDuration?: number;
	/**
	 * Platform: WEB ONLY
	 */
	disableHoverableContent?: boolean;
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

export type ContentProps = SlottableViewProps &
	Omit<PositionedContentProps, "side"> & {
		/**
		 * `left` and `right` are only supported on web.
		 */
		side?: "top" | "right" | "bottom" | "left";
	};

export type TriggerProps = SlottablePressableProps;

export type RootRef = ViewRef;
export type ContentRef = ViewRef;
export type OverlayRef = PressableRef;
export type TriggerRef = PressableRef & {
	open: () => void;
	close: () => void;
};
