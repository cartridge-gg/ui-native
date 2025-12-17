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

	// Merge socials from game and edition
	const socials = useMemo(() => {
		if (!edition && !game) return undefined;
		
		const gameSocials = (game as any)?.socials || {};
		const editionSocials = edition?.socials || {};
		
		return {
			website: editionSocials?.website || gameSocials?.website || (game as any)?.externalUrl,
			discord: editionSocials?.discord || gameSocials?.discord,
			telegram: editionSocials?.telegram || gameSocials?.telegram,
			twitter: editionSocials?.twitter || gameSocials?.twitter,
			github: editionSocials?.github || gameSocials?.github,
			youtube: editionSocials?.youtube || gameSocials?.youtube,
		};
	}, [edition, game]);

	// Get media items (videos and images)
	const mediaItems = useMemo(() => {
		const gameSocials = (game as any)?.socials || {};
		const editionSocials = edition?.socials || {};
		
		// Collect videos
		const videos: string[] = [];
		
		// Check for youtube_url on game
		const gameYoutubeUrl = (game as any)?.youtubeUrl;
		if (gameYoutubeUrl) {
			videos.push(gameYoutubeUrl);
		}
		
		// Add videos from socials
		const socialVideos = editionSocials?.videos || gameSocials?.videos || [];
		videos.push(...socialVideos.filter((v: string) => !!v && v.trim() !== ''));
		
		// Get images
		const images = editionSocials?.images || gameSocials?.images || [];
		const validImages = images.filter((i: string) => !!i && i.trim() !== '');
		
		return [...videos, ...validImages];
	}, [edition, game]);

	// Get description
	const description = useMemo(() => {
		return edition?.description || (game as any)?.description || '';
	}, [edition, game]);

	if (!game) {
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
			{/* Media Section */}
			{mediaItems.length > 0 && <AboutMedia items={mediaItems} />}

			{/* Social Links */}
			{socials && (
				<View className="flex-col gap-2">
					<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
						Links
					</Text>
					<GameSocials socials={socials} />
				</View>
			)}

			{/* Description/Details */}
			{description && <AboutDetails content={description} />}
		</ScrollView>
	);
}
