import { createContext, type PropsWithChildren } from "react";
import arcadeMock from "./arcade.mock.json";

const CHAIN_ID = "SN_MAIN";

export interface ProjectProps {
	namespace: string;
	project: string;
}

const initialState = {
	chainId: CHAIN_ID,
	provider: {},
	pins: {},
	follows: {},
	accesses: [],
	games: arcadeMock.games,
	editions: arcadeMock.editions,
	chains: [],
	clients: {},
	player: undefined,
	setPlayer: () => {},
};

export const ArcadeContext = createContext(initialState);

export function ArcadeProvider(props: PropsWithChildren) {
	return <ArcadeContext.Provider value={initialState} {...props} />;
}
