import { useState } from "react";
import {
	Dimensions,
	Image,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	ScrollView,
	View,
} from "react-native";
import { Text } from "#components";
import { cn } from "#utils";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = screenWidth - 32 - 16; // Padding minus gap
const ITEM_HEIGHT = (ITEM_WIDTH * 9) / 16; // 16:9 aspect ratio

export function AboutMedia({ items }: { items: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (items.length === 0) return null;

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(offsetX / (ITEM_WIDTH + 16));
		setCurrentIndex(index);
	};

	return (
		<View className="flex-col gap-2">
			<View className="h-10 flex flex-row items-center justify-between">
				<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
					Media
				</Text>
				{items.length > 1 && (
					<View className="flex-row gap-1">
						{items.map((item, index) => (
							<View
								key={item}
								className={cn(
									"rounded-full bg-foreground-100",
									currentIndex === index ? "w-2 h-2" : "w-1.5 h-1.5 opacity-50",
								)}
							/>
						))}
					</View>
				)}
			</View>

			<ScrollView
				horizontal
				pagingEnabled={false}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				snapToInterval={ITEM_WIDTH + 16}
				snapToAlignment="start"
				onScroll={handleScroll}
				scrollEventThrottle={16}
				contentContainerStyle={{ gap: 16 }}
			>
				{items.map((item) => (
					<MediaItem key={item} uri={item} />
				))}
			</ScrollView>
		</View>
	);
}

function MediaItem({ uri }: { uri: string }) {
	const isYouTube = uri.includes("youtu");

	if (isYouTube) {
		// For YouTube videos, show a placeholder with info text
		// In a production app, you'd use expo-av or react-native-youtube-iframe
		return (
			<View
				style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
				className="rounded-lg overflow-hidden bg-background-200 items-center justify-center"
			>
				<Text className="text-xs text-foreground-400 text-center px-4">
					Video available on web
				</Text>
			</View>
		);
	}

	return (
		<Image
			source={{ uri }}
			style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
			className="rounded-lg"
			resizeMode="cover"
		/>
	);
}
