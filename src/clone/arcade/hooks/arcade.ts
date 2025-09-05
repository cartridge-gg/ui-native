import { controllerConfigs } from "@cartridge/presets";
import { useAccount } from "@starknet-react/core";
import { useContext, useMemo } from "react";
import { ArcadeContext } from "#clone/arcade/context/arcade";
import { useOwnerships } from "#clone/arcade/hooks/ownership";

// TODO: @cartridge/arcade cannot be imported because wasm is internally used
// import { RoleType } from "@cartridge/arcade";
import { RoleType } from "#clone/types/role";

/**
 * Custom hook to access the Arcade context and account information.
 * Must be used within a ArcadeProvider component.
 *
 * @returns An object containing:
 * - chainId: The chain id
 * - provider: The Arcade provider instance
 * - pins: All the existing pins
 * - games: The registered games
 * - chains: The chains
 * @throws {Error} If used outside of a ArcadeProvider context
 */
export const useArcade = () => {
	const context = useContext(ArcadeContext);

	if (!context) {
		throw new Error(
			"The `useArcade` hook must be used within a `ArcadeProvider`",
		);
	}

	const {
		chainId,
		provider,
		pins,
		follows,
		accesses,
		games,
		editions,
		chains,
		clients,
		player,
		setPlayer,
	} = context;
	const { address } = useAccount();
	const { ownerships } = useOwnerships();

	const access = useMemo(() => {
		return accesses.find(
			(access) => BigInt(access.address) === BigInt(address || "0x1"),
		);
	}, [accesses, address]);

	const admin = useMemo(() => {
		return (
			access?.role?.value === RoleType.Owner ||
			access?.role.value === RoleType.Admin
		);
	}, [access]);

	const fileteredGames = useMemo(() => {
		return games.filter((game) => {
			const gameOwner = ownerships.find(
				(ownership) => ownership.tokenId === BigInt(game.id),
			);
			const isGameOwner =
				BigInt(gameOwner?.accountAddress || "0x0") === BigInt(address || "0x1");
			return admin || isGameOwner || (game.whitelisted && game.published);
		});
	}, [games, ownerships, admin, address]);

	const enrichedGames = useMemo(() => {
		return fileteredGames.map((game) => {
			let key = game.identifier;
			if (key === "realms-eternum") key = "eternum";
			// biome-ignore lint/suspicious/noExplicitAny: presets typing
			const preset = (controllerConfigs as Record<string, any>)[key];
			const theme = preset?.theme;
			const icon: string | undefined =
				typeof theme?.icon === "string" ? theme.icon : undefined;
			const cover: string | undefined = theme?.cover
				? typeof theme.cover === "string"
					? theme.cover
					: (theme.cover?.dark ?? theme.cover?.light)
				: undefined;
			return { ...game, image: icon, cover, theme } as typeof game & {
				image?: string;
				cover?: string;
				// biome-ignore lint/suspicious/noExplicitAny: theme type from presets
				theme?: any;
			};
		});
	}, [fileteredGames]);

	const filteredEditions = useMemo(() => {
		return editions
			.filter((edition) => {
				const gameOwner = ownerships.find(
					(ownership) => ownership.tokenId === BigInt(edition.gameId),
				);
				const editionOwner = ownerships.find(
					(ownership) => ownership.tokenId === BigInt(edition.id),
				);
				const isGameOwner =
					BigInt(gameOwner?.accountAddress || "0x0") ===
					BigInt(address || "0x1");
				const isEditionOwner =
					BigInt(editionOwner?.accountAddress || "0x0") ===
					BigInt(address || "0x1");
				return (
					admin ||
					isGameOwner ||
					isEditionOwner ||
					(edition.whitelisted && edition.published)
				);
			})
			.map((edition) => {
				const game = games.find((game) => game.id === edition.gameId);
				const gameOwnership = ownerships.find(
					(ownership) => ownership.tokenId === BigInt(game?.id || "0x0"),
				);
				if (!gameOwnership) return edition;
				const editionOwnership = ownerships.find(
					(ownership) => ownership.tokenId === BigInt(edition.id),
				);
				if (!editionOwnership) return edition;
				edition.certified =
					gameOwnership.accountAddress === editionOwnership.accountAddress;
				return edition.clone();
			});
	}, [editions, games, ownerships, admin, address]);

	return {
		chainId,
		provider,
		pins,
		follows,
		accesses,
		games: enrichedGames,
		editions: filteredEditions,
		chains,
		clients,
		player,
		setPlayer,
	};
};
