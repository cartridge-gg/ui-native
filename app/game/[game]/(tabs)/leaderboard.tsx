import { useRouter } from "expo-router";
import { Leaderboard } from "#components";

export default function GameLeaderboardScreen() {
	const router = useRouter();

	const handlePlayerClick = (address: string) => {
		router.push(`/player/${address}`);
	};

	return <Leaderboard onPlayerClick={handlePlayerClick} />;
}
