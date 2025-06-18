import type React from "react";
import { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const DefaultBadgeIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props} viewBox="0 0 48 48">
			<Defs>
				<LinearGradient
					x1="24"
					y1="-19.5"
					x2="24"
					y2="35.5"
					gradientUnits="userSpaceOnUse"
				>
					<Stop offset="0" stopColor="#161A17" stopOpacity="0" />
					<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
				</LinearGradient>
			</Defs>

			{/* Main circle outline */}
			<Path
				d="M24 41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7C33.3888 7 41 14.6112 41 24C41 33.3888 33.3888 41 24 41ZM24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z"
				fill="black"
				fillRule="evenodd"
				clipRule="evenodd"
			/>

			{/* Outer circle */}
			<Path
				d="M5 24C5 34.4934 13.5066 43 24 43C34.4934 43 43 34.4934 43 24C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24ZM7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			/>

			{/* Top decoration */}
			<Path
				d="M26.4505 3.59667C25.0421 2.36882 22.9533 2.36882 21.5449 3.59667L19.2515 5.5982C20.7692 5.20769 22.3604 5 24 5C25.6373 5 27.2262 5.2071 28.742 5.59653L26.4505 3.59667Z"
				fill="currentColor"
			/>

			{/* Right decoration */}
			<Path
				d="M37.265 37.6029C39.6026 35.3231 41.3547 32.4458 42.2746 29.2178L42.8501 32.2281C43.2013 34.0681 42.1587 35.8932 40.3992 36.509L37.265 37.6029Z"
				fill="currentColor"
			/>

			{/* Left decoration */}
			<Path
				d="M5.72486 29.2158C6.64469 32.4449 8.39722 35.323 10.7355 37.6034L7.59993 36.509C5.84034 35.8932 4.7941 34.0681 5.14895 32.2281L5.72486 29.2158Z"
				fill="currentColor"
			/>
		</BaseIcon>
	);
};

DefaultBadgeIcon.displayName = "DefaultBadgeIcon";
