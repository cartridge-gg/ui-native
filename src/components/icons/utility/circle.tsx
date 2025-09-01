import { memo } from "react";
import Svg, { Circle } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CircleIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				
        <Circle cx="12" cy="12" r="4" fill={color || "currentColor"} />
      
			</Svg>
		);
	},
);
