import { DotsIcon, Text, TextClassContext, WedgeIcon } from "#components";
import { cn } from "#utils";
import * as BreadcrumbPrimitive from "./breadcrumb";
import type * as BreadcrumbTypes from "./types";

export function Breadcrumb({
	className,
	...props
}: BreadcrumbTypes.BreadcrumbProps) {
	return <BreadcrumbPrimitive.Breadcrumb className={className} {...props} />;
}

export function BreadcrumbList({
	className,
	...props
}: BreadcrumbTypes.BreadcrumbListProps) {
	return (
		<BreadcrumbPrimitive.BreadcrumbList
			className={cn(
				"flex-row flex-wrap items-center gap-0 break-words text-sm text-foreground-400",
				className,
			)}
			{...props}
		/>
	);
}

export function BreadcrumbItem({
	className,
	...props
}: BreadcrumbTypes.BreadcrumbItemProps) {
	return (
		<BreadcrumbPrimitive.BreadcrumbItem
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

export function BreadcrumbLink({
	className,
	children,
	...props
}: BreadcrumbTypes.BreadcrumbLinkProps) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm text-foreground-400 transition-colors hover:text-foreground">
			<BreadcrumbPrimitive.BreadcrumbLink
				className={cn("transition-colors", className)}
				{...props}
			>
				{wrappedChildren}
			</BreadcrumbPrimitive.BreadcrumbLink>
		</TextClassContext.Provider>
	);
}

export function BreadcrumbPage({
	className,
	...props
}: BreadcrumbTypes.BreadcrumbPageProps) {
	return (
		<BreadcrumbPrimitive.BreadcrumbPage
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	);
}

export function BreadcrumbSeparator({
	children,
	...props
}: BreadcrumbTypes.BreadcrumbSeparatorProps) {
	return (
		<BreadcrumbPrimitive.BreadcrumbSeparator {...props}>
			{children ?? <WedgeIcon variant="right" />}
		</BreadcrumbPrimitive.BreadcrumbSeparator>
	);
}

export function BreadcrumbEllipsis({
	className,
	...props
}: BreadcrumbTypes.BreadcrumbEllipsisProps) {
	return (
		<BreadcrumbPrimitive.BreadcrumbEllipsis
			className={cn("h-9 w-9 items-center justify-center", className)}
			{...props}
		>
			<DotsIcon size="sm" />
			<Text className="sr-only">More</Text>
		</BreadcrumbPrimitive.BreadcrumbEllipsis>
	);
}
