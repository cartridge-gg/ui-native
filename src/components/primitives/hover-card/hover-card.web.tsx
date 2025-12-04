 import * as HoverCard from "@radix-ui/react-hover-card";
// Removed unused imports
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Pressable, View } from "react-native";
import type {
	ContentProps,
	OverlayProps,
	PortalProps,
	RootProps,
	SharedRootContext,
	TriggerProps,
} from "./types";

const HoverCardContext = React.createContext<SharedRootContext | null>(null);

export function Root({
	asChild,
	openDelay,
	closeDelay,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const [open, setOpen] = React.useState(false);

	function onOpenChange(value: boolean) {
		setOpen(value);
		onOpenChangeProp?.(value);
	}

	const Component = asChild ? Slot.View : View;
	return (
		<HoverCardContext.Provider value={{ open, onOpenChange }}>
			<HoverCard.Root
				open={open}
				onOpenChange={onOpenChange}
				openDelay={openDelay}
				closeDelay={closeDelay}
			>
				<Component {...viewProps} />
			</HoverCard.Root>
		</HoverCardContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(HoverCardContext);
	if (!context) {
		throw new Error(
			"HoverCard compound components cannot be rendered outside the HoverCard component",
		);
	}
	return context;
}

export function Trigger({ asChild, ...props }: TriggerProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<HoverCard.Trigger asChild>
			<Component {...props} />
		</HoverCard.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<HoverCard.Portal forceMount={forceMount} container={container}>
			{children}
		</HoverCard.Portal>
	);
}

export function Overlay({ asChild, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

export function Content({
	asChild = false,
	forceMount,
	align,
	side,
	sideOffset,
	alignOffset = 0,
	avoidCollisions = true,
	insets,
	loop: _loop,
	onCloseAutoFocus: _onCloseAutoFocus,
	onEscapeKeyDown,
	onPointerDownOutside,
	onFocusOutside,
	onInteractOutside,
	collisionBoundary,
	sticky,
	hideWhenDetached,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<HoverCard.Content
			forceMount={forceMount}
			alignOffset={alignOffset}
			avoidCollisions={avoidCollisions}
			collisionPadding={insets}
			onEscapeKeyDown={onEscapeKeyDown}
			onPointerDownOutside={onPointerDownOutside}
			onFocusOutside={onFocusOutside}
			onInteractOutside={onInteractOutside}
			collisionBoundary={collisionBoundary}
			sticky={sticky}
			hideWhenDetached={hideWhenDetached}
			align={align}
			side={side}
			sideOffset={sideOffset}
		>
			<Component {...props} />
		</HoverCard.Content>
	);
}
