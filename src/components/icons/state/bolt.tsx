import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const BoltIcon = memo<StateIconProps>(
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
									d="M15.919 5.394a1 1 0 0 0-1.578-1.147l-8 7A1 1 0 0 0 7 13h3.484l-2.403 5.606a1 1 0 0 0 1.578 1.147l8-7a1 1 0 0 0 .277-1.103 1.002 1.002 0 0 0-.937-.647h-3.484l2.403-5.609Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
