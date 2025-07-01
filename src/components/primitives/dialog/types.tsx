import type {
	ForceMountable,
	PressableRef,
	SlottablePressableProps,
	SlottableTextProps,
	SlottableViewProps,
	TextRef,
	ViewRef,
} from "@rn-primitives/types";

export type RootContext = {
	open: boolean;
	onOpenChange: (value: boolean) => void;
};

export type RootProps = SlottableViewProps & {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (value: boolean) => void;
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
		/**
		 * Platform: NATIVE ONLY - default: true
		 */
		closeOnPress?: boolean;
	};
export type ContentProps = ForceMountable &
	SlottableViewProps & {
		/**
		 * Platform: WEB ONLY
		 */
		onOpenAutoFocus?: (ev: Event) => void;
		/**
		 * Platform: WEB ONLY
		 */
		onCloseAutoFocus?: (ev: Event) => void;
		/**
		 * Platform: WEB ONLY
		 */
		onEscapeKeyDown?: (ev: Event) => void;
		/**
		 * Platform: WEB ONLY
		 */
		onInteractOutside?: (ev: Event) => void;
		/**
		 * Platform: WEB ONLY
		 */
		onPointerDownOutside?: (ev: Event) => void;
	};

export type TriggerProps = SlottablePressableProps;
export type CloseProps = SlottablePressableProps;
export type TitleProps = SlottableTextProps;
export type DescriptionProps = SlottableTextProps;

export type CloseRef = PressableRef;
export type ContentRef = ViewRef;
export type DescriptionRef = TextRef;
export type OverlayRef = PressableRef;
export type RootRef = ViewRef;
export type TitleRef = TextRef;
export type TriggerRef = PressableRef;
