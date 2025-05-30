import React from 'react';
import { View, Text } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import {
  DirectionalIconProps,
  IconProps,
  StateIconProps,
  IconSize,
} from '../../icons/types';
import { useTheme } from '../../theme/ThemeProvider';

// Direct imports for better performance
import { DefaultBadgeIcon } from '../../icons/badge/DefaultBadgeIcon';
import { BronzeIcon } from '../../icons/badge/BronzeIcon';
import { SilverIcon } from '../../icons/badge/SilverIcon';
import { GoldIcon } from '../../icons/badge/GoldIcon';

import { EthereumIcon } from '../../icons/brand/EthereumIcon';
import { StarknetIcon } from '../../icons/brand/StarknetIcon';
import { GitHubIcon } from '../../icons/brand/GitHubIcon';
import { DiscordIcon } from '../../icons/brand/DiscordIcon';
import { XIcon } from '../../icons/brand/XIcon';
import { TelegramIcon } from '../../icons/brand/TelegramIcon';
import { MetamaskIcon } from '../../icons/brand/MetamaskIcon';
import { StripeIcon } from '../../icons/brand/StripeIcon';
import { ChromeIcon } from '../../icons/brand/ChromeIcon';
import { ArgentIcon } from '../../icons/brand/ArgentIcon';

import { ChevronIcon } from '../../icons/directional/ChevronIcon';
import { ArrowIcon } from '../../icons/directional/ArrowIcon';
import { CaratIcon } from '../../icons/directional/CaratIcon';
import { WedgeIcon } from '../../icons/directional/WedgeIcon';
import { ArrowFromLineIcon } from '../../icons/directional/ArrowFromLineIcon';
import { ArrowToLineIcon } from '../../icons/directional/ArrowToLineIcon';

import { InfoIcon } from '../../icons/state/InfoIcon';
import { WarningIcon } from '../../icons/state/WarningIcon';
import { CheckIcon } from '../../icons/state/CheckIcon';
import { PlusIcon } from '../../icons/state/PlusIcon';
import { PencilIcon } from '../../icons/state/PencilIcon';
import { TagIcon } from '../../icons/state/TagIcon';
import { SunIcon } from '../../icons/state/SunIcon';
import { MoonIcon } from '../../icons/state/MoonIcon';
import { TerminalIcon } from '../../icons/state/TerminalIcon';
import { MobileIcon } from '../../icons/state/MobileIcon';
import { DesktopIcon } from '../../icons/state/DesktopIcon';
import { LaptopIcon } from '../../icons/state/LaptopIcon';
import { UserIcon } from '../../icons/state/UserIcon';
import { WalletIcon } from '../../icons/state/WalletIcon';
import { BellIcon } from '../../icons/state/BellIcon';
import { ClockIcon } from '../../icons/state/ClockIcon';
import { EyeIcon } from '../../icons/state/EyeIcon';
import { CalendarIcon } from '../../icons/state/CalendarIcon';
import { FilterIcon } from '../../icons/state/FilterIcon';
import { GridIcon } from '../../icons/state/GridIcon';
import { WrenchIcon } from '../../icons/state/WrenchIcon';
import { BoltIcon } from '../../icons/state/BoltIcon';
import { BookIcon } from '../../icons/state/BookIcon';
import { CodeIcon } from '../../icons/state/CodeIcon';
import { ChestIcon } from '../../icons/state/ChestIcon';
import { CloneIcon } from '../../icons/state/CloneIcon';
import { GemIcon } from '../../icons/state/GemIcon';
import { ShieldIcon } from '../../icons/state/ShieldIcon';
import { CoinsIcon } from '../../icons/state/CoinsIcon';
import { TrophyIcon } from '../../icons/state/TrophyIcon';
import { SparklesIcon } from '../../icons/state/SparklesIcon';
import { UsersIcon } from '../../icons/state/UsersIcon';
import { GlobeIcon } from '../../icons/state/GlobeIcon';
import { WandIcon } from '../../icons/state/WandIcon';
import { PaperPlaneIcon } from '../../icons/state/PaperPlaneIcon';
import { PulseIcon } from '../../icons/state/PulseIcon';
import { ScrollIcon } from '../../icons/state/ScrollIcon';
import { ShapesIcon } from '../../icons/state/ShapesIcon';
import { TrackIcon } from '../../icons/state/TrackIcon';
import { ShoppingCartIcon } from '../../icons/state/ShoppingCartIcon';
import { LeaderboardIcon } from '../../icons/state/LeaderboardIcon';
import { MetricsIcon } from '../../icons/state/MetricsIcon';
import { ConnectIcon } from '../../icons/state/ConnectIcon';
import { DoveIcon } from '../../icons/state/DoveIcon';
import { CreditCardIcon } from '../../icons/state/CreditCardIcon';
import { DetailsIcon } from '../../icons/state/DetailsIcon';
import { EarthIcon } from '../../icons/state/EarthIcon';
import { LaurelIcon } from '../../icons/state/LaurelIcon';
import { UserAddIcon } from '../../icons/state/UserAddIcon';
import { UserCheckIcon } from '../../icons/state/UserCheckIcon';

