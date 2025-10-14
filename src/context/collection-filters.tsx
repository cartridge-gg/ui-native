import { createContext, useContext } from "react";

type CollectionFiltersContextType = {
	openFilters: () => void;
};

export const CollectionFiltersContext =
	createContext<CollectionFiltersContextType | null>(null);

export function useCollectionFilters() {
	const context = useContext(CollectionFiltersContext);
	return context;
}
