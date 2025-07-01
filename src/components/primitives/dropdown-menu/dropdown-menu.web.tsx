import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import { EmptyGestureResponderEvent } from "@rn-primitives/utils";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
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

const DropdownMenuContext = React.createContext<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
} | null>(null);

export function Root({
	asChild,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const [open, setOpen] = React.useState(false);

	function onOpenChange(open: boolean) {
		setOpen(open);
		onOpenChangeProp?.(open);
	}

	const Component = asChild ? Slot.View : View;
	return (
		<DropdownMenuContext.Provider value={{ open, onOpenChange }}>
			<DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
				<Component {...viewProps} />
			</DropdownMenu.Root>
		</DropdownMenuContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(DropdownMenuContext);
	if (!context) {
		throw new Error(
			"DropdownMenu compound components cannot be rendered outside the DropdownMenu component",
		);
	}
	return context;
}

export function Trigger({ asChild, disabled = false, ...props }: TriggerProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<DropdownMenu.Trigger disabled={disabled ?? undefined} asChild>
			<Component {...props} />
		</DropdownMenu.Trigger>
	);
}

export function Portal({ forceMount, container, children }: PortalProps) {
	return (
		<DropdownMenu.Portal forceMount={forceMount} container={container}>
			{children}
		</DropdownMenu.Portal>
	);
}

export function Overlay({ asChild, ...props }: OverlayProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

const DropdownMenuContentContext = React.createContext<{
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
	loop = true,
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
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<DropdownMenuContentContext.Provider value={{ close }}>
			<DropdownMenu.Content
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
				<DropdownMenu.Item
					ref={itemRef}
					aria-hidden
					style={{ position: "fixed", top: 0, left: 0, zIndex: -999999999 }}
					aria-disabled
					tabIndex={-1}
					hidden
				/>
			</DropdownMenu.Content>
		</DropdownMenuContentContext.Provider>
	);
}

function useDropdownMenuContentContext() {
	const context = React.useContext(DropdownMenuContentContext);
	if (!context) {
		throw new Error(
			"DropdownMenu compound components cannot be rendered outside the DropdownMenu component",
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
	const { close } = useDropdownMenuContentContext();

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
		<DropdownMenu.Item
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
		</DropdownMenu.Item>
	);
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<DropdownMenu.Group asChild>
			<Component {...props} />
		</DropdownMenu.Group>
	);
}

export function Label({ asChild, ...props }: LabelProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<DropdownMenu.Label asChild>
			<Component {...props} />
		</DropdownMenu.Label>
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
	const { close } = useDropdownMenuContentContext();

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
		<DropdownMenu.CheckboxItem
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
		</DropdownMenu.CheckboxItem>
	);
}

const DropdownMenuRadioGroupContext = React.createContext<{
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
		<DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
			<DropdownMenu.RadioGroup
				value={value}
				onValueChange={onValueChange}
				asChild
			>
				<Component {...props} />
			</DropdownMenu.RadioGroup>
		</DropdownMenuRadioGroupContext.Provider>
	);
}

function useDropdownMenuRadioGroupContext() {
	const context = React.useContext(DropdownMenuRadioGroupContext);
	if (!context) {
		throw new Error(
			"DropdownMenuRadioGroup compound components cannot be rendered outside the DropdownMenuRadioGroup component",
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
	const { onValueChange } = useDropdownMenuRadioGroupContext();
	const { close } = useDropdownMenuContentContext();

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
		<DropdownMenu.RadioItem
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
		</DropdownMenu.RadioItem>
	);
}

export function ItemIndicator({
	asChild,
	forceMount,
	...props
}: ItemIndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<DropdownMenu.ItemIndicator forceMount={forceMount} asChild>
			<Component {...props} />
		</DropdownMenu.ItemIndicator>
	);
}

export function Separator({ asChild, decorative, ...props }: SeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<DropdownMenu.Separator asChild>
			<Component {...props} />
		</DropdownMenu.Separator>
	);
}

const DropdownMenuSubContext = React.createContext<{
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
		<DropdownMenuSubContext.Provider value={{ open, onOpenChange }}>
			<DropdownMenu.Sub open={open} onOpenChange={onOpenChange}>
				<Component {...props} />
			</DropdownMenu.Sub>
		</DropdownMenuSubContext.Provider>
	);
}

export function useSubContext() {
	const context = React.useContext(DropdownMenuSubContext);
	if (!context) {
		throw new Error(
			"DropdownMenu compound components cannot be rendered outside the DropdownMenu component",
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
		<DropdownMenu.SubTrigger
			disabled={disabled ?? undefined}
			textValue={textValue}
			asChild
		>
			<Component onPress={onPress} {...props} />
		</DropdownMenu.SubTrigger>
	);
}

export function SubContent({
	asChild = false,
	forceMount,
	...props
}: SubContentProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<DropdownMenu.Portal>
			<DropdownMenu.SubContent forceMount={forceMount}>
				<Component {...props} />
			</DropdownMenu.SubContent>
		</DropdownMenu.Portal>
	);
}

function onSelected(ev: Event) {
	ev.preventDefault();
}
