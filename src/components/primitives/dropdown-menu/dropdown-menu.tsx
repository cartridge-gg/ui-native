import {
	type LayoutPosition,
	useControllableState,
	useRelativePosition,
} from "@rn-primitives/hooks";
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
import { Text } from "#components";
import type {
	CheckboxItemProps,
	ContentProps,
	GroupProps,
	ItemIndicatorProps,
	ItemProps,
	LabelProps,
	OverlayProps,
	PortalProps,
	RadioGroupProps,
	RadioItemProps,
	RootProps,
	SeparatorProps,
	SubContentProps,
	SubProps,
	SubTriggerProps,
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

	function onOpenChange(open: boolean) {
		setOpen(open);
		onOpenChangeProp?.(open);
	}

	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider
			value={{
				open,
				onOpenChange,
				contentLayout,
				setContentLayout,
				nativeID,
				setTriggerPosition,
				triggerPosition,
			}}
		>
			<Component {...viewProps} />
		</RootContext.Provider>
	);
}

function useRootContext() {
	const context = React.useContext(RootContext);
	if (!context) {
		throw new Error(
			"DropdownMenu compound components cannot be rendered outside the DropdownMenu component",
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
export function Portal({ hostName, children }: PortalProps) {
	const value = useRootContext();

	if (!value.triggerPosition) {
		return null;
	}

	if (!value.open) {
		return null;
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
	const { open, onOpenChange, setContentLayout, setTriggerPosition } =
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
	...props
}: ContentProps) {
	const {
		open,
		onOpenChange,
		nativeID,
		triggerPosition,
		setTriggerPosition,
		contentLayout,
		setContentLayout,
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

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			nativeID={nativeID}
			style={[positionStyle, style]}
			onLayout={onLayout}
			{...props}
		/>
	);
}

export function Item({
	asChild,
	textValue,
	onPress: onPressProp,
	disabled = false,
	closeOnPress = true,
	...props
}: ItemProps) {
	const { onOpenChange, setTriggerPosition, setContentLayout } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component onPress={onPress} disabled={disabled} {...props} />;
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return <Component {...props} />;
}

export function Label({ asChild, ...props }: LabelProps) {
	const Component = asChild ? Slot.Text : Text;
	return <Component {...props} />;
}

type FormItemContext =
	| { checked: boolean }
	| {
			value: string | undefined;
			onValueChange: (value: string) => void;
	  };

const FormItemContext = React.createContext<FormItemContext | null>(null);

export function CheckboxItem({
	asChild,
	checked,
	onCheckedChange,
	textValue,
	onPress: onPressProp,
	closeOnPress = true,
	disabled = false,
	...props
}: CheckboxItemProps) {
	const { onOpenChange, setContentLayout, setTriggerPosition } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		onCheckedChange(!checked);
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<FormItemContext.Provider value={{ checked }}>
			<Component onPress={onPress} disabled={disabled} {...props} />
		</FormItemContext.Provider>
	);
}

function useFormItemContext() {
	const context = React.useContext(FormItemContext);
	if (!context) {
		throw new Error(
			"CheckboxItem or RadioItem compound components cannot be rendered outside of a CheckboxItem or RadioItem component",
		);
	}
	return context;
}

export function RadioGroup({
	asChild,
	value,
	onValueChange,
	...props
}: RadioGroupProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<FormItemContext.Provider value={{ value, onValueChange }}>
			<Component {...props} />
		</FormItemContext.Provider>
	);
}

type BothFormItemContext = Exclude<FormItemContext, { checked: boolean }> & {
	checked: boolean;
};

const RadioItemContext = React.createContext({} as { itemValue: string });

export function RadioItem({
	asChild,
	value: itemValue,
	textValue,
	onPress: onPressProp,
	disabled = false,
	closeOnPress = true,
	...props
}: RadioItemProps) {
	const { onOpenChange, setContentLayout, setTriggerPosition } =
		useRootContext();

	const { onValueChange } = useFormItemContext() as BothFormItemContext;
	function onPress(ev: GestureResponderEvent) {
		onValueChange(itemValue);
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<RadioItemContext.Provider value={{ itemValue }}>
			<Component onPress={onPress} disabled={disabled ?? false} {...props} />
		</RadioItemContext.Provider>
	);
}

function useItemIndicatorContext() {
	return React.useContext(RadioItemContext);
}

export function ItemIndicator({
	asChild,
	forceMount,
	...props
}: ItemIndicatorProps) {
	const { itemValue } = useItemIndicatorContext();
	const { checked, value } = useFormItemContext() as BothFormItemContext;

	if (!forceMount) {
		if (itemValue == null && !checked) {
			return null;
		}
		if (value !== itemValue) {
			return null;
		}
	}
	const Component = asChild ? Slot.View : View;
	return <Component {...props} />;
}

export function Separator({ asChild, decorative, ...props }: SeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Component role={decorative ? "presentation" : "separator"} {...props} />
	);
}

const SubContext = React.createContext<{
	nativeID: string;
	open: boolean;
	onOpenChange: (value: boolean) => void;
} | null>(null);

export function Sub({
	asChild,
	defaultOpen,
	open: openProp,
	onOpenChange: onOpenChangeProp,
	...props
}: SubProps) {
	const nativeID = React.useId();
	const [open = false, onOpenChange] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen,
		onChange: onOpenChangeProp,
	});

	const Component = asChild ? Slot.View : View;
	return (
		<SubContext.Provider
			value={{
				nativeID,
				open,
				onOpenChange,
			}}
		>
			<Component {...props} />
		</SubContext.Provider>
	);
}

function useSubContext() {
	const context = React.useContext(SubContext);
	if (!context) {
		throw new Error(
			"Sub compound components cannot be rendered outside of a Sub component",
		);
	}
	return context;
}

export function SubTrigger({
	asChild,
	textValue,
	onPress: onPressProp,
	disabled = false,
	...props
}: SubTriggerProps) {
	const { nativeID, open, onOpenChange } = useSubContext();

	function onPress(ev: GestureResponderEvent) {
		onOpenChange(!open);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			nativeID={nativeID}
			onPress={onPress}
			disabled={disabled}
			{...props}
		/>
	);
}

export function SubContent({
	asChild = false,
	forceMount,
	...props
}: SubContentProps) {
	const { open } = useSubContext();

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

export { useRootContext, useSubContext };
