import * as Slot from "@rn-primitives/slot";
import type {
	PressableRef,
	SlottablePressableProps,
	SlottableViewProps,
	ViewRef,
} from "@rn-primitives/types";
import { Pressable, View } from "react-native";

export type RootProps = SlottableViewProps;
export type RootRef = ViewRef;

export function Root({ asChild, ...props }: RootProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="table" {...props} />;
}

export type HeaderProps = SlottableViewProps;
export type HeaderRef = ViewRef;

export function Header({ asChild, ...props }: HeaderProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="rowheader" {...props} />;
}

export type RowProps = SlottablePressableProps;
export type RowRef = PressableRef;

export function Row({ asChild, ...props }: RowProps) {
	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component role="row" {...props} />;
}

export type HeadProps = SlottableViewProps;
export type HeadRef = ViewRef;

export function Head({ asChild, ...props }: HeadProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="columnheader" {...props} />;
}

export type BodyProps = SlottableViewProps;
export type BodyRef = ViewRef;

export function Body({ asChild, ...props }: BodyProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="rowgroup" {...props} />;
}

export type CellProps = SlottableViewProps;
export type CellRef = ViewRef;

export function Cell({ asChild, ...props }: CellProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="cell" {...props} />;
}

export type FooterProps = SlottableViewProps;
export type FooterRef = ViewRef;

export function Footer({ asChild, ...props }: FooterProps) {
	const Component = asChild ? Slot.View : View;
	return <Component role="rowgroup" {...props} />;
}
