// Badge icons

export * from "./BronzeIcon";
export * from "./BronzeTagIcon";
export * from "./DefaultBadgeIcon";
export * from "./DefaultIcon";
export * from "./GoldIcon";
export * from "./GoldTagIcon";
export * from "./SilverIcon";
export * from "./SilverTagIcon";

// Collections for stories
export const badgeIcons = {
	DefaultBadgeIcon: () =>
		import("./DefaultBadgeIcon").then((m) => m.DefaultBadgeIcon),
	BronzeIcon: () => import("./BronzeIcon").then((m) => m.BronzeIcon),
	SilverIcon: () => import("./SilverIcon").then((m) => m.SilverIcon),
	GoldIcon: () => import("./GoldIcon").then((m) => m.GoldIcon),
	BronzeTagIcon: () => import("./BronzeTagIcon").then((m) => m.BronzeTagIcon),
	SilverTagIcon: () => import("./SilverTagIcon").then((m) => m.SilverTagIcon),
	GoldTagIcon: () => import("./GoldTagIcon").then((m) => m.GoldTagIcon),
	DefaultIcon: () => import("./DefaultIcon").then((m) => m.DefaultIcon),
};
