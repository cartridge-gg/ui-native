import * as Dialog from "@radix-ui/react-dialog";
import {
	useControllableState,
	useIsomorphicLayoutEffect,
} from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import { Text } from "#components";
import type {
	CloseProps,
	ContentProps,
	DescriptionProps,
	OverlayProps,
	PortalProps,
	RootContext,
	RootProps,
	TitleProps,
	TriggerProps,
} from "./types";

const DialogContext = React.createContext<RootContext | null>(null);

export function Root({
	asChild,
	open: openProp,
	defaultOpen,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const [open = false, onOpenChange] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen,
		onChange: onOpenChangeProp,
	});
	const Component = asChild ? Slot.View : View;
	return (
		<DialogContext.Provider value={{ open, onOpenChange }}>
			<Dialog.Root
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
			>
				<Component {...viewProps} />
			</Dialog.Root>
		</DialogContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(DialogContext);
	if (!context) {
		throw new Error(
			"Dialog compound components cannot be rendered outside the Dialog component",
		);
	}
	return context;
}

export function Trigger({
	asChild,
	onPress: onPressProp,
	role: _role,
	disabled,
	...props
}: TriggerProps) {
	const triggerRef = React.useRef<View | null>(null);
	const { onOpenChange, open } = useRootContext();
	function onPress(ev: GestureResponderEvent) {
		if (onPressProp) {
			onPressProp(ev);
		}
		onOpenChange(!open);
	}

	useIsomorphicLayoutEffect(() => {
		if (triggerRef.current) {
			const augRef = triggerRef.current as unknown as HTMLButtonElement;
			augRef.dataset.state = open ? "open" : "closed";
			augRef.type = "button";
		}
	}, [open]);

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Dialog.Trigger disabled={disabled ?? undefined} asChild>
			<Component
				ref={triggerRef}
				onPress={onPress}
				role="button"
				disabled={disabled}
				{...props}
			/>
		</Dialog.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<Dialog.Portal forceMount={forceMount} container={container}>
			{children}
		</Dialog.Portal>
	);
}

export function Overlay({ asChild, forceMount, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Dialog.Overlay forceMount={forceMount}>
			<Component {...props} />
		</Dialog.Overlay>
	);
}

export function Content({
	asChild,
	forceMount,
	onOpenAutoFocus,
	onCloseAutoFocus,
	onEscapeKeyDown,
	onInteractOutside,
	onPointerDownOutside,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Dialog.Content
			onOpenAutoFocus={onOpenAutoFocus}
			onCloseAutoFocus={onCloseAutoFocus}
			onEscapeKeyDown={onEscapeKeyDown}
			onInteractOutside={onInteractOutside}
			onPointerDownOutside={onPointerDownOutside}
			forceMount={forceMount}
		>
			<Component {...props} />
		</Dialog.Content>
	);
}

export function Close({
	asChild,
	onPress: onPressProp,
	disabled,
	...props
}: CloseProps) {
	const closeRef = React.useRef<View | null>(null);
	const { onOpenChange, open } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (onPressProp) {
			onPressProp(ev);
		}
		onOpenChange(!open);
	}

	useIsomorphicLayoutEffect(() => {
		if (closeRef.current) {
			const augRef = closeRef.current as unknown as HTMLButtonElement;
			augRef.type = "button";
		}
	}, []);

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Dialog.Close disabled={disabled ?? undefined} asChild>
			<Component
				ref={closeRef}
				onPress={onPress}
				role="button"
				disabled={disabled}
				{...props}
			/>
		</Dialog.Close>
	);
}

export function Title({ asChild, ...props }: TitleProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<Dialog.Title asChild>
			<Component {...props} />
		</Dialog.Title>
	);
}

export function Description({ asChild, ...props }: DescriptionProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<Dialog.Description asChild>
			<Component {...props} />
		</Dialog.Description>
	);
}
