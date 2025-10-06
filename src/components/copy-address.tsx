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
			containerClassName={cn("flex-row items-center gap-1", className)}
			textClassName="text-xs text-foreground-300"
			size={size}
			first={first}
			last={last}
			copyable={true}
		/>
	);
}
