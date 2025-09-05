import type { Chain } from "@starknet-react/chains";
import { createContext, type ReactNode, useContext, useState } from "react";
import {
  type AccessModel,
  type EditionModel,
  ArcadeProvider as ExternalProvider,
  GameModel,
} from "#clone/arcade/mock";

// biome-ignore lint/suspicious/noExplicitAny: TODO
type ToriiClient = any;

const CHAIN_ID = "SN_MAIN";

export interface ProjectProps {
  namespace: string;
  project: string;
}

/**
 * Interface defining the shape of the Arcade context.
 */
interface ArcadeContextType {
  /** The Arcade client instance */
  chainId: string;
  provider: ExternalProvider;
  pins: { [playerId: string]: string[] };
  follows: { [playerId: string]: string[] };
  accesses: AccessModel[];
  games: GameModel[];
  editions: EditionModel[];
  chains: Chain[];
  player: string | undefined;
  clients: { [key: string]: ToriiClient };
  setPlayer: (address: string | undefined) => void;
}

/**
 * React context for sharing Arcade-related data throughout the application.
 */
export const ArcadeContext = createContext<ArcadeContextType | null>(null);

/**
 * Provider component that makes Arcade context available to child components.
 *
 * @param props.children - Child components that will have access to the Arcade context
 * @throws {Error} If ArcadeProvider is used more than once in the component tree
 */
export const ArcadeProvider = ({ children }: { children: ReactNode }) => {
  const currentValue = useContext(ArcadeContext);
  if (currentValue) {
    throw new Error("ArcadeProvider can only be used once");
  }

  const [player, setPlayer] = useState<string | undefined>();
  const provider = new ExternalProvider(CHAIN_ID);

  return (
    <ArcadeContext.Provider
      value={{
        chainId: CHAIN_ID,
        provider,
        pins: {},
        follows: {},
        accesses: [],
        games: [
          new GameModel(1, "loot-survivor", "Loot Survivor", true, true),
          new GameModel(2, "dope-wars", "Dope Wars", true, true),
          new GameModel(3, "realms-eternum", "Realms Eternum", true, true),
          new GameModel(4, "wordlers", "Wordlers", true, true),
        ],
        editions: [],
        chains: [],
        clients: {},
        player,
        setPlayer,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  );
};
