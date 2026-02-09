import { Linking, Pressable, View } from "react-native";
import {
	DiscordIcon,
	ExternalIcon,
	GitHubIcon,
	GlobeIcon,
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

	if (socials.website) {
		// Extract domain name for display
		let label = "Website";
		try {
			const url = new URL(socials.website);
			label = url.hostname.replace("www.", "");
		} catch {
			// Use default label
		}
		socialItems.push({
			key: "website",
			icon: <GlobeIcon size="sm" color="#ffffff" variant="solid" />,
			label,
			url: socials.website,
		});
	}

	if (socials.twitter) {
		const handle = socials.twitter.split("/").pop();
		socialItems.push({
			key: "twitter",
			icon: <XIcon size="sm" color="#ffffff" />,
			label: `@${handle}`,
			url: socials.twitter,
		});
	}

	if (socials.discord) {
		socialItems.push({
			key: "discord",
			icon: <DiscordIcon size="sm" color="#ffffff" />,
			label: "Discord",
			url: socials.discord,
		});
	}

	if (socials.telegram) {
		socialItems.push({
			key: "telegram",
			icon: <TelegramIcon size="sm" color="#ffffff" />,
			label: "Telegram",
			url: socials.telegram,
		});
	}

	if (socials.github) {
		socialItems.push({
			key: "github",
			icon: <GitHubIcon size="sm" color="#ffffff" />,
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
			<ExternalIcon size="xs" color="#6b7280" />
		</Pressable>
	);
}

/**
 * Get the appropriate icon for a URL
 * Returns a white icon for known services, or a generic link icon for unknown
 */
export function getIconForUrl(url: string): React.ReactNode {
	const lowerUrl = url.toLowerCase();
	
	if (lowerUrl.includes('discord')) {
		return <DiscordIcon size="sm" color="#ffffff" />;
	}
	if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) {
		return <XIcon size="sm" color="#ffffff" />;
	}
	if (lowerUrl.includes('telegram') || lowerUrl.includes('t.me')) {
		return <TelegramIcon size="sm" color="#ffffff" />;
	}
	if (lowerUrl.includes('github')) {
		return <GitHubIcon size="sm" color="#ffffff" />;
	}
	
	// Generic link icon for unknown URLs
	return <ExternalIcon size="sm" color="#ffffff" />;
}

/**
 * Get a display label for a URL
 */
export function getLabelForUrl(url: string): string {
	const lowerUrl = url.toLowerCase();
	
	if (lowerUrl.includes('discord')) {
		return 'Discord';
	}
	if (lowerUrl.includes('twitter')) {
		const handle = url.split('/').pop();
		return handle ? `@${handle}` : 'Twitter';
	}
	if (lowerUrl.includes('x.com')) {
		const handle = url.split('/').pop();
		return handle ? `@${handle}` : 'X';
	}
	if (lowerUrl.includes('telegram') || lowerUrl.includes('t.me')) {
		return 'Telegram';
	}
	if (lowerUrl.includes('github')) {
		return 'GitHub';
	}
	
	// Extract domain for unknown URLs
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.replace('www.', '');
	} catch {
		return 'Link';
	}
}
