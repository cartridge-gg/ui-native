import { View } from "react-native";
import { DiscoveryEvent, type DiscoveryEventProps } from "./discovery-event";

export function DiscoveryGroup({
	events,
	rounded,
}: {
	events: DiscoveryEventProps[];
	rounded?: boolean;
}) {
	return (
		<View
			className="select-none flex flex-col gap-y-px"
			style={{
				borderRadius: rounded ? 8 : 0,
				overflow: rounded ? "hidden" : "visible",
			}}
		>
			{events.map((event) => (
				<DiscoveryEvent key={event.identifier} {...event} />
			))}
		</View>
	);
}
