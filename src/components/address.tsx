import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import { Linking, Pressable } from "react-native";
import { CopyIcon } from "#components/icons/utility";
import { toast } from "#components/primitives/sonner";
import { Text, TextClassContext } from "#components/primitives/text";
import { cn, type FormatAddressOptions, formatAddress } from "#utils";

type AddressProps = {
	address: string;
	containerClassName?: string;
	textClassName?: string;
	copyable?: boolean;
	monospace?: boolean;
	explorerUrl?: string;
} & FormatAddressOptions;

/**
 * A component for consistently rendering Starknet addresses across the application
 */
export function Address({
	address,
	containerClassName,
	textClassName: _textclassName,
	size,
	first,
	last,
	copyable = false,
	monospace = true,
	explorerUrl,
}: AddressProps) {
	const onCopy = useCallback(async () => {
		await Clipboard.setStringAsync(address);
		toast.success("Address copied");
	}, [address]);

	const formattedAddress = formatAddress(address, { first, last, size });

	const textClassName = cn(
		monospace && "font-mono",
		"text-primary leading-3",
		_textclassName,
	);

	const content = copyable ? (
		<TextClassContext.Provider value={textClassName}>
			<Pressable
				className={cn("flex-row items-center gap-1", containerClassName)}
				onPress={onCopy}
			>
				<Text>{formattedAddress}</Text>
				<CopyIcon size="xs" className={textClassName} />
			</Pressable>
		</TextClassContext.Provider>
	) : (
		<TextClassContext.Provider value={cn(textClassName, textClassName)}>
			<Text>{formattedAddress}</Text>
		</TextClassContext.Provider>
	);

	if (explorerUrl) {
		return (
			<Pressable
				onPress={() => {
					if (copyable) {
						onCopy();
					} else {
						Linking.openURL(explorerUrl);
					}
				}}
				className={containerClassName}
			>
				{content}
			</Pressable>
		);
	}

	return content;
}
