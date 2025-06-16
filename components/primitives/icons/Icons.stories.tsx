import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import type { ComponentType } from "react";
import { Text, View } from "react-native";
import type {
	DirectionalIconProps,
	IconProps,
	IconSize,
	StateIconProps,
} from "../../icons/types";
import { useTheme } from "../../theme/ThemeProvider";

// Direct imports for better performance - organized by category

import { BronzeIcon } from "../../icons/badge/BronzeIcon";
import { BronzeTagIcon } from "../../icons/badge/BronzeTagIcon";
// Badge icons
import { DefaultBadgeIcon } from "../../icons/badge/DefaultBadgeIcon";
import { DefaultIcon } from "../../icons/badge/DefaultIcon";
import { GoldIcon } from "../../icons/badge/GoldIcon";
import { GoldTagIcon } from "../../icons/badge/GoldTagIcon";
import { SilverIcon } from "../../icons/badge/SilverIcon";
import { SilverTagIcon } from "../../icons/badge/SilverTagIcon";

import { AppleIcon } from "../../icons/brand/AppleIcon";
import { ArgentIcon } from "../../icons/brand/ArgentIcon";
import { CartridgeIcon } from "../../icons/brand/CartridgeIcon";
import { ChromeIcon } from "../../icons/brand/ChromeIcon";
import { DiscordIcon } from "../../icons/brand/DiscordIcon";
// Brand icons
import { EthereumIcon } from "../../icons/brand/EthereumIcon";
import { GitHubIcon } from "../../icons/brand/GitHubIcon";
import { MetamaskIcon } from "../../icons/brand/MetamaskIcon";
import { PhantomIcon } from "../../icons/brand/PhantomIcon";
import { SolanaIcon } from "../../icons/brand/SolanaIcon";
import { StarknetIcon } from "../../icons/brand/StarknetIcon";
import { StripeIcon } from "../../icons/brand/StripeIcon";
import { TelegramIcon } from "../../icons/brand/TelegramIcon";
import { TwitterIcon } from "../../icons/brand/TwitterIcon";
import { WalletConnectIcon } from "../../icons/brand/WalletConnectIcon";
import { XIcon } from "../../icons/brand/XIcon";

import { ArrowFromLineIcon } from "../../icons/directional/ArrowFromLineIcon";
// Directional icons
import { ArrowIcon } from "../../icons/directional/ArrowIcon";
import { ArrowToLineIcon } from "../../icons/directional/ArrowToLineIcon";
import { CaratIcon } from "../../icons/directional/CaratIcon";
import { ChevronIcon } from "../../icons/directional/ChevronIcon";
import { WedgeIcon } from "../../icons/directional/WedgeIcon";

