import * as Popover from "@radix-ui/react-popover";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type {
	CloseProps,
	ContentProps,
	OverlayProps,
	PortalProps,
	RootProps,
	TriggerProps,
} from "./types";

const RootContext = React.createContext<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
} | null>(null);

export function Root({
	asChild,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps & { onOpenChange?: (open: boolean) => void }) {
	const [open, setOpen] = React.useState(false);

	function onOpenChange(value: boolean) {
		setOpen(value);
		onOpenChangeProp?.(value);
	}
	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider value={{ open, onOpenChange }}>
			<Popover.Root open={open} onOpenChange={onOpenChange}>
				<Component {...viewProps} />
			</Popover.Root>
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
	disabled,
	...props
}: TriggerProps) {
	const { onOpenChange, open } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (onPressProp) {
			onPressProp(ev);
		}
		onOpenChange(!open);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Popover.Trigger disabled={disabled ?? undefined} asChild>
			<Component onPress={onPress} disabled={disabled} {...props} />
		</Popover.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<Popover.Portal forceMount={forceMount} container={container}>
			{children}
		</Popover.Portal>
	);
}

export function Overlay({ asChild, forceMount, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

export function Content({
	asChild = false,
	forceMount,
	align = "start",
	side = "bottom",
	sideOffset = 0,
	alignOffset = 0,
	avoidCollisions = true,
	insets: _insets,
	disablePositioningStyle: _disablePositioningStyle,
	onCloseAutoFocus,
	onEscapeKeyDown,
	onInteractOutside,
	onPointerDownOutside,
	onOpenAutoFocus,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Popover.Content
			onCloseAutoFocus={onCloseAutoFocus}
			onEscapeKeyDown={onEscapeKeyDown}
			onInteractOutside={onInteractOutside}
			onPointerDownOutside={onPointerDownOutside}
			forceMount={forceMount}
			align={align}
			side={side}
			sideOffset={sideOffset}
			alignOffset={alignOffset}
			avoidCollisions={avoidCollisions}
			onOpenAutoFocus={onOpenAutoFocus}
		>
			<Component {...props} />
		</Popover.Content>
	);
}

export function Close({
	asChild,
	onPress: onPressProp,
	disabled,
	...props
}: CloseProps) {
	const { onOpenChange, open } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (onPressProp) {
			onPressProp(ev);
		}
		onOpenChange(!open);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Popover.Close disabled={disabled ?? undefined} asChild>
			<Component onPress={onPress} disabled={disabled} {...props} />
		</Popover.Close>
	);
}
