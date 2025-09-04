import { Image, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade } from "#clone/arcade/hooks/arcade";
import { Text } from "#components";

export function SideDrawer() {
	const insets = useSafeAreaInsets();
	const { games } = useArcade();

	return (
		<View
			className="flex-1 bg-background-200"
			style={{ paddingTop: insets.top }}
		>
			<View className="flex-1 flex-col">
				<View className="bg-primary-100 bg-opacity-60 p-3 flex-row items-center">
					<View className="w-6 h-6 bg-background-200 rounded mr-3" />
					<Text className="text-primary font-semibold text-white">
						All Games
					</Text>
				</View>

				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<View className="p-2">
						{games.map((g) => (
							<Pressable
								key={g.id}
								onPress={() => {}}
								className="flex-row items-center p-3 rounded-lg active:bg-background-100"
							>
								<Image
									source={{ uri: g.image }}
									className="size-8 rounded-lg"
								/>
								<Text className="text-foreground text-sm flex-1">{g.name}</Text>
							</Pressable>
						))}
					</View>
				</ScrollView>

				<View className="h-[90px] p-3 border-t border-background-100">
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
