import * as Tooltip from "@radix-ui/react-tooltip";
import {
	useAugmentedRef,
	useIsomorphicLayoutEffect,
} from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type {
	ContentProps,
	OverlayProps,
	PortalProps,
	RootProps,
	TriggerProps,
	TriggerRef,
} from "./types";

const RootContext = React.createContext<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
} | null>(null);

export function Root({
	asChild,
	delayDuration,
	skipDelayDuration,
	disableHoverableContent,
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
		<RootContext.Provider value={{ open, onOpenChange }}>
			<Tooltip.Provider
				delayDuration={delayDuration}
				skipDelayDuration={skipDelayDuration}
				disableHoverableContent={disableHoverableContent}
			>
				<Tooltip.Root
					open={open}
					onOpenChange={onOpenChange}
					delayDuration={delayDuration}
					disableHoverableContent={disableHoverableContent}
				>
					<Component {...viewProps} />
				</Tooltip.Root>
			</Tooltip.Provider>
		</RootContext.Provider>
	);
}

function useTooltipContext() {
	const context = React.useContext(RootContext);
	if (!context) {
		throw new Error(
			"Tooltip compound components cannot be rendered outside the Tooltip component",
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
	const { onOpenChange, open } = useTooltipContext();
	const ref = React.useRef<TriggerRef>(null);
	const augmentedRef = useAugmentedRef({
		ref,
		methods: {
			open() {
				onOpenChange(true);
			},
			close() {
				onOpenChange(false);
			},
		},
	});
	function onPress(ev: GestureResponderEvent) {
		if (onPressProp) {
			onPressProp(ev);
		}
		onOpenChange(!open);
	}

	useIsomorphicLayoutEffect(() => {
		if (augmentedRef.current) {
			const augRef = augmentedRef.current as unknown as HTMLButtonElement;
			augRef.dataset.state = open ? "open" : "closed";
			augRef.type = "button";
		}
	}, [open]);

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Tooltip.Trigger disabled={disabled ?? undefined} asChild>
			<Component
				ref={augmentedRef as React.Ref<View>}
				onPress={onPress}
				role="button"
				disabled={disabled}
				{...props}
			/>
		</Tooltip.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<Tooltip.Portal forceMount={forceMount} container={container}>
			{children}
		</Tooltip.Portal>
	);
}

export function Overlay({ asChild, forceMount, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

export function Content({
	asChild = false,
	forceMount,
	align = "center",
	side = "bottom",
	sideOffset = 0,
	alignOffset = 0,
	avoidCollisions = true,
	insets: _insets,
	disablePositioningStyle: _disablePositioningStyle,
	onCloseAutoFocus: _onCloseAutoFocus,
	onEscapeKeyDown,
	onInteractOutside: _onInteractOutside,
	onPointerDownOutside,
	sticky,
	hideWhenDetached,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Tooltip.Content
			onEscapeKeyDown={onEscapeKeyDown}
			onPointerDownOutside={onPointerDownOutside}
			forceMount={forceMount}
			align={align}
			side={side}
			sideOffset={sideOffset}
			alignOffset={alignOffset}
			avoidCollisions={avoidCollisions}
			sticky={sticky}
			hideWhenDetached={hideWhenDetached}
		>
			<Component {...props} />
		</Tooltip.Content>
	);
}
