import type React from "react";
import { Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const QrCodeIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="2"
				ry="2"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Rect x="7" y="7" width="3" height="3" fill="currentColor" />
			<Rect x="14" y="7" width="3" height="3" fill="currentColor" />
			<Rect x="7" y="14" width="3" height="3" fill="currentColor" />
			<Rect x="14" y="14" width="3" height="3" fill="currentColor" />
		</BaseIcon>
	);
};

QrCodeIcon.displayName = "QrCodeIcon";
