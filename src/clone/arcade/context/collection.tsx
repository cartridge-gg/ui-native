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
	{
		address:
			"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
		name: "Blobert",
		type: CollectionType.ERC721,
		imageUrl: "https://static.cartridge.gg/presets/blobert/icon.png",
		totalCount: 234,
		project: "arcade-blobert",
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
