import { type LayoutPosition, useRelativePosition } from "@rn-primitives/hooks";
import { Portal as RNPPortal } from "@rn-primitives/portal";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import {
	BackHandler,
	type GestureResponderEvent,
	type LayoutChangeEvent,
	type LayoutRectangle,
	Pressable,
	View,
} from "react-native";
import type {
	CloseProps,
	ContentProps,
	OverlayProps,
	PortalProps,
	RootProps,
	TriggerProps,
} from "./types";

interface IRootContext {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerPosition: LayoutPosition | null;
	setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
	contentLayout: LayoutRectangle | null;
	setContentLayout: (contentLayout: LayoutRectangle | null) => void;
	nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);

export function Root({
	asChild,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const [triggerPosition, setTriggerPosition] =
		React.useState<LayoutPosition | null>(null);
	const [contentLayout, setContentLayout] =
		React.useState<LayoutRectangle | null>(null);
	const [open, setOpen] = React.useState(false);

	function onOpenChange(value: boolean) {
		setOpen(value);
		onOpenChangeProp?.(value);
	}

	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider
			value={{
				open,
				onOpenChange,
				contentLayout,
				nativeID,
				setContentLayout,
				setTriggerPosition,
				triggerPosition,
			}}
		>
			<Component {...viewProps} />
		</RootContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(RootContext);
	if (!context) {
		throw new Error(
			"Popover compound components cannot be rendered outside the Popover component",
		);
	}
	return context;
}

export function Trigger({
	asChild,
	onPress: onPressProp,
	disabled = false,
	...props
}: TriggerProps) {
	const { onOpenChange, open } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		// Note: measure functionality removed as it requires ref
		onOpenChange(!open);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component onPress={onPress} disabled={disabled ?? undefined} {...props} />
	);
}

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
export function Portal({ forceMount, hostName, children }: PortalProps) {
	const value = useRootContext();

	if (!value.triggerPosition) {
		return null;
	}

	if (!forceMount) {
		if (!value.open) {
			return null;
		}
	}

	return (
		<RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
			<RootContext.Provider value={value}>{children}</RootContext.Provider>
		</RNPPortal>
	);
}

export function Overlay({
	asChild,
	forceMount,
	onPress: OnPressProp,
	closeOnPress = true,
	...props
}: OverlayProps) {
	const { open, onOpenChange, setTriggerPosition, setContentLayout } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}
		OnPressProp?.(ev);
	}

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component onPress={onPress} {...props} />;
}

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
export function Content({
	asChild = false,
	forceMount,
	align = "start",
	side = "bottom",
	sideOffset = 0,
	alignOffset = 0,
	avoidCollisions = true,
	onLayout: onLayoutProp,
	insets,
	style,
	disablePositioningStyle,
	onOpenAutoFocus: _onOpenAutoFocus,
	...props
}: ContentProps) {
	const {
		open,
		onOpenChange,
		contentLayout,
		nativeID,
		setContentLayout,
		setTriggerPosition,
		triggerPosition,
	} = useRootContext();

	React.useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				setTriggerPosition(null);
				setContentLayout(null);
				onOpenChange(false);
				return true;
			},
		);

		return () => {
			setContentLayout(null);
			backHandler.remove();
		};
	}, [onOpenChange, setContentLayout, setTriggerPosition]);

	const positionStyle = useRelativePosition({
		align,
		avoidCollisions,
		triggerPosition,
		contentLayout,
		alignOffset,
		insets,
		sideOffset,
		side,
		disablePositioningStyle,
	});

	function onLayout(event: LayoutChangeEvent) {
		setContentLayout(event.nativeEvent.layout);
		onLayoutProp?.(event);
	}

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			nativeID={nativeID}
			style={[positionStyle, style]}
			onLayout={onLayout}
			onStartShouldSetResponder={onStartShouldSetResponder}
			{...props}
		/>
	);
}

export function Close({
	asChild,
	onPress: onPressProp,
	disabled = false,
	...props
}: CloseProps) {
	const { onOpenChange, setContentLayout, setTriggerPosition } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		setTriggerPosition(null);
		setContentLayout(null);
		onOpenChange(false);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component onPress={onPress} disabled={disabled ?? undefined} {...props} />
	);
}

function onStartShouldSetResponder() {
	return true;
}
