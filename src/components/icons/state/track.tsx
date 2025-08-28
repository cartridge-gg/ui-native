import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const TrackIcon = memo<StateIconProps>(
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
									d="M7.00258 5C7.00258 4.44687 7.44945 4 8.00258 4H16.0026C16.5557 4 17.0026 4.44687 17.0026 5C17.0026 5.55313 16.5557 6 16.0026 6H15.0807L15.437 10.6312C16.5838 11.2531 17.4901 12.2937 17.9213 13.5906L17.9526 13.6844C18.0557 13.9906 18.0026 14.325 17.8151 14.5844C17.6276 14.8438 17.3245 15 17.0026 15H7.00258C6.6807 15 6.3807 14.8469 6.19008 14.5844C5.99945 14.3219 5.94945 13.9875 6.05258 13.6844L6.08383 13.5906C6.51508 12.2937 7.42133 11.2531 8.5682 10.6312L8.92445 6H8.00258C7.44945 6 7.00258 5.55313 7.00258 5ZM11.0026 16H13.0026V19C13.0026 19.5531 12.5557 20 12.0026 20C11.4495 20 11.0026 19.5531 11.0026 19V16Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
