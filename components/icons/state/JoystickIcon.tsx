import type React from "react";
import { Circle, Path, Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const JoystickIcon: React.FC<StateIconProps> = ({
	variant = "solid",
	...props
}) => {
	return (
		<BaseIcon {...props}>
			{variant === "solid" ? (
				<>
					<Rect
						x="6"
						y="10"
						width="12"
						height="8"
						rx="4"
						ry="4"
						fill="currentColor"
					/>
					<Circle cx="9" cy="14" r="1" fill="white" />
					<Circle cx="15" cy="14" r="1" fill="white" />
					<Path
						d="M12 6V10"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
					/>
					<Circle cx="12" cy="4" r="2" fill="currentColor" />
				</>
			) : (
				<>
					<Rect
						x="6"
						y="10"
						width="12"
						height="8"
						rx="4"
						ry="4"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
					<Circle cx="9" cy="14" r="1" fill="currentColor" />
					<Circle cx="15" cy="14" r="1" fill="currentColor" />
					<Path
						d="M12 6V10"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<Circle
						cx="12"
						cy="4"
						r="2"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
				</>
			)}
		</BaseIcon>
	);
};

JoystickIcon.displayName = "JoystickIcon";
