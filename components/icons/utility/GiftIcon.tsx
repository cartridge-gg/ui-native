import type React from "react";
import { Path, Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const GiftIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Rect
				x="3"
				y="8"
				width="18"
				height="4"
				rx="1"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Rect
				x="12"
				y="8"
				width="0"
				height="13"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<Path
				d="M7 12V21H17V12M7 8C7 6.89543 7.89543 6 9 6C10.1046 6 11 6.89543 11 8H13C13 6.89543 13.8954 6 15 6C16.1046 6 17 6.89543 17 8"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

GiftIcon.displayName = "GiftIcon";