import { BellIcon } from "../../icons/state/BellIcon";
import { BoltIcon } from "../../icons/state/BoltIcon";
import { BookIcon } from "../../icons/state/BookIcon";
import { CalendarIcon } from "../../icons/state/CalendarIcon";
import { CheckIcon } from "../../icons/state/CheckIcon";
import { ChestIcon } from "../../icons/state/ChestIcon";
import { ClockIcon } from "../../icons/state/ClockIcon";
import { CloneIcon } from "../../icons/state/CloneIcon";
import { CodeIcon } from "../../icons/state/CodeIcon";
import { CoinsIcon } from "../../icons/state/CoinsIcon";
import { ConnectIcon } from "../../icons/state/ConnectIcon";
import { CreditCardIcon } from "../../icons/state/CreditCardIcon";
import { DesktopIcon } from "../../icons/state/DesktopIcon";
import { DetailsIcon } from "../../icons/state/DetailsIcon";
import { DoveIcon } from "../../icons/state/DoveIcon";
import { EarthIcon } from "../../icons/state/EarthIcon";
import { EyeIcon } from "../../icons/state/EyeIcon";
import { FilterIcon } from "../../icons/state/FilterIcon";
import { GemIcon } from "../../icons/state/GemIcon";
import { GlobeIcon } from "../../icons/state/GlobeIcon";
import { GridIcon } from "../../icons/state/GridIcon";
// State icons
import { InfoIcon } from "../../icons/state/InfoIcon";
import { LaptopIcon } from "../../icons/state/LaptopIcon";
import { LaurelIcon } from "../../icons/state/LaurelIcon";
import { LeaderboardIcon } from "../../icons/state/LeaderboardIcon";
import { MetricsIcon } from "../../icons/state/MetricsIcon";
import { MobileIcon } from "../../icons/state/MobileIcon";
import { MoonIcon } from "../../icons/state/MoonIcon";
import { PaperPlaneIcon } from "../../icons/state/PaperPlaneIcon";
import { PencilIcon } from "../../icons/state/PencilIcon";
import { PlusIcon } from "../../icons/state/PlusIcon";
import { PulseIcon } from "../../icons/state/PulseIcon";
import { ScrollIcon } from "../../icons/state/ScrollIcon";
import { ShapesIcon } from "../../icons/state/ShapesIcon";
import { ShieldIcon } from "../../icons/state/ShieldIcon";
import { ShoppingCartIcon } from "../../icons/state/ShoppingCartIcon";
import { SparklesIcon } from "../../icons/state/SparklesIcon";
import { SunIcon } from "../../icons/state/SunIcon";
import { TagIcon } from "../../icons/state/TagIcon";
import { TerminalIcon } from "../../icons/state/TerminalIcon";
import { TrackIcon } from "../../icons/state/TrackIcon";
import { TrophyIcon } from "../../icons/state/TrophyIcon";
import { UserAddIcon } from "../../icons/state/UserAddIcon";
import { UserCheckIcon } from "../../icons/state/UserCheckIcon";
import { UserIcon } from "../../icons/state/UserIcon";
import { UsersIcon } from "../../icons/state/UsersIcon";
import { WalletIcon } from "../../icons/state/WalletIcon";
import { WandIcon } from "../../icons/state/WandIcon";
import { WarningIcon } from "../../icons/state/WarningIcon";
import { WrenchIcon } from "../../icons/state/WrenchIcon";

