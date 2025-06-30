import * as Select from "@radix-ui/react-select";
import { useControllableState } from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Pressable, Text, View } from "react-native";
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

const SelectContext = React.createContext<
	| (SharedRootContext & {
			open: boolean;
			onOpenChange: (open: boolean) => void;
	  })
	| null
>(null);

/**
 * @web Parameter of `onValueChange` has the value of `value` for the `value` and the `label` of the selected Option
 * @ex When an Option with a label of Green Apple, the parameter passed to `onValueChange` is { value: 'green-apple', label: 'green-apple' }
 */
export function Root({
	asChild,
	value: valueProp,
	defaultValue,
	onValueChange: onValueChangeProp,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const [value, onValueChange] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange: onValueChangeProp,
	});
	const [open, setOpen] = React.useState(false);

	function onOpenChange(value: boolean) {
		setOpen(value);
		onOpenChangeProp?.(value);
	}

	function onStrValueChange(val: string) {
		onValueChange({ value: val, label: val });
	}

	const Component = asChild ? Slot.View : View;
	return (
		<SelectContext.Provider
			value={{
				value,
				onValueChange,
				open,
				onOpenChange,
			}}
		>
			<Select.Root
				value={value?.value}
				defaultValue={defaultValue?.value}
				onValueChange={onStrValueChange}
				open={open}
				onOpenChange={onOpenChange}
			>
				<Component {...viewProps} />
			</Select.Root>
		</SelectContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(SelectContext);
	if (!context) {
		throw new Error(
			"Select compound components cannot be rendered outside the Select component",
		);
	}
	return context;
}

export function Trigger({
	asChild,
	role: _role,
	disabled,
	...props
}: TriggerProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Select.Trigger disabled={disabled ?? undefined} asChild>
			<Component role="button" disabled={disabled} {...props} />
		</Select.Trigger>
	);
}

export function Value({
	asChild,
	placeholder,
	children,
	...props
}: ValueProps) {
	return (
		<Slot.Text {...props}>
			<Select.Value placeholder={placeholder}>{children}</Select.Value>
		</Slot.Text>
	);
}

export function Portal({ container, children }: PortalProps) {
	return <Select.Portal container={container}>{children}</Select.Portal>;
}

export function Overlay({
	asChild,
	forceMount,
	children,
	...props
}: OverlayProps) {
	const { open } = useRootContext();

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<>
			{open && <Component {...props} />}
			{children as React.ReactNode}
		</>
	);
}

export function Content({
	asChild = false,
	forceMount: _forceMount,
	align = "start",
	side = "bottom",
	position = "popper",
	sideOffset = 0,
	alignOffset = 0,
	avoidCollisions = true,
	disablePositioningStyle: _disablePositioningStyle,
	onCloseAutoFocus,
	onEscapeKeyDown,
	onInteractOutside: _onInteractOutside,
	onPointerDownOutside,
	...props
}: ContentProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Select.Content
			onCloseAutoFocus={onCloseAutoFocus}
			onEscapeKeyDown={onEscapeKeyDown}
			onPointerDownOutside={onPointerDownOutside}
			align={align}
			side={side}
			sideOffset={sideOffset}
			alignOffset={alignOffset}
			avoidCollisions={avoidCollisions}
			position={position}
		>
			<Component {...props} />
		</Select.Content>
	);
}

const ItemContext = React.createContext<{
	itemValue: string;
	label: string;
} | null>(null);

export function Item({
	asChild,
	closeOnPress = true,
	label,
	value,
	children,
	...props
}: ItemProps) {
	return (
		<ItemContext.Provider value={{ itemValue: value, label: label }}>
			<Slot.Pressable {...props}>
				<Select.Item
					textValue={label}
					value={value}
					disabled={props.disabled ?? undefined}
				>
					{children as React.ReactNode}
				</Select.Item>
			</Slot.Pressable>
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

export function ItemText({
	asChild,
	...props
}: Omit<ItemTextProps, "children">) {
	const { label } = useItemContext();

	const Component = asChild ? Slot.Text : Text;
	return (
		<Select.ItemText asChild>
			<Component {...props}>{label}</Component>
		</Select.ItemText>
	);
}

export function ItemIndicator({
	asChild,
	forceMount: _forceMount,
	...props
}: ItemIndicatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Select.ItemIndicator asChild>
			<Component {...props} />
		</Select.ItemIndicator>
	);
}

export function Group({ asChild, ...props }: GroupProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Select.Group asChild>
			<Component {...props} />
		</Select.Group>
	);
}

export function Label({ asChild, ...props }: LabelProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<Select.Label asChild>
			<Component {...props} />
		</Select.Label>
	);
}

export function Separator({ asChild, decorative, ...props }: SeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Select.Separator asChild>
			<Component {...props} />
		</Select.Separator>
	);
}

export const ScrollUpButton = (props: ScrollUpButtonProps) => {
	return <Select.ScrollUpButton {...props} />;
};

export const ScrollDownButton = (props: ScrollDownButtonProps) => {
	return <Select.ScrollDownButton {...props} />;
};

export const Viewport = (props: ViewportProps) => {
	return <Select.Viewport {...props} />;
};
