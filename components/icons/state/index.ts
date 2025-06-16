export { BellIcon } from "./BellIcon";
export { BookIcon } from "./BookIcon";
export { BoltIcon } from "./BoltIcon";
export { CalendarIcon } from "./CalendarIcon";
export { CheckIcon } from "./CheckIcon";
export { ChestIcon } from "./ChestIcon";
export { ClockIcon } from "./ClockIcon";
export { CodeIcon } from "./CodeIcon";
export { CoinsIcon } from "./CoinsIcon";
export { EyeIcon } from "./EyeIcon";
export { FilterIcon } from "./FilterIcon";
export { GemIcon } from "./GemIcon";
export { GlobeIcon } from "./GlobeIcon";
export { GridIcon } from "./GridIcon";
export { InfoIcon } from "./InfoIcon";
export { JoystickIcon } from "./JoystickIcon";
export { LaptopIcon } from "./LaptopIcon";
export { ListIcon } from "./ListIcon";
export { PlusIcon } from "./PlusIcon";
export { ShieldIcon } from "./ShieldIcon";
export { SwordsIcon } from "./SwordsIcon";
export { UserIcon } from "./UserIcon";
export { WalletIcon } from "./WalletIcon";
export { WarningIcon } from "./WarningIcon";

// Import for collection
import { BellIcon } from "./BellIcon";
import { BoltIcon } from "./BoltIcon";
import { BookIcon } from "./BookIcon";
import { CalendarIcon } from "./CalendarIcon";
import { CheckIcon } from "./CheckIcon";
import { ChestIcon } from "./ChestIcon";
import { ClockIcon } from "./ClockIcon";
import { CodeIcon } from "./CodeIcon";
import { CoinsIcon } from "./CoinsIcon";
import { EyeIcon } from "./EyeIcon";
import { FilterIcon } from "./FilterIcon";
import { GemIcon } from "./GemIcon";
import { GlobeIcon } from "./GlobeIcon";
import { GridIcon } from "./GridIcon";
import { InfoIcon } from "./InfoIcon";
import { JoystickIcon } from "./JoystickIcon";
import { LaptopIcon } from "./LaptopIcon";
import { ListIcon } from "./ListIcon";
import { PlusIcon } from "./PlusIcon";
import { ShieldIcon } from "./ShieldIcon";
import { SwordsIcon } from "./SwordsIcon";
import { UserIcon } from "./UserIcon";
import { WalletIcon } from "./WalletIcon";
import { WarningIcon } from "./WarningIcon";

// Collection export
export const StateIcons = {
	BellIcon,
	BookIcon,
	BoltIcon,
	CalendarIcon,
	CheckIcon,
	ChestIcon,
	ClockIcon,
	CodeIcon,
	CoinsIcon,
	EyeIcon,
	FilterIcon,
	GemIcon,
	GlobeIcon,
	GridIcon,
	InfoIcon,
	JoystickIcon,
	LaptopIcon,
	ListIcon,
	PlusIcon,
	ShieldIcon,
	SwordsIcon,
	UserIcon,
	WalletIcon,
	WarningIcon,
};

// Core state icons
export * from "./InfoIcon";
export * from "./WarningIcon";
export * from "./CheckIcon";
export * from "./PlusIcon";
export * from "./PencilIcon";
export * from "./TagIcon";
export * from "./SunIcon";
export * from "./MoonIcon";
export * from "./TerminalIcon";
export * from "./MobileIcon";
export * from "./DesktopIcon";
export * from "./LaptopIcon";

// Additional state icons
export * from "./UserIcon";
export * from "./WalletIcon";
export * from "./BellIcon";
export * from "./ClockIcon";
export * from "./EyeIcon";
export * from "./CalendarIcon";
export * from "./FilterIcon";
export * from "./GridIcon";
export * from "./WrenchIcon";

// New state icons
export * from "./BoltIcon";
export * from "./BookIcon";
export * from "./CodeIcon";
export * from "./ChestIcon";
export * from "./CloneIcon";
export * from "./GemIcon";
export * from "./ShieldIcon";
export * from "./CoinsIcon";
export * from "./TrophyIcon";
export * from "./SparklesIcon";
export * from "./UsersIcon";

// Latest state icons
export * from "./WandIcon";
export * from "./PaperPlaneIcon";
export * from "./PulseIcon";
export * from "./ScrollIcon";
export * from "./ShapesIcon";
export * from "./TrackIcon";

// Final batch state icons
export * from "./ShoppingCartIcon";
export * from "./LeaderboardIcon";
export * from "./MetricsIcon";
export * from "./ConnectIcon";
export * from "./DoveIcon";

// Completion batch state icons
export * from "./CreditCardIcon";
export * from "./DetailsIcon";
export * from "./EarthIcon";
export * from "./LaurelIcon";
export * from "./UserAddIcon";
export * from "./UserCheckIcon";

