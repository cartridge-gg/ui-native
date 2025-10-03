import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade } from "#clone/arcade";
import { AboutDetails, AboutMedia, GameSocials, Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export function AboutScene() {
	const insets = useSafeAreaInsets();
	const { game: gameParam } = useLocalSearchParams<{ game: string }>();
	const { games, editions } = useArcade();

	// Find the current game
	const game = useMemo(() => {
		try {
			if (gameParam) {
				const idNum = Number(gameParam);
				return (
					(Number.isFinite(idNum)
						? games.find((g) => g.id === idNum)
						: undefined) ??
					games.find(
						(g) => g.name.toLowerCase().replace(/\s+/g, "-") === gameParam,
					)
				);
			}
		} catch {
			// Return undefined if parsing fails
		}
		return undefined;
	}, [gameParam, games]);

	// Find the edition for this game (use the first edition if multiple exist)
	const edition = useMemo(() => {
		if (!game) return undefined;
		// Match edition by gameId
		return editions.find((e) => e.gameId === game.id);
	}, [game, editions]);

	const socials = useMemo(() => {
		if (!edition && !game) return undefined;
		// Merge edition and game socials, with edition taking precedence
		return {
			website: edition?.socials?.website || game?.socials?.website,
			discord: edition?.socials?.discord || game?.socials?.discord,
			telegram: edition?.socials?.telegram || game?.socials?.telegram,
			twitter: edition?.socials?.twitter || game?.socials?.twitter,
			github: edition?.socials?.github || game?.socials?.github,
			youtube: edition?.socials?.youtube || game?.socials?.youtube,
		};
	}, [edition, game]);

	const mediaItems = useMemo(() => {
		if (!edition) return [];
		const videos = edition.socials?.videos?.filter((v) => !!v) ?? [];
		const images = edition.socials?.images?.filter((i) => !!i) ?? [];
		return [...videos, ...images];
	}, [edition]);

	if (!edition) {
		return (
			<View className="flex-1 items-center justify-center px-6">
				<Text className="text-base text-foreground-300">
					No information available for this game.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			className="flex-1"
			contentContainerStyle={{
				padding: 16,
				paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 16,
				gap: 16,
			}}
		>
			<AboutMedia items={mediaItems} />

			{socials && (
				<View className="flex-col gap-2">
					<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
						Links
					</Text>
					<GameSocials socials={socials} />
				</View>
			)}

			<AboutDetails content={edition.description || ""} />
		</ScrollView>
	);
}
