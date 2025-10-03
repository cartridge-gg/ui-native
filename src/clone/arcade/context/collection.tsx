import { createContext, type ReactNode, useState } from "react";

export enum CollectionType {
	ERC721 = "ERC-721",
	ERC1155 = "ERC-1155",
}

export type Collection = {
	address: string;
	name: string;
	type: CollectionType;
	imageUrl: string;
	totalCount: number;
	project: string;
};

export type CollectionContextType = {
	collections: Collection[];
	status: "success" | "error" | "idle" | "loading";
};

export const CollectionContext = createContext<CollectionContextType | null>(
	null,
);

// Mock data for development - based on actual Cartridge marketplace collections
const MOCK_COLLECTIONS: Collection[] = [
	{
		address:
			"0x051d0844f96f86c7363cc7eb3ab939e0ef5b70939dcbc17895b2fa178d9af420",
		name: "Dragark",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		totalCount: 156,
		project: "arcade-dragark",
	},
	{
		address:
			"0x07d8ea58612a5de25f29281199a4fc1f2ce42f0f207f93c3a35280605f3b8e68",
		name: "Karat",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/karat/icon.png",
		totalCount: 89,
		project: "arcade-karat",
	},
	{
		address:
			"0x077485a949c130cf0d98819d2b0749f5860b0734ea28cb678dd3f39379131bfa",
		name: "Schizodio Brothers",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/schizodio/icon.png",
		totalCount: 42,
		project: "arcade-schizodio",
	},
	{
		address:
			"0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1",
		name: "Pixel Banner",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/pixel-banner/icon.png",
		totalCount: 67,
		project: "arcade-pixel-banner",
	},
	// Blob Arena collections
	{
		address:
			"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
		name: "Blobert",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/blob-arena-amma/icon.png",
		totalCount: 234,
		project: "arcade-blobarena-mainnet",
	},
	// Dope Wars collections
	{
		address:
			"0x0314cca49699d0db8ac0b9df2c9a89b76c44d6d3c1a7d76f15cebc8535acfb91",
		name: "Dope Wars Paper",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/dope-wars/icon.png",
		totalCount: 128,
		project: "arcade-dopewars",
	},
	{
		address:
			"0x04fa864a706e3403fd17ac8df307f22eafa21b778b73353abf69a622e47a2003",
		name: "Dope Wars Items",
		type: CollectionType.ERC1155,
		imageUrl: "https://static.cartridge.gg/presets/dope-wars/icon.png",
		totalCount: 89,
		project: "arcade-dopewars",
	},
	// Pistols collections
	{
		address:
			"0x2e9c711b1a7e2784570b1bda5082a92606044e836ba392d2b977d280fb74b3c",
		name: "Pistols Duelists",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/pistols/icon.png",
		totalCount: 456,
		project: "arcade-pistols",
	},
	{
		address:
			"0x7aaa9866750a0db82a54ba8674c38620fa2f967d2fbb31133def48e0527c87f",
		name: "Genesis Duelist",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/pistols/icon.png",
		totalCount: 156,
		project: "arcade-pistols",
	},
	{
		address:
			"0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
		name: "Beasts",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/loot-survivor/icon.png",
		totalCount: 512,
		project: "arcade-loot-survivor",
	},
];

export function CollectionProvider({ children }: { children: ReactNode }) {
	const [status] = useState<"success" | "error" | "idle" | "loading">(
		"success",
	);

	return (
		<CollectionContext.Provider
			value={{
				collections: MOCK_COLLECTIONS,
				status,
			}}
		>
			{children}
		</CollectionContext.Provider>
	);
}
