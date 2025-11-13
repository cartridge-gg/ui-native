import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowIcon, Text } from '#components';

export interface BackButtonProps {
	onPress?: () => void;
	text?: string;
}

export function BackButton({ onPress, text = 'Back' }: BackButtonProps) {
	const router = useRouter();
	
	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.back();
		}
	};
	
	return (
		<Pressable
			onPress={handlePress}
			className="flex-row items-center gap-2 px-3 py-2.5 border border-foreground-400/30 rounded-lg active:opacity-70"
		>
			<ArrowIcon variant="left" size="sm" color="#808080" />
			<Text className="text-foreground-400 text-sm">{text}</Text>
		</Pressable>
	);
}

