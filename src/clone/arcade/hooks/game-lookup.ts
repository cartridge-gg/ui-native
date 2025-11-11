/**
 * Hook to efficiently lookup games without causing re-render freezes
 * Creates lightweight maps indexed by ID and slug
 */
import { useMemo } from "react";
import { useArcade } from "./arcade";
import type { Game } from "./arcade";

export interface GameLookup {
	byId: (id: number) => Game | undefined;
	bySlug: (slug: string) => Game | undefined;
	byIdOrSlug: (idOrSlug: string) => Game | undefined;
}

/**
 * Custom hook that provides efficient game lookup functions
 * Only re-creates maps when games count changes, not on every render
 */
export function useGameLookup(): GameLookup {
	const { games } = useArcade();

	// Create lookup maps that only update when game count changes
	const { idMap, slugMap } = useMemo(() => {
		const idMap = new Map<number, Game>();
		const slugMap = new Map<string, Game>();

		for (const game of games) {
			idMap.set(game.id, game);
			const slug = game.name.toLowerCase().replace(/\s+/g, "-");
			slugMap.set(slug, game);
		}

		return { idMap, slugMap };
	}, [games.length]); // Only depend on length!

	// Return stable lookup functions
	return useMemo(
		() => ({
			byId: (id: number) => idMap.get(id),
			bySlug: (slug: string) => slugMap.get(slug),
			byIdOrSlug: (idOrSlug: string) => {
				const idNum = Number(idOrSlug);
				if (Number.isFinite(idNum)) {
					return idMap.get(idNum);
				}
				return slugMap.get(idOrSlug);
			},
		}),
		[idMap, slugMap],
	);
}


