import { controllerConfigs } from "@cartridge/presets";
import { createContext, type PropsWithChildren } from "react";
import { constants } from "starknet";

export type ActivityContextType = {
	erc20s: { [project: string]: CardProps[] };
	erc721s: { [project: string]: CardProps[] };
	actions: { [project: string]: CardProps[] };
	trophies: { [project: string]: CardProps[] };
	status: "success" | "error" | "idle" | "loading";
};

export interface CardProps {
	variant: "token" | "collectible" | "game" | "achievement";
	key: string;
	project: string;
	chainId: constants.StarknetChainId;
	contractAddress: string;
	transactionHash: string;
	amount: string;
	address: string;
	value: string;
	name: string;
	collection: string;
	image: string;
	title: string;
	website: string;
	certified: boolean;
	action: "send" | "receive" | "mint";
	timestamp: number;
	date: string;
	points?: number;
	color?: string;
}

// Function to get theme color for a project
function getProjectColor(project: string): string {
	const config = controllerConfigs[project as keyof typeof controllerConfigs];
	if (config?.theme?.colors?.primary) {
		const primary = config.theme.colors.primary;
		// Handle both string and object types
		if (typeof primary === "string") {
			return primary;
		} else if (typeof primary === "object" && primary.dark && primary.light) {
			// Default to light theme for now
			return primary.light;
		}
	}
	// Fallback to default color if no theme found
	return "#33FF33";
}

// Function to get theme color from key (extracts project name from key)
function getColorFromKey(key: string): string {
	// Extract project name from key (e.g., "loot-survivor-token-receive-1" -> "loot-survivor")
	const projectMatch = key.match(/^([a-z-]+)-/);
	if (projectMatch) {
		return getProjectColor(projectMatch[1]);
	}
	return "#33FF33";
}

const initialState: ActivityContextType = {
	erc20s: {
		"loot-survivor": [
			{
				variant: "token",
				key: "loot-survivor-token-receive-1",
				project: "loot-survivor",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567891",
				amount: "3 ETH",
				address: "karii.eth",
				value: "$4,200",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/icon.png?raw=true",
				title: "",
				website: "",
				certified: false,
				action: "receive",
				timestamp: Date.now() / 1000 - 5,
				date: "Today",
				color: getColorFromKey("loot-survivor-token-receive-1"),
			},
			{
				variant: "token",
				key: "dope-wars-token-send-1",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567893",
				amount: "3,200 USDC",
				address: "fortunar.eth",
				value: "$3,200",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
				title: "",
				website: "",
				certified: false,
				action: "send",
				timestamp: Date.now() / 1000 - 30,
				date: "Today",
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
		"dope-wars": [
			{
				variant: "token",
				key: "dope-wars-token-send-1",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567893",
				amount: "3,200 USDC",
				address: "fortunar.eth",
				value: "$3,200",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
				title: "",
				website: "",
				certified: false,
				action: "send",
				timestamp: Date.now() / 1000 - 30,
				date: "Today",
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
	},
	erc721s: {
		eternum: [
			{
				variant: "collectible",
				key: "eternum-nft-mint-1",
				project: "eternum",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567892",
				amount: "",
				address: "bal7hazar.eth",
				value: "",
				name: "Legendary Sword",
				collection: "Game Items",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/eternum/icon.gif?raw=true",
				title: "",
				website: "",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 10,
				date: "Today",
				color: getColorFromKey("eternum-nft-mint-1"),
			},
			{
				variant: "collectible",
				key: "loot-survivor-nft-mint-2",
				project: "loot-survivor",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567895",
				amount: "",
				address: "bob.eth",
				value: "",
				name: "Golden Shield",
				collection: "Defense Items",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/cover.png?raw=true",
				title: "",
				website: "",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 60,
				date: "Today",
				color: getColorFromKey("loot-survivor-nft-mint-2"),
			},
		],
		"loot-survivor": [
			{
				variant: "collectible",
				key: "loot-survivor-nft-mint-2",
				project: "loot-survivor",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567895",
				amount: "",
				address: "bob.eth",
				value: "",
				name: "Golden Shield",
				collection: "Defense Items",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/cover.png?raw=true",
				title: "",
				website: "",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 60,
				date: "Today",
				color: getColorFromKey("loot-survivor-nft-mint-2"),
			},
		],
	},
	actions: {
		eternum: [
			{
				variant: "game",
				key: "eternum-game-play-1",
				project: "eternum",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567890",
				amount: "",
				address: "tedison.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/eternum/cover.png?raw=true",
				title: "played game",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 2,
				date: "Today",
				color: getColorFromKey("eternum-game-play-1"),
			},
			{
				variant: "game",
				key: "dope-wars-game-play-2",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567894",
				amount: "",
				address: "alice.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/cover.png?raw=true",
				title: "completed level",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 45,
				date: "Today",
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
		"dope-wars": [
			{
				variant: "game",
				key: "dope-wars-game-play-2",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "0x1234567890abcdef",
				transactionHash: "0xabcdef1234567894",
				amount: "",
				address: "alice.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/cover.png?raw=true",
				title: "completed level",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 45,
				date: "Today",
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
	},
	trophies: {
		"loot-survivor": [
			{
				variant: "achievement",
				key: "loot-survivor-achievement-1",
				project: "loot-survivor",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "",
				transactionHash: "",
				amount: "",
				address: "fortunaregem.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/icon.png?raw=true",
				title: "First Victory",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 15,
				date: "Today",
				points: 100,
				color: getColorFromKey("loot-survivor-achievement-1"),
			},
			{
				variant: "achievement",
				key: "dope-wars-achievement-2",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "",
				transactionHash: "",
				amount: "",
				address: "charlie.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
				title: "Speed Runner",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 90,
				date: "Today",
				points: 250,
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
		"dope-wars": [
			{
				variant: "achievement",
				key: "dope-wars-achievement-2",
				project: "dope-wars",
				chainId: constants.StarknetChainId.SN_MAIN,
				contractAddress: "",
				transactionHash: "",
				amount: "",
				address: "charlie.eth",
				value: "",
				name: "",
				collection: "",
				image:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
				title: "Speed Runner",
				website: "https://cartridge.gg",
				certified: true,
				action: "mint",
				timestamp: Date.now() / 1000 - 90,
				date: "Today",
				points: 250,
				color: getColorFromKey("dope-wars-achievement-2"),
			},
		],
	},
	status: "success",
};

export const ActivityContext = createContext<ActivityContextType>(initialState);

export function ActivityProvider(props: PropsWithChildren) {
	return <ActivityContext.Provider {...props} value={initialState} />;
}
