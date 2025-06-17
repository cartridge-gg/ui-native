import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { QRCode, QRCodeScannerFrame, QRCodeWithLogo } from "./QRCode";

const meta: Meta<typeof QRCode> = {
	title: "Primitives/QRCode",
	component: QRCode,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <QRCode value="https://example.com" />,
};

export const DifferentSizes: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">Small (100px)</Text>
				<QRCode value="https://example.com" size={100} />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Medium (200px)</Text>
				<QRCode value="https://example.com" size={200} />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Large (300px)</Text>
				<QRCode value="https://example.com" size={300} />
			</View>
		</View>
	),
};

export const CustomColors: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">Blue QR Code</Text>
				<QRCode
					value="https://example.com/blue"
					size={150}
					foregroundColor="#3b82f6"
					backgroundColor="#e0f2fe"
				/>
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Green QR Code</Text>
				<QRCode
					value="https://example.com/green"
					size={150}
					foregroundColor="#22c55e"
					backgroundColor="#f0fdf4"
				/>
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Red QR Code</Text>
				<QRCode
					value="https://example.com/red"
					size={150}
					foregroundColor="#ef4444"
					backgroundColor="#fef2f2"
				/>
			</View>
		</View>
	),
};

export const WithLogos: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">QR Code with Emoji Logo</Text>
				<QRCode
					value="https://example.com/profile"
					logo={<Text className="text-2xl">🚀</Text>}
					logoSize={50}
				/>
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">QR Code with Text Logo</Text>
				<QRCode
					value="https://company.com"
					logo={<Text className="text-xs font-bold">LOGO</Text>}
					logoSize={40}
				/>
			</View>
		</View>
	),
};

export const WithScannerFrame: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">Default Scanner Frame</Text>
				<QRCodeScannerFrame />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Custom Scanner Frame</Text>
				<QRCodeScannerFrame
					size={250}
					borderColor="#ff6b6b"
					borderWidth={4}
					cornerLength={30}
				/>
			</View>
		</View>
	),
};

export const QRGenerator: Story = {
	render: () => {
		const [qrValue, setQrValue] = useState("https://example.com");

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">QR Code Generator</Text>

				<View className="w-full max-w-xs gap-3">
					<Input
						placeholder="Enter text or URL"
						value={qrValue}
						onChangeText={setQrValue}
					/>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Generated QR Code:</Text>
					<QRCode value={qrValue} size={200} />
					<Text variant="caption" color="muted" className="text-center">
						{qrValue}
					</Text>
				</View>
			</View>
		);
	},
};

export const WalletAddress: Story = {
	render: () => {
		const walletAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">Wallet Address QR</Text>

				<QRCode
					value={walletAddress}
					logo={<Text className="text-xl">💰</Text>}
					logoSize={45}
					size={200}
				/>

				<View className="gap-1 items-center">
					<Text variant="label">Wallet Address:</Text>
					<Text variant="caption" color="muted" className="font-mono">
						{walletAddress}
					</Text>
				</View>
			</View>
		);
	},
};

export const ContactCard: Story = {
	render: () => {
		const vCard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:john@example.com
END:VCARD`;

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">Contact Card QR</Text>

				<QRCode
					value={vCard}
					logo={<Text className="text-xl">👤</Text>}
					logoSize={45}
					size={200}
				/>

				<View className="gap-1 items-center">
					<Text variant="label">John Doe</Text>
					<Text variant="caption" color="muted">
						+1234567890 • john@example.com
					</Text>
				</View>
			</View>
		);
	},
};

export const WiFiQR: Story = {
	render: () => {
		const wifiConfig = "WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;";

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">WiFi QR Code</Text>

				<QRCode
					value={wifiConfig}
					logo={<Text className="text-xl">📶</Text>}
					logoSize={45}
					size={200}
				/>

				<View className="gap-1 items-center">
					<Text variant="label">Network: MyNetwork</Text>
					<Text variant="caption" color="muted">
						Scan to connect to WiFi
					</Text>
				</View>
			</View>
		);
	},
};

export const SocialMedia: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<Text variant="heading-md">Social Media QR Codes</Text>

			<View className="flex-row gap-6 justify-around">
				<View className="gap-2 items-center">
					<Text variant="label">Twitter</Text>
					<QRCode
						value="https://twitter.com/username"
						logo={<Text className="text-base">🐦</Text>}
						logoSize={35}
						size={120}
					/>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Instagram</Text>
					<QRCode
						value="https://instagram.com/username"
						logo={<Text className="text-base">📷</Text>}
						logoSize={35}
						size={120}
					/>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">LinkedIn</Text>
					<QRCode
						value="https://linkedin.com/in/username"
						logo={<Text className="text-base">💼</Text>}
						logoSize={35}
						size={120}
					/>
				</View>
			</View>
		</View>
	),
};

export const EventTicket: Story = {
	render: () => {
		const ticketData = `EVENT:Tech Conference 2024
DATE:2024-12-15
VENUE:Convention Center
TICKET:VIP-001`;

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">Event Ticket QR</Text>

				<QRCode
					value={ticketData}
					logo={<Text className="text-xl">🎫</Text>}
					logoSize={45}
					size={200}
					errorCorrectionLevel="M"
				/>

				<View className="gap-1 items-center">
					<Text variant="label">Tech Conference 2024</Text>
					<Text variant="caption" color="muted">
						December 15, 2024 • VIP Ticket
					</Text>
				</View>
			</View>
		);
	},
};

export const PaymentQR: Story = {
	render: () => {
		const paymentData =
			"bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001";

		return (
			<View className="gap-4 items-center">
				<Text variant="heading-md">Payment QR Code</Text>

				<QRCode
					value={paymentData}
					logo={<Text className="text-xl">₿</Text>}
					logoSize={45}
					size={200}
					errorCorrectionLevel="H"
				/>

				<View className="gap-1 items-center">
					<Text variant="label">Bitcoin Payment</Text>
					<Text variant="caption" color="muted">
						Amount: 0.001 BTC
					</Text>
				</View>
			</View>
		);
	},
};

export const ErrorCorrectionLevels: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<Text variant="heading-md">Error Correction Levels</Text>

			<View className="flex-row gap-4 justify-around">
				<View className="gap-2 items-center">
					<Text variant="label">Level L (Low)</Text>
					<QRCode
						value="Error correction test"
						errorCorrectionLevel="L"
						size={100}
					/>
					<Text variant="caption" color="muted">
						~7% recovery
					</Text>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Level M (Medium)</Text>
					<QRCode
						value="Error correction test"
						errorCorrectionLevel="M"
						size={100}
					/>
					<Text variant="caption" color="muted">
						~15% recovery
					</Text>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Level Q (Quartile)</Text>
					<QRCode
						value="Error correction test"
						errorCorrectionLevel="Q"
						size={100}
					/>
					<Text variant="caption" color="muted">
						~25% recovery
					</Text>
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Level H (High)</Text>
					<QRCode
						value="Error correction test"
						errorCorrectionLevel="H"
						size={100}
					/>
					<Text variant="caption" color="muted">
						~30% recovery
					</Text>
				</View>
			</View>
		</View>
	),
};
