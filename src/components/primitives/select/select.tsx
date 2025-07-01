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
	ContentProps,
	GroupProps,
	ItemIndicatorProps,
	ItemProps,
	ItemTextProps,
	LabelProps,
	OverlayProps,
	PortalProps,
	RootProps,
	ScrollDownButtonProps,
	ScrollUpButtonProps,
	SeparatorProps,
	SharedRootContext,
	TriggerProps,
	ValueProps,
	ViewportProps,
} from "./types";

interface IRootContext extends SharedRootContext {
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
	value: valueProp,
	defaultValue,
	onValueChange: onValueChangeProp,
	onOpenChange: onOpenChangeProp,
	disabled,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const [value, onValueChange] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange: onValueChangeProp,
	});
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
				value,
				onValueChange,
				open,
				onOpenChange,
				disabled,
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
			"Select compound components cannot be rendered outside the Select component",
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
	const {
		open,
		onOpenChange,
		disabled: disabledRoot,
		setTriggerPosition,
	} = useRootContext();

	const triggerRef = React.useRef<View>(null);

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setTriggerPosition({ width, pageX, pageY: pageY, height });
		});
		onOpenChange(!open);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			ref={triggerRef}
			aria-disabled={disabled ?? undefined}
			role="combobox"
			onPress={onPress}
			disabled={disabled ?? disabledRoot}
			aria-expanded={open}
			{...props}
		/>
	);
}

export function Value({ asChild, placeholder, ...props }: ValueProps) {
	const { value } = useRootContext();
	const Component = asChild ? Slot.Text : Text;
	return <Component {...props}>{value?.label ?? placeholder}</Component>;
}

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
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
	position: _position,
	...props
}: ContentProps) {
	const {
		open,
		onOpenChange,
		contentLayout,
		nativeID,
		triggerPosition,
		setContentLayout,
		setTriggerPosition,
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
			role="list"
			nativeID={nativeID}
			aria-modal={true}
			style={[positionStyle, style]}
			onLayout={onLayout}
			onStartShouldSetResponder={onStartShouldSetResponder}
			{...props}
		/>
	);
}

const ItemContext = React.createContext<{
	itemValue: string;
	label: string;
} | null>(null);

export function Item({
	asChild,
	value: itemValue,
	label,
	onPress: onPressProp,
	disabled = false,
	closeOnPress = true,
	...props
}: ItemProps) {
	const {
		onOpenChange,
		value,
		onValueChange,
		setTriggerPosition,
		setContentLayout,
	} = useRootContext();
	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}

		onValueChange({ value: itemValue, label });
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<ItemContext.Provider value={{ itemValue, label }}>
			<Component
				role="option"
				onPress={onPress}
				disabled={disabled}
				aria-checked={value?.value === itemValue}
				aria-valuetext={label}
				aria-disabled={!!disabled}
				accessibilityState={{
					disabled: !!disabled,
					checked: value?.value === itemValue,
				}}
				{...props}
			/>
		</ItemContext.Provider>
	);
}

export function useItemContext() {
	const context = React.useContext(ItemContext);
	if (!context) {
		throw new Error(
			"Item compound components cannot be rendered outside of an Item component",
		);
	}
	return context;
}

export function ItemText({ asChild, ...props }: ItemTextProps) {
	const { label } = useItemContext();

	const Component = asChild ? Slot.Text : Text;
	return <Component {...props}>{label}</Component>;
}

export function ItemIndicator({
	asChild,
	forceMount,
	...props
}: ItemIndicatorProps) {
	const { itemValue } = useItemContext();
	const { value } = useRootContext();

	if (!forceMount) {
		if (value?.value !== itemValue) {
			return null;
		}
	}
	const Component = asChild ? Slot.View : View;
	return <Component role="presentation" {...props} />;
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="group" {...props} />;
}

export function Label({ asChild, ...props }: LabelProps) {
	const Component = asChild ? Slot.Text : Text;
	return <Component {...props} />;
}

export function Separator({ asChild, decorative, ...props }: SeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Component role={decorative ? "presentation" : "separator"} {...props} />
	);
}

export const ScrollUpButton = ({ children }: ScrollUpButtonProps) => {
	return <>{children}</>;
};

export const ScrollDownButton = ({ children }: ScrollDownButtonProps) => {
	return <>{children}</>;
};

export const Viewport = ({ children }: ViewportProps) => {
	return <>{children}</>;
};

function onStartShouldSetResponder() {
	return true;
}
