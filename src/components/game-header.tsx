import { useCallback } from "react";
import { ActionSheetIOS, Linking, Platform, Pressable, Share, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Feather } from "@expo/vector-icons";
import {
	ArrowFromLineIcon,
	Button,
	PlayIcon,
	Text,
	Thumbnail,
	toast,
	VerifiedBadgeIcon,
	WedgeIcon,
} from "#components";
import { useGameContext } from "../../../../contexts/GameContext";

export function GameHeader() {
	const {
		currentGameName,
		currentGameColor,
		currentGameLogo,
		currentGameExternalUrl,
		editions,
		selectedEdition,
		setSelectedEdition,
		hasMultipleEditions,
	} = useGameContext();

	const showEditionPicker = useCallback(() => {
		if (!hasMultipleEditions) return;

		if (Platform.OS === 'ios') {
			// Use native iOS ActionSheet
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
			// For Android, use a simple alert with options
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

	// Get the game URL
	const getGameUrl = useCallback(() => {
		return currentGameExternalUrl || 
			`https://cartridge.gg/game/${currentGameName.toLowerCase().replace(/\s+/g, "-")}`;
	}, [currentGameName, currentGameExternalUrl]);

	// Share game using native share sheet
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

	// Open in-app browser (like controller connect)
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

	// Open externally in system browser
	const onOpenExternal = useCallback(async () => {
		const gameUrl = getGameUrl();

		try {
			const supported = await Linking.canOpenURL(gameUrl);
			if (supported) {
				await Linking.openURL(gameUrl);
			} else {
				toast.error("Cannot open game URL");
			}
		} catch (_error) {
			toast.error("Failed to open game");
		}
	}, [getGameUrl]);

	const currentEditionName = selectedEdition?.name ?? editions[0]?.name ?? 'v1.0.0';
	
	// Darker gray color for less bright elements
	const subtleColor = '#6b7280';

	return (
		<View className="p-4 bg-background">
			{/* Game Info Card */}
			<View className="p-4 rounded-lg border border-foreground-400/20">
				<View className="flex-row gap-3 items-center">
					{/* Game Logo */}
					<Thumbnail
						icon={currentGameLogo}
						size="xxl"
						variant="default"
						rounded={false}
					/>
					
					{/* Game Info */}
					<View className="flex-1 gap-2">
						<Text className="text-xl font-semibold leading-6">{currentGameName}</Text>

						{/* Action Buttons Row */}
						<View className="flex-row gap-2 items-center">
							{/* Editions Dropdown */}
							<Pressable
								onPress={showEditionPicker}
								disabled={!hasMultipleEditions}
								className="flex-row items-center gap-1.5 px-3 py-1.5 rounded"
								style={{ 
									backgroundColor: hasMultipleEditions ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
									opacity: hasMultipleEditions ? 1 : 0.5,
								}}
							>
								{/* Checkmark */}
								<VerifiedBadgeIcon style={{ width: 12, height: 12 }} color={subtleColor} />
								<Text 
									className="text-sm"
									style={{ color: hasMultipleEditions ? subtleColor : '#52525b' }}
								>
									{currentEditionName}
								</Text>
								{hasMultipleEditions && (
									<WedgeIcon variant="down" size="xs" color={subtleColor} />
								)}
							</Pressable>

							{/* Share Button */}
							<Button
								variant="icon"
								size="icon"
								onPress={onShare}
								className="w-8 h-8 rounded items-center justify-center"
								style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
							>
								<ArrowFromLineIcon variant="up" size="sm" color={subtleColor} />
							</Button>
						</View>
					</View>
				</View>

				{/* Play Button Row */}
				<View className="flex-row gap-2 mt-4 items-center">
					{/* Main Play Button - opens in-app browser */}
					<Pressable
						onPress={onPlay}
						className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2"
						style={{ backgroundColor: currentGameColor }}
					>
						<PlayIcon size="sm" color="#000000" />
						<Text style={{ color: '#000000', fontWeight: '600' }}>Play</Text>
					</Pressable>

					{/* External Link Button */}
					<Pressable
						onPress={onOpenExternal}
						className="w-11 h-11 rounded-full items-center justify-center"
						style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
					>
						<Feather name="external-link" size={18} color="#ffffff" />
					</Pressable>
				</View>
			</View>
		</View>
	);
}
