import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { ImageBackground, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, HamburgerIcon, SearchIcon, Text } from "#components";
import { useColorScheme } from "#hooks";

export function Header() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { isDarkColorScheme } = useColorScheme();

	const coverDark =
		"https://static.cartridge.gg/presets/cartridge/cover-dark.png";
	const coverLight =
		"https://static.cartridge.gg/presets/cartridge/cover-light.png";
	const cover = isDarkColorScheme ? coverDark : coverLight;

	return (
		<ImageBackground
			source={{ uri: cover }}
			resizeMode="cover"
			imageStyle={{ opacity: 0.35 }}
			className="w-full bg-background-200 border-b border-spacer-100"
			style={{ paddingTop: insets.top > 0 ? insets.top : 16 }}
		>
			<View className="flex-row items-center justify-between p-3">
				{/* Left: Hamburger to open drawer */}
				<Button
					variant="icon"
					size="icon"
					accessibilityRole="button"
					accessibilityLabel="Open menu"
					onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
				>
					<HamburgerIcon />
				</Button>

				{/* Right: Search pill and CONNECT tag */}
				<View className="flex-row items-center gap-3">
					<Button
						variant="icon"
						size="icon"
						accessibilityRole="button"
						accessibilityLabel="Search"
					>
						<SearchIcon />
					</Button>
					<Button
						variant="outline"
						accessibilityRole="button"
						accessibilityLabel="Connect"
					>
						<Text className="text-primary text-sm font-medium">CONNECT</Text>
					</Button>
				</View>
			</View>
		</ImageBackground>
	);
}
