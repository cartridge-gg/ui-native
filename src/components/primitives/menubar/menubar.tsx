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
	MenuProps,
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

interface IMenuContext extends RootProps {
	triggerPosition: LayoutPosition | null;
	setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
	contentLayout: LayoutRectangle | null;
	setContentLayout: (contentLayout: LayoutRectangle | null) => void;
	nativeID: string;
}

const RootContext = React.createContext<IMenuContext | null>(null);

export function Root({
	asChild,
	value,
	onValueChange,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const [triggerPosition, setTriggerPosition] =
		React.useState<LayoutPosition | null>(null);
	const [contentLayout, setContentLayout] =
		React.useState<LayoutRectangle | null>(null);

	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider
			value={{
				value,
				onValueChange,
				nativeID,
				contentLayout,
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
			"Menubar compound components cannot be rendered outside the Menubar component",
		);
	}
	return context;
}

const MenuContext = React.createContext<MenuProps | null>(null);

export function Menu({ asChild, value, ...viewProps }: MenuProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<MenuContext.Provider
			value={{
				value,
			}}
		>
			<Component role="menubar" {...viewProps} />
		</MenuContext.Provider>
	);
}

export function useMenuContext() {
	const context = React.useContext(MenuContext);
	if (!context) {
		throw new Error(
			"Menubar compound components cannot be rendered outside the Menubar component",
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
	const triggerRef = React.useRef<View>(null);
	const { value, onValueChange, setTriggerPosition } = useRootContext();
	const { value: menuValue } = useMenuContext();

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setTriggerPosition({ width, pageX, pageY, height });
		});

		onValueChange(menuValue === value ? undefined : menuValue);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			ref={triggerRef}
			aria-disabled={disabled ?? undefined}
			role="button"
			onPress={onPress}
			disabled={disabled ?? undefined}
			aria-expanded={value === menuValue}
			{...props}
		/>
	);
}

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
export function Portal({ forceMount, hostName, children }: PortalProps) {
	const menubar = useRootContext();
	const menu = useMenuContext();

	if (!menubar.triggerPosition) {
		return null;
	}

	if (!forceMount) {
		if (menubar.value !== menu.value) {
			return null;
		}
	}

	return (
		<RNPPortal hostName={hostName} name={`${menubar.nativeID}_portal`}>
			<RootContext.Provider
				value={menubar}
				key={`RootContext_${menubar.nativeID}_portal_provider`}
			>
				<MenuContext.Provider
					value={menu}
					key={`MenuContext_${menubar.nativeID}_portal_provider`}
				>
					{children}
				</MenuContext.Provider>
			</RootContext.Provider>
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
	const { value, onValueChange, setContentLayout, setTriggerPosition } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onValueChange(undefined);
		}
		OnPressProp?.(ev);
	}

	if (!forceMount) {
		if (!value) {
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
		value,
		onValueChange,
		triggerPosition,
		contentLayout,
		setContentLayout,
		nativeID,
		setTriggerPosition,
	} = useRootContext();
	const { value: menuValue } = useMenuContext();

	React.useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				setTriggerPosition(null);
				setContentLayout(null);
				onValueChange(undefined);
				return true;
			},
		);

		return () => {
			setContentLayout(null);
			backHandler.remove();
		};
	}, [onValueChange, setContentLayout, setTriggerPosition]);

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
		if (value !== menuValue) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			role="menu"
			nativeID={nativeID}
			aria-modal={true}
			style={[positionStyle, style]}
			onLayout={onLayout}
			onStartShouldSetResponder={onStartShouldSetResponder}
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
	const { onValueChange, setContentLayout, setTriggerPosition } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onValueChange(undefined);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			role="menuitem"
			onPress={onPress}
			disabled={disabled}
			aria-valuetext={textValue}
			aria-disabled={!!disabled}
			accessibilityState={{ disabled: !!disabled }}
			{...props}
		/>
	);
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="group" {...props} />;
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
	const { onValueChange, setTriggerPosition, setContentLayout } =
		useRootContext();

	function onPress(ev: GestureResponderEvent) {
		onCheckedChange(!checked);
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onValueChange(undefined);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<FormItemContext.Provider value={{ checked }}>
			<Component
				role="checkbox"
				aria-checked={checked}
				onPress={onPress}
				disabled={disabled}
				aria-disabled={!!disabled}
				aria-valuetext={textValue}
				accessibilityState={{ disabled: !!disabled }}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

export function useFormItemContext() {
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
			<Component role="radiogroup" {...props} />
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
	const {
		onValueChange: onRootValueChange,
		setTriggerPosition,
		setContentLayout,
	} = useRootContext();

	const { value, onValueChange } = useFormItemContext() as BothFormItemContext;
	function onPress(ev: GestureResponderEvent) {
		onValueChange(itemValue);
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onRootValueChange(undefined);
		}
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<RadioItemContext.Provider value={{ itemValue }}>
			<Component
				onPress={onPress}
				role="radio"
				aria-checked={value === itemValue}
				disabled={disabled ?? false}
				accessibilityState={{
					disabled: disabled ?? false,
					checked: value === itemValue,
				}}
				aria-valuetext={textValue}
				{...props}
			/>
		</RadioItemContext.Provider>
	);
}

export function useItemIndicatorContext() {
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
	return <Component role="presentation" {...props} />;
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

export function useSubContext() {
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
			aria-valuetext={textValue}
			role="menuitem"
			aria-expanded={open}
			accessibilityState={{ expanded: open, disabled: !!disabled }}
			nativeID={nativeID}
			onPress={onPress}
			disabled={disabled}
			aria-disabled={!!disabled}
			{...props}
		/>
	);
}

export function SubContent({
	asChild = false,
	forceMount,
	...props
}: SubContentProps) {
	const { open, nativeID } = useSubContext();

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return <Component role="group" aria-labelledby={nativeID} {...props} />;
}

function onStartShouldSetResponder() {
	return true;
}
