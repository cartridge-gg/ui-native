import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const JoystickIcon = memo<StateIconProps>(
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
									d="M15.5 7.5a3.503 3.503 0 0 1-2.5 3.356V14h-2v-3.144A3.5 3.5 0 1 1 15.5 7.5ZM11.25 7c.416 0 .75-.334.75-.75a.748.748 0 0 0-.75-.75.748.748 0 0 0-.75.75c0 .416.334.75.75.75ZM7 15a.999.999 0 1 1 2 0h8c1.103 0 2 .897 2 2v1c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2v-1c0-1.103.897-2 2-2Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
