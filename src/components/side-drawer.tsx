import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade } from "#clone/arcade";
import { Input, Text, Thumbnail } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export function SideDrawer() {
	const insets = useSafeAreaInsets();
	const { games } = useArcade();
	const [search, setSearch] = useState("");

	const filteredGames = games.filter((g) =>
		g.name.toLowerCase().includes(search.toLowerCase()),
	);

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

				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<View className="px-3">
						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Arcade
						</Text>
						{/* biome-ignore lint/nursery/useUniqueElementIds: this is static */}
						<Item id="arcade" title="Arcade" />

						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Games
						</Text>
						<View className="gap-1">
							{filteredGames.map((g) => (
								<Item
									key={g.id}
									id={g.id.toString()}
									icon={g.properties.icon}
									title={g.name}
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
}: {
	id: string;
	icon?: string;
	title: string;
}) {
	const router = useRouter();

	const handlePress = () => {
		const href = id === "arcade" ? "/marketplace" : `/game/${id}/marketplace`;
		router.replace(href);
	};

	return (
		<Pressable
			key={id}
			onPress={handlePress}
			className="flex-row items-center p-3 active:bg-background-100 gap-2"
		>
			{id === "arcade" ? (
				<Thumbnail
					icon={require("#assets/icon.png")}
					size="md"
					variant="default"
				/>
			) : icon ? (
				<Thumbnail icon={icon} size="md" variant="default" />
			) : (
				<View className="size-8 bg-background-200 rounded items-center justify-center">
					<Text>{id[0].toUpperCase()}</Text>
				</View>
			)}
			<Text className="text-foreground text-sm flex-1 font-medium">
				{title}
			</Text>
		</Pressable>
	);
}