// Utility icons in the exact order from UI package
import { AlertIcon } from "../../icons/utility/AlertIcon";
import { ArrowTurnDownIcon } from "../../icons/utility/ArrowTurnDownIcon";
import { AwardIcon } from "../../icons/utility/AwardIcon";
import { AwardSimpleIcon } from "../../icons/utility/AwardSimpleIcon";
import { BranchIcon } from "../../icons/utility/BranchIcon";
import { CheckIcon as UtilityCheckIcon } from "../../icons/utility/CheckIcon";
import { CheckboxCheckedIcon } from "../../icons/utility/CheckboxCheckedIcon";
import { CheckboxUncheckedIcon } from "../../icons/utility/CheckboxUncheckedIcon";
import { ChessIcon } from "../../icons/utility/ChessIcon";
import { CircleCheckIcon } from "../../icons/utility/CircleCheckIcon";
import { CircleIcon } from "../../icons/utility/CircleIcon";
import { CircleNoCheckIcon } from "../../icons/utility/CircleNoCheckIcon";
import { CopyIcon } from "../../icons/utility/CopyIcon";
import { DeployerIcon } from "../../icons/utility/DeployerIcon";
import { DollarIcon } from "../../icons/utility/DollarIcon";
import { DotsIcon } from "../../icons/utility/DotsIcon";
import { DoubleWedgeIcon } from "../../icons/utility/DoubleWedgeIcon";
import { EmptyStateAchievementIcon } from "../../icons/utility/EmptyStateAchievementIcon";
import { EmptyStateActivityIcon } from "../../icons/utility/EmptyStateActivityIcon";
import { EmptyStateGuildIcon } from "../../icons/utility/EmptyStateGuildIcon";
import { EmptyStateIcon } from "../../icons/utility/EmptyStateIcon";
import { EmptyStateInventoryIcon } from "../../icons/utility/EmptyStateInventoryIcon";
import { EmptyStateLeaderboardIcon } from "../../icons/utility/EmptyStateLeaderboardIcon";
import { ExternalIcon } from "../../icons/utility/ExternalIcon";
import { FnIcon } from "../../icons/utility/FnIcon";
import { FullscreenIcon } from "../../icons/utility/FullscreenIcon";
import { GearIcon } from "../../icons/utility/GearIcon";
import { GiftIcon } from "../../icons/utility/GiftIcon";
import { HamburgerIcon } from "../../icons/utility/HamburgerIcon";
import { InfoIcon as UtilityInfoIcon } from "../../icons/utility/InfoIcon";
import { L3Icon } from "../../icons/utility/L3Icon";
import { LockIcon } from "../../icons/utility/LockIcon";
import { MagnifyingGlassIcon } from "../../icons/utility/MagnifyingGlassIcon";
import { MinusIcon } from "../../icons/utility/MinusIcon";
import { MirrorWedgeIcon } from "../../icons/utility/MirrorWedgeIcon";
import { MysteryIcon } from "../../icons/utility/MysteryIcon";
import { PacmanIcon } from "../../icons/utility/PacmanIcon";
import { PlayIcon } from "../../icons/utility/PlayIcon";
import { QuestionIcon } from "../../icons/utility/QuestionIcon";
import { RibbonIcon } from "../../icons/utility/RibbonIcon";
import { RobotIcon } from "../../icons/utility/RobotIcon";
import { ScanQRIcon } from "../../icons/utility/ScanQRIcon";
import { ScanSelfIcon } from "../../icons/utility/ScanSelfIcon";
import { SearchIcon } from "../../icons/utility/SearchIcon";
import { SignOutIcon } from "../../icons/utility/SignOutIcon";
import { SlashIcon } from "../../icons/utility/SlashIcon";
import { SliderIcon } from "../../icons/utility/SliderIcon";
import { SpiderWebIcon } from "../../icons/utility/SpiderWebIcon";
import { SpinnerIcon } from "../../icons/utility/SpinnerIcon";
import { SpinnerPixelIcon } from "../../icons/utility/SpinnerPixelIcon";
import { TimesCircleIcon } from "../../icons/utility/TimesCircleIcon";
import { TimesIcon } from "../../icons/utility/TimesIcon";
import { TouchIcon } from "../../icons/utility/TouchIcon";
import { TransferIcon } from "../../icons/utility/TransferIcon";
import { TrashIcon } from "../../icons/utility/TrashIcon";
import { VerifiedIcon } from "../../icons/utility/VerifiedIcon";
import { WarningIcon as UtilityWarningIcon } from "../../icons/utility/WarningIcon";
import { WebsiteIcon } from "../../icons/utility/WebsiteIcon";

