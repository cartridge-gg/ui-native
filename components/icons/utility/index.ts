// Utility icons in the exact order from UI package
export * from './AlertIcon';
export * from './ArrowTurnDownIcon';
export * from './AwardIcon';
export * from './AwardSimpleIcon';
export * from './BranchIcon';
export * from './CheckIcon';
export * from './CheckboxCheckedIcon';
export * from './CheckboxUncheckedIcon';
export * from './ChessIcon';
export * from './CircleCheckIcon';
export * from './CircleNoCheckIcon';
export * from './CircleIcon';
export * from './FnIcon';
export * from './CopyIcon';
export * from './DeployerIcon';
export * from './DollarIcon';
export * from './DotsIcon';
export * from './DoubleWedgeIcon';
export * from './EmptyStateAchievementIcon';
export * from './EmptyStateActivityIcon';
export * from './EmptyStateGuildIcon';
export * from './EmptyStateInventoryIcon';
export * from './EmptyStateLeaderboardIcon';
export * from './EmptyStateIcon';
export * from './ExternalIcon';
export * from './TouchIcon';
export * from './FullscreenIcon';
export * from './GearIcon';
export * from './GiftIcon';
export * from './HamburgerIcon';
export * from './InfoIcon';
export * from './L3Icon';
export * from './LockIcon';
export * from './MagnifyingGlassIcon';
export * from './MinusIcon';
export * from './MirrorWedgeIcon';
export * from './MysteryIcon';
export * from './PacmanIcon';
export * from './PlayIcon';
export * from './QuestionIcon';
export * from './RibbonIcon';
export * from './RobotIcon';
export * from './ScanQRIcon';
export * from './ScanSelfIcon';
export * from './SearchIcon';
export * from './SignOutIcon';
export * from './SlashIcon';
export * from './SliderIcon';
export * from './SpiderWebIcon';
export * from './SpinnerPixelIcon';
export * from './SpinnerIcon';
export * from './TimesCircleIcon';
export * from './TimesIcon';
export * from './TransferIcon';
export * from './TrashIcon';
export * from './VerifiedIcon';
export * from './WarningIcon';
export * from './WebsiteIcon';

// Additional icons not in UI package but needed for UI-native
export * from './PlusIcon';
export * from './CreditsIcon';
export * from './QrCodeIcon';
export * from './JoystickIcon';
export * from './TrophyIcon';
export * from './SparklesIcon';
export * from './GlobeIcon';
export * from './EmptyStateDiscoverIcon';

