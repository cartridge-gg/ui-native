import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { PLACEHOLDER } from "ui/src/assets";
import { EthereumIcon, Text } from "#components";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardIcon,
	CardListContent,
	CardListItem,
	CardTitle,
	Card as UICard,
} from "./card";

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
	useEffect(() => {
		if (!icon) return;
		document.documentElement.style.setProperty(
			"--theme-icon-url",
			`url("https://x.cartridge.gg/whitelabel/dope-wars/icon.png")`,
		);
	}, [icon]);

	switch (variant) {
		case "content": {
			return (
				<UICard>
					<CardHeader icon={icon}>
						<CardTitle>{title}</CardTitle>
						{description && <CardDescription>{description}</CardDescription>}
					</CardHeader>
					<CardContent>
						<Text className="text-sm text-foreground leading-normal">
							Card Content
						</Text>
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
							<Text className="text-sm font-medium text-foreground leading-normal">
								No icon item
							</Text>
						</CardListItem>

						<CardListItem icon={PLACEHOLDER}>
							<Text className="text-sm font-medium text-foreground leading-normal">
								placeholder
							</Text>
						</CardListItem>

						<CardListItem icon={<EthereumIcon />}>
							<View className="flex-row items-center gap-2">
								<Text className="text-sm font-medium text-foreground leading-normal">
									0.01
								</Text>
								<Text className="text-sm font-medium text-foreground-400 leading-normal">
									ETH
								</Text>
							</View>

							<Text className="text-sm font-medium text-foreground-400 leading-normal">
								$3500.00
							</Text>
						</CardListItem>

						<CardListItem icon="https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1b126320-367c-48ed-cf5a-ba7580e49600/logo">
							<View className="flex-row items-center gap-2">
								<Text className="text-sm font-medium text-foreground leading-normal">
									100
								</Text>
								<Text className="text-sm font-medium text-foreground-400 leading-normal">
									STRK
								</Text>
							</View>

							<Text className="text-sm font-medium text-foreground-400 leading-normal">
								$50.00
							</Text>
						</CardListItem>
					</CardListContent>
				</UICard>
			);
		}
	}
}
