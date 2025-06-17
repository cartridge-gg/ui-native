import { type VariantProps, cva } from "class-variance-authority";
import React, { useState } from "react";
import {
	Pressable,
	type TextInputProps as RNTextInputProps,
	TextInput,
	View,
} from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

const inputVariants = cva(
	"w-full rounded-md border px-4 font-mono text-sm leading-[18px] text-foreground-100",
	{
		variants: {
			variant: {
				default: "bg-background-200 border-background-300",
				username: "bg-background-200 border-background-300",
			},
			size: {
				default: "h-10",
				lg: "h-12 text-[15px] leading-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface InputProps
	extends Omit<RNTextInputProps, "style" | "className">,
		VariantProps<typeof inputVariants> {
	error?: { message: string };
	isLoading?: boolean;
	onClear?: () => void;
	label?: string;
	className?: string;
}

// Error Message Component
interface ErrorMessageProps {
	label?: string;
}

function ErrorMessage({ label }: ErrorMessageProps) {
	if (!label) return null;

	return (
		<View className="flex-row items-center gap-1">
			<Text color="destructive" variant="sans-regular-14">
				⚠️ {label}
			</Text>
		</View>
	);
}

// Clear Button Component
interface ClearButtonProps {
	onClear: () => void;
	isLoading?: boolean;
}

function ClearButton({ onClear, isLoading }: ClearButtonProps) {
	if (isLoading) {
		return (
			<View className="w-6 h-6 justify-center items-center rounded-full bg-background-300">
				<Text color="tertiary">⏳</Text>
			</View>
		);
	}

	return (
		<Pressable
			className="w-6 h-6 justify-center items-center rounded-full bg-background-300"
			onPress={onClear}
		>
			<Text color="tertiary">✕</Text>
		</Pressable>
	);
}

export const Input = React.forwardRef<TextInput, InputProps>(
	(
		{
			error,
			isLoading,
			onClear,
			variant = "default",
			size = "default",
			label,
			value,
			className,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);

		return (
			<View className="gap-3">
				{label && (
					<Text variant="label" color="muted" className="mb-1">
						{label}
					</Text>
				)}

				<View className="relative">
					<TextInput
						ref={ref}
						value={value}
						className={cn(
							inputVariants({ variant, size }),
							isFocused && "border-primary bg-background-300",
							error && "border-destructive-100",
							value && onClear && "pr-12",
							className,
						)}
						placeholderTextColor="#505050" // foreground-400
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						{...props}
					/>

					{value && onClear && (
						<View className="absolute right-1.5 top-1/2 -translate-y-3">
							<ClearButton onClear={onClear} isLoading={isLoading} />
						</View>
					)}
				</View>

				{error && <ErrorMessage label={error.message} />}
			</View>
		);
	},
);

Input.displayName = "Input";
