import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade } from "#clone/arcade/hooks/arcade";
import { Input, Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export function SideDrawer() {
	const insets = useSafeAreaInsets();
	const { games } = useArcade();
	const [search, setSearch] = useState("");

	const filteredGames = games.filter((g) =>
		g.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<View
			className="flex-1 bg-background-200"
			style={{ paddingTop: insets.top }}
		>
			<View className="flex-1 flex-col">
				<View className="p-4">
					<Input
						placeholder="Search"
						value={search}
						onChangeText={setSearch}
						className="border-background-300 hover:border-background-300 focus-visible:border-background-300 focus-visible:bg-background-200 bg-spacer"
					/>
				</View>

				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<View className="px-3">
						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Arcade
						</Text>
						<Pressable
							onPress={() => {
								router.push(`/activity`);
							}}
							className="flex-row items-center p-3 rounded-lg active:bg-background-100"
						>
							<Image
								className="size-8 rounded-lg mr-3"
								source={require("../../assets/icon.png")}
							/>
							<Text className="text-foreground text-sm flex-1">Arcade</Text>
						</Pressable>

						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Games
						</Text>
						<View className="pb-4">
							{filteredGames.map((g) => (
								<Pressable
									key={g.id}
									onPress={() => {
										router.push(`/game/${g.id}/activity`);
									}}
									className="flex-row items-center p-3 rounded-lg active:bg-background-100"
								>
									{g.properties?.icon ? (
										<Image
											className="size-8 rounded-lg mr-3"
											source={{ uri: g.properties.icon }}
										/>
									) : (
										<View className="size-8 rounded-lg mr-3 bg-background-150" />
									)}
									<Text className="text-foreground text-sm flex-1">
										{g.name}
									</Text>
								</Pressable>
							))}
						</View>
					</View>
				</ScrollView>
				<View
					className="p-3 border-t border-background-100 bg-background-100"
					style={{
						height: TAB_BAR_HEIGHT + insets.bottom,
						paddingBottom: insets.bottom,
					}}
				>
					<Pressable className="bg-background-100 flex-row items-center justify-center p-3 rounded-lg">
						<Text className="text-foreground-300 mr-2">+</Text>
						<Text className="text-foreground-300 text-sm font-medium">
							Register Game
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
