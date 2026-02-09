import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { ImageBackground, type ImageURISource, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import banner from "#assets/banner.png";
import { useArcade } from "#clone/arcade";
import {
	ArrowIcon,
	Button,
	HamburgerIcon,
	SearchIcon,
	Text,
} from "#components";
import { useGameContext } from "../../../../contexts/GameContext";

export function Header({ navigation }: Pick<DrawerHeaderProps, "navigation">) {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();
	const router = useRouter();
	const { games, gamesList } = useArcade();
	const { currentGameColor, currentGameId } = useGameContext();
	
	// Use game color when in a game context, otherwise use default yellow
	const accentColor = currentGameId ? currentGameColor : '#FBCB4A';

	// Create a map of game covers - only access complex games array once!
	const gameCovers = useMemo(() => {
		const coverMap = new Map<string, string>();
		// Only build this map once when games first load
		if (games.length > 0) {
			for (const game of games) {
				const cover = game.properties?.cover;
				if (cover) {
					coverMap.set(game.id.toString(), cover);
					// Also add by name slug for URL matching
					const slug = game.name.toLowerCase().replace(/\s+/g, "-");
					coverMap.set(slug, cover);
				}
			}
		}
		return coverMap;
	}, [gamesList.length]); // Depend on lightweight list length!

	const bgSource: ImageURISource = useMemo(() => {
		try {
			if (pathname?.startsWith("/game/")) {
				const seg = pathname.split("/")[2];
				if (seg) {
					// Try to get cover from our lightweight map
					const cover = gameCovers.get(seg);
					if (cover) return { uri: cover } as ImageURISource;
				}
			}
		} catch {}
		return banner as ImageURISource;
	}, [pathname, gameCovers]);

	return (
		<ImageBackground
			source={bgSource}
			resizeMode="cover"
			imageStyle={{ opacity: 0.35 }}
			className="w-full bg-background-200 border-b border-spacer-100"
			style={{ paddingTop: insets.top > 0 ? insets.top : 16 }}
		>
			{/* Gradient shadow overlay: linear-gradient(to top, var(--background-100), transparent) */}
			<LinearGradient
				colors={["#161a17", "transparent"]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				className="absolute left-0 right-0 top-0 bottom-0 opacity-100"
			/>

			<View className="flex-row items-center justify-between p-3">
				{router.canGoBack() ? (
					<Link href=".." asChild>
						<Button
							variant="icon"
							size="icon"
							accessibilityRole="button"
							accessibilityLabel="Go back"
						>
							<ArrowIcon variant="left" />
						</Button>
					</Link>
				) : (
					<Button
						variant="icon"
						size="icon"
						accessibilityRole="button"
						accessibilityLabel="Open menu"
						onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
					>
						<HamburgerIcon />
					</Button>
				)}

				<View className="flex-row items-center gap-3">
					{!router.canGoBack() && (
						<Button
							variant="icon"
							size="icon"
							accessibilityRole="button"
							accessibilityLabel="Search"
							onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
						>
							<SearchIcon />
						</Button>
					)}
					<Button
						variant="outline"
						accessibilityRole="button"
						accessibilityLabel="Connect"
					>
						<Text className="text-sm font-medium" style={{ color: accentColor }}>CONNECT</Text>
					</Button>
				</View>
			</View>
		</ImageBackground>
	);
}
