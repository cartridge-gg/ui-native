import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
	Dimensions,
	Image,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	ScrollView,
	View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Text } from "#components";
import { cn } from "#utils";

const { width: screenWidth } = Dimensions.get("window");
// Full width minus padding (16px on each side = 32px total)
const ITEM_WIDTH = screenWidth - 32;
const ITEM_HEIGHT = (ITEM_WIDTH * 9) / 16; // 16:9 aspect ratio

function extractYouTubeId(url: string): string {
	const match = url.match(
		/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=|\/shorts\/))([\w-]{11})/,
	);
	return match?.[1] || "";
}

export function AboutMedia({ items }: { items: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (items.length === 0) return null;

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(offsetX / ITEM_WIDTH);
		setCurrentIndex(index);
	};

	// For single item, render without ScrollView for better centering
	if (items.length === 1) {
		return (
			<View className="flex-col gap-2">
				<View className="h-10 flex flex-row items-center justify-between">
					<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
						Media
					</Text>
				</View>
				<View className="items-center">
					<MediaItem uri={items[0]} isActive={true} />
				</View>
			</View>
		);
	}

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
								key={`dot-${index}`}
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
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				onScroll={handleScroll}
				scrollEventThrottle={16}
				contentContainerStyle={{ alignItems: 'center' }}
			>
				{items.map((item, index) => (
					<MediaItem key={`media-${index}`} uri={item} isActive={currentIndex === index} />
				))}
			</ScrollView>
		</View>
	);
}

function MediaItem({ uri, isActive }: { uri: string; isActive: boolean }) {
	const isVideo = /\.(mp4|mov|m4v|webm)$/i.test(uri);
	const isYouTube = uri.includes("youtu");

	const player = useVideoPlayer(isVideo ? uri : "", (player) => {
		player.loop = true;
		player.play();
	});

	if (isVideo) {
		return (
			<VideoView
				player={player}
				style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
				className="rounded-lg overflow-hidden"
				contentFit="contain"
				allowsFullscreen
				allowsPictureInPicture
			/>
		);
	}

	if (isYouTube) {
		const videoId = extractYouTubeId(uri);
		return (
			<View
				style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
				className="rounded-lg overflow-hidden bg-background-300"
			>
				<YoutubePlayer
					height={ITEM_HEIGHT}
					width={ITEM_WIDTH}
					videoId={videoId}
					play={isActive}
					webViewProps={{
						injectedJavaScript: `
              var element = document.getElementsByClassName('container')[0];
              element.style.position = 'unset';
              element.style.paddingBottom = 'unset';
              true;
            `,
					}}
				/>
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
