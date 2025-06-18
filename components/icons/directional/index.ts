export * from "./ArrowFromLineIcon";
export * from "./ArrowIcon";
export * from "./ArrowToLineIcon";
export * from "./CaratIcon";
export * from "./ChevronIcon";
export * from "./WedgeIcon";

// Collections for stories
export const directionalIcons = {
	ArrowIcon: () => import("./ArrowIcon").then((m) => m.ArrowIcon),
	ChevronIcon: () => import("./ChevronIcon").then((m) => m.ChevronIcon),
	CaratIcon: () => import("./CaratIcon").then((m) => m.CaratIcon),
	WedgeIcon: () => import("./WedgeIcon").then((m) => m.WedgeIcon),
	ArrowFromLineIcon: () =>
		import("./ArrowFromLineIcon").then((m) => m.ArrowFromLineIcon),
	ArrowToLineIcon: () =>
		import("./ArrowToLineIcon").then((m) => m.ArrowToLineIcon),
};