const iconsByCategory = {
	badge: [
		{ name: "DefaultBadgeIcon", component: DefaultBadgeIcon },
		{ name: "BronzeIcon", component: BronzeIcon },
		{ name: "SilverIcon", component: SilverIcon },
		{ name: "GoldIcon", component: GoldIcon },
		{ name: "BronzeTagIcon", component: BronzeTagIcon },
		{ name: "SilverTagIcon", component: SilverTagIcon },
		{ name: "GoldTagIcon", component: GoldTagIcon },
		{ name: "DefaultIcon", component: DefaultIcon },
	],
	brand: [
		{ name: "EthereumIcon", component: EthereumIcon },
		{ name: "StarknetIcon", component: StarknetIcon },
		{ name: "GitHubIcon", component: GitHubIcon },
		{ name: "DiscordIcon", component: DiscordIcon },
		{ name: "XIcon", component: XIcon },
		{ name: "TelegramIcon", component: TelegramIcon },
		{ name: "MetamaskIcon", component: MetamaskIcon },
		{ name: "PhantomIcon", component: PhantomIcon },
		{ name: "WalletConnectIcon", component: WalletConnectIcon },
		{ name: "SolanaIcon", component: SolanaIcon },
		{ name: "TwitterIcon", component: TwitterIcon },
		{ name: "AppleIcon", component: AppleIcon },
		{ name: "CartridgeIcon", component: CartridgeIcon },
		{ name: "StripeIcon", component: StripeIcon },
		{ name: "ChromeIcon", component: ChromeIcon },
		{ name: "ArgentIcon", component: ArgentIcon },
	],
	directional: [
		{ name: "ArrowIcon", component: ArrowIcon },
		{ name: "ChevronIcon", component: ChevronIcon },
		{ name: "CaratIcon", component: CaratIcon },
		{ name: "WedgeIcon", component: WedgeIcon },
		{ name: "ArrowFromLineIcon", component: ArrowFromLineIcon },
		{ name: "ArrowToLineIcon", component: ArrowToLineIcon },
	],
	state: [
		{ name: "InfoIcon", component: InfoIcon },
		{ name: "WarningIcon", component: WarningIcon },
		{ name: "CheckIcon", component: CheckIcon },
		{ name: "PlusIcon", component: PlusIcon },
		{ name: "PencilIcon", component: PencilIcon },
		{ name: "TagIcon", component: TagIcon },
		{ name: "SunIcon", component: SunIcon },
		{ name: "MoonIcon", component: MoonIcon },
		{ name: "TerminalIcon", component: TerminalIcon },
		{ name: "MobileIcon", component: MobileIcon },
		{ name: "DesktopIcon", component: DesktopIcon },
		{ name: "LaptopIcon", component: LaptopIcon },
		{ name: "UserIcon", component: UserIcon },
		{ name: "WalletIcon", component: WalletIcon },
		{ name: "BellIcon", component: BellIcon },
		{ name: "ClockIcon", component: ClockIcon },
		{ name: "EyeIcon", component: EyeIcon },
		{ name: "CalendarIcon", component: CalendarIcon },
		{ name: "FilterIcon", component: FilterIcon },
		{ name: "GridIcon", component: GridIcon },
		{ name: "WrenchIcon", component: WrenchIcon },
		{ name: "BoltIcon", component: BoltIcon },
		{ name: "BookIcon", component: BookIcon },
		{ name: "CodeIcon", component: CodeIcon },
		{ name: "ChestIcon", component: ChestIcon },
		{ name: "CloneIcon", component: CloneIcon },
		{ name: "GemIcon", component: GemIcon },
		{ name: "ShieldIcon", component: ShieldIcon },
		{ name: "CoinsIcon", component: CoinsIcon },
		{ name: "TrophyIcon", component: TrophyIcon },
		{ name: "SparklesIcon", component: SparklesIcon },
		{ name: "UsersIcon", component: UsersIcon },
		{ name: "GlobeIcon", component: GlobeIcon },
		{ name: "WandIcon", component: WandIcon },
		{ name: "PaperPlaneIcon", component: PaperPlaneIcon },
		{ name: "PulseIcon", component: PulseIcon },
		{ name: "ScrollIcon", component: ScrollIcon },
		{ name: "ShapesIcon", component: ShapesIcon },
		{ name: "TrackIcon", component: TrackIcon },
		{ name: "ShoppingCartIcon", component: ShoppingCartIcon },
		{ name: "LeaderboardIcon", component: LeaderboardIcon },
		{ name: "MetricsIcon", component: MetricsIcon },
		{ name: "ConnectIcon", component: ConnectIcon },
		{ name: "DoveIcon", component: DoveIcon },
		{ name: "CreditCardIcon", component: CreditCardIcon },
		{ name: "DetailsIcon", component: DetailsIcon },
		{ name: "EarthIcon", component: EarthIcon },
		{ name: "LaurelIcon", component: LaurelIcon },
		{ name: "UserAddIcon", component: UserAddIcon },
		{ name: "UserCheckIcon", component: UserCheckIcon },
	],
	utility: [
		// Utility icons in the exact order from UI package
		{ name: "AlertIcon", component: AlertIcon },
		{ name: "ArrowTurnDownIcon", component: ArrowTurnDownIcon },
		{ name: "AwardIcon", component: AwardIcon },
		{ name: "AwardSimpleIcon", component: AwardSimpleIcon },
		{ name: "BranchIcon", component: BranchIcon },
		{ name: "CheckIcon", component: UtilityCheckIcon },
		{ name: "CheckboxCheckedIcon", component: CheckboxCheckedIcon },
		{ name: "CheckboxUncheckedIcon", component: CheckboxUncheckedIcon },
		{ name: "ChessIcon", component: ChessIcon },
		{ name: "CircleCheckIcon", component: CircleCheckIcon },
		{ name: "CircleNoCheckIcon", component: CircleNoCheckIcon },
		{ name: "CircleIcon", component: CircleIcon },
		{ name: "FnIcon", component: FnIcon },
		{ name: "CopyIcon", component: CopyIcon },
		{ name: "DeployerIcon", component: DeployerIcon },
		{ name: "DollarIcon", component: DollarIcon },
		{ name: "DotsIcon", component: DotsIcon },
		{ name: "DoubleWedgeIcon", component: DoubleWedgeIcon },
		{ name: "EmptyStateAchievementIcon", component: EmptyStateAchievementIcon },
		{ name: "EmptyStateActivityIcon", component: EmptyStateActivityIcon },
		{ name: "EmptyStateGuildIcon", component: EmptyStateGuildIcon },
		{ name: "EmptyStateInventoryIcon", component: EmptyStateInventoryIcon },
		{ name: "EmptyStateLeaderboardIcon", component: EmptyStateLeaderboardIcon },
		{ name: "EmptyStateIcon", component: EmptyStateIcon },
		{ name: "ExternalIcon", component: ExternalIcon },
		{ name: "TouchIcon", component: TouchIcon },
		{ name: "FullscreenIcon", component: FullscreenIcon },
		{ name: "GearIcon", component: GearIcon },
		{ name: "GiftIcon", component: GiftIcon },
		{ name: "HamburgerIcon", component: HamburgerIcon },
		{ name: "InfoIcon", component: UtilityInfoIcon },
		{ name: "L3Icon", component: L3Icon },
		{ name: "LockIcon", component: LockIcon },
		{ name: "MagnifyingGlassIcon", component: MagnifyingGlassIcon },
		{ name: "MinusIcon", component: MinusIcon },
		{ name: "MirrorWedgeIcon", component: MirrorWedgeIcon },
		{ name: "MysteryIcon", component: MysteryIcon },
		{ name: "PacmanIcon", component: PacmanIcon },
		{ name: "PlayIcon", component: PlayIcon },
		{ name: "QuestionIcon", component: QuestionIcon },
		{ name: "RibbonIcon", component: RibbonIcon },
		{ name: "RobotIcon", component: RobotIcon },
		{ name: "ScanQRIcon", component: ScanQRIcon },
		{ name: "ScanSelfIcon", component: ScanSelfIcon },
		{ name: "SearchIcon", component: SearchIcon },
		{ name: "SignOutIcon", component: SignOutIcon },
		{ name: "SlashIcon", component: SlashIcon },
		{ name: "SliderIcon", component: SliderIcon },
		{ name: "SpiderWebIcon", component: SpiderWebIcon },
		{ name: "SpinnerPixelIcon", component: SpinnerPixelIcon },
		{ name: "SpinnerIcon", component: SpinnerIcon },
		{ name: "TimesCircleIcon", component: TimesCircleIcon },
		{ name: "TimesIcon", component: TimesIcon },
		{ name: "TransferIcon", component: TransferIcon },
		{ name: "TrashIcon", component: TrashIcon },
		{ name: "VerifiedIcon", component: VerifiedIcon },
		{ name: "WarningIcon", component: UtilityWarningIcon },
		{ name: "WebsiteIcon", component: WebsiteIcon },
	],
};

