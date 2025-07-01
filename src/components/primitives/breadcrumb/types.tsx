import type {
	PressableRef,
	SlottablePressableProps,
	SlottableTextProps,
	SlottableViewProps,
	TextRef,
	ViewRef,
} from "@rn-primitives/types";

type BreadcrumbProps = {
	separator?: React.ReactNode;
} & SlottableViewProps;

type BreadcrumbRef = ViewRef;

type BreadcrumbListProps = SlottableViewProps;
type BreadcrumbListRef = ViewRef;

type BreadcrumbItemProps = SlottableViewProps;
type BreadcrumbItemRef = ViewRef;

type BreadcrumbLinkProps = SlottablePressableProps;
type BreadcrumbLinkRef = PressableRef;

type BreadcrumbPageProps = SlottableTextProps;
type BreadcrumbPageRef = TextRef;

type BreadcrumbSeparatorProps = {
	children?: React.ReactNode;
} & SlottableViewProps;
type BreadcrumbSeparatorRef = ViewRef;

type BreadcrumbEllipsisProps = SlottableViewProps;
type BreadcrumbEllipsisRef = ViewRef;

export type {
	BreadcrumbProps,
	BreadcrumbRef,
	BreadcrumbListProps,
	BreadcrumbListRef,
	BreadcrumbItemProps,
	BreadcrumbItemRef,
	BreadcrumbLinkProps,
	BreadcrumbLinkRef,
	BreadcrumbPageProps,
	BreadcrumbPageRef,
	BreadcrumbSeparatorProps,
	BreadcrumbSeparatorRef,
	BreadcrumbEllipsisProps,
	BreadcrumbEllipsisRef,
};
