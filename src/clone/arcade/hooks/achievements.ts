import { useContext, useMemo } from "react";
import { getChecksumAddress } from "starknet";
import { AchievementContext } from "#clone/arcade";
import { useAddress } from "./address";
import { useArcade } from "./arcade";

export interface Item {
	id: string;
	hidden: boolean;
	index: number;
	earning: number;
	group: string;
	icon: string;
	title: string;
	description: string;
	timestamp: number;
	percentage: string;
	completed: boolean;
	pinned: boolean;
	tasks: ItemTask[];
}

export interface ItemTask {
	id: string;
	count: number;
	total: number;
	description: string;
}

export interface Counters {
	[player: string]: { [quest: string]: { count: number; timestamp: number }[] };
}

export interface Stats {
	[quest: string]: number;
}

export interface Player {
	address: string;
	earnings: number;
	timestamp: number;
	completeds: string[];
}

export const useAchievements = () => {
	const context = useContext(AchievementContext);

	if (!context) {
		throw new Error(
			"The `useAchievements` hook must be used within a `AchievementProvider`",
		);
	}

	const {
		achievements,
		players,
		events,
		usernames,
		globals,
		isLoading,
		isError,
	} = context;

	return {
		achievements,
		players,
		events,
		usernames,
		globals,
		isLoading,
		isError,
	};
};

export function usePlayerStats() {
	const { address } = useAddress();
	const { achievements, globals } = useAchievements();

	const { completed, total } = useMemo(() => {
		let completed = 0;
		let total = 0;
		for (const gameAchievements of Object.values(achievements)) {
			completed += gameAchievements.filter((item) => item.completed).length;
			total += gameAchievements.length;
		}
		return { completed, total };
	}, [achievements]);

	const { rank, earnings } = useMemo(() => {
		const rank =
			globals.findIndex(
				(player) => BigInt(player.address || 0) === BigInt(address),
			) + 1;
		const earnings =
			globals.find((player) => BigInt(player.address || 0) === BigInt(address))
				?.earnings || 0;
		return { rank, earnings };
	}, [address, globals]);

	return { completed, total, rank, earnings };
}

export function usePlayerGameStats(projects: string[]) {
	const { pins } = useArcade();
	const { address } = useAddress();
	const { achievements, players } = useAchievements();

	const gameAchievements = useMemo(() => {
		return projects.flatMap((project) => achievements[project || ""] || []);
	}, [achievements, projects]);

	const gamePlayers = useMemo(
		() => projects.flatMap((project) => players[project || ""] || []),
		[players, projects],
	);

	const { pinneds, completed, total } = useMemo(() => {
		const ids = pins[getChecksumAddress(address)] || [];
		const pinneds = gameAchievements
			.filter((item) =>
				ids.length > 0
					? ids.includes(item.id) && item.completed
					: item.completed,
			)
			.sort((a, b) => a.id.localeCompare(b.id))
			.sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
			.slice(0, 3); // There is a front-end limit of 3 pinneds
		const completed = gameAchievements.filter((item) => item.completed).length;
		const total = gameAchievements.length;
		return { pinneds, completed, total };
	}, [pins, address, gameAchievements]);

	const { rank, earnings } = useMemo(() => {
		const rank =
			gamePlayers.findIndex(
				(player) => BigInt(player.address || 0) === BigInt(address),
			) + 1;
		const earnings =
			gamePlayers
				.filter((player) => BigInt(player.address || 0) === BigInt(address))
				?.reduce((acc, player) => acc + player.earnings, 0) || 0;
		return { rank, earnings };
	}, [address, gamePlayers]);

	return { pinneds, completed, total, rank, earnings };
}
