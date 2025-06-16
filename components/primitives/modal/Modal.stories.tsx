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
				<Button title="Open Modal" onPress={() => setVisible(true)} />

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
				<Button title="Open Modal" onPress={() => setVisible(true)} />

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
				<Button title="Open Modal" onPress={() => setVisible(true)} />

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					showCloseButton={false}
				>
					<ModalHeader>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>
							Custom Header
						</Text>
						<Text style={{ fontSize: 12, color: "#808080", marginTop: 4 }}>
							This is a custom header with description
						</Text>
					</ModalHeader>

					<ModalContent>
						<Text style={{ marginBottom: 12 }}>
							This modal uses the compound component pattern with separate
							header, content, and footer sections.
						</Text>
						<Text style={{ fontSize: 12, color: "#808080" }}>
							You can customize each section independently.
						</Text>
					</ModalContent>

					<ModalFooter>
						<Button
							title="Cancel"
							variant="secondary"
							onPress={() => setVisible(false)}
						/>
						<Button title="Confirm" onPress={() => setVisible(false)} />
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
				<Button title="Open Modal" onPress={() => setVisible(true)} />

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					title="Long Content Modal"
				>
					<Text style={{ marginBottom: 12 }}>
						This modal contains a lot of content to demonstrate scrolling
						behavior.
					</Text>
					{Array.from({ length: 10 }, (_, i) => (
						<Text
							key={i}
							style={{ marginBottom: 8, fontSize: 12, color: "#808080" }}
						>
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
				<Button
					title="Delete Item"
					variant="destructive"
					onPress={() => setVisible(true)}
				/>

				<Modal
					visible={visible}
					onClose={() => setVisible(false)}
					title="Confirm Deletion"
					showCloseButton={false}
				>
					<ModalContent>
						<Text style={{ marginBottom: 8 }}>
							Are you sure you want to delete this item?
						</Text>
						<Text style={{ fontSize: 12, color: "#808080" }}>
							This action cannot be undone.
						</Text>
					</ModalContent>

					<ModalFooter>
						<Button
							title="Cancel"
							variant="secondary"
							onPress={() => setVisible(false)}
						/>
						<Button
							title="Delete"
							variant="destructive"
							onPress={() => setVisible(false)}
						/>
					</ModalFooter>
				</Modal>
			</View>
		);
	},
};
