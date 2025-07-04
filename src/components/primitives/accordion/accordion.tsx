import { useControllableState } from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import type {
	ContentProps,
	HeaderProps,
	ItemProps,
	RootContext,
	RootProps,
	TriggerProps,
} from "./types";

const AccordionContext = React.createContext<RootContext | null>(null);

export function Root({
	asChild,
	type,
	disabled,
	collapsible = true,
	value: valueProp,
	onValueChange: onValueChangeProps,
	defaultValue,
	...viewProps
}: RootProps) {
	const [value = type === "multiple" ? [] : undefined, onValueChange] =
		useControllableState<(string | undefined) | string[]>({
			prop: valueProp,
			defaultProp: defaultValue,
			onChange: onValueChangeProps as (
				state: string | string[] | undefined,
			) => void,
		});

	const Component = asChild ? Slot.View : View;
	return (
		<AccordionContext.Provider
			value={{
				type,
				disabled,
				collapsible,
				value,
				onValueChange,
			}}
		>
			<Component {...viewProps} />
		</AccordionContext.Provider>
	);
}

export function useRootContext() {
	const context = React.useContext(AccordionContext);
	if (!context) {
		throw new Error(
			"Accordion compound components cannot be rendered outside the Accordion component",
		);
	}
	return context;
}

type AccordionItemContext = ItemProps & {
	nativeID: string;
	isExpanded: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContext | null>(
	null,
);

export function Item({ asChild, value, disabled, ...viewProps }: ItemProps) {
	const { value: rootValue } = useRootContext();
	const nativeID = React.useId();

	const Component = asChild ? Slot.View : View;
	return (
		<AccordionItemContext.Provider
			value={{
				value,
				disabled,
				nativeID,
				isExpanded: isItemExpanded(rootValue, value),
			}}
		>
			<Component {...viewProps} />
		</AccordionItemContext.Provider>
	);
}

export function useItemContext() {
	const context = React.useContext(AccordionItemContext);
	if (!context) {
		throw new Error(
			"AccordionItem compound components cannot be rendered outside the AccordionItem component",
		);
	}
	return context;
}

export function Header({ asChild, ...props }: HeaderProps) {
	const { disabled: rootDisabled } = useRootContext();
	const { disabled: itemDisabled, isExpanded } = useItemContext();

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			role="heading"
			aria-expanded={isExpanded}
			aria-disabled={rootDisabled ?? itemDisabled}
			{...props}
		/>
	);
}

export function Trigger({
	asChild,
	onPress: onPressProp,
	disabled: disabledProp,
	...props
}: TriggerProps) {
	const {
		disabled: rootDisabled,
		type,
		onValueChange,
		value: rootValue,
		collapsible,
	} = useRootContext();
	const {
		nativeID,
		disabled: itemDisabled,
		value,
		isExpanded,
	} = useItemContext();

	function onPress(ev: GestureResponderEvent) {
		if (rootDisabled || itemDisabled) return;
		if (type === "single") {
			const newValue = collapsible
				? value === rootValue
					? undefined
					: value
				: value;
			onValueChange(newValue);
		}
		if (type === "multiple") {
			const rootToArray = toStringArray(rootValue);
			const newValue = collapsible
				? rootToArray.includes(value)
					? rootToArray.filter((val) => val !== value)
					: rootToArray.concat(value)
				: [...new Set(rootToArray.concat(value))];
			// @ts-ignore - `newValue` is of type `string[]` which is OK
			onValueChange(newValue);
		}
		onPressProp?.(ev);
	}

	const isDisabled = disabledProp || rootDisabled || itemDisabled;
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			nativeID={nativeID}
			aria-disabled={isDisabled}
			role="button"
			onPress={onPress}
			accessibilityState={{
				expanded: isExpanded,
				disabled: isDisabled,
			}}
			disabled={isDisabled}
			{...props}
		/>
	);
}

export function Content({ asChild, forceMount, ...props }: ContentProps) {
	const { type } = useRootContext();
	const { nativeID, isExpanded } = useItemContext();

	if (!forceMount) {
		if (!isExpanded) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			aria-hidden={!(forceMount || isExpanded)}
			aria-labelledby={nativeID}
			role={type === "single" ? "region" : "summary"}
			{...props}
		/>
	);
}

function toStringArray(value?: string | string[]) {
	return Array.isArray(value) ? value : value ? [value] : [];
}

function isItemExpanded(
	rootValue: string | string[] | undefined,
	value: string,
) {
	return Array.isArray(rootValue)
		? rootValue.includes(value)
		: rootValue === value;
}
