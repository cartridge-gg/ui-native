import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import {
	FlatList,
	type ListRenderItem,
	type NativeSyntheticEvent,
	Pressable,
	type TextInput,
	type TextInputFocusEventData,
	View,
} from "react-native";
import { Input, Text, UserAvatar } from "#components";
import { cn } from "#utils";

// Types for account search results
export interface AccountSearchResult {
	username: string;
	type: "existing" | "create-new";
	points?: number;
	avatar?: string;
}

export interface ValidationState {
	status: "idle" | "validating" | "valid" | "invalid";
	exists?: boolean;
	message?: string;
}

const dropdownVariants = cva(
	"absolute top-full left-0 right-0 z-50 mt-1 max-h-[300px] overflow-hidden bg-background-200 border-none",
);

const suggestionItemVariants = cva(
	"h-12 px-3 py-2 flex items-center gap-1.5 select-none transition-colors duration-150",
	{
		variants: {
			variant: {
				default: "bg-background-200 text-foreground-100",
				selected: "bg-background-400 text-foreground-100",
				"create-new": "bg-background-200 text-foreground-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

interface UsernameInputProps extends VariantProps<typeof Input> {
	value: string;
	onChangeText: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onClear?: () => void;
	placeholder?: string;
	error?: Error;
	isLoading?: boolean;
	validation?: ValidationState;
	suggestions?: AccountSearchResult[];
	onSuggestionSelect?: (suggestion: AccountSearchResult) => void;
	showAutocomplete?: boolean;
	className?: string;
}

export function UsernameInput({
	value,
	onChangeText,
	onFocus,
	onBlur,
	onClear,
	placeholder = "Enter a Username",
	error,
	isLoading,
	validation,
	suggestions = [],
	onSuggestionSelect,
	showAutocomplete = false,
	className,
	...props
}: UsernameInputProps) {
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
		undefined,
	);
	const inputRef = React.useRef<TextInput>(null);
	const dropdownRef = React.useRef<FlatList>(null);

	// Filter suggestions based on current input
	const filteredSuggestions = React.useMemo(() => {
		if (!value || !showAutocomplete) return [];

		return suggestions.filter((suggestion) =>
			suggestion.username.toLowerCase().includes(value.toLowerCase()),
		);
	}, [suggestions, value, showAutocomplete]);

	// Auto-focus first item if input matches first result
	React.useEffect(() => {
		if (
			filteredSuggestions.length > 0 &&
			filteredSuggestions[0].username === value
		) {
			setSelectedIndex(0);
		} else {
			setSelectedIndex(undefined);
		}
	}, [filteredSuggestions, value]);

	const handleFocus = React.useCallback(
		(_e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			onFocus?.();
			if (
				showAutocomplete &&
				(value.length > 0 || filteredSuggestions.length > 0)
			) {
				setIsDropdownOpen(true);
			}
		},
		[onFocus, showAutocomplete, value.length, filteredSuggestions.length],
	);

	const handleBlur = React.useCallback(() => {
		onBlur?.();
		// Small delay to allow for suggestion clicks before closing
		setTimeout(() => {
			setIsDropdownOpen(false);
			setSelectedIndex(undefined);
		}, 150);
	}, [onBlur]);

	const handleChangeText = React.useCallback(
		(text: string) => {
			onChangeText(text.toLowerCase());

			if (showAutocomplete) {
				setIsDropdownOpen(text.length > 0);
				setSelectedIndex(undefined);
			}
		},
		[onChangeText, showAutocomplete],
	);

	const handleClear = React.useCallback(() => {
		onClear?.();
		setIsDropdownOpen(false);
		setSelectedIndex(undefined);
	}, [onClear]);

	const handleSuggestionPress = React.useCallback(
		(suggestion: AccountSearchResult) => {
			onChangeText(suggestion.username);
			setIsDropdownOpen(false);
			setSelectedIndex(undefined);
			onSuggestionSelect?.(suggestion);
			inputRef.current?.blur();
		},
		[onChangeText, onSuggestionSelect],
	);

	const handleKeyPress = React.useCallback(
		(e: { nativeEvent: { key: string } }) => {
			if (!isDropdownOpen || filteredSuggestions.length === 0) return;

			switch (e.nativeEvent.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) => {
						const next =
							prev === undefined
								? 0
								: Math.min(prev + 1, filteredSuggestions.length - 1);
						dropdownRef.current?.scrollToIndex({ index: next, animated: true });
						return next;
					});
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) => {
						const next =
							prev === undefined
								? filteredSuggestions.length - 1
								: Math.max(prev - 1, 0);
						dropdownRef.current?.scrollToIndex({ index: next, animated: true });
						return next;
					});
					break;
				case "Enter":
					e.preventDefault();
					if (
						selectedIndex !== undefined &&
						filteredSuggestions[selectedIndex]
					) {
						handleSuggestionPress(filteredSuggestions[selectedIndex]);
					}
					break;
				case "Escape":
					e.preventDefault();
					setIsDropdownOpen(false);
					setSelectedIndex(undefined);
					break;
			}
		},
		[isDropdownOpen, filteredSuggestions, selectedIndex, handleSuggestionPress],
	);

	const renderSuggestionItem: ListRenderItem<AccountSearchResult> =
		React.useCallback(
			({ item, index }) => {
				const isSelected = selectedIndex === index;

				if (item.type === "create-new") {
					return (
						<Pressable
							onPress={() => handleSuggestionPress(item)}
							className={suggestionItemVariants({
								variant: isSelected ? "selected" : "create-new",
							})}
						>
							{/* User icon container with plus - matching web design */}
							<View className="w-8 h-8 bg-background-300 rounded-full items-center justify-center">
								<Text className="text-primary text-lg font-bold">+</Text>
							</View>

							{/* Username text */}
							<View className="flex-1">
								<Text className="text-sm font-normal text-foreground-100">
									{item.username}
								</Text>
							</View>

							{/* Create New tag with seedling icon */}
							<View className="p-1 bg-background-300 rounded">
								<View className="flex-row items-center gap-0.5">
									<Text className="text-primary text-xs">🌱</Text>
									<Text className="text-primary text-xs font-normal">
										Create New
									</Text>
								</View>
							</View>
						</Pressable>
					);
				}

				return (
					<Pressable
						onPress={() => handleSuggestionPress(item)}
						className={suggestionItemVariants({
							variant: isSelected ? "selected" : "default",
						})}
					>
						{/* Achievement player badge */}
						<View className="w-8 h-8 bg-background-300 rounded-full items-center justify-center">
							<UserAvatar username={item.username} size="sm" />
						</View>

						<View className="flex-1 flex-row items-center justify-between gap-1">
							<Text className="text-sm font-normal px-0.5 truncate text-foreground-100">
								{item.username}
							</Text>

							{/* Points display */}
							<View className="flex-row items-center justify-center gap-0.5 p-1 bg-background-300 rounded">
								<Text className="text-foreground-100 text-xs">✨</Text>
								<Text className="text-xs font-medium text-foreground-100">
									{item.points?.toLocaleString() || 0}
								</Text>
							</View>
						</View>
					</Pressable>
				);
			},
			[selectedIndex, handleSuggestionPress],
		);

	const showDropdown = isDropdownOpen && filteredSuggestions.length > 0;

	return (
		<View className={cn("relative", className)}>
			{/* Container matching web CreateAccount structure */}
			<View
				className={cn(
					"flex flex-col border rounded-md border-background-300 bg-background-300",
					(validation?.status === "invalid" || error) &&
						"bg-destructive-100 border-destructive-100",
				)}
			>
				<Input
					ref={inputRef}
					variant="username"
					size="lg"
					value={value}
					placeholder={placeholder}
					autoCapitalize="none"
					autoCorrect={false}
					autoComplete="off"
					onChangeText={handleChangeText}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onClear={handleClear}
					onKeyPress={handleKeyPress}
					error={undefined}
					isLoading={isLoading || validation?.status === "validating"}
					className="relative z-1"
					{...props}
				/>
				{/* Status component - matching web design */}
				{!showDropdown && (
					<View
						className={cn(
							"flex flex-row justify-between items-center text-xs px-3 py-2 w-full",
							error || validation?.status === "invalid"
								? "bg-destructive-100"
								: validation?.status === "valid"
									? "bg-background-150"
									: "bg-background-300",
						)}
					>
						<Text
							className={cn(
								"text-xs flex-1",
								error || validation?.status === "invalid"
									? "text-destructive-foreground"
									: "text-primary-100",
							)}
						>
							{error?.message ||
								(validation?.status === "invalid" && validation.message) ||
								(!value
									? "Enter a Username"
									: validation?.status === "validating"
										? "Checking username..."
										: validation?.status === "valid"
											? validation.exists
												? "Welcome! Select Log In to play"
												: "Welcome! Let's create a new Controller"
											: "Enter a Username")}
						</Text>
					</View>
				)}
			</View>

			{/* Suggestions Dropdown */}
			{showDropdown && (
				<View className={dropdownVariants()}>
					<FlatList
						ref={dropdownRef}
						data={filteredSuggestions}
						renderItem={renderSuggestionItem}
						keyExtractor={(item) => `${item.username}-${item.type}`}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						getItemLayout={(_data, index) => ({
							length: 48, // h-12 = 48px
							offset: 48 * index,
							index,
						})}
						ItemSeparatorComponent={() => (
							<View className="h-px bg-background-300" />
						)}
					/>
				</View>
			)}
		</View>
	);
}
