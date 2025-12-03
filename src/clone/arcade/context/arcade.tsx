/**
 * Arcade Context - REAL DATA from Torii
 * Provides games and editions data
 */
import { createContext, type PropsWithChildren, useMemo, useRef, useEffect, useState } from "react";
import { useGames, type Game as BaseGame } from "../../../../../../hooks/useGames";

const CHAIN_ID = "SN_MAIN";

export interface ProjectProps {
	namespace: string;
	project: string;
}

export type Game = BaseGame & { id: number };

export interface Edition {
	id: string;
	gameId: number;
	config?: {
		project?: string;
	};
}

const emptyState = {
	chainId: CHAIN_ID,
	provider: {},
	pins: {},
	follows: {},
	accesses: [],
	games: [],
	gamesList: [], // Lightweight list for UI
	editions: [],
	chains: [],
	clients: {},
	player: undefined,
	setPlayer: () => {},
	version: 0,
};

export const ArcadeContext = createContext(emptyState);

export function ArcadeProvider(props: PropsWithChildren) {
	let baseGames: BaseGame[] = [];
	
	try {
		const result = useGames();
		baseGames = result.games;
	} catch (err) {
		console.error('❌ ArcadeProvider: Failed to load games', err);
		baseGames = [];
	}
	
	// Use refs for stable data + version counter for updates
	const gamesRef = useRef<Game[]>([]);
	const editionsRef = useRef<Edition[]>([]);
	// Create a lightweight games list with only simple values for UI
	const gamesListRef = useRef<Array<{id: number, name: string, icon?: string, color?: string}>>([]);
	const [version, setVersion] = useState(0);
	
	// Update refs and version when games count changes
	useEffect(() => {
		if (baseGames.length !== gamesRef.current.length) {
			console.log('🎮 ArcadeProvider: Updating games -', baseGames.length, 'games');
			
			// Convert games
			const newGames = baseGames.map((game, index) => ({
				...game,
				id: parseInt(game.id) || index,
			}));
			
			// Create lightweight list for UI (only simple values!)
			const newGamesList = newGames.map(g => ({
				id: g.id,
				name: g.name,
				icon: g.properties?.icon || undefined,
				color: g.color || undefined,
			}));
			
			// Create editions
			const newEditions = newGames.map((game) => ({
				id: game.id.toString(),
				gameId: game.id,
				config: {
					project: `arcade-${game.name.toLowerCase().replace(/\s+/g, '-')}`,
				},
			}));
			
			gamesRef.current = newGames;
			gamesListRef.current = newGamesList;
			editionsRef.current = newEditions;
			
			// Increment version to trigger re-renders
			setVersion(v => v + 1);
		}
	}, [baseGames.length]);
	
	const value = useMemo(() => ({
		...emptyState,
		games: gamesRef.current,
		gamesList: gamesListRef.current, // Expose lightweight list
		editions: editionsRef.current,
		version, // Include version so consumers can depend on it
	}), [version]); // Only depend on version number!
	
	console.log('🎮 ArcadeProvider: Providing', gamesRef.current.length, 'real games (v', version, ')');
	
	return <ArcadeContext.Provider value={value} {...props} />;
}
