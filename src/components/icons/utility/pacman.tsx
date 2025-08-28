import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const PacmanIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path
					fill="currentColor"
					d="M19.391 15.062a8 8 0 1 1 0-6.123L12 12l7.391 3.062Z"
				/>
			</Svg>
		);
	},
);
