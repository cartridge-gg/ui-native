import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const EthereumColorIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				
        <Path
          fill="#627EEA"
          d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z"
        />
        <Path
          fill="#fff"
          fillOpacity=".602"
          d="M11.999 4v5.915l4.999 2.233-5-8.148Z"
        />
        <Path fill="#fff" d="m11.999 4-5 8.148 5-2.233V4Z" />
        <Path
          fill="#fff"
          fillOpacity=".602"
          d="M11.999 15.981V20L17 13.08 12 15.98Z"
        />
        <Path fill="#fff" d="M11.999 20v-4.02l-5-2.9 5 6.92Z" />
        <Path
          fill="#fff"
          fillOpacity=".2"
          d="m11.999 15.051 4.999-2.903-5-2.232v5.135Z"
        />
        <Path
          fill="#fff"
          fillOpacity=".602"
          d="m6.999 12.148 5 2.903V9.916l-5 2.232Z"
        />
      
			</Svg>
		);
	},
);
