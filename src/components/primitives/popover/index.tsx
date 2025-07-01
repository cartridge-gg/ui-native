import { Platform, StyleSheet } from "react-native";
import { cn } from "#utils";
import * as PopoverPrimitive from "./popover";
import type * as PopoverTypes from "./types";

export function Popover({ className, ...props }: PopoverTypes.RootProps) {
	return <PopoverPrimitive.Root className={className} {...props} />;
}

export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: PopoverTypes.ContentProps) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-72 rounded-md border bg-background-200 p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

export const PopoverPortal = PopoverPrimitive.Portal;

export function PopoverOverlay({
	className,
	...props
}: PopoverTypes.OverlayProps) {
	return (
		<PopoverPrimitive.Overlay
			className={cn(Platform.OS !== "web" ? "absolute inset-0" : "", className)}
			style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
			{...props}
		/>
	);
}

export const PopoverClose = PopoverPrimitive.Close;
