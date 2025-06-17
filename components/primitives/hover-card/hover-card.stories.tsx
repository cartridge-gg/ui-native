import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
	title: "Primitives/Hover Card",
	component: HoverCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger>Hover</HoverCardTrigger>
			<HoverCardContent>
				<Text variant="body">
					Some insightful information about the hover trigger
				</Text>
			</HoverCardContent>
		</HoverCard>
	),
};

export const WithUserProfile: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<HoverCard>
				<HoverCardTrigger>
					<Text variant="sans-medium-14" className="text-theme-primary">
						@username
					</Text>
				</HoverCardTrigger>
				<HoverCardContent>
					<View className="flex-row gap-3 mb-2">
						<View className="w-10 h-10 rounded-full bg-blue-500" />
						<View>
							<Text variant="sans-semibold-14" className="mb-0.5">
								John Doe
							</Text>
							<Text variant="caption" className="text-theme-foreground-muted">
								@username
							</Text>
						</View>
					</View>
					<Text variant="body" className="mb-2">
						Software engineer passionate about building great user experiences.
					</Text>
					<View className="flex-row gap-4">
						<Text variant="caption" className="text-theme-foreground-muted">
							<Text className="text-theme-foreground">1,234</Text> Following
						</Text>
						<Text variant="caption" className="text-theme-foreground-muted">
							<Text className="text-theme-foreground">5,678</Text> Followers
						</Text>
					</View>
				</HoverCardContent>
			</HoverCard>
		);
	},
};

export const WithRichContent: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<HoverCard>
				<HoverCardTrigger>
					<Button variant="tertiary">Product Info</Button>
				</HoverCardTrigger>
				<HoverCardContent>
					<View className="mb-3">
						<View className="w-full h-20 bg-blue-500 rounded mb-2" />
						<Text variant="sans-semibold-14" className="mb-1">
							Premium Subscription
						</Text>
						<Text variant="body" className="text-theme-foreground-muted mb-2">
							Unlock all features and get priority support.
						</Text>
						<Text variant="sans-semibold-14" className="text-theme-primary">
							$9.99/month
						</Text>
					</View>
					<View className="flex-row gap-2">
						<Button variant="primary">Subscribe</Button>
						<Button variant="secondary">Learn More</Button>
					</View>
				</HoverCardContent>
			</HoverCard>
		);
	},
};

export const ControlledHoverCard: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);

		return (
			<View className="gap-3">
				<HoverCard open={open} onOpenChange={setOpen}>
					<HoverCardTrigger>
						<Button variant="primary">Controlled Hover Card</Button>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text variant="sans-semibold-14" className="mb-2">
							Controlled State
						</Text>
						<Text variant="body" className="mb-3">
							This hover card's open state is controlled by the parent
							component.
						</Text>
						<Button variant="secondary" onPress={() => setOpen(false)}>
							Close
						</Button>
					</HoverCardContent>
				</HoverCard>

				<Button variant="outline" onPress={() => setOpen(true)}>
					Open from External Button
				</Button>
			</View>
		);
	},
};
