import * as Menubar from "@radix-ui/react-menubar";
import {
	useControllableState,
	useIsomorphicLayoutEffect,
} from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import { EmptyGestureResponderEvent } from "@rn-primitives/utils";
import * as React from "react";
import {
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from "react-native";
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

const RootContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	value,
	onValueChange,
	...viewProps
}: RootProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider value={{ value, onValueChange }}>
			<Menubar.Root value={value} onValueChange={onValueChange}>
				<Component {...viewProps} />
			</Menubar.Root>
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
		<MenuContext.Provider value={{ value }}>
			<Menubar.Menu value={value}>
				<Component {...viewProps} />
			</Menubar.Menu>
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

export function Trigger({ asChild, disabled = false, ...props }: TriggerProps) {
	const triggerRef = React.useRef<View>(null);
	const { value: menuValue } = useMenuContext();
	const { value } = useRootContext();

	useIsomorphicLayoutEffect(() => {
		if (triggerRef.current) {
			const augRef = triggerRef.current as unknown as HTMLDivElement;
			augRef.dataset.state = value && menuValue === value ? "open" : "closed";
		}
	}, [value && menuValue]);

	useIsomorphicLayoutEffect(() => {
		if (triggerRef.current) {
			const augRef = triggerRef.current as unknown as HTMLDivElement;
			if (disabled) {
				augRef.dataset.disabled = "true";
			} else {
				augRef.dataset.disabled = undefined;
			}
		}
	}, [disabled]);

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Menubar.Trigger disabled={disabled ?? undefined} asChild>
			<Component disabled={disabled} {...props} />
		</Menubar.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<Menubar.Portal forceMount={forceMount} container={container}>
			{children}
		</Menubar.Portal>
	);
}

export function Overlay({ asChild, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

const MenubarContentContext = React.createContext<{
	close: () => void;
} | null>(null);

export function Content({
	asChild = false,
	forceMount,
	align,
	side,
	sideOffset,
	alignOffset = 0,
	avoidCollisions = true,
	insets,
	loop,
	onCloseAutoFocus,
	onEscapeKeyDown,
	onPointerDownOutside,
	onFocusOutside,
	onInteractOutside,
	collisionBoundary,
	sticky,
	hideWhenDetached,
	...props
}: ContentProps) {
	const itemRef = React.useRef<HTMLDivElement>(null);

	function close() {
		itemRef.current?.click();
	}

	const Component = asChild ? Slot.View : View;
	return (
		<MenubarContentContext.Provider value={{ close }}>
			<Menubar.Content
				forceMount={forceMount}
				alignOffset={alignOffset}
				avoidCollisions={avoidCollisions}
				collisionPadding={insets}
				loop={loop}
				onCloseAutoFocus={onCloseAutoFocus}
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
				<Menubar.Item
					ref={itemRef}
					aria-hidden
					style={{ position: "fixed", top: 0, left: 0, zIndex: -999999999 }}
					aria-disabled
					tabIndex={-1}
					hidden
				/>
			</Menubar.Content>
		</MenubarContentContext.Provider>
	);
}

export function useMenubarContentContext() {
	const context = React.useContext(MenubarContentContext);
	if (!context) {
		throw new Error(
			"MenubarContent compound components cannot be rendered outside the MenubarContent component",
		);
	}
	return context;
}

export function Item({
	asChild,
	textValue,
	closeOnPress = true,
	onPress: onPressProp,
	onKeyDown: onKeyDownProp,
	...props
}: ItemProps) {
	const { close } = useMenubarContentContext();

	function onKeyDown(ev: React.KeyboardEvent) {
		onKeyDownProp?.(ev);
		if (ev.key === "Enter" || ev.key === " ") {
			onPressProp?.(EmptyGestureResponderEvent);
			if (closeOnPress) {
				close();
			}
		}
	}

	function onPress(ev: GestureResponderEvent) {
		onPressProp?.(ev);
		if (closeOnPress) {
			close();
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Menubar.Item
			textValue={textValue}
			disabled={props.disabled ?? undefined}
			onSelect={closeOnPress ? undefined : onSelected}
			asChild
		>
			<Component
				// @ts-expect-error web only
				onKeyDown={onKeyDown}
				onPress={onPress}
				{...props}
			/>
		</Menubar.Item>
	);
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Menubar.Group asChild>
			<Component {...props} />
		</Menubar.Group>
	);
}

export function Label({ asChild, ...props }: LabelProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<Menubar.Label asChild>
			<Component {...props} />
		</Menubar.Label>
	);
}

export function CheckboxItem({
	asChild,
	checked,
	onCheckedChange,
	textValue,
	disabled = false,
	closeOnPress = true,
	onPress: onPressProp,
	onKeyDown: onKeyDownProp,
	...props
}: CheckboxItemProps) {
	function onKeyDown(ev: React.KeyboardEvent) {
		onKeyDownProp?.(ev);
		if (ev.key === "Enter" || ev.key === " ") {
			onPressProp?.(EmptyGestureResponderEvent);
			onCheckedChange?.(!checked);
			if (closeOnPress) {
				close();
			}
		}
	}

	function onPress(ev: GestureResponderEvent) {
		onPressProp?.(ev);
		onCheckedChange?.(!checked);
		if (closeOnPress) {
			close();
		}
	}
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Menubar.CheckboxItem
			textValue={textValue}
			checked={checked}
			onCheckedChange={onCheckedChange}
			onSelect={closeOnPress ? undefined : onSelected}
			disabled={disabled ?? undefined}
			asChild
		>
			<Component
				// @ts-expect-error web only
				onKeyDown={onKeyDown}
				onPress={onPress}
				role="button"
				{...props}
			/>
		</Menubar.CheckboxItem>
	);
}

