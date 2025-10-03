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

// Mock data for development
const MOCK_COLLECTIONS: Collection[] = [
  {
    address:
      "0x01435498bf393da86b4733b9264a86b58a42b31f8d8b8ba309593e5c17847672",
    name: "Blobert",
    type: CollectionType.ERC721,
    imageUrl: "https://cartridge-assets.s3.us-east-1.amazonaws.com/blobert.jpg",
    totalCount: 5,
    project: "blobert",
  },
  {
    address:
      "0x07ae27b710e0b40c2e5a7e9d91c922626120b0276e0844a7c245f6e07ed9215e",
    name: "Loot Survivor Items",
    type: CollectionType.ERC1155,
    imageUrl:
      "https://cartridge-assets.s3.us-east-1.amazonaws.com/loot-survivor.jpg",
    totalCount: 12,
    project: "loot-survivor",
  },
  {
    address:
      "0x0314cca49699d0db8ac0b9df2c9a89b76c44d6d3c1a7d76f15cebc8535acfb91",
    name: "Dope Wars NFT",
    type: CollectionType.ERC721,
    imageUrl:
      "https://cartridge-assets.s3.us-east-1.amazonaws.com/dope-wars.jpg",
    totalCount: 3,
    project: "dope-wars",
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
