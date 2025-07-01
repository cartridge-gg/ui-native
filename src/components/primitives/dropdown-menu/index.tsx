import type * as React from "react";
import {
	Platform,
	type StyleProp,
	StyleSheet,
	type TextProps,
	View,
	type ViewStyle,
} from "react-native";
import { CaratIcon, CheckIcon, Text, TextClassContext } from "#components";
import { cn } from "#utils";
import * as DropdownMenuPrimitive from "./dropdown-menu";
import type {
	CheckboxItemProps,
	ContentProps,
	ItemProps,
	LabelProps,
	RadioItemProps,
	SeparatorProps,
	SubContentProps,
	SubTriggerProps,
} from "./types";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: SubTriggerProps & {
	className?: string;
	inset?: boolean;
	children?: React.ReactNode;
}) {
	const { open } = DropdownMenuPrimitive.useSubContext();
	const iconVariant = Platform.OS === "web" ? "right" : open ? "up" : "down";

	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm text-foreground">
			<DropdownMenuPrimitive.SubTrigger
				className={cn(
					"flex flex-row web:cursor-default web:select-none gap-2 items-center web:focus:bg-background-500 web:hover:bg-background-500 active:bg-background-500 rounded-sm px-2 py-1.5 native:py-2 web:outline-none",
					open && "bg-background-500",
					inset && "pl-8",
					className,
				)}
				{...props}
			>
				{wrappedChildren}
				<CaratIcon
					variant={iconVariant}
					size="sm"
					className="ml-auto text-foreground"
				/>
			</DropdownMenuPrimitive.SubTrigger>
		</TextClassContext.Provider>
	);
}

export function DropdownMenuSubContent({
	className,
	...props
}: SubContentProps & {
	className?: string;
}) {
	const { open } = DropdownMenuPrimitive.useSubContext();
	return (
		<DropdownMenuPrimitive.SubContent
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md mt-1 bg-background-200 text-foreground p-1 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				open
					? "web:animate-in web:fade-in-0 web:zoom-in-95"
					: "web:animate-out web:fade-out-0 web:zoom-out",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuContent({
	className,
	overlayClassName,
	overlayStyle,
	portalHost,
	...props
}: ContentProps & {
	overlayStyle?: StyleProp<ViewStyle>;
	overlayClassName?: string;
	portalHost?: string;
}) {
	const { open } = DropdownMenuPrimitive.useRootContext();
	return (
		<DropdownMenuPrimitive.Portal hostName={portalHost}>
			<DropdownMenuPrimitive.Overlay
				style={
					overlayStyle
						? StyleSheet.flatten([
								Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined,
								overlayStyle as typeof StyleSheet.absoluteFill,
							])
						: Platform.OS !== "web"
							? StyleSheet.absoluteFill
							: undefined
				}
				className={overlayClassName}
			>
				<DropdownMenuPrimitive.Content
					className={cn(
						"z-50 min-w-[8rem] overflow-hidden rounded-md p-1 bg-background-200 text-foreground shadow-md web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2",
						open
							? "web:animate-in web:fade-in-0 web:zoom-in-95"
							: "web:animate-out web:fade-out-0 web:zoom-out-95",
						className,
					)}
					{...props}
				/>
			</DropdownMenuPrimitive.Overlay>
		</DropdownMenuPrimitive.Portal>
	);
}

export function DropdownMenuItem({
	className,
	inset,
	children,
	...props
}: ItemProps & {
	className?: string;
	inset?: boolean;
	children?: React.ReactNode;
}) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm text-foreground web:focus:text-foreground-200">
			<DropdownMenuPrimitive.Item
				className={cn(
					"relative flex flex-row web:cursor-default gap-2 items-center rounded-sm px-2 py-1.5 native:py-2 web:outline-none web:focus:bg-background-500 active:bg-background-500 web:hover:bg-background-500 group",
					inset && "pl-8",
					props.disabled && "opacity-50 web:pointer-events-none",
					className,
				)}
				{...props}
			>
				{wrappedChildren}
			</DropdownMenuPrimitive.Item>
		</TextClassContext.Provider>
	);
}

export function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: CheckboxItemProps & {
	className?: string;
	children?: React.ReactNode;
}) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm text-foreground web:focus:text-foreground-200">
			<DropdownMenuPrimitive.CheckboxItem
				className={cn(
					"relative flex flex-row web:cursor-default items-center web:group rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-background-500 active:bg-background-500 web:focus:text-foreground-200",
					props.disabled && "web:pointer-events-none opacity-50",
					className,
				)}
				checked={checked}
				{...props}
			>
				<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<CheckIcon size="sm" className="text-foreground" />
					</DropdownMenuPrimitive.ItemIndicator>
				</View>
				{wrappedChildren}
			</DropdownMenuPrimitive.CheckboxItem>
		</TextClassContext.Provider>
	);
}

export function DropdownMenuRadioItem({
	className,
	children,
	...props
}: RadioItemProps & {
	className?: string;
	children?: React.ReactNode;
}) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm text-foreground web:focus:text-foreground-200">
			<DropdownMenuPrimitive.RadioItem
				className={cn(
					"relative flex flex-row web:cursor-default web:group items-center rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-background-500 active:bg-background-500 web:focus:text-foreground-200",
					props.disabled && "web:pointer-events-none opacity-50",
					className,
				)}
				{...props}
			>
				<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<View className="bg-foreground h-2 w-2 rounded-full" />
					</DropdownMenuPrimitive.ItemIndicator>
				</View>
				{wrappedChildren}
			</DropdownMenuPrimitive.RadioItem>
		</TextClassContext.Provider>
	);
}

export function DropdownMenuLabel({
	className,
	inset,
	...props
}: LabelProps & {
	className?: string;
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Label
			className={cn(
				"px-2 py-1.5 text-sm font-semibold text-foreground",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({
	className,
	...props
}: SeparatorProps & {
	className?: string;
}) {
	return (
		<DropdownMenuPrimitive.Separator
			className={cn("-mx-1 my-1 h-px bg-background-200", className)}
			{...props}
		/>
	);
}

export function DropdownMenuShortcut({ className, ...props }: TextProps) {
	return (
		<Text
			className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
			{...props}
		/>
	);
}
