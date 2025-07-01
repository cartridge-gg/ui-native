import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import { constants } from "starknet";
import {
	Button,
	QuestionIcon,
	Skeleton,
	SlotIcon,
	StarknetColorIcon,
	StarknetIcon,
	Text,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	toast,
} from "#components";
import { getChainName, isSlotChain } from "#utils";

// Simplified hex to string for tooltip without viem dependency
function hexToString(hex: string): string {
	if (!hex || !hex.startsWith("0x")) {
		return hex;
	}

	try {
		const hexString = hex.slice(2);
		let result = "";
		for (let i = 0; i < hexString.length; i += 2) {
			const hexChar = hexString.substr(i, 2);
			const charCode = parseInt(hexChar, 16);
			if (charCode > 0) {
				result += String.fromCharCode(charCode);
			}
		}
		return result;
	} catch {
		return "Unknown";
	}
}

export function Network({ chainId }: { chainId: string }) {
	const onCopy = useCallback(async () => {
		await Clipboard.setStringAsync(chainId);
		toast.success("Chain ID copied");
	}, [chainId]);

	if (!chainId) {
		return <Skeleton className="h-[40px] w-[120px] rounded" />;
	}

	return (
		<Tooltip className="w-[200px] h-[40px]">
			<TooltipTrigger asChild>
				<Button
					variant="secondary"
					className="flex-row items-center gap-2 font-inter bg-background hover:bg-background self-start"
					onPress={onCopy}
					textClassName="text-xs"
				>
					{(() => {
						switch (chainId) {
							case constants.StarknetChainId.SN_MAIN:
								return <StarknetColorIcon />;
							case constants.StarknetChainId.SN_SEPOLIA:
								return <StarknetIcon />;
							default:
								return isSlotChain(chainId) ? <SlotIcon /> : <QuestionIcon />;
						}
					})()}
					<Text>{getChainName(chainId)}</Text>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<Text>{hexToString(chainId)}</Text>
			</TooltipContent>
		</Tooltip>
	);
}
