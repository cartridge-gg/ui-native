import { cn, type FormatAddressOptions } from "#utils";
import { Address } from "./address";

export function CopyAddress({
	address,
	className,
	size,
	first,
	last,
}: { address: string; className?: string } & FormatAddressOptions) {
	return (
		<Address
			address={address}
			textClassName={cn("text-xs text-foreground-300", className)}
			size={size}
			first={first}
			last={last}
			copyable={true}
		/>
	);
}
