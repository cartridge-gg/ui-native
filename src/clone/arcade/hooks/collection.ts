import { useContext } from "react";
import { CollectionContext } from "#clone/arcade/context/collection";

export function useCollections() {
	const context = useContext(CollectionContext);

	if (!context) {
		throw new Error(
			"The `useCollections` hook must be used within a `CollectionProvider`",
		);
	}

	return context;
}
