import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "./Modal";

const meta: Meta<typeof Modal> = {
	title: "Primitives/Modal",
	component: Modal,
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View>
				<Button onPress={() => setVisible(true)}>Open Modal</Button>

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					title="Basic Modal"
				>
					<Text>This is a basic modal with a title and close button.</Text>
				</Modal>
			</View>
		);
	},
};

export const WithoutTitle: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View>
				<Button onPress={() => setVisible(true)}>Open Modal</Button>

				<Modal visible={visible} onClose={() => setVisible(false)}>
					<Text>This modal has no title, just content and a close button.</Text>
				</Modal>
			</View>
		);
	},
};

export const WithHeaderContentFooter: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View>
				<Button onPress={() => setVisible(true)}>Open Modal</Button>

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					showCloseButton={false}
				>
					<ModalHeader>
						<Text className="text-lg font-bold">Custom Header</Text>
						<Text className="text-xs text-gray-500 mt-1">
							This is a custom header with description
						</Text>
					</ModalHeader>

					<ModalContent>
						<Text className="mb-3">
							This modal uses the compound component pattern with separate
							header, content, and footer sections.
						</Text>
						<Text className="text-xs text-gray-500">
							You can customize each section independently.
						</Text>
					</ModalContent>

					<ModalFooter>
						<Button variant="secondary" onPress={() => setVisible(false)}>
							Cancel
						</Button>
						<Button onPress={() => setVisible(false)}>Confirm</Button>
					</ModalFooter>
				</Modal>
			</View>
		);
	},
};

export const LongContent: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View>
				<Button onPress={() => setVisible(true)}>Open Modal</Button>

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					title="Long Content Modal"
				>
					<Text className="mb-3">
						This modal contains a lot of content to demonstrate scrolling
						behavior.
					</Text>
					{Array.from({ length: 10 }, (_, i) => (
						<Text key={i} className="mb-2 text-xs text-gray-500">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris.
						</Text>
					))}
				</Modal>
			</View>
		);
	},
};

export const ConfirmationDialog: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View>
				<Button variant="destructive" onPress={() => setVisible(true)}>
					Delete Item
				</Button>

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					title="Confirm Deletion"
					showCloseButton={false}
				>
					<ModalContent>
						<Text className="mb-2">
							Are you sure you want to delete this item?
						</Text>
						<Text className="text-xs text-gray-500">
							This action cannot be undone.
						</Text>
					</ModalContent>

					<ModalFooter>
						<Button variant="secondary" onPress={() => setVisible(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onPress={() => setVisible(false)}>
							Delete
						</Button>
					</ModalFooter>
				</Modal>
			</View>
		);
	},
};
