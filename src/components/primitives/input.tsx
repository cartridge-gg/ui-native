import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, TextInput, type TextInputProps, View } from "react-native";
import { AlertIcon, SpinnerIcon, Text, TimesCircleIcon } from "#components";
import { cn } from "#utils";

interface InputProps
	extends Omit<TextInputProps, "size">,
		VariantProps<typeof inputVariants> {
	error?: Error;
	isLoading?: boolean;
	onClear?: () => void;
}

export const inputVariants = cva(
	"flex w-full rounded-md border px-4 font-mono bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-primary",
	{
		variants: {
			variant: {
				default:
					"border bg-background-200 border-background-300 text-foreground-100 hover:border-background-400 focus-visible:border-primary focus-visible:bg-background-300 placeholder:text-foreground-400",
				username:
					"border bg-background-200 border-background-300 text-foreground-100 placeholder:text-foreground-400 focus-visible:border-primary",
			},
			size: {
				default: "h-10 text-sm leading-[18px]",
				lg: "h-12 text-[15px] leading-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ErrorProps = {
	label?: string;
	className?: string;
};

export function InputErrorMessage({ label, className }: ErrorProps) {
	return (
		<View
			className={cn(
				"flex-row items-center gap-x-1 select-none text-destructive-100 ",
				!label && "hidden",
				className,
			)}
		>
			<AlertIcon className="h-5 w-5" />
			<Text className="text-sm text-destructive-100 leading-[18px]">
				{label}
			</Text>
		</View>
	);
}

type ClearProps = {
	isLoading: boolean;
	onClear: () => void;
};

const Clear = ({ isLoading, onClear }: ClearProps) => {
	return (
		<Pressable
			className="h-9 w-9 p-1.5 flex-row items-center justify-center"
			onPress={onClear}
		>
			{isLoading ? (
				<SpinnerIcon className="text-foreground-300 animate-spin" />
			) : (
				<TimesCircleIcon className="text-foreground-300 hover:text-foreground-200" />
			)}
		</Pressable>
	);
};

export function Input({
	error,
	isLoading,
	onClear,
	variant,
	size,
	className,
	value,
	...props
}: InputProps & { ref?: React.Ref<TextInput> }) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<View className="flex-col gap-y-3">
			<View
				className="relative"
				onPointerEnter={() => setIsHovered(true)}
				onPointerLeave={() => setIsHovered(false)}
			>
				<TextInput
					value={value}
					className={cn(
						inputVariants({ variant, size, className }),
						!!value && !!onClear && "pr-12",
						!!error &&
							"border-destructive-100 hover:border-destructive-100 focus-visible:border-destructive-100",
					)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...props}
				/>
				{(isFocused || isHovered) && !!value && !!onClear && (
					<View className="absolute right-1.5 top-1/2 -translate-y-1/2">
						<Clear isLoading={!!isLoading} onClear={onClear} />
					</View>
				)}
			</View>
			{!!error && <InputErrorMessage label={error.message} />}
		</View>
	);
}