const sizeOptions: IconSize[] = [
	"xs",
	"sm",
	"default",
	"lg",
	"xl",
	"2xl",
	"3xl",
];

const meta: Meta<typeof Icons> = {
	title: "Primitives/Icons",
	component: Icons,
	tags: ["autodocs"],
	argTypes: {
		category: {
			control: "select",
			options: Object.keys(iconsByCategory),
		},
		size: {
			control: "radio",
			options: sizeOptions,
			table: {
				defaultValue: { summary: "default" },
			},
		},
		directionalVariant: {
			control: "radio",
			options: ["up", "right", "down", "left"],
			description: "Directional icons only.",
		},
		stateVariant: {
			control: "radio",
			options: ["solid", "line"],
			defaultValue: "solid",
			description: "State icons only.",
			table: {
				defaultValue: { summary: "solid" },
			},
		},
	},
	args: {
		category: "state",
		size: "default",
		directionalVariant: "up",
		stateVariant: "solid",
	},
};

export default meta;

type Story = StoryObj<typeof Icons>;

export const Badge: Story = {
	args: {
		category: "badge",
	},
};

export const Brand: Story = {
	args: {
		category: "brand",
	},
};

export const Directional: Story = {
	args: {
		category: "directional",
	},
};

export const State: Story = {
	args: {
		category: "state",
	},
};

