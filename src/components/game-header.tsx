import { usePathname } from "expo-router";
import { useCallback, useMemo } from "react";
import { Linking, View } from "react-native";
import { useArcade } from "#clone/arcade";
import {
	ArrowFromLineIcon,
	Button,
	GearIcon,
	PaperPlaneIcon,
	PlayIcon,
	PlusIcon,
	SvgClassContext,
	Text,
	Thumbnail,
	toast,
	VerifiedIcon,
	WedgeIcon,
} from "#components";

export function GameHeader() {
	const pathname = usePathname();
	const gameLookup = useGameLookup();

	const currentGame = useMemo(() => {
		try {
			if (pathname?.startsWith("/game/")) {
				const seg = pathname.split("/")[2];
				if (seg) {
					return gameLookup.byIdOrSlug(seg);
				}
			}
		} catch {
			// Return undefined if parsing fails
		}
		return undefined;
	}, [pathname, gameLookup]);

	const gameName = currentGame?.name ?? "Loot Survivor";
	const gameLogo = currentGame?.properties?.icon;

	const onEditGame = useCallback(() => {
		toast.info("Edit game functionality coming soon!");
	}, []);

	const onAddEdition = useCallback(() => {
		toast.info("Add edition functionality coming soon!");
	}, []);

	const onShare = useCallback(() => {
		toast.success("Share functionality coming soon!");
	}, []);

	const onPlay = useCallback(async () => {
		if (!currentGame) {
			toast.error("Game not found");
			return;
		}

		// Construct game URL - this can be updated based on actual game URL structure
		const gameUrl = `https://cartridge.gg/game/${currentGame.name.toLowerCase().replace(/\s+/g, "-")}`;

		try {
			const supported = await Linking.canOpenURL(gameUrl);
			if (supported) {
				await Linking.openURL(gameUrl);
				toast.success(`Opening ${currentGame.name}`);
			} else {
				toast.error("Cannot open game URL");
			}
		} catch (_error) {
			toast.error("Failed to open game");
		}
	}, [currentGame]);

	return (
		<View className="bg-background border-b border-spacer-100 gap-4 items-start justify-start p-4">
			<View className="flex-row gap-2 items-center">
				<Thumbnail
					icon={gameLogo}
					size="xxl"
					variant="default"
					rounded={false}
				/>
				<View className="gap-1">
					<Text className="text-xl font-semibold leading-6">{gameName}</Text>

					<SvgClassContext.Provider value="fill-foreground-300">
						<View className="flex-row gap-2 items-center justify-start w-full">
							<View className="flex-row bg-background-150 gap-1 items-center justify-center px-1.5 py-1 rounded">
								<VerifiedIcon />
								<WedgeIcon variant="down" />
							</View>

							<Button
								variant="icon"
								size="icon"
								className="size-8"
								onPress={onEditGame}
							>
								<GearIcon size="sm" />
							</Button>

							<Button
								variant="icon"
								size="icon"
								className="size-8"
								onPress={onAddEdition}
							>
								<PlusIcon size="sm" variant="solid" />
							</Button>

							<Button
								variant="icon"
								size="icon"
								onPress={onShare}
								className="ml-auto"
							>
								<PaperPlaneIcon size="sm" variant="solid" />
							</Button>
						</View>
					</SvgClassContext.Provider>
				</View>
				<Button
					variant="icon"
					size="icon"
					onPress={onShare}
					className="rounded-full"
				>
					<ArrowFromLineIcon variant="up" />
				</Button>
			</View>

			<Button
				variant="primary"
				size="default"
				onPress={onPlay}
				className="w-full rounded-full"
			>
				<PlayIcon size="sm" />
				<Text>Play</Text>
			</Button>
		</View>
	);
}
