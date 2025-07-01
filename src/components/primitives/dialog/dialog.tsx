import { useControllableState } from "@rn-primitives/hooks";
import { Portal as RNPPortal } from "@rn-primitives/portal";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import {
	BackHandler,
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from "react-native";
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

const DialogContext = React.createContext<
	(RootContext & { nativeID: string }) | null
>(null);

export function Root({
	asChild,
	open: openProp,
	defaultOpen,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const [open = false, onOpenChange] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen,
		onChange: onOpenChangeProp,
	});

	const Component = asChild ? Slot.View : View;
	return (
		<DialogContext.Provider
			value={{
				open,
				onOpenChange,
				nativeID,
			}}
		>
			<Component {...viewProps} />
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
	disabled = false,
	...props
}: TriggerProps) {
	const { open, onOpenChange } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		const newValue = !open;
		onOpenChange(newValue);
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

	if (!forceMount) {
		if (!value.open) {
			return null;
		}
	}

	return (
		<RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
			<DialogContext.Provider value={value}>{children}</DialogContext.Provider>
		</RNPPortal>
	);
}

export function Overlay({
	asChild,
	forceMount,
	closeOnPress = true,
	onPress: OnPressProp,
	...props
}: OverlayProps) {
	const { open, onOpenChange } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			onOpenChange(!open);
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

export function Content({ asChild, forceMount, ...props }: ContentProps) {
	const { open, nativeID, onOpenChange } = useRootContext();

	React.useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				onOpenChange(false);
				return true;
			},
		);

		return () => {
			backHandler.remove();
		};
	}, [onOpenChange]);

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			nativeID={nativeID}
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
	const { onOpenChange } = useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		onOpenChange(false);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component onPress={onPress} disabled={disabled ?? undefined} {...props} />
	);
}

export function Title({ asChild, ...props }: TitleProps) {
	const { nativeID } = useRootContext();
	const Component = asChild ? Slot.Text : Text;
	return <Component nativeID={`${nativeID}_label`} {...props} />;
}

export function Description({ asChild, ...props }: DescriptionProps) {
	const { nativeID } = useRootContext();
	const Component = asChild ? Slot.Text : Text;
	return <Component nativeID={`${nativeID}_desc`} {...props} />;
}

function onStartShouldSetResponder() {
	return true;
}
