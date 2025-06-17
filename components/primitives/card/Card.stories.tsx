import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardIcon,
	CardListContent,
	CardListItem,
	CardTitle,
	Card as UICard,
} from "./Card";

// Placeholder for EthereumIcon since it doesn't exist in UI-native yet
const EthereumIcon = () => <View className="w-4 h-4 bg-blue-600 rounded-lg" />;

// Placeholder asset (base64 SVG converted to a simple placeholder)
const PLACEHOLDER = "https://via.placeholder.com/24x24/cccccc/666666?text=P";

// Mock icon component
const MockIcon = ({ size = 16 }: { size?: number }) => (
	<View
		className="bg-blue-500 rounded justify-center items-center"
		style={{
			width: size,
			height: size,
		}}
	>
		<Text className="text-white text-xs font-bold">I</Text>
	</View>
);

const ColoredBox = ({ size = 40 }: { size?: number }) => (
	<View className="w-4 h-4 bg-blue-500 rounded" />
);

const SizeBox = ({ size }: { size: number }) => (
	<View
		className="bg-blue-500 rounded justify-center items-center"
		style={{
			width: size,
			height: size,
		}}
	>
		<Text variant="caption" className="text-white">
			{size}
		</Text>
	</View>
);

const meta: Meta<typeof Card> = {
	title: "Primitives/Card",
	component: Card,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		title: "Card Title",
		description: "Card Description",
	},
};

export const OnlyTitle: Story = {
	args: {
		title: "Card Title",
	},
};

export const IconHeader: Story = {
	args: {
		title: "Card Title",
		icon: <CardIcon />,
	},
};

export const CardList: Story = {
	args: {
		variant: "list",
		title: "Card List Content",
	},
};

function Card({
	variant = "content",
	title,
	description,
	icon,
}: {
	variant?: "content" | "list";
	title: string;
	description?: string;
	icon?: React.ReactNode;
}) {
	switch (variant) {
		case "content": {
			return (
				<UICard>
					<CardHeader icon={icon}>
						<CardTitle>{title}</CardTitle>
						{description && <CardDescription>{description}</CardDescription>}
					</CardHeader>
					<CardContent>
						<Text>Card Content</Text>
					</CardContent>
				</UICard>
			);
		}
		case "list": {
			return (
				<UICard>
					<CardHeader icon={icon}>
						<CardTitle>{title}</CardTitle>
						{description && <CardDescription>{description}</CardDescription>}
					</CardHeader>

					<CardListContent>
						<CardListItem>
							<Text>No icon item</Text>
						</CardListItem>

						<CardListItem icon={PLACEHOLDER}>
							<Text>placeholder</Text>
						</CardListItem>

						<CardListItem icon={<EthereumIcon />}>
							<View className="flex-row items-center gap-2">
								<Text>0.01</Text>
								<Text color="tertiary">ETH</Text>
							</View>
							<Text color="tertiary">$3500.00</Text>
						</CardListItem>

						<CardListItem icon="https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1b126320-367c-48ed-cf5a-ba7580e49600/logo">
							<View className="flex-row items-center gap-2">
								<Text>100</Text>
								<Text color="tertiary">STRK</Text>
							</View>
							<Text color="tertiary">$50.00</Text>
						</CardListItem>

						<View className="flex-row items-center gap-2">
							<ColoredBox />
							<Text variant="body">Item with colored indicator</Text>
						</View>

						<View className="flex-row items-center gap-2">
							<ColoredBox />
							<Text variant="body">Another item</Text>
						</View>
					</CardListContent>
				</UICard>
			);
		}
	}
}