export const Utility: Story = {
	args: {
		category: "utility",
	},
};

function Icons({
	category,
	size = "default",
	directionalVariant = "up",
	stateVariant = "solid",
}: {
	category: keyof typeof iconsByCategory;
	size?: IconProps["size"];
	directionalVariant?: DirectionalIconProps["variant"];
	stateVariant?: StateIconProps["variant"];
}) {
	const { colors } = useTheme();

	const getColumns = () => {
		const iconCount = iconsByCategory[category].length;
		if (iconCount <= 6) return 3;
		if (iconCount <= 12) return 4;
		return 6;
	};

	const columns = getColumns();
	const iconEntries = iconsByCategory[category];

	if (!iconEntries || iconEntries.length === 0) {
		return (
			<View style={{ padding: 16, alignItems: "center" }}>
				<Text style={{ color: colors.foreground[400] }}>
					No icons found in this category.
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				gap: 8,
				padding: 16,
			}}
		>
			{iconEntries.map(({ name, component: IconComponent }) => (
				<View
					key={name}
					style={{
						borderWidth: 1,
						borderColor: colors.border,
						borderRadius: 8,
						flexDirection: "column",
						alignItems: "center",
						paddingVertical: 16,
						paddingHorizontal: 8,
						gap: 8,
						width: `${100 / columns - 2}%`,
						minHeight: 80,
						overflow: "hidden",
					}}
				>
					{(() => {
						try {
							switch (category) {
								case "directional": {
									const DirectionalIcon =
										IconComponent as ComponentType<DirectionalIconProps>;
									return (
										<DirectionalIcon size={size} variant={directionalVariant} />
									);
								}
								case "state": {
									const StateIcon =
										IconComponent as ComponentType<StateIconProps>;
									return <StateIcon size={size} variant={stateVariant} />;
								}
								default: {
									const Icon = IconComponent as ComponentType<IconProps>;
									return <Icon size={size} />;
								}
							}
						} catch (err) {
							console.warn(`Error rendering icon ${name}:`, err);
							return (
								<Text style={{ color: colors.destructive[500], fontSize: 10 }}>
									Error
								</Text>
							);
						}
					})()}
					<Text
						style={{
							fontSize: 10,
							color: colors.foreground[400],
							textAlign: "center",
							lineHeight: 12,
						}}
					>
						{name}
					</Text>
				</View>
			))}
		</View>
	);
}
