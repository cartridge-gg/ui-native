import { createContext, type PropsWithChildren } from "react";

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
	games: [
		{
			id: 1,
			name: "Loot Survivor",
			published: true,
			whitelisted: true,
			properties: {
				icon: "https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/icon.png?raw=true",
				cover:
					"https://github.com/cartridge-gg/presets/blob/main/configs/loot-survivor/cover.png?raw=true",
			},
		},
		{
			id: 2,
			name: "Dope Wars",
			published: true,
			whitelisted: true,
			properties: {
				icon: "https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
				cover:
					"https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/cover.png?raw=true",
			},
		},
		{
			id: 3,
			name: "Realms Eternum",
			published: true,
			whitelisted: true,
			properties: {
				icon: "https://github.com/cartridge-gg/presets/blob/main/configs/eternum/icon.gif?raw=true",
				cover:
					"https://github.com/cartridge-gg/presets/blob/main/configs/eternum/cover.png?raw=true",
			},
		},
	],
	editions: [],
	chains: [],
	clients: {},
	player: undefined,
	setPlayer: () => {},
};

export const ArcadeContext = createContext(initialState);

export function ArcadeProvider(props: PropsWithChildren) {
	return <ArcadeContext.Provider value={initialState} {...props} />;
}
