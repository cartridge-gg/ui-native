import { View } from "react-native";
import { cn } from "#utils";
import { DiscoveryEvent, type DiscoveryEventProps } from "./event";

export function DiscoveryGroup({
	events,
	rounded,
}: {
	events: DiscoveryEventProps[];
	rounded?: boolean;
}) {
	return (
		<View
			className={cn(
				"select-none flex flex-col gap-y-px",
				rounded && "rounded-lg overflow-hidden",
			)}
		>
			{events.map((event) => (
				<DiscoveryEvent key={event.identifier} {...event} />
			))}
		</View>
	);
}