// Collections for stories
export const stateIcons = {
	InfoIcon: () => import("./InfoIcon").then((m) => m.InfoIcon),
	WarningIcon: () => import("./WarningIcon").then((m) => m.WarningIcon),
	CheckIcon: () => import("./CheckIcon").then((m) => m.CheckIcon),
	PlusIcon: () => import("./PlusIcon").then((m) => m.PlusIcon),
	PencilIcon: () => import("./PencilIcon").then((m) => m.PencilIcon),
	TagIcon: () => import("./TagIcon").then((m) => m.TagIcon),
	SunIcon: () => import("./SunIcon").then((m) => m.SunIcon),
	MoonIcon: () => import("./MoonIcon").then((m) => m.MoonIcon),
	TerminalIcon: () => import("./TerminalIcon").then((m) => m.TerminalIcon),
	MobileIcon: () => import("./MobileIcon").then((m) => m.MobileIcon),
	DesktopIcon: () => import("./DesktopIcon").then((m) => m.DesktopIcon),
	LaptopIcon: () => import("./LaptopIcon").then((m) => m.LaptopIcon),
	UserIcon: () => import("./UserIcon").then((m) => m.UserIcon),
	WalletIcon: () => import("./WalletIcon").then((m) => m.WalletIcon),
	BellIcon: () => import("./BellIcon").then((m) => m.BellIcon),
	ClockIcon: () => import("./ClockIcon").then((m) => m.ClockIcon),
	EyeIcon: () => import("./EyeIcon").then((m) => m.EyeIcon),
	CalendarIcon: () => import("./CalendarIcon").then((m) => m.CalendarIcon),
	FilterIcon: () => import("./FilterIcon").then((m) => m.FilterIcon),
	GridIcon: () => import("./GridIcon").then((m) => m.GridIcon),
	WrenchIcon: () => import("./WrenchIcon").then((m) => m.WrenchIcon),
	BoltIcon: () => import("./BoltIcon").then((m) => m.BoltIcon),
	BookIcon: () => import("./BookIcon").then((m) => m.BookIcon),
	CodeIcon: () => import("./CodeIcon").then((m) => m.CodeIcon),
	ChestIcon: () => import("./ChestIcon").then((m) => m.ChestIcon),
	CloneIcon: () => import("./CloneIcon").then((m) => m.CloneIcon),
	GemIcon: () => import("./GemIcon").then((m) => m.GemIcon),
	ShieldIcon: () => import("./ShieldIcon").then((m) => m.ShieldIcon),
	CoinsIcon: () => import("./CoinsIcon").then((m) => m.CoinsIcon),
	TrophyIcon: () => import("./TrophyIcon").then((m) => m.TrophyIcon),
	SparklesIcon: () => import("./SparklesIcon").then((m) => m.SparklesIcon),
	UsersIcon: () => import("./UsersIcon").then((m) => m.UsersIcon),
	GlobeIcon: () => import("./GlobeIcon").then((m) => m.GlobeIcon),
	WandIcon: () => import("./WandIcon").then((m) => m.WandIcon),
	PaperPlaneIcon: () =>
		import("./PaperPlaneIcon").then((m) => m.PaperPlaneIcon),
	PulseIcon: () => import("./PulseIcon").then((m) => m.PulseIcon),
	ScrollIcon: () => import("./ScrollIcon").then((m) => m.ScrollIcon),
	ShapesIcon: () => import("./ShapesIcon").then((m) => m.ShapesIcon),
	TrackIcon: () => import("./TrackIcon").then((m) => m.TrackIcon),
	ShoppingCartIcon: () =>
		import("./ShoppingCartIcon").then((m) => m.ShoppingCartIcon),
	LeaderboardIcon: () =>
		import("./LeaderboardIcon").then((m) => m.LeaderboardIcon),
	MetricsIcon: () => import("./MetricsIcon").then((m) => m.MetricsIcon),
	ConnectIcon: () => import("./ConnectIcon").then((m) => m.ConnectIcon),
	DoveIcon: () => import("./DoveIcon").then((m) => m.DoveIcon),
	CreditCardIcon: () =>
		import("./CreditCardIcon").then((m) => m.CreditCardIcon),
	DetailsIcon: () => import("./DetailsIcon").then((m) => m.DetailsIcon),
	EarthIcon: () => import("./EarthIcon").then((m) => m.EarthIcon),
	LaurelIcon: () => import("./LaurelIcon").then((m) => m.LaurelIcon),
	UserAddIcon: () => import("./UserAddIcon").then((m) => m.UserAddIcon),
	UserCheckIcon: () => import("./UserCheckIcon").then((m) => m.UserCheckIcon),
};
