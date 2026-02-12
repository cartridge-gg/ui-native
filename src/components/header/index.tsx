import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { ImageBackground, type ImageURISource, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import banner from "#assets/banner.png";
import { useArcade } from "#clone/arcade";
import { ArrowIcon, Button, HamburgerIcon, SearchIcon } from "#components";
import { Connection } from "./connection";

export function Header({ navigation }: Pick<DrawerHeaderProps, "navigation">) {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();
	const router = useRouter();
	const { games } = useArcade();

	const bgSource: ImageURISource = useMemo(() => {
		try {
			if (pathname?.startsWith("/game/")) {
				const seg = pathname.split("/")[2];
				if (seg) {
					const idNum = Number(seg);
					const game =
						(Number.isFinite(idNum)
							? games.find((g) => g.id === idNum)
							: undefined) ??
						games.find(
							(g) => g.name.toLowerCase().replace(/\s+/g, "-") === seg,
						);
					const cover = game?.properties?.cover;
					if (cover) return { uri: cover } as ImageURISource;
				}
			}
		} catch {}
		return banner as ImageURISource;
	}, [pathname, games]);

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
					<Connection />
				</View>
			</View>
		</ImageBackground>
	);
}