import { SearchIcon } from '../../icons/utility/SearchIcon';
import { TimesIcon } from '../../icons/utility/TimesIcon';
import { MinusIcon } from '../../icons/utility/MinusIcon';
import { TimesCircleIcon } from '../../icons/utility/TimesCircleIcon';
import { CircleCheckIcon } from '../../icons/utility/CircleCheckIcon';
import { SignOutIcon } from '../../icons/utility/SignOutIcon';
import { TransferIcon } from '../../icons/utility/TransferIcon';
import { SlashIcon } from '../../icons/utility/SlashIcon';
import { ScanQRIcon } from '../../icons/utility/ScanQRIcon';
import { DoubleWedgeIcon } from '../../icons/utility/DoubleWedgeIcon';
import { ArrowTurnDownIcon } from '../../icons/utility/ArrowTurnDownIcon';
import { FnIcon } from '../../icons/utility/FnIcon';
import { SpiderWebIcon } from '../../icons/utility/SpiderWebIcon';
import { ScanSelfIcon } from '../../icons/utility/ScanSelfIcon';
import { CheckboxCheckedIcon } from '../../icons/utility/CheckboxCheckedIcon';
import { CheckboxUncheckedIcon } from '../../icons/utility/CheckboxUncheckedIcon';
import { CircleNoCheckIcon } from '../../icons/utility/CircleNoCheckIcon';
import { L3Icon } from '../../icons/utility/L3Icon';
import { AwardSimpleIcon } from '../../icons/utility/AwardSimpleIcon';
import { SpinnerPixelIcon } from '../../icons/utility/SpinnerPixelIcon';
import { EmptyStateIcon } from '../../icons/utility/EmptyStateIcon';
import { EmptyStateAchievementIcon } from '../../icons/utility/EmptyStateAchievementIcon';
import { EmptyStateActivityIcon } from '../../icons/utility/EmptyStateActivityIcon';
import { EmptyStateInventoryIcon } from '../../icons/utility/EmptyStateInventoryIcon';
import { EmptyStateDiscoverIcon } from '../../icons/utility/EmptyStateDiscoverIcon';
import { EmptyStateGuildIcon } from '../../icons/utility/EmptyStateGuildIcon';
import { EmptyStateLeaderboardIcon } from '../../icons/utility/EmptyStateLeaderboardIcon';
import { CircleIcon } from '../../icons/utility/CircleIcon';
import { DotsIcon } from '../../icons/utility/DotsIcon';
import { LockIcon } from '../../icons/utility/LockIcon';
import { PlayIcon } from '../../icons/utility/PlayIcon';
import { TrashIcon } from '../../icons/utility/TrashIcon';
import { CopyIcon } from '../../icons/utility/CopyIcon';
import { ExternalIcon } from '../../icons/utility/ExternalIcon';
import { GearIcon } from '../../icons/utility/GearIcon';
import { MagnifyingGlassIcon } from '../../icons/utility/MagnifyingGlassIcon';
import { HamburgerIcon } from '../../icons/utility/HamburgerIcon';
import { QuestionIcon } from '../../icons/utility/QuestionIcon';
import { RibbonIcon } from '../../icons/utility/RibbonIcon';
import { RobotIcon } from '../../icons/utility/RobotIcon';
import { MysteryIcon } from '../../icons/utility/MysteryIcon';
import { PacmanIcon } from '../../icons/utility/PacmanIcon';
import { QrCodeIcon } from '../../icons/utility/QrCodeIcon';
import { SliderIcon } from '../../icons/utility/SliderIcon';
import { TouchIcon } from '../../icons/utility/TouchIcon';
import { WebsiteIcon } from '../../icons/utility/WebsiteIcon';
import { MirrorWedgeIcon } from '../../icons/utility/MirrorWedgeIcon';
import { FullscreenIcon } from '../../icons/utility/FullscreenIcon';
import { GiftIcon } from '../../icons/utility/GiftIcon';
import { DollarIcon } from '../../icons/utility/DollarIcon';
import { CreditsIcon } from '../../icons/utility/CreditsIcon';
import { DeployerIcon } from '../../icons/utility/DeployerIcon';
import { BranchIcon } from '../../icons/utility/BranchIcon';
import { ChessIcon } from '../../icons/utility/ChessIcon';
import { AwardIcon } from '../../icons/utility/AwardIcon';
import { CheckIcon as UtilityCheckIcon } from '../../icons/utility/CheckIcon';
import { AlertIcon } from '../../icons/utility/AlertIcon';
import { WarningIcon as UtilityWarningIcon } from '../../icons/utility/WarningIcon';
import { InfoIcon as UtilityInfoIcon } from '../../icons/utility/InfoIcon';

