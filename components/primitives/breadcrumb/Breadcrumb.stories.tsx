import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "../../typography/Text";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
	title: "Primitives/Breadcrumb",
	component: Breadcrumb,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Components")}>
						Components
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const CustomSeparator: Story = {
	render: () => {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink onPress={() => console.log("Navigate to home")}>
							<Text>Home</Text>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Text className="text-base text-gray-500">/</Text>
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink onPress={() => console.log("Navigate to products")}>
							<Text>Products</Text>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Text className="text-base text-gray-500">/</Text>
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>
							<Text>Current Page</Text>
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);
	},
};

export const WithEllipsis: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbEllipsis onPress={() => console.log("Show more")} />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Components")}>
						Components
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const InteractiveNavigation: Story = {
	render: () => {
		const [currentPath, setCurrentPath] = useState([
			"Home",
			"Products",
			"Electronics",
			"Smartphones",
			"iPhone 15",
		]);
		const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

		const navigateTo = (index: number) => {
			const newPath = currentPath.slice(0, index + 1);
			setNavigationHistory([...navigationHistory, currentPath.join(" > ")]);
			setCurrentPath(newPath);
		};

		return (
			<View className="gap-4">
				<Text variant="label">Current Path: {currentPath.join(" > ")}</Text>

				<Breadcrumb>
					<BreadcrumbList>
						{currentPath.map((item, index) => (
							<View key={index} className="flex-row items-center">
								<BreadcrumbItem>
									{index === currentPath.length - 1 ? (
										<BreadcrumbPage>{item}</BreadcrumbPage>
									) : (
										<BreadcrumbLink onPress={() => navigateTo(index)}>
											{item}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{index < currentPath.length - 1 && <BreadcrumbSeparator />}
							</View>
						))}
					</BreadcrumbList>
				</Breadcrumb>

				{navigationHistory.length > 0 && (
					<View className="gap-1">
						<Text variant="caption" color="muted">
							Navigation History:
						</Text>
						{navigationHistory.slice(-3).map((path, index) => (
							<Text key={index} variant="caption" color="muted">
								{navigationHistory.length - 3 + index + 1}. {path}
							</Text>
						))}
					</View>
				)}
			</View>
		);
	},
};

export const FileSystemNavigation: Story = {
	render: () => {
		const [currentPath, setCurrentPath] = useState([
			"Users",
			"john",
			"Documents",
			"Projects",
			"my-app",
			"src",
			"components",
		]);

		const navigateToPath = (index: number) => {
			setCurrentPath(currentPath.slice(0, index + 1));
		};

		return (
			<View className="gap-4">
				<Text variant="label">File Path: /{currentPath.join("/")}</Text>

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink onPress={() => setCurrentPath([])}>
								🏠
							</BreadcrumbLink>
						</BreadcrumbItem>
						{currentPath.map((folder, index) => (
							<View key={index} className="flex-row items-center">
								<BreadcrumbSeparator>
									<Text className="text-base text-gray-500">/</Text>
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									{index === currentPath.length - 1 ? (
										<BreadcrumbPage>{folder}</BreadcrumbPage>
									) : (
										<BreadcrumbLink onPress={() => navigateToPath(index)}>
											{folder}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</View>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</View>
		);
	},
};

export const EcommerceNavigation: Story = {
	render: () => {
		const [selectedCategory, setSelectedCategory] = useState([
			"Electronics",
			"Computers",
			"Laptops",
			"Gaming Laptops",
		]);

		const categories = {
			Electronics: ["Computers", "Phones", "Audio", "Gaming"],
			Computers: ["Laptops", "Desktops", "Tablets", "Accessories"],
			Laptops: [
				"Gaming Laptops",
				"Business Laptops",
				"Ultrabooks",
				"Chromebooks",
			],
			"Gaming Laptops": ["ASUS ROG", "MSI Gaming", "Alienware", "Razer Blade"],
		};

		return (
			<View className="gap-4">
				<Text variant="label">Category Navigation</Text>

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink onPress={() => setSelectedCategory([])}>
								🏪 Store
							</BreadcrumbLink>
						</BreadcrumbItem>
						{selectedCategory.map((category, index) => (
							<View key={index} className="flex-row items-center">
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{index === selectedCategory.length - 1 ? (
										<BreadcrumbPage>{category}</BreadcrumbPage>
									) : (
										<BreadcrumbLink
											onPress={() =>
												setSelectedCategory(
													selectedCategory.slice(0, index + 1),
												)
											}
										>
											{category}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</View>
						))}
					</BreadcrumbList>
				</Breadcrumb>

				<View className="gap-2">
					<Text variant="caption" color="muted">
						Available subcategories:
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{(
							categories[
								selectedCategory[
									selectedCategory.length - 1
								] as keyof typeof categories
							] || []
						).map((subcat) => (
							<Pressable
								key={subcat}
								className="px-3 py-1.5 bg-gray-100 rounded"
								onPress={() =>
									setSelectedCategory([...selectedCategory, subcat])
								}
							>
								<Text className="text-xs">{subcat}</Text>
							</Pressable>
						))}
					</View>
				</View>
			</View>
		);
	},
};

export const LongPath: Story = {
	render: () => {
		const fullPath = [
			"Home",
			"Dashboard",
			"Analytics",
			"Reports",
			"Sales",
			"Q4 2023",
			"December",
			"Weekly",
			"Product Performance",
		];
		const [showFullPath, setShowFullPath] = useState(false);

		const displayPath = showFullPath
			? fullPath
			: [fullPath[0], "...", ...fullPath.slice(-2)];

		return (
			<View className="gap-4">
				<Text variant="label">Long Navigation Path</Text>

				<Breadcrumb>
					<BreadcrumbList>
						{displayPath.map((item, index) => (
							<View key={index} className="flex-row items-center">
								<BreadcrumbItem>
									{item === "..." ? (
										<BreadcrumbEllipsis
											onPress={() => setShowFullPath(!showFullPath)}
										/>
									) : index === displayPath.length - 1 ? (
										<BreadcrumbPage>{item}</BreadcrumbPage>
									) : (
										<BreadcrumbLink
											onPress={() => console.log(`Navigate to ${item}`)}
										>
											{item}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{index < displayPath.length - 1 &&
									item !== "..." &&
									displayPath[index + 1] !== "..." && <BreadcrumbSeparator />}
							</View>
						))}
					</BreadcrumbList>
				</Breadcrumb>

				<Text variant="caption" color="muted">
					{showFullPath ? "Showing full path" : "Showing condensed path"} • Full
					path: {fullPath.join(" > ")}
				</Text>
			</View>
		);
	},
};

export const WithIcons: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						🏠 Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Settings")}>
						⚙️ Settings
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Account")}>
						👤 Account
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>🔒 Privacy</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const DisabledLinks: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink disabled>Restricted Area</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Public")}>
						Public Section
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Current Page</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const CustomStyling: Story = {
	render: () => (
		<Breadcrumb className="bg-gray-50 p-3 rounded-lg">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						<Text className="text-blue-600 font-semibold">Home</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Text className="text-lg text-blue-600">→</Text>
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Products")}>
						<Text className="text-blue-600 font-semibold">Products</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Text className="text-lg text-blue-600">→</Text>
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>
						<Text className="text-green-600 font-bold">Current Item</Text>
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const Ellipsis: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Home")}>
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbEllipsis />
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink onPress={() => console.log("Breadcrumb N")}>
						Breadcrumb N
					</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const CategoryPath: Story = {
	render: () => {
		const categories = [
			{ id: 1, name: "Electronics", slug: "electronics" },
			{ id: 2, name: "Computers", slug: "computers" },
			{ id: 3, name: "Laptops", slug: "laptops" },
			{ id: 4, name: "Gaming Laptops", slug: "gaming-laptops" },
		];

		return (
			<View className="gap-1">
				<Text variant="caption">Category Path:</Text>
				<Breadcrumb>
					<BreadcrumbList>
						{categories.map((category, index) => (
							<View key={category.id}>
								<BreadcrumbItem>
									<BreadcrumbLink
										onPress={() => console.log(`Navigate to ${category.slug}`)}
									>
										<Text>{category.name}</Text>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{index < categories.length - 1 && <BreadcrumbSeparator />}
							</View>
						))}
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								<Text>Current Product</Text>
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</View>
		);
	},
};

export const FileSystemPath: Story = {
	render: () => {
		const path = [
			"Users",
			"john",
			"Documents",
			"Projects",
			"my-app",
			"src",
			"components",
		];

		return (
			<View className="gap-4">
				{/* File system path */}
				<View>
					<Text variant="caption">File Path:</Text>
					<Breadcrumb>
						<BreadcrumbList className="flex-row items-center">
							<BreadcrumbItem>
								<BreadcrumbLink onPress={() => console.log("Navigate to home")}>
									<Text>~</Text>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{path.map((folder, index) => (
								<View key={index}>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										{index === path.length - 1 ? (
											<BreadcrumbPage>
												<Text>{folder}</Text>
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink
												onPress={() =>
													console.log(
														`Navigate to ${path.slice(0, index + 1).join("/")}`,
													)
												}
											>
												<Text>{folder}</Text>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								</View>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</View>

				{/* Multi-level folder structure */}
				<View className="gap-2">
					<Text variant="caption">Project Structure:</Text>
					<View className="flex-row flex-wrap gap-2">
						{[
							"src/components/ui",
							"src/pages/dashboard",
							"src/utils/helpers",
						].map((pathStr) => (
							<View key={pathStr} className="bg-gray-100 p-2 rounded">
								<Text className="text-xs">{pathStr}</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		);
	},
};
