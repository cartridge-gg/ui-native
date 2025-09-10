import { useMemo } from "react";
import { getChecksumAddress } from "starknet";
import { useArcade } from "#clone/arcade";

export type DiscoverEvent = {
	identifier: string;
	name: string;
	address: string;
	timestamp: number;
	logo?: string;
	color?: string;
	actions: string[];
	count: number;
	duration: number;
	achievements: { title: string; icon: string; points: number }[];
};

export function useDiscovers() {
	// Enhanced mock: create rich events matching desktop complexity
	const { games } = useArcade();

	const events = useMemo<DiscoverEvent[]>(() => {
		const now = Math.floor(Date.now() / 1000);
		const players = [
			{ name: "karii", address: "0x1" },
			{ name: "fortunar", address: "0x2" },
			{ name: "satoshi", address: "0x3" },
			{ name: "vitalik", address: "0x4" },
			{ name: "nova", address: "0x5" },
			{ name: "zeta", address: "0x6" },
		];

		return games.flatMap((game, gameIndex) => {
			return players.flatMap((player, playerIndex) => {
				const timeOffset =
					(gameIndex * players.length + playerIndex) * 45 + Math.random() * 30;

				// Various event types to showcase desktop complexity
				const eventTypes = [
					// Simple play session
					{
						identifier: `evt-${game.id}-${player.address}-play`,
						name: player.name,
						address: getChecksumAddress?.(player.address) ?? player.address,
						timestamp: now - timeOffset,
						logo: game.properties.icon,
						color: game.properties.cover
							? `#${Math.floor(Math.random() * 16777215).toString(16)}`
							: "#33FF33",
						actions: ["played"],
						count: 1,
						duration: 120 + Math.random() * 300,
						achievements: [],
					},
					// Multi-action session with achievements
					{
						identifier: `evt-${game.id}-${player.address}-multi`,
						name: player.name,
						address: getChecksumAddress?.(player.address) ?? player.address,
						timestamp: now - timeOffset - 120,
						logo: game.properties.icon,
						color: game.properties.cover
							? `#${Math.floor(Math.random() * 16777215).toString(16)}`
							: "#FF3366",
						actions: ["attack", "defend", "collect", "upgrade"],
						count: 4,
						duration: 480 + Math.random() * 600,
						achievements: [
							{ title: "Speed Runner", icon: "⚡", points: 25 },
							{ title: "Collector", icon: "💎", points: 50 },
						],
					},
					// High achievement session
					{
						identifier: `evt-${game.id}-${player.address}-epic`,
						name: player.name,
						address: getChecksumAddress?.(player.address) ?? player.address,
						timestamp: now - timeOffset - 300,
						logo: game.properties.icon,
						color: game.properties.cover
							? `#${Math.floor(Math.random() * 16777215).toString(16)}`
							: "#FFD700",
						actions: ["boss_fight", "rare_drop", "level_up"],
						count: 3,
						duration: 900 + Math.random() * 400,
						achievements: [
							{ title: "Dragon Slayer", icon: "🐉", points: 100 },
							{ title: "Legendary Hunter", icon: "🏆", points: 75 },
							{ title: "Master Explorer", icon: "🗺️", points: 60 },
						],
					},
					// Trading/Economy actions
					{
						identifier: `evt-${game.id}-${player.address}-trade`,
						name: player.name,
						address: getChecksumAddress?.(player.address) ?? player.address,
						timestamp: now - timeOffset - 600,
						logo: game.properties.icon,
						color: game.properties.cover
							? `#${Math.floor(Math.random() * 16777215).toString(16)}`
							: "#00FF88",
						actions: ["trade", "mint", "sell"],
						count: 3,
						duration: 180 + Math.random() * 120,
						achievements: [{ title: "Merchant", icon: "💰", points: 30 }],
					},
					// PvP session
					{
						identifier: `evt-${game.id}-${player.address}-pvp`,
						name: player.name,
						address: getChecksumAddress?.(player.address) ?? player.address,
						timestamp: now - timeOffset - 900,
						logo: game.properties.icon,
						color: game.properties.cover
							? `#${Math.floor(Math.random() * 16777215).toString(16)}`
							: "#FF6600",
						actions: ["pvp_battle", "victory", "rank_up"],
						count: 3,
						duration: 600 + Math.random() * 300,
						achievements: [
							{ title: "Gladiator", icon: "⚔️", points: 80 },
							{ title: "Champion", icon: "👑", points: 120 },
						],
					},
				];

				// Return 2-3 random event types per player per game
				const selectedEvents = eventTypes
					.sort(() => Math.random() - 0.5)
					.slice(0, Math.floor(Math.random() * 2) + 2);

				return selectedEvents;
			});
		});
	}, [games]);

	const usernames: Record<string, string> = useMemo(
		() => ({
			[getChecksumAddress?.("0x1") ?? "0x1"]: "karii",
			[getChecksumAddress?.("0x2") ?? "0x2"]: "fortunar",
			[getChecksumAddress?.("0x3") ?? "0x3"]: "satoshi",
			[getChecksumAddress?.("0x4") ?? "0x4"]: "vitalik",
			[getChecksumAddress?.("0x5") ?? "0x5"]: "nova",
			[getChecksumAddress?.("0x6") ?? "0x6"]: "zeta",
		}),
		[],
	);

	return {
		playthroughs: { mock: events },
		usernames,
		status: "success" as const,
	};
}
