import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const EthereumLightColorIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				<Path
					fill="#000"
					fillOpacity=".06"
					d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z"
				/>
				<Path
					fill="#000"
					fillOpacity=".6"
					d="M11.999 4v5.915l4.999 2.234-5-8.149Z"
				/>
				<Path fill="#000" d="m11.999 4-5 8.149 5-2.234V4Z" />
				<Path
					fill="#000"
					fillOpacity=".6"
					d="M11.999 15.981V20L17 13.079 12 15.98Z"
				/>
				<Path fill="#000" d="M11.999 20v-4.02l-5-2.901 5 6.921Z" />
				<Path
					fill="#000"
					fillOpacity=".18"
					d="m11.999 15.051 4.999-2.902-5-2.233v5.135Z"
				/>
				<Path
					fill="#000"
					fillOpacity=".6"
					d="m6.999 12.149 5 2.902V9.916l-5 2.232Z"
				/>
			</Svg>
		);
	},
);
