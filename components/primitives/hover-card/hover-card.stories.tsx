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
					<Text variant="sans-medium-14" style={{ color: colors.primary[100] }}>
						@username
					</Text>
				</HoverCardTrigger>
				<HoverCardContent>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 12,
						}}
					>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 20,
								backgroundColor: colors.background[300],
								marginRight: 12,
							}}
						/>
						<View>
							<Text variant="sans-semibold-14" style={{ marginBottom: 2 }}>
								John Doe
							</Text>
							<Text variant="caption" style={{ color: colors.foreground[400] }}>
								@username
							</Text>
						</View>
					</View>
					<Text variant="body" style={{ marginBottom: 8 }}>
						Software engineer passionate about building great user experiences.
					</Text>
					<View style={{ flexDirection: "row", gap: 16 }}>
						<Text variant="caption" style={{ color: colors.foreground[400] }}>
							<Text style={{ color: colors.foreground[100] }}>1,234</Text>{" "}
							Following
						</Text>
						<Text variant="caption" style={{ color: colors.foreground[400] }}>
							<Text style={{ color: colors.foreground[100] }}>5,678</Text>{" "}
							Followers
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
					<View style={{ marginBottom: 12 }}>
						<View
							style={{
								width: "100%",
								height: 80,
								borderRadius: 6,
								backgroundColor: colors.background[300],
								marginBottom: 8,
							}}
						/>
						<Text variant="sans-semibold-14" style={{ marginBottom: 4 }}>
							Premium Subscription
						</Text>
						<Text
							variant="body"
							style={{ color: colors.foreground[400], marginBottom: 8 }}
						>
							Unlock all features with our premium plan
						</Text>
						<Text
							variant="sans-semibold-14"
							style={{ color: colors.primary[100] }}
						>
							$9.99/month
						</Text>
					</View>
					<View style={{ flexDirection: "row", gap: 8 }}>
						<Button variant="primary">Subscribe</Button>
						<Button variant="outline">Learn More</Button>
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
			<View style={{ gap: 12 }}>
				<HoverCard open={open} onOpenChange={setOpen}>
					<HoverCardTrigger>
						<Button variant="primary">Controlled Hover Card</Button>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text variant="sans-semibold-14" style={{ marginBottom: 8 }}>
							Controlled State
						</Text>
						<Text variant="body" style={{ marginBottom: 12 }}>
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
