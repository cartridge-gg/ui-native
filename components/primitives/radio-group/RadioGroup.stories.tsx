import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
	title: "Primitives/Radio Group",
	component: RadioGroup,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioGroup defaultValue="option-one">
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-one" />
				<Text variant="body">Option One</Text>
			</View>
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-two" />
				<Text variant="body">Option Two</Text>
			</View>
		</RadioGroup>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("option-one");

		return (
			<View className="gap-4">
				<Text variant="label">Selected: {value}</Text>
				<RadioGroup value={value} onValueChange={setValue}>
					<View className="flex-row items-center gap-2">
						<RadioGroupItem value="option-one" />
						<Text variant="body">Option One</Text>
					</View>
					<View className="flex-row items-center gap-2">
						<RadioGroupItem value="option-two" />
						<Text variant="body">Option Two</Text>
					</View>
					<View className="flex-row items-center gap-2">
						<RadioGroupItem value="option-three" />
						<Text variant="body">Option Three</Text>
					</View>
				</RadioGroup>
			</View>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<RadioGroup defaultValue="option-one" disabled>
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-one" />
				<Text variant="body" color="muted">
					Option One (Disabled)
				</Text>
			</View>
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-two" />
				<Text variant="body" color="muted">
					Option Two (Disabled)
				</Text>
			</View>
		</RadioGroup>
	),
};

export const IndividualDisabled: Story = {
	render: () => (
		<RadioGroup defaultValue="option-one">
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-one" />
				<Text variant="body">Option One</Text>
			</View>
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-two" disabled />
				<Text variant="body" color="muted">
					Option Two (Disabled)
				</Text>
			</View>
			<View className="flex-row items-center gap-2">
				<RadioGroupItem value="option-three" />
				<Text variant="body">Option Three</Text>
			</View>
		</RadioGroup>
	),
};

export const MultipleGroups: Story = {
	render: () => {
		const [group1Value, setGroup1Value] = useState("small");
		const [group2Value, setGroup2Value] = useState("red");

		return (
			<View className="gap-6">
				<View className="gap-3">
					<Text variant="label">Size</Text>
					<RadioGroup value={group1Value} onValueChange={setGroup1Value}>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="small" />
							<Text variant="body">Small</Text>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="medium" />
							<Text variant="body">Medium</Text>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="large" />
							<Text variant="body">Large</Text>
						</View>
					</RadioGroup>
				</View>

				<View className="gap-3">
					<Text variant="label">Color</Text>
					<RadioGroup value={group2Value} onValueChange={setGroup2Value}>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="red" />
							<Text variant="body">Red</Text>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="blue" />
							<Text variant="body">Blue</Text>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="green" />
							<Text variant="body">Green</Text>
						</View>
					</RadioGroup>
				</View>

				<View className="gap-1">
					<Text variant="caption" color="muted">
						Selected: {group1Value}, {group2Value}
					</Text>
				</View>
			</View>
		);
	},
};

export const FormExample: Story = {
	render: () => {
		const [paymentMethod, setPaymentMethod] = useState("card");
		const [deliveryMethod, setDeliveryMethod] = useState("standard");

		return (
			<View className="gap-6">
				<View className="gap-3">
					<Text variant="heading-lg">Payment Method</Text>
					<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="card" />
							<View>
								<Text variant="body">Credit Card</Text>
								<Text variant="caption" color="muted">
									Visa, Mastercard, Amex
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="paypal" />
							<View>
								<Text variant="body">PayPal</Text>
								<Text variant="caption" color="muted">
									Pay with your PayPal account
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="crypto" />
							<View>
								<Text variant="body">Cryptocurrency</Text>
								<Text variant="caption" color="muted">
									Bitcoin, Ethereum, etc.
								</Text>
							</View>
						</View>
					</RadioGroup>
				</View>

				<View className="gap-3">
					<Text variant="heading-lg">Delivery</Text>
					<RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="standard" />
							<View>
								<Text variant="body">Standard Delivery</Text>
								<Text variant="caption" color="muted">
									5-7 business days • Free
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="express" />
							<View>
								<Text variant="body">Express Delivery</Text>
								<Text variant="caption" color="muted">
									2-3 business days • $9.99
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<RadioGroupItem value="overnight" />
							<View>
								<Text variant="body">Overnight Delivery</Text>
								<Text variant="caption" color="muted">
									Next business day • $24.99
								</Text>
							</View>
						</View>
					</RadioGroup>
				</View>
			</View>
		);
	},
};
