import type React from "react";
import { Path, Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const CopyIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Rect
				x="9"
				y="9"
				width="13"
				height="13"
				rx="2"
				ry="2"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

CopyIcon.displayName = "CopyIcon";
