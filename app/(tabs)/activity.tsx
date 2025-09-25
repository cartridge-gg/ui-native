import { useRouter } from "expo-router";
import { Discovery } from "#components";

export default function GameActivityScreen() {
	const router = useRouter();

	const handlePlayerClick = (address: string) => {
		router.push(`/player/${address}`);
	};

	return <Discovery onPlayerClick={handlePlayerClick} />;
}
