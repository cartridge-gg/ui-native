import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "react-native";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	Table as UITable,
} from "./";

const meta: Meta<typeof Table> = {
	title: "Primitives/Table",
	component: Table,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {};

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

function Table() {
	return (
		<UITable>
			<Text className="caption-bottom text-sm text-foreground-400 p-4">
				A list of your recent invoices.
			</Text>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Text className="text-foreground-400 font-medium">Invoice</Text>
					</TableHead>
					<TableHead>
						<Text className="text-foreground-400 font-medium">Status</Text>
					</TableHead>
					<TableHead>
						<Text className="text-foreground-400 font-medium">Method</Text>
					</TableHead>
					<TableHead>
						<Text className="text-foreground-400 font-medium text-right">
							Amount
						</Text>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell>
							<Text className="text-foreground font-medium">
								{invoice.invoice}
							</Text>
						</TableCell>
						<TableCell>
							<Text className="text-foreground">{invoice.paymentStatus}</Text>
						</TableCell>
						<TableCell>
							<Text className="text-foreground">{invoice.paymentMethod}</Text>
						</TableCell>
						<TableCell>
							<Text className="text-foreground text-right">
								{invoice.totalAmount}
							</Text>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>
						<Text className="text-foreground font-medium">Total</Text>
					</TableCell>
					<TableCell>
						<Text className="text-foreground font-medium"></Text>
					</TableCell>
					<TableCell>
						<Text className="text-foreground font-medium"></Text>
					</TableCell>
					<TableCell>
						<Text className="text-foreground font-medium text-right">
							$2,500.00
						</Text>
					</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	);
}
