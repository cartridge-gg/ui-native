import type * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { CircleCheckIcon, WedgeIcon } from "#components";
import { cn } from "#utils";
import * as SelectPrimitive from "./select";
import type * as SelectTypes from "./types";

export type Option = SelectTypes.Option;

export const Select = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
	ref,
	className,
	children,
	...props
}: SelectTypes.TriggerProps & {
	ref?: React.RefObject<SelectTypes.TriggerRef>;
}) {
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-row items-center justify-between h-9 whitespace-nowrap rounded-md bg-background-200 hover:bg-background-300 px-3 py-2 text-xs font-bold text-foreground focus:outline-none",
				props.disabled && "cursor-not-allowed opacity-50",
				className,
			)}
			{...props}
		>
			{typeof children === "function" ? children({ pressed: false }) : children}
			<WedgeIcon variant="down" className="text-foreground-400" />
		</SelectPrimitive.Trigger>
	);
}

/**
 * Platform: WEB ONLY
 */
export function SelectScrollUpButton({
	className,
	...props
}: SelectTypes.ScrollUpButtonProps) {
	if (Platform.OS !== "web") {
		return null;
	}
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn(
				"flex web:cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<WedgeIcon variant="up" className="text-foreground" />
		</SelectPrimitive.ScrollUpButton>
	);
}

/**
 * Platform: WEB ONLY
 */
export function SelectScrollDownButton({
	className,
	...props
}: SelectTypes.ScrollDownButtonProps) {
	if (Platform.OS !== "web") {
		return null;
	}
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn(
				"flex web:cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<WedgeIcon variant="down" className="text-foreground" />{" "}
		</SelectPrimitive.ScrollDownButton>
	);
}

export function SelectContent({
	className,
	children,
	position = "popper",
	portalHost,
	insets,
	...props
}: SelectTypes.ContentProps & {
	portalHost?: string;
}) {
	const { open } = SelectPrimitive.useRootContext();

	return (
		<SelectPrimitive.Portal hostName={portalHost}>
			<SelectPrimitive.Overlay
				style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
			>
				<Animated.View className="z-50" entering={FadeIn} exiting={FadeOut}>
					<SelectPrimitive.Content
						className={cn(
							"relative z-50 max-h-96 min-w-[8rem] w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden rounded-md bg-background-200 text-foreground font-bold top-1",
							className,
						)}
						position={position}
						{...props}
					>
						<SelectScrollUpButton />
						<SelectPrimitive.Viewport
							className={cn(
								"flex flex-col gap-px",
								position === "popper" &&
									"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
								open
									? "web:zoom-in-95 web:animate-in web:fade-in-0"
									: "web:zoom-out-95 web:animate-out web:fade-out-0",
							)}
						>
							{children}
						</SelectPrimitive.Viewport>
						<SelectScrollDownButton />
					</SelectPrimitive.Content>
				</Animated.View>
			</SelectPrimitive.Overlay>
		</SelectPrimitive.Portal>
	);
}

export function SelectLabel({ className, ...props }: SelectTypes.LabelProps) {
	return (
		<SelectPrimitive.Label
			className={cn(
				"py-1.5 native:pb-2 pl-8 native:pl-10 pr-2 text-foreground text-sm native:text-base font-semibold",
				className,
			)}
			{...props}
		/>
	);
}

export function SelectItem({
	className,
	children,
	...props
}: SelectTypes.ItemProps) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"relative web:group flex flex-row w-full web:cursor-default web:select-none items-center rounded-sm py-1.5 native:py-2 pl-3 pr-8 text-foreground-400 web:hover:bg-background-500 web:focus:bg-background-500 web:focus:text-foreground-200 web:outline-none",
				props.disabled && "web:pointer-events-none opacity-50",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="text-xs text-foreground-400 web:group-focus:text-foreground-200 font-bold" />
			<View className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CircleCheckIcon size="sm" />
				</SelectPrimitive.ItemIndicator>
			</View>
		</SelectPrimitive.Item>
	);
}

export function SelectSeparator({
	className,
	...props
}: SelectTypes.SeparatorProps) {
	return (
		<SelectPrimitive.Separator
			className={cn("-mx-1 my-1 h-px bg-foreground-300", className)}
			{...props}
		/>
	);
}
