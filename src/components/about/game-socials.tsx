import { Linking, Pressable, View } from "react-native";
import {
	DiscordIcon,
	ExternalIcon,
	GitHubIcon,
	TelegramIcon,
	Text,
	toast,
	XIcon,
} from "#components";

interface GameSocialsProps {
	socials?: {
		website?: string;
		discord?: string;
		telegram?: string;
		twitter?: string;
		github?: string;
		youtube?: string;
	};
}

export function GameSocials({ socials }: GameSocialsProps) {
	if (!socials) return null;

	const socialItems = [];

	if (socials.twitter) {
		const handle = socials.twitter.split("/").pop();
		socialItems.push({
			key: "twitter",
			icon: <XIcon size="sm" />,
			label: `@${handle}`,
			url: socials.twitter,
		});
	}

	if (socials.discord) {
		socialItems.push({
			key: "discord",
			icon: <DiscordIcon size="sm" />,
			label: "Discord",
			url: socials.discord,
		});
	}

	if (socials.telegram) {
		socialItems.push({
			key: "telegram",
			icon: <TelegramIcon size="sm" />,
			label: "Telegram",
			url: socials.telegram,
		});
	}

	if (socials.github) {
		socialItems.push({
			key: "github",
			icon: <GitHubIcon size="sm" />,
			label: "GitHub",
			url: socials.github,
		});
	}

	if (socialItems.length === 0) return null;

	return (
		<View className="flex-col gap-px bg-background-300 rounded-md overflow-hidden">
			{socialItems.map((item) => (
				<SocialButton
					key={item.key}
					icon={item.icon}
					label={item.label}
					url={item.url}
				/>
			))}
		</View>
	);
}

interface SocialButtonProps {
	icon: React.ReactNode;
	label: string;
	url: string;
}

function SocialButton({ icon, label, url }: SocialButtonProps) {
	const handlePress = async () => {
		try {
			const supported = await Linking.canOpenURL(url);
			if (supported) {
				await Linking.openURL(url);
			} else {
				toast.error("Cannot open link");
			}
		} catch (_error) {
			toast.error("Failed to open link");
		}
	};

	return (
		<Pressable
			onPress={handlePress}
			className="flex-row items-center justify-between px-3 py-2.5 bg-background-200"
		>
			<View className="flex-row items-center gap-2">
				{icon}
				<Text className="text-xs text-foreground-100">{label}</Text>
			</View>
			<ExternalIcon size="xs" className="text-background-500" />
		</Pressable>
	);
}
