import * as Accordion from "@radix-ui/react-accordion";
import {
	useControllableState,
	useIsomorphicLayoutEffect,
} from "@rn-primitives/hooks";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Pressable, View } from "react-native";
import type {
	ContentProps,
	HeaderProps,
	ItemProps,
	RootProps,
	TriggerProps,
} from "./types";

const AccordionContext = React.createContext<RootProps | null>(null);

export function Root({
	asChild,
	value: valueProp,
	onValueChange: onValueChangeProps,
	defaultValue,
	type,
	disabled,
	dir,
	orientation = "vertical",
	collapsible,
	...props
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
			value={
				{
					value,
					onValueChange,
					type,
					disabled,
					dir,
					orientation,
				} as RootProps
			}
		>
			<Accordion.Root
				asChild
				// biome-ignore lint/suspicious/noExplicitAny: Radix UI requires complex type unions
				value={value as any}
				// biome-ignore lint/suspicious/noExplicitAny: Radix UI requires complex type unions
				onValueChange={onValueChange as any}
				// biome-ignore lint/suspicious/noExplicitAny: Radix UI requires complex type unions
				type={type as any}
				disabled={disabled}
				dir={dir}
				orientation={orientation}
				collapsible={collapsible}
			>
				<Component {...props} />
			</Accordion.Root>
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

const AccordionItemContext = React.createContext<
	(ItemProps & { isExpanded: boolean }) | null
>(null);

export function Item({
	asChild,
	value: itemValue,
	disabled,
	...props
}: ItemProps) {
	const ref = React.useRef<View>(null);
	const { value, orientation, disabled: disabledRoot } = useRootContext();

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			const isExpanded = Array.isArray(value)
				? value.includes(itemValue)
				: value === itemValue;
			augRef.dataset.state = isExpanded ? "open" : "closed";
		}
	}, [value, itemValue]);

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			augRef.dataset.orientation = orientation;
			if (disabled || disabledRoot) {
				augRef.dataset.disabled = "true";
			} else {
				augRef.dataset.disabled = undefined;
			}
		}
	}, [orientation, disabled, disabledRoot]);

	const Component = asChild ? Slot.View : View;
	return (
		<AccordionItemContext.Provider
			value={{
				value: itemValue,
				disabled,
				isExpanded: isItemExpanded(value, itemValue),
			}}
		>
			<Accordion.Item value={itemValue} disabled={disabled} asChild>
				<Component ref={ref} {...props} />
			</Accordion.Item>
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
	const ref = React.useRef<View>(null);
	const { disabled, isExpanded } = useItemContext();
	const { orientation, disabled: disabledRoot } = useRootContext();

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			augRef.dataset.state = isExpanded ? "open" : "closed";
		}
	}, [isExpanded]);

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			augRef.dataset.orientation = orientation;
			if (disabled || disabledRoot) {
				augRef.dataset.disabled = "true";
			} else {
				augRef.dataset.disabled = undefined;
			}
		}
	}, [orientation, disabled, disabledRoot]);

	const Component = asChild ? Slot.View : View;
	return (
		<Accordion.Header asChild>
			<Component ref={ref} {...props} />
		</Accordion.Header>
	);
}

const HIDDEN_STYLE: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: -999999,
	opacity: 0,
};

export function Trigger({
	asChild,
	disabled: disabledProp,
	...props
}: TriggerProps) {
	const { disabled: disabledRoot } = useRootContext();
	const { disabled, isExpanded } = useItemContext();
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const ref = React.useRef<View>(null);

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;

			augRef.dataset.state = isExpanded ? "expanded" : "closed";
		}
	}, [isExpanded]);

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;

			if (disabled || disabledRoot || disabledProp) {
				augRef.dataset.disabled = "true";
			} else {
				augRef.dataset.disabled = undefined;
			}
		}
	}, [disabled, disabledRoot, disabledProp]);

	useIsomorphicLayoutEffect(() => {
		if (triggerRef.current) {
			triggerRef.current.disabled = true;
		}
	}, []);

	const isDisabled = disabledProp ?? disabledRoot ?? disabled;
	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<>
			<Accordion.Trigger
				ref={triggerRef}
				aria-hidden
				tabIndex={-1}
				style={HIDDEN_STYLE}
			/>
			<Accordion.Trigger disabled={isDisabled} asChild>
				<Component
					ref={ref}
					role="button"
					disabled={isDisabled}
					{...props}
					onPress={(ev) => {
						if (triggerRef.current && !isDisabled) {
							triggerRef.current.disabled = false;
							triggerRef.current.click();
							triggerRef.current.disabled = true;
						}
						props.onPress?.(ev);
					}}
				/>
			</Accordion.Trigger>
		</>
	);
}

export function Content({ asChild, forceMount, ...props }: ContentProps) {
	const ref = React.useRef<View>(null);

	const { orientation, disabled: disabledRoot } = useRootContext();
	const { disabled, isExpanded } = useItemContext();
	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			augRef.dataset.state = isExpanded ? "expanded" : "closed";
		}
	}, [isExpanded]);

	useIsomorphicLayoutEffect(() => {
		if (ref.current) {
			const augRef = ref.current as unknown as HTMLDivElement;
			augRef.dataset.orientation = orientation;

			if (disabled || disabledRoot) {
				augRef.dataset.disabled = "true";
			} else {
				augRef.dataset.disabled = undefined;
			}
		}
	}, [orientation, disabled, disabledRoot]);

	const Component = asChild ? Slot.View : View;
	return (
		<Accordion.Content forceMount={forceMount} asChild>
			<Component ref={ref} {...props} />
		</Accordion.Content>
	);
}

function isItemExpanded(
	rootValue: string | string[] | undefined,
	value: string,
) {
	return Array.isArray(rootValue)
		? rootValue.includes(value)
		: rootValue === value;
}
