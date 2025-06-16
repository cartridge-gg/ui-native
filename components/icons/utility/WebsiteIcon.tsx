import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const WebsiteIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M2 12H22"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

WebsiteIcon.displayName = "WebsiteIcon";
