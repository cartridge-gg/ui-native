export { AppleIcon } from "./AppleIcon";
export { CartridgeIcon } from "./CartridgeIcon";
export { DiscordIcon } from "./DiscordIcon";
export { EthereumIcon } from "./EthereumIcon";
export { GitHubIcon } from "./GitHubIcon";
export { MetamaskIcon } from "./MetamaskIcon";
export { PhantomIcon } from "./PhantomIcon";
export { SolanaIcon } from "./SolanaIcon";
export { StarknetIcon } from "./StarknetIcon";
export { TelegramIcon } from "./TelegramIcon";
export { TwitterIcon } from "./TwitterIcon";
export { WalletConnectIcon } from "./WalletConnectIcon";

// Import for collection
import { AppleIcon } from "./AppleIcon";
import { CartridgeIcon } from "./CartridgeIcon";
import { DiscordIcon } from "./DiscordIcon";
import { EthereumIcon } from "./EthereumIcon";
import { GitHubIcon } from "./GitHubIcon";
import { MetamaskIcon } from "./MetamaskIcon";
import { PhantomIcon } from "./PhantomIcon";
import { SolanaIcon } from "./SolanaIcon";
import { StarknetIcon } from "./StarknetIcon";
import { TelegramIcon } from "./TelegramIcon";
import { TwitterIcon } from "./TwitterIcon";
import { WalletConnectIcon } from "./WalletConnectIcon";

// Collection export
export const BrandIcons = {
	AppleIcon,
	CartridgeIcon,
	DiscordIcon,
	EthereumIcon,
	GitHubIcon,
	MetamaskIcon,
	PhantomIcon,
	SolanaIcon,
	StarknetIcon,
	TelegramIcon,
	TwitterIcon,
	WalletConnectIcon,
};

// Brand icons
export * from "./EthereumIcon";
export * from "./StarknetIcon";
export * from "./GitHubIcon";
export * from "./DiscordIcon";
export * from "./XIcon";
export * from "./TelegramIcon";
export * from "./MetamaskIcon";
export * from "./PhantomIcon";
export * from "./WalletConnectIcon";
export * from "./SolanaIcon";
export * from "./TwitterIcon";
export * from "./AppleIcon";
export * from "./CartridgeIcon";

// New brand icons
export * from "./StripeIcon";
export * from "./ChromeIcon";
export * from "./ArgentIcon";

// Collections for stories
export const brandIcons = {
	EthereumIcon: () => import("./EthereumIcon").then((m) => m.EthereumIcon),
	StarknetIcon: () => import("./StarknetIcon").then((m) => m.StarknetIcon),
	GitHubIcon: () => import("./GitHubIcon").then((m) => m.GitHubIcon),
	DiscordIcon: () => import("./DiscordIcon").then((m) => m.DiscordIcon),
	XIcon: () => import("./XIcon").then((m) => m.XIcon),
	TelegramIcon: () => import("./TelegramIcon").then((m) => m.TelegramIcon),
	MetamaskIcon: () => import("./MetamaskIcon").then((m) => m.MetamaskIcon),
	PhantomIcon: () => import("./PhantomIcon").then((m) => m.PhantomIcon),
	WalletConnectIcon: () =>
		import("./WalletConnectIcon").then((m) => m.WalletConnectIcon),
	SolanaIcon: () => import("./SolanaIcon").then((m) => m.SolanaIcon),
	TwitterIcon: () => import("./TwitterIcon").then((m) => m.TwitterIcon),
	AppleIcon: () => import("./AppleIcon").then((m) => m.AppleIcon),
	CartridgeIcon: () => import("./CartridgeIcon").then((m) => m.CartridgeIcon),
	StripeIcon: () => import("./StripeIcon").then((m) => m.StripeIcon),
	ChromeIcon: () => import("./ChromeIcon").then((m) => m.ChromeIcon),
	ArgentIcon: () => import("./ArgentIcon").then((m) => m.ArgentIcon),
};
