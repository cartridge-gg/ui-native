import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const InfoIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				
          <Path
            fill={color || "currentColor"}
            d="M12 20a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20Zm-1.25-5.5h.75v-2h-.75a.748.748 0 0 1-.75-.75c0-.416.334-.75.75-.75h1.5c.416 0 .75.334.75.75v2.75h.25c.416 0 .75.334.75.75s-.334.75-.75.75h-2.5a.748.748 0 0 1-.75-.75c0-.416.334-.75.75-.75ZM12 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
          />
        
			</Svg>
		);
	},
);
