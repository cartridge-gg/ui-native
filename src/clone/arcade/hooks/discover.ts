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
	// Mock: create a flat list of events from arcade games; in real app, pull from Torii
	const { games } = useArcade();

	const events = useMemo<DiscoverEvent[]>(() => {
		const now = Math.floor(Date.now() / 1000);
		return games.flatMap((game, i) => {
			return [
				{
					identifier: `evt-${game.id}-a`,
					name: "karii",
					address: getChecksumAddress?.("0x1") ?? "0x1",
					timestamp: now - (i + 1) * 15,
					logo: game.properties.icon,
					color: "#33FF33",
					actions: ["played"],
					count: 1,
					duration: 120,
					achievements: [],
				},
				{
					identifier: `evt-${game.id}-b`,
					name: "fortunar",
					address: getChecksumAddress?.("0x2") ?? "0x2",
					timestamp: now - (i + 1) * 60,
					logo: game.properties.icon,
					color: "#33FF33",
					actions: ["minted"],
					count: 3,
					duration: 480,
					achievements: [
						{ title: "Speed Runner", icon: "fa-sparkles", points: 50 },
					],
				},
			];
		});
	}, [games]);

	const usernames: Record<string, string> = useMemo(
		() => ({
			[getChecksumAddress?.("0x1") ?? "0x1"]: "karii",
			[getChecksumAddress?.("0x2") ?? "0x2"]: "fortunar",
		}),
		[],
	);

	return {
		playthroughs: { mock: events },
		usernames,
		status: "success" as const,
	};
}
