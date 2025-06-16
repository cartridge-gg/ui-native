import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const SwordsIcon: React.FC<StateIconProps> = ({
	variant = "solid",
	...props
}) => {
	return (
		<BaseIcon {...props}>
			{variant === "solid" ? (
				<>
					<Path
						d="M14.5 6.5L17.5 3.5L20.5 6.5L17.5 9.5L14.5 6.5Z"
						fill="currentColor"
					/>
					<Path
						d="M6.5 14.5L3.5 17.5L6.5 20.5L9.5 17.5L6.5 14.5Z"
						fill="currentColor"
					/>
					<Path
						d="M14.5 6.5L6.5 14.5"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
					/>
					<Path
						d="M9.5 17.5L17.5 9.5"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
					/>
				</>
			) : (
				<>
					<Path
						d="M14.5 6.5L17.5 3.5L20.5 6.5L17.5 9.5L14.5 6.5Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					/>
					<Path
						d="M6.5 14.5L3.5 17.5L6.5 20.5L9.5 17.5L6.5 14.5Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					/>
					<Path
						d="M14.5 6.5L6.5 14.5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<Path
						d="M9.5 17.5L17.5 9.5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</>
			)}
		</BaseIcon>
	);
};

SwordsIcon.displayName = "SwordsIcon";
