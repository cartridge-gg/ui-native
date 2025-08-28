import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CloneIcon = memo<StateIconProps>(
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
									d="M4 18c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-2h-4a3 3 0 0 1-3-3V9H6c-1.103 0-2 .897-2 2v7Zm7-3h7c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
