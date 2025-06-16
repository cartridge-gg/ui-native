import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const CloneIcon: React.FC<StateIconProps> = ({
	variant = "solid",
	...props
}) => {
	return (
		<BaseIcon {...props} viewBox="0 0 24 24">
			{(() => {
				switch (variant) {
					case "solid":
						return (
							<Path
								d="M4 18c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-2h-4a3 3 0 0 1-3-3V9H6c-1.103 0-2 .897-2 2v7Zm7-3h7c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2Z"
								fill="currentColor"
							/>
						);
					case "line":
						return (
							<Path
								d="M6 19h7c.553 0 1-.447 1-1v-1.5c0-.275.225-.5.5-.5s.5.225.5.5V18c0 1.103-.897 2-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1.5c.275 0 .5.225.5.5s-.225.5-.5.5H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1ZM9 6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7c0 1.103-.897 2-2 2h-7c-1.103 0-2-.897-2-2V6Zm2 8h7c.553 0 1-.447 1-1V6a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v7c0 .553.447 1 1 1Z"
								fill="currentColor"
							/>
						);
				}
			})()}
		</BaseIcon>
	);
};

CloneIcon.displayName = "CloneIcon";