// Collections for stories - in the exact order from UI package
export const utilityIcons = {
  AlertIcon: () => import('./AlertIcon').then(m => m.AlertIcon),
  ArrowTurnDownIcon: () => import('./ArrowTurnDownIcon').then(m => m.ArrowTurnDownIcon),
  AwardIcon: () => import('./AwardIcon').then(m => m.AwardIcon),
  AwardSimpleIcon: () => import('./AwardSimpleIcon').then(m => m.AwardSimpleIcon),
  BranchIcon: () => import('./BranchIcon').then(m => m.BranchIcon),
  CheckIcon: () => import('./CheckIcon').then(m => m.CheckIcon),
  CheckboxCheckedIcon: () => import('./CheckboxCheckedIcon').then(m => m.CheckboxCheckedIcon),
  CheckboxUncheckedIcon: () => import('./CheckboxUncheckedIcon').then(m => m.CheckboxUncheckedIcon),
  ChessIcon: () => import('./ChessIcon').then(m => m.ChessIcon),
  CircleCheckIcon: () => import('./CircleCheckIcon').then(m => m.CircleCheckIcon),
  CircleNoCheckIcon: () => import('./CircleNoCheckIcon').then(m => m.CircleNoCheckIcon),
  CircleIcon: () => import('./CircleIcon').then(m => m.CircleIcon),
  FnIcon: () => import('./FnIcon').then(m => m.FnIcon),
  CopyIcon: () => import('./CopyIcon').then(m => m.CopyIcon),
  DeployerIcon: () => import('./DeployerIcon').then(m => m.DeployerIcon),
  DollarIcon: () => import('./DollarIcon').then(m => m.DollarIcon),
  DotsIcon: () => import('./DotsIcon').then(m => m.DotsIcon),
  DoubleWedgeIcon: () => import('./DoubleWedgeIcon').then(m => m.DoubleWedgeIcon),
  EmptyStateAchievementIcon: () => import('./EmptyStateAchievementIcon').then(m => m.EmptyStateAchievementIcon),
  EmptyStateActivityIcon: () => import('./EmptyStateActivityIcon').then(m => m.EmptyStateActivityIcon),
  EmptyStateGuildIcon: () => import('./EmptyStateGuildIcon').then(m => m.EmptyStateGuildIcon),
  EmptyStateInventoryIcon: () => import('./EmptyStateInventoryIcon').then(m => m.EmptyStateInventoryIcon),
  EmptyStateLeaderboardIcon: () => import('./EmptyStateLeaderboardIcon').then(m => m.EmptyStateLeaderboardIcon),
  EmptyStateIcon: () => import('./EmptyStateIcon').then(m => m.EmptyStateIcon),
  ExternalIcon: () => import('./ExternalIcon').then(m => m.ExternalIcon),
  TouchIcon: () => import('./TouchIcon').then(m => m.TouchIcon),
  FullscreenIcon: () => import('./FullscreenIcon').then(m => m.FullscreenIcon),
  GearIcon: () => import('./GearIcon').then(m => m.GearIcon),
  GiftIcon: () => import('./GiftIcon').then(m => m.GiftIcon),
  HamburgerIcon: () => import('./HamburgerIcon').then(m => m.HamburgerIcon),
  InfoIcon: () => import('./InfoIcon').then(m => m.InfoIcon),
  L3Icon: () => import('./L3Icon').then(m => m.L3Icon),
  LockIcon: () => import('./LockIcon').then(m => m.LockIcon),
  MagnifyingGlassIcon: () => import('./MagnifyingGlassIcon').then(m => m.MagnifyingGlassIcon),
  MinusIcon: () => import('./MinusIcon').then(m => m.MinusIcon),
  MirrorWedgeIcon: () => import('./MirrorWedgeIcon').then(m => m.MirrorWedgeIcon),
  MysteryIcon: () => import('./MysteryIcon').then(m => m.MysteryIcon),
  PacmanIcon: () => import('./PacmanIcon').then(m => m.PacmanIcon),
  PlayIcon: () => import('./PlayIcon').then(m => m.PlayIcon),
  QuestionIcon: () => import('./QuestionIcon').then(m => m.QuestionIcon),
  RibbonIcon: () => import('./RibbonIcon').then(m => m.RibbonIcon),
  RobotIcon: () => import('./RobotIcon').then(m => m.RobotIcon),
  ScanQRIcon: () => import('./ScanQRIcon').then(m => m.ScanQRIcon),
  ScanSelfIcon: () => import('./ScanSelfIcon').then(m => m.ScanSelfIcon),
  SearchIcon: () => import('./SearchIcon').then(m => m.SearchIcon),
  SignOutIcon: () => import('./SignOutIcon').then(m => m.SignOutIcon),
  SlashIcon: () => import('./SlashIcon').then(m => m.SlashIcon),
  SliderIcon: () => import('./SliderIcon').then(m => m.SliderIcon),
  SpiderWebIcon: () => import('./SpiderWebIcon').then(m => m.SpiderWebIcon),
  SpinnerPixelIcon: () => import('./SpinnerPixelIcon').then(m => m.SpinnerPixelIcon),
  SpinnerIcon: () => import('./SpinnerIcon').then(m => m.SpinnerIcon),
  TimesCircleIcon: () => import('./TimesCircleIcon').then(m => m.TimesCircleIcon),
  TimesIcon: () => import('./TimesIcon').then(m => m.TimesIcon),
  TransferIcon: () => import('./TransferIcon').then(m => m.TransferIcon),
  TrashIcon: () => import('./TrashIcon').then(m => m.TrashIcon),
  VerifiedIcon: () => import('./VerifiedIcon').then(m => m.VerifiedIcon),
  WarningIcon: () => import('./WarningIcon').then(m => m.WarningIcon),
  WebsiteIcon: () => import('./WebsiteIcon').then(m => m.WebsiteIcon),
  
  // Additional icons not in UI package but needed for UI-native
  PlusIcon: () => import('./PlusIcon').then(m => m.PlusIcon),
  CreditsIcon: () => import('./CreditsIcon').then(m => m.CreditsIcon),
  QrCodeIcon: () => import('./QrCodeIcon').then(m => m.QrCodeIcon),
  JoystickIcon: () => import('./JoystickIcon').then(m => m.JoystickIcon),
  TrophyIcon: () => import('./TrophyIcon').then(m => m.TrophyIcon),
  SparklesIcon: () => import('./SparklesIcon').then(m => m.SparklesIcon),
  GlobeIcon: () => import('./GlobeIcon').then(m => m.GlobeIcon),
  EmptyStateDiscoverIcon: () => import('./EmptyStateDiscoverIcon').then(m => m.EmptyStateDiscoverIcon),
};
