import { useCallback } from "react";
import { ActionSheetIOS, ImageBackground, Linking, Platform, Pressable, Share, View } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import {
	PlayIcon,
	Text,
	Thumbnail,
	toast,
	VerifiedBadgeIcon,
	WedgeIcon,
} from "#components";
import { useGameContext } from "../../../../contexts/GameContext";

export function GameHeader() {
	const router = useRouter();
	const {
		currentGameName,
		currentGameColor,
		currentGameLogo,
		currentGameCover,
		currentGameExternalUrl,
		editions,
		selectedEdition,
		setSelectedEdition,
		hasMultipleEditions,
	} = useGameContext();

	const showEditionPicker = useCallback(() => {
		if (!hasMultipleEditions) return;

		if (Platform.OS === 'ios') {
			const options = [...editions.map(e => e.name), 'Cancel'];
			const cancelButtonIndex = options.length - 1;

			ActionSheetIOS.showActionSheetWithOptions(
				{
					options,
					cancelButtonIndex,
					title: 'Select Edition',
					destructiveButtonIndex: undefined,
				},
				(buttonIndex) => {
					if (buttonIndex !== cancelButtonIndex && buttonIndex < editions.length) {
						setSelectedEdition(editions[buttonIndex]);
					}
				}
			);
		} else {
			const { Alert } = require('react-native');
			Alert.alert(
				'Select Edition',
				undefined,
				[
					...editions.map((edition) => ({
						text: edition.name,
						onPress: () => setSelectedEdition(edition),
					})),
					{ text: 'Cancel', style: 'cancel' },
				]
			);
		}
	}, [hasMultipleEditions, editions, setSelectedEdition]);

	const getGameUrl = useCallback(() => {
		return currentGameExternalUrl || 
			`https://cartridge.gg/game/${currentGameName.toLowerCase().replace(/\s+/g, "-")}`;
	}, [currentGameName, currentGameExternalUrl]);

	const onShare = useCallback(async () => {
		const gameUrl = getGameUrl();
		
		try {
			await Share.share({
				message: Platform.OS === 'ios' 
					? `Check out ${currentGameName} on Arcade!`
					: `Check out ${currentGameName} on Arcade! ${gameUrl}`,
				url: Platform.OS === 'ios' ? gameUrl : undefined,
				title: currentGameName,
			});
		} catch (_error) {
			toast.error("Failed to share");
		}
	}, [currentGameName, getGameUrl]);

	const onPlay = useCallback(async () => {
		const gameUrl = getGameUrl();

		try {
			await WebBrowser.openBrowserAsync(gameUrl, {
				presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
				controlsColor: currentGameColor,
				toolbarColor: '#000000',
			});
		} catch (_error) {
			toast.error("Failed to open game");
		}
	}, [getGameUrl, currentGameColor]);

	const onClose = useCallback(() => {
		router.back();
	}, [router]);

	const currentEditionName = selectedEdition?.name ?? editions[0]?.name ?? 'v1.0.0';
	const subtleColor = '#71717a';

	return (
		<View className="px-4 pt-4 pb-2 bg-background">
			{/* Game Info Card with Background Image */}
			<View className="rounded-xl overflow-hidden border border-foreground-400/20">
				<ImageBackground
					source={currentGameCover ? { uri: currentGameCover } : undefined}
					resizeMode="cover"
					imageStyle={{ opacity: 0.4 }}
				>
					{/* Gradient overlay */}
					<LinearGradient
						colors={["rgba(22, 26, 23, 0.9)", "rgba(22, 26, 23, 0.7)", "rgba(22, 26, 23, 0.9)"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						className="p-4 relative"
					>
						{/* Close button - absolute top right corner */}
						<Pressable
							onPress={onClose}
							className="absolute top-0 right-0 w-10 h-10 rounded-bl-lg items-center justify-center bg-background z-10 border-l border-b border-background-200"
						>
							<Feather name="x" size={20} color="#ffffff" />
						</Pressable>

						{/* Main content - vertically centered with game logo */}
						<View className="flex-row gap-4 items-center">
							{/* Game Logo */}
							<Thumbnail
								icon={currentGameLogo}
								size="xxl"
								variant="default"
								rounded={false}
							/>
							
							{/* Game Info - Right side, stacked vertically */}
							<View className="flex-1 justify-center gap-0">
								{/* Game Name */}
								<Text className="text-xl font-bold" style={{ color: '#ffffff' }} numberOfLines={1}>
									{currentGameName}
								</Text>

								{/* Action Buttons Row */}
								<View className="flex-row gap-2 items-center">
									{/* Editions Dropdown */}
									<Pressable
										onPress={showEditionPicker}
										disabled={!hasMultipleEditions}
										className="flex-row items-center gap-1.5 px-3 h-10 rounded-lg bg-background-200"
										style={{ 
											opacity: hasMultipleEditions ? 1 : 0.6,
										}}
									>
										<VerifiedBadgeIcon style={{ width: 14, height: 14 }} color={subtleColor} />
										<Text style={{ color: subtleColor, fontSize: 14 }}>{currentEditionName}</Text>
										{hasMultipleEditions && (
											<WedgeIcon variant="down" size="xs" color={subtleColor} />
										)}
									</Pressable>

									{/* Spacer */}
									<View className="flex-1" />

									{/* Share Button */}
									<Pressable
										onPress={onShare}
										className="w-10 h-10 rounded-lg items-center justify-center bg-background-200"
									>
										<Feather name="share-2" size={18} color={subtleColor} />
									</Pressable>

									{/* Play Button */}
									<Pressable
										onPress={onPlay}
										className="w-10 h-10 rounded-lg items-center justify-center"
										style={{ backgroundColor: currentGameColor }}
									>
										<PlayIcon size="sm" color="#000000" />
									</Pressable>
								</View>
							</View>
						</View>
					</LinearGradient>
				</ImageBackground>
			</View>
		</View>
	);
}
