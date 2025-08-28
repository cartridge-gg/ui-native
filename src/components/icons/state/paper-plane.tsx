import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const PaperPlaneIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									fill="currentColor"
									d="M19.5656 4.17512C19.8813 4.39387 20.0469 4.77199 19.9875 5.15012L17.9875 18.1501C17.9406 18.4532 17.7563 18.7189 17.4875 18.8689C17.2188 19.0189 16.8969 19.0376 16.6125 18.9189L12.875 17.3657L10.7344 19.6814C10.4563 19.9845 10.0188 20.0845 9.6344 19.9345C9.25002 19.7845 9.00002 19.4126 9.00002 19.0001V16.3876C9.00002 16.2626 9.0469 16.1439 9.13127 16.0501L14.3688 10.3376C14.55 10.1407 14.5438 9.83762 14.3563 9.65012C14.1688 9.46262 13.8656 9.45012 13.6688 9.62824L7.31252 15.2751L4.55315 13.8939C4.2219 13.7282 4.0094 13.397 4.00002 13.0282C3.99065 12.6595 4.1844 12.3157 4.50315 12.1314L18.5031 4.13137C18.8375 3.94074 19.25 3.95949 19.5656 4.17512Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
