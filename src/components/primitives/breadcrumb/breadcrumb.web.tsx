import * as Slot from "@rn-primitives/slot";
import { Pressable, View } from "react-native";
import { Text } from "#components";
import type {
	BreadcrumbEllipsisProps,
	BreadcrumbItemProps,
	BreadcrumbLinkProps,
	BreadcrumbListProps,
	BreadcrumbPageProps,
	BreadcrumbProps,
	BreadcrumbSeparatorProps,
} from "./types";

export function Breadcrumb({ asChild, ...props }: BreadcrumbProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="navigation" aria-label="breadcrumb" {...props} />;
}

export function BreadcrumbList({ asChild, ...props }: BreadcrumbListProps) {
	const Component = asChild ? Slot.View : View;
	return <Component {...props} />;
}

export function BreadcrumbItem({ asChild, ...props }: BreadcrumbItemProps) {
	const Component = asChild ? Slot.View : View;
	return <Component {...props} />;
}

export function BreadcrumbLink({ asChild, ...props }: BreadcrumbLinkProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component {...props} />;
}

export function BreadcrumbPage({ asChild, ...props }: BreadcrumbPageProps) {
	const Component = asChild ? Slot.Text : Text;
	return (
		<Component
			role="link"
			aria-disabled={true}
			aria-current="page"
			{...props}
		/>
	);
}

export function BreadcrumbSeparator({
	asChild,
	children,
	...props
}: BreadcrumbSeparatorProps) {
	const Component = asChild ? Slot.View : View;
	return (
		<Component role="presentation" aria-hidden={true} {...props}>
			{children}
		</Component>
	);
}

export function BreadcrumbEllipsis({
	asChild,
	...props
}: BreadcrumbEllipsisProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="presentation" aria-hidden={true} {...props} />;
}
