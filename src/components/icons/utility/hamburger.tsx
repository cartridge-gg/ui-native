import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const HamburgerIcon = memo<IconProps>(
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
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
					d="M4 6.28683C4 5.81362 4.38393 5.42969 4.85714 5.42969H19.1429C19.6179 5.42969 20 5.81362 20 6.28683C20 6.76183 19.6179 7.14397 19.1429 7.14397H4.85714C4.38393 7.14397 4 6.76183 4 6.28683ZM4 12.0011C4 11.5261 4.38393 11.144 4.85714 11.144H19.1429C19.6179 11.144 20 11.5261 20 12.0011C20 12.4761 19.6179 12.8583 19.1429 12.8583H4.85714C4.38393 12.8583 4 12.4761 4 12.0011ZM11.1429 18.5725H4.85714C4.38393 18.5725 4 18.1904 4 17.7154C4 17.2404 4.38393 16.8583 4.85714 16.8583H11.1429C11.6179 16.8583 12 17.2404 12 17.7154C12 18.1904 11.6179 18.5725 11.1429 18.5725Z"
				/>
			</Svg>
		);
	},
);