const iconsByCategory = {
  badge: [
    { name: 'DefaultBadgeIcon', component: DefaultBadgeIcon },
    { name: 'BronzeIcon', component: BronzeIcon },
    { name: 'SilverIcon', component: SilverIcon },
    { name: 'GoldIcon', component: GoldIcon },
  ],
  brand: [
    { name: 'EthereumIcon', component: EthereumIcon },
    { name: 'StarknetIcon', component: StarknetIcon },
    { name: 'GitHubIcon', component: GitHubIcon },
    { name: 'DiscordIcon', component: DiscordIcon },
    { name: 'XIcon', component: XIcon },
    { name: 'TelegramIcon', component: TelegramIcon },
    { name: 'MetamaskIcon', component: MetamaskIcon },
    { name: 'StripeIcon', component: StripeIcon },
    { name: 'ChromeIcon', component: ChromeIcon },
    { name: 'ArgentIcon', component: ArgentIcon },
  ],
  'brand-color': [
    // Brand color icons would go here
  ],
  directional: [
    { name: 'ChevronIcon', component: ChevronIcon },
    { name: 'ArrowIcon', component: ArrowIcon },
    { name: 'CaratIcon', component: CaratIcon },
    { name: 'WedgeIcon', component: WedgeIcon },
    { name: 'ArrowFromLineIcon', component: ArrowFromLineIcon },
    { name: 'ArrowToLineIcon', component: ArrowToLineIcon },
  ],
  state: [
    { name: 'InfoIcon', component: InfoIcon },
    { name: 'WarningIcon', component: WarningIcon },
    { name: 'CheckIcon', component: CheckIcon },
    { name: 'PlusIcon', component: PlusIcon },
    { name: 'PencilIcon', component: PencilIcon },
    { name: 'TagIcon', component: TagIcon },
    { name: 'SunIcon', component: SunIcon },
    { name: 'MoonIcon', component: MoonIcon },
    { name: 'TerminalIcon', component: TerminalIcon },
    { name: 'MobileIcon', component: MobileIcon },
    { name: 'DesktopIcon', component: DesktopIcon },
    { name: 'LaptopIcon', component: LaptopIcon },
    { name: 'UserIcon', component: UserIcon },
    { name: 'WalletIcon', component: WalletIcon },
    { name: 'BellIcon', component: BellIcon },
    { name: 'ClockIcon', component: ClockIcon },
    { name: 'EyeIcon', component: EyeIcon },
    { name: 'CalendarIcon', component: CalendarIcon },
    { name: 'FilterIcon', component: FilterIcon },
    { name: 'GridIcon', component: GridIcon },
    { name: 'WrenchIcon', component: WrenchIcon },
    { name: 'BoltIcon', component: BoltIcon },
    { name: 'BookIcon', component: BookIcon },
    { name: 'CodeIcon', component: CodeIcon },
    { name: 'ChestIcon', component: ChestIcon },
    { name: 'CloneIcon', component: CloneIcon },
    { name: 'GemIcon', component: GemIcon },
    { name: 'ShieldIcon', component: ShieldIcon },
    { name: 'CoinsIcon', component: CoinsIcon },
    { name: 'TrophyIcon', component: TrophyIcon },
    { name: 'SparklesIcon', component: SparklesIcon },
    { name: 'UsersIcon', component: UsersIcon },
    { name: 'GlobeIcon', component: GlobeIcon },
    { name: 'WandIcon', component: WandIcon },
    { name: 'PaperPlaneIcon', component: PaperPlaneIcon },
    { name: 'PulseIcon', component: PulseIcon },
    { name: 'ScrollIcon', component: ScrollIcon },
    { name: 'ShapesIcon', component: ShapesIcon },
    { name: 'TrackIcon', component: TrackIcon },
    { name: 'ShoppingCartIcon', component: ShoppingCartIcon },
    { name: 'LeaderboardIcon', component: LeaderboardIcon },
    { name: 'MetricsIcon', component: MetricsIcon },
    { name: 'ConnectIcon', component: ConnectIcon },
    { name: 'DoveIcon', component: DoveIcon },
    { name: 'CreditCardIcon', component: CreditCardIcon },
    { name: 'DetailsIcon', component: DetailsIcon },
    { name: 'EarthIcon', component: EarthIcon },
    { name: 'LaurelIcon', component: LaurelIcon },
    { name: 'UserAddIcon', component: UserAddIcon },
    { name: 'UserCheckIcon', component: UserCheckIcon },
  ],
  utility: [
    { name: 'SearchIcon', component: SearchIcon },
    { name: 'TimesIcon', component: TimesIcon },
    { name: 'MinusIcon', component: MinusIcon },
    { name: 'TimesCircleIcon', component: TimesCircleIcon },
    { name: 'CircleCheckIcon', component: CircleCheckIcon },
    { name: 'SignOutIcon', component: SignOutIcon },
    { name: 'TransferIcon', component: TransferIcon },
    { name: 'SlashIcon', component: SlashIcon },
    { name: 'ScanQRIcon', component: ScanQRIcon },
    { name: 'DoubleWedgeIcon', component: DoubleWedgeIcon },
    { name: 'ArrowTurnDownIcon', component: ArrowTurnDownIcon },
    { name: 'FnIcon', component: FnIcon },
    { name: 'SpiderWebIcon', component: SpiderWebIcon },
    { name: 'ScanSelfIcon', component: ScanSelfIcon },
    { name: 'CheckboxCheckedIcon', component: CheckboxCheckedIcon },
    { name: 'CheckboxUncheckedIcon', component: CheckboxUncheckedIcon },
    { name: 'CircleNoCheckIcon', component: CircleNoCheckIcon },
    { name: 'L3Icon', component: L3Icon },
    { name: 'AwardSimpleIcon', component: AwardSimpleIcon },
    { name: 'SpinnerPixelIcon', component: SpinnerPixelIcon },
    { name: 'EmptyStateIcon', component: EmptyStateIcon },
    { name: 'EmptyStateAchievementIcon', component: EmptyStateAchievementIcon },
    { name: 'EmptyStateActivityIcon', component: EmptyStateActivityIcon },
    { name: 'EmptyStateInventoryIcon', component: EmptyStateInventoryIcon },
    { name: 'EmptyStateDiscoverIcon', component: EmptyStateDiscoverIcon },
    { name: 'EmptyStateGuildIcon', component: EmptyStateGuildIcon },
    { name: 'EmptyStateLeaderboardIcon', component: EmptyStateLeaderboardIcon },
    { name: 'CircleIcon', component: CircleIcon },
    { name: 'DotsIcon', component: DotsIcon },
    { name: 'LockIcon', component: LockIcon },
    { name: 'PlayIcon', component: PlayIcon },
    { name: 'TrashIcon', component: TrashIcon },
    { name: 'CopyIcon', component: CopyIcon },
    { name: 'ExternalIcon', component: ExternalIcon },
    { name: 'GearIcon', component: GearIcon },
    { name: 'MagnifyingGlassIcon', component: MagnifyingGlassIcon },
    { name: 'HamburgerIcon', component: HamburgerIcon },
    { name: 'QuestionIcon', component: QuestionIcon },
    { name: 'RibbonIcon', component: RibbonIcon },
    { name: 'RobotIcon', component: RobotIcon },
    { name: 'MysteryIcon', component: MysteryIcon },
    { name: 'PacmanIcon', component: PacmanIcon },
    { name: 'QrCodeIcon', component: QrCodeIcon },
    { name: 'SliderIcon', component: SliderIcon },
    { name: 'TouchIcon', component: TouchIcon },
    { name: 'WebsiteIcon', component: WebsiteIcon },
    { name: 'MirrorWedgeIcon', component: MirrorWedgeIcon },
    { name: 'FullscreenIcon', component: FullscreenIcon },
    { name: 'GiftIcon', component: GiftIcon },
    { name: 'DollarIcon', component: DollarIcon },
    { name: 'CreditsIcon', component: CreditsIcon },
    { name: 'DeployerIcon', component: DeployerIcon },
    { name: 'BranchIcon', component: BranchIcon },
    { name: 'ChessIcon', component: ChessIcon },
    { name: 'AwardIcon', component: AwardIcon },
    { name: 'UtilityCheckIcon', component: UtilityCheckIcon },
    { name: 'AlertIcon', component: AlertIcon },
    { name: 'UtilityWarningIcon', component: UtilityWarningIcon },
    { name: 'UtilityInfoIcon', component: UtilityInfoIcon },
  ],
};

