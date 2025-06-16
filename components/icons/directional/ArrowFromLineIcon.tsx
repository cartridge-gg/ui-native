import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { DirectionalIconProps } from "../types";

export const ArrowFromLineIcon: React.FC<DirectionalIconProps> = ({
	variant,
	...props
}) => {
	const renderPath = () => {
		switch (variant) {
			case "up":
				return (
					<Path
						d="M18.857 18.279v1.72H5.143v-1.72h13.714ZM11.375 4.665 12 4.001l5.782 6.143-1.25 1.175-.586-.625-3.089-3.282v8.41h-1.714v-8.41l-3.679 3.907-1.25-1.175.586-.625 4.571-4.857.004.003Z"
						fill="currentColor"
					/>
				);
			case "right":
				return (
					<Path
						d="M5.721 18.857h-1.72V5.143h1.72v13.714Zm13.613-7.482L20 12l-6.143 5.782-1.175-1.25.625-.586 3.282-3.089h-8.41v-1.714h8.41l-3.907-3.679 1.175-1.25.625.586 4.857 4.571-.004.004Z"
						fill="currentColor"
					/>
				);
			case "down":
				return (
					<Path
						d="M5.143 5.721v-1.72h13.714v1.72H5.143Zm7.482 13.613L12 20l-5.782-6.143 1.25-1.175.586.625 3.089 3.282v-8.41h1.714v8.41l3.679-3.907 1.25 1.175-.586.625-4.571 4.857-.004-.004Z"
						fill="currentColor"
					/>
				);
			case "left":
				return (
					<Path
						d="M18.279 5.143h1.72v13.714h-1.72V5.143ZM4.665 12.625 4.001 12l6.143-5.782 1.175 1.25-.625.586-3.282 3.089h8.41v1.714h-8.41l3.907 3.679-1.175 1.25-.625-.586-4.857-4.571.003-.004Z"
						fill="currentColor"
					/>
				);
			default:
				return (
					<Path
						d="M18.857 18.279v1.72H5.143v-1.72h13.714ZM11.375 4.665 12 4.001l5.782 6.143-1.25 1.175-.586-.625-3.089-3.282v8.41h-1.714v-8.41l-3.679 3.907-1.25-1.175.586-.625 4.571-4.857.004.003Z"
						fill="currentColor"
					/>
				);
		}
	};

	return <BaseIcon {...props}>{renderPath()}</BaseIcon>;
};

ArrowFromLineIcon.displayName = "ArrowFromLineIcon";
