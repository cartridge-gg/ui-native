import type React from "react";
import { createContext, useContext, use } from "react";
import { type DojoGame, dojoGamesApi } from "#utils/api";

interface GamesContextType {
	games: DojoGame[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

// Create a promise that fetches games
const gamesPromise = dojoGamesApi.getGames();

export function GamesProvider({ children }: { children: React.ReactNode }) {
	// Use React 19's use hook to fetch games
	const games = use(gamesPromise);

	const value: GamesContextType = {
		games,
		loading: false, // No loading state needed with use hook
		error: null, // Error handling is built into the use hook
		refetch: async () => {
			// For refetch, we would need to create a new promise
			// This is a simplified implementation
			console.log("Refetch not implemented with use hook yet");
		},
	};

	return (
		<GamesContext.Provider value={value}>{children}</GamesContext.Provider>
	);
}

export function useGames() {
	const context = useContext(GamesContext);
	if (context === undefined) {
		throw new Error("useGames must be used within a GamesProvider");
	}
	return context;
}