const sizeOptions: IconSize[] = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'];

const meta: Meta<typeof Icons> = {
  title: 'Primitives/Icons',
  component: Icons,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: Object.keys(iconsByCategory),
    },
    size: {
      control: 'radio',
      options: sizeOptions,
    },
    directionalVariant: {
      control: 'radio',
      options: ['up', 'right', 'down', 'left'],
      description: 'Directional icons only.',
    },
    stateVariant: {
      control: 'radio',
      options: ['solid', 'line'],
      description: 'State icons only.',
    },
  },
  args: {
    category: 'state',
    size: 'default',
    directionalVariant: 'up',
    stateVariant: 'solid',
  },
};

export default meta;

type Story = StoryObj<typeof Icons>;

export const Badge: Story = {
  args: {
    category: 'badge',
  },
};

export const Brand: Story = {
  args: {
    category: 'brand',
  },
};

export const BrandColor: Story = {
  args: {
    category: 'brand-color',
  },
};

export const Directional: Story = {
  args: {
    category: 'directional',
  },
};

export const State: Story = {
  args: {
    category: 'state',
  },
};

export const Utility: Story = {
  args: {
    category: 'utility',
  },
};

function Icons({
  category,
  size = 'default',
  directionalVariant = 'up',
  stateVariant = 'solid',
}: {
  category: keyof typeof iconsByCategory;
  size?: IconProps['size'];
  directionalVariant?: DirectionalIconProps['variant'];
  stateVariant?: StateIconProps['variant'];
}) {
  const { colors } = useTheme();

  // Calculate number of columns based on screen width (similar to Tailwind grid)
  const getColumns = () => {
    // Default to 6 columns for md screens, 4 for sm, 3 for base
    return 6;
  };

  const columns = getColumns();
  const iconEntries = iconsByCategory[category];

  if (!iconEntries || iconEntries.length === 0) {
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: colors.foreground[400] }}>No icons found in this category.</Text>
      </View>
    );
  }

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      padding: 0,
    }}>
      {iconEntries.map(({ name, component: IconComponent }) => (
        <View
          key={name}
          style={{
            borderWidth: 1,
            borderColor: colors.background[200],
            borderRadius: 8,
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 8,
            gap: 8,
            width: `${100 / columns - 2}%`,
            minHeight: 80,
            overflow: 'hidden',
          }}
        >
          {(() => {
            try {
              switch (category) {
                case 'directional': {
                  const DirectionalIcon = IconComponent as ComponentType<DirectionalIconProps>;
                  return (
                    <DirectionalIcon size={size} variant={directionalVariant} />
                  );
                }
                case 'state': {
                  const StateIcon = IconComponent as ComponentType<StateIconProps>;
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
          <Text style={{
            fontSize: 10,
            color: colors.foreground[400],
            textAlign: 'center',
            lineHeight: 12,
          }}>
            {name}
          </Text>
        </View>
      ))}
    </View>
  );
} 