const MenubarRadioGroupContext = React.createContext<{
	value?: string;
	onValueChange?: (value: string) => void;
} | null>(null);

export function RadioGroup({
	asChild,
	value,
	onValueChange,
	...props
}: RadioGroupProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<MenubarRadioGroupContext.Provider value={{ value, onValueChange }}>
			<Menubar.RadioGroup value={value} onValueChange={onValueChange} asChild>
				<Component {...props} />
			</Menubar.RadioGroup>
		</MenubarRadioGroupContext.Provider>
	);
}

export function useMenubarRadioGroupContext() {
	const context = React.useContext(MenubarRadioGroupContext);
	if (!context) {
		throw new Error(
			"MenubarRadioGroup compound components cannot be rendered outside the MenubarRadioGroup component",
		);
	}
	return context;
}

export function RadioItem({
	asChild,
	value,
	textValue,
	closeOnPress = true,
	onPress: onPressProp,
	onKeyDown: onKeyDownProp,
	...props
}: RadioItemProps) {
	const { onValueChange } = useMenubarRadioGroupContext();
	const { close } = useMenubarContentContext();

	function onKeyDown(ev: React.KeyboardEvent) {
		onKeyDownProp?.(ev);
		if (ev.key === "Enter" || ev.key === " ") {
			onValueChange?.(value);
			onPressProp?.(EmptyGestureResponderEvent);
			if (closeOnPress) {
				close();
			}
		}
	}

	function onPress(ev: GestureResponderEvent) {
		onValueChange?.(value);
		onPressProp?.(ev);
		if (closeOnPress) {
			close();
		}
	}
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Menubar.RadioItem
			value={value}
			textValue={textValue}
			disabled={props.disabled ?? undefined}
			onSelect={closeOnPress ? undefined : onSelected}
			asChild
		>
			<Component
				// @ts-expect-error web only
				onKeyDown={onKeyDown}
				onPress={onPress}
				{...props}
			/>
		</Menubar.RadioItem>
	);
}

export function ItemIndicator({
	asChild,
	forceMount,
	...props
}: ItemIndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Menubar.ItemIndicator forceMount={forceMount} asChild>
			<Component {...props} />
		</Menubar.ItemIndicator>
	);
}

export function Separator({ asChild, decorative, ...props }: SeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Menubar.Separator asChild>
			<Component {...props} />
		</Menubar.Separator>
	);
}

const MenubarSubContext = React.createContext<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
} | null>(null);

export function Sub({
	asChild,
	defaultOpen,
	open: openProp,
	onOpenChange: onOpenChangeProp,
	...props
}: SubProps) {
	const [open = false, onOpenChange] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen,
		onChange: onOpenChangeProp,
	});
	const Component = asChild ? Slot.View : View;
	return (
		<MenubarSubContext.Provider value={{ open, onOpenChange }}>
			<Menubar.Sub open={open} onOpenChange={onOpenChange}>
				<Component {...props} />
			</Menubar.Sub>
		</MenubarSubContext.Provider>
	);
}

export function useSubContext() {
	const context = React.useContext(MenubarSubContext);
	if (!context) {
		throw new Error(
			"MenubarSub compound components cannot be rendered outside the MenubarSub component",
		);
	}
	return context;
}

export function SubTrigger({
	asChild,
	textValue,
	disabled = false,
	onPress: onPressProp,
	...props
}: SubTriggerProps) {
	const { onOpenChange } = useSubContext();

	function onPress(ev: GestureResponderEvent) {
		onOpenChange(true);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Menubar.SubTrigger
			disabled={disabled ?? undefined}
			textValue={textValue}
			asChild
		>
			<Component onPress={onPress} {...props} />
		</Menubar.SubTrigger>
	);
}

export function SubContent({
	asChild = false,
	forceMount,
	...props
}: SubContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Menubar.Portal>
			<Menubar.SubContent forceMount={forceMount}>
				<Component {...props} />
			</Menubar.SubContent>
		</Menubar.Portal>
	);
}

function onSelected(ev: Event) {
	ev.preventDefault();
}
