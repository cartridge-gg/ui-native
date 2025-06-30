import type * as React from "react";
import { Platform, Text, type TextProps, View } from "react-native";
import { CheckIcon, TextClassContext, WedgeIcon } from "#components";
import { cn } from "#utils";
import * as MenubarPrimitive from "./menubar";
import type * as MenubarTypes from "./types";

export const MenubarMenu = MenubarPrimitive.Menu;

export const MenubarGroup = MenubarPrimitive.Group;

export const MenubarPortal = MenubarPrimitive.Portal;

export const MenubarSub = MenubarPrimitive.Sub;

export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

export function Menubar({
	className,
	...props
}: MenubarTypes.RootProps & {
	ref?: React.RefObject<MenubarTypes.RootRef>;
}) {
	return (
		<MenubarPrimitive.Root
			className={cn(
				"flex flex-row h-9 native:h-12 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

export function MenubarTrigger({
	className,
	...props
}: MenubarTypes.TriggerProps & {
	ref?: React.RefObject<MenubarTypes.TriggerRef>;
}) {
	const { value } = MenubarPrimitive.useRootContext();
	const { value: itemValue } = MenubarPrimitive.useMenuContext();

	return (
		<MenubarPrimitive.Trigger
			className={cn(
				"flex flex-row web:cursor-default web:select-none items-center rounded-sm px-3 py-1 text-sm native:h-10 native:px-5 native:py-0 font-medium web:outline-none web:focus:bg-background-500 active:bg-background-500 web:focus:text-foreground-200",
				value === itemValue && "bg-background-500 text-foreground-200",
				className,
			)}
			{...props}
		/>
	);
}

export function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: MenubarTypes.SubTriggerProps & {
	ref?: React.RefObject<MenubarTypes.SubTriggerRef>;
	className?: string;
	inset?: boolean;
	children?: React.ReactNode;
}) {
	const { open } = MenubarPrimitive.useSubContext();
	return (
		<TextClassContext.Provider
			value={cn(
				"select-none text-sm native:text-lg text-foreground",
				open && "native:text-foreground-200",
			)}
		>
			<MenubarPrimitive.SubTrigger
				className={cn(
					"flex flex-row web:cursor-default web:select-none items-center gap-2 web:focus:bg-background-500 active:bg-background-500 web:hover:bg-background-500 rounded-sm px-2 py-1.5 native:py-2 web:outline-none",
					open && "bg-background-500",
					inset && "pl-8",
					className,
				)}
				{...props}
			>
				{children}
				<WedgeIcon
					className="ml-auto text-foreground"
					variant={Platform.OS === "web" ? "right" : open ? "up" : "down"}
				/>
			</MenubarPrimitive.SubTrigger>
		</TextClassContext.Provider>
	);
}

export function MenubarSubContent({
	className,
	...props
}: MenubarTypes.SubContentProps & {
	ref?: React.RefObject<MenubarTypes.SubContentRef>;
}) {
	const { open } = MenubarPrimitive.useSubContext();
	return (
		<MenubarPrimitive.SubContent
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border mt-1 bg-background-200 p-1 text-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				open
					? "web:animate-in web:fade-in-0 web:zoom-in-95"
					: "web:animate-out web:fade-out-0 web:zoom-out ",
				className,
			)}
			{...props}
		/>
	);
}

export function MenubarContent({
	className,
	portalHost,
	...props
}: MenubarTypes.ContentProps & {
	ref?: React.RefObject<MenubarTypes.ContentRef>;
	className?: string;
	portalHost?: string;
}) {
	const { value } = MenubarPrimitive.useRootContext();
	const { value: itemValue } = MenubarPrimitive.useMenuContext();
	return (
		<MenubarPrimitive.Portal hostName={portalHost}>
			<MenubarPrimitive.Content
				className={cn(
					"z-50 min-w-[12rem] overflow-hidden rounded-md border bg-background-200 p-1 text-foreground shadow-md",
					value === itemValue
						? "web:animate-in web:fade-in-0 web:zoom-in-95"
						: "web:animate-out web:fade-out-0 web:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	);
}

export function MenubarItem({
	className,
	inset,
	...props
}: MenubarTypes.ItemProps & {
	ref?: React.RefObject<MenubarTypes.ItemRef>;
	className?: string;
	inset?: boolean;
}) {
	return (
		<TextClassContext.Provider value="select-none text-sm native:text-lg text-foreground web:group-focus:text-foreground-200">
			<MenubarPrimitive.Item
				className={cn(
					"relative flex flex-row web:cursor-default items-center gap-2 rounded-sm px-2 py-1.5 native:py-2 web:outline-none web:focus:bg-background-500 active:bg-background-500 web:hover:bg-background-500 group",
					inset && "pl-8",
					props.disabled && "opacity-50 web:pointer-events-none",
					className,
				)}
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export function MenubarCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenubarTypes.CheckboxItemProps & {
	ref?: React.RefObject<MenubarTypes.CheckboxItemRef>;
	children?: React.ReactNode;
}) {
	return (
		<MenubarPrimitive.CheckboxItem
			className={cn(
				"relative flex flex-row web:cursor-default items-center web:group rounded-sm py-1.5 native:py-2 pl-8 pr-2 text-sm web:outline-none web:focus:bg-background-500 active:bg-background-500",
				props.disabled && "web:pointer-events-none opacity-50",
				className,
			)}
			checked={checked}
			{...props}
		>
			<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon strokeWidth={3} className="text-foreground" />
				</MenubarPrimitive.ItemIndicator>
			</View>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
}

export function MenubarRadioItem({
	className,
	children,
	...props
}: MenubarTypes.RadioItemProps & {
	ref?: React.RefObject<MenubarTypes.RadioItemRef>;
	children?: React.ReactNode;
}) {
	return (
		<MenubarPrimitive.RadioItem
			className={cn(
				"relative flex flex-row web:cursor-default web:group items-center rounded-sm py-1.5 native:py-2 pl-8 pr-2 text-sm web:outline-none web:focus:bg-background-500 active:bg-background-500",
				props.disabled && "web:pointer-events-none opacity-50",
				className,
			)}
			{...props}
		>
			<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<View className="bg-foreground h-2 w-2 rounded-full" />
				</MenubarPrimitive.ItemIndicator>
			</View>
			{children}
		</MenubarPrimitive.RadioItem>
	);
}

export function MenubarLabel({
	className,
	inset,
	...props
}: MenubarTypes.LabelProps & {
	ref?: React.RefObject<MenubarTypes.LabelRef>;
	className?: string;
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.Label
			className={cn(
				"px-2 py-1.5 text-sm native:text-base font-semibold text-foreground web:cursor-default",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

export function MenubarSeparator({
	className,
	...props
}: MenubarTypes.SeparatorProps & {
	ref?: React.RefObject<MenubarTypes.SeparatorRef>;
}) {
	return (
		<MenubarPrimitive.Separator
			className={cn("-mx-1 my-1 h-px bg-background-200", className)}
			{...props}
		/>
	);
}

export function MenubarShortcut({ className, ...props }: TextProps) {
	return (
		<Text
			className={cn(
				"ml-auto text-xs native:text-sm tracking-widest text-foreground-400",
				className,
			)}
			{...props}
		/>
	);
}
