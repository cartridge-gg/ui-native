import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

const meta: Meta<typeof Table> = {
	title: "Primitives/Table",
	component: Table,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead width={100}>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead align="right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell width={100}>
							<Text variant="sans-medium-14">{invoice.invoice}</Text>
						</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell align="right">{invoice.totalAmount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell align="right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const SimpleTable: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>John Doe</TableCell>
					<TableCell>john@example.com</TableCell>
					<TableCell>Admin</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Jane Smith</TableCell>
					<TableCell>jane@example.com</TableCell>
					<TableCell>User</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Bob Johnson</TableCell>
					<TableCell>bob@example.com</TableCell>
					<TableCell>User</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const WithSelectedRow: Story = {
	render: () => {
		const [selectedId, setSelectedId] = React.useState<string | null>(null);

		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Stock</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow
						selected={selectedId === "1"}
						onPress={() => setSelectedId("1")}
					>
						<TableCell>Laptop</TableCell>
						<TableCell>$999.00</TableCell>
						<TableCell>15</TableCell>
					</TableRow>
					<TableRow
						selected={selectedId === "2"}
						onPress={() => setSelectedId("2")}
					>
						<TableCell>Mouse</TableCell>
						<TableCell>$29.99</TableCell>
						<TableCell>50</TableCell>
					</TableRow>
					<TableRow
						selected={selectedId === "3"}
						onPress={() => setSelectedId("3")}
					>
						<TableCell>Keyboard</TableCell>
						<TableCell>$79.99</TableCell>
						<TableCell>25</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
	},
};

export const CompactTable: Story = {
	render: () => (
		<View style={{ width: 300 }}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Item</TableHead>
						<TableHead align="right">Qty</TableHead>
						<TableHead align="right">Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Apple</TableCell>
						<TableCell align="right">5</TableCell>
						<TableCell align="right">$2.50</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Orange</TableCell>
						<TableCell align="right">3</TableCell>
						<TableCell align="right">$1.80</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Banana</TableCell>
						<TableCell align="right">7</TableCell>
						<TableCell align="right">$3.50</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</View>
	),
};
