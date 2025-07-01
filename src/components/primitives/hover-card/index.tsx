import { Platform, StyleSheet } from "react-native";
import { cn } from "#utils";
import * as HoverCardPrimitive from "./hover-card";
import type * as HoverCardTypes from "./types";

export const HoverCard = HoverCardPrimitive.Root;

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export function HoverCardContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: HoverCardTypes.ContentProps) {
	return (
		<HoverCardPrimitive.Content
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"z-50 w-64 rounded-md border bg-background-200 p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	);
}

export const HoverCardPortal = HoverCardPrimitive.Portal;

export function HoverCardOverlay({
	className,
	...props
}: HoverCardTypes.OverlayProps) {
	return (
		<HoverCardPrimitive.Overlay
			className={cn(Platform.OS !== "web" ? "absolute inset-0" : "", className)}
			style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
			{...props}
		/>
	);
}
