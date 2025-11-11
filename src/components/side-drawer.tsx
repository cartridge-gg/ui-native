import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade } from "#clone/arcade";
import { Input, Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";
import { GameIcon } from "./game-icon";

export function SideDrawer({ navigation }: DrawerContentComponentProps) {
	const insets = useSafeAreaInsets();
	const arcade = useArcade();
	const { gamesList, version } = arcade;
	const [search, setSearch] = useState("");

	// Filter the pre-processed lightweight list
	const filteredGames = useMemo(() => {
		if (!search) {
			return gamesList; // Already lightweight!
		}
		
		// Filter by search
		const searchLower = search.toLowerCase();
		return gamesList.filter(g => g.name.toLowerCase().includes(searchLower));
	}, [version, search]); // Depend on version, not gamesList!

	return (
		<View className="flex-1" style={{ paddingTop: insets.top }}>
			<View className="flex-1 flex-col">
				<View className="p-4">
					<Input
						placeholder="Search"
						value={search}
						onChangeText={setSearch}
						className="border-background-300 hover:border-background-300 focus-visible:border-background-300 focus-visible:bg-background-200 bg-spacer"
					/>
				</View>

				<ScrollView 
					className="flex-1" 
					showsVerticalScrollIndicator={false}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					updateCellsBatchingPeriod={50}
					initialNumToRender={10}
					windowSize={10}
				>
					<View className="px-3">
						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Arcade
						</Text>
						{/* biome-ignore lint/nursery/useUniqueElementIds: this is static */}
						<Item 
							id="arcade" 
							title="Arcade" 
							navigation={navigation}
							icon={undefined}
						/>

						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Games
						</Text>
						<View className="gap-1">
							{filteredGames.map((g) => (
								<Item
									key={g.id}
									id={g.id.toString()}
									icon={g.icon}
									title={g.name}
									navigation={navigation}
								/>
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

function Item({
	id,
	icon,
	title,
	navigation,
}: {
	id: string;
	icon?: string;
	title: string;
	navigation: DrawerContentComponentProps["navigation"];
}) {
	return (
		<Link
			href={id === "arcade" ? "/marketplace" : `/game/${id}/marketplace`}
			replace
			asChild
		>
			<Pressable 
				className="flex-row items-center p-3 active:bg-background-100 gap-2"
				onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
			>
				<GameIcon 
					icon={icon} 
					title={title} 
					size="md" 
					variant={id === "arcade" ? "primary" : "default"}
				/>
				<Text className="text-foreground text-sm flex-1 font-medium">
					{title}
				</Text>
			</Pressable>
		</Link>
	);
}
