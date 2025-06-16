import type React from "react";
import { Circle, Path, Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const RobotIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Rect
				x="6"
				y="8"
				width="12"
				height="10"
				rx="2"
				ry="2"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M12 2V8"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Circle cx="9" cy="12" r="1" fill="currentColor" />
			<Circle cx="15" cy="12" r="1" fill="currentColor" />
			<Path
				d="M9 16H15"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M6 14H4"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M20 14H18"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M8 18V20"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M16 18V20"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</BaseIcon>
	);
};

RobotIcon.displayName = "RobotIcon";
