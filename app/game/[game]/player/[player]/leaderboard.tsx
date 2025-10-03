import { useLocalSearchParams, useRouter } from "expo-router";
import { Leaderboard } from "#components";

export default function GamePlayerLeaderboardScreen() {
	const router = useRouter();
	const { game } = useLocalSearchParams<{ game: string }>();

	const handlePlayerClick = (address: string) => {
		router.push(`/game/${game}/player/${address}`);
	};

	return <Leaderboard onPlayerClick={handlePlayerClick} />;
}
