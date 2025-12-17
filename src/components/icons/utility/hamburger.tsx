import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const HamburgerIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		const hookSvgClass = useSvgClass();
		const svgClass = className ?? hookSvgClass ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 16 14"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={color ? undefined : svgClass}
					fill={color}
					d="M0 0.857143C0 0.383929 0.383929 0 0.857143 0H15.1429C15.6179 0 16 0.383929 16 0.857143C16 1.33214 15.6179 1.71429 15.1429 1.71429H0.857143C0.383929 1.71429 0 1.33214 0 0.857143ZM0 6.57143C0 6.09643 0.383929 5.71429 0.857143 5.71429H15.1429C15.6179 5.71429 16 6.09643 16 6.57143C16 7.04643 15.6179 7.42857 15.1429 7.42857H0.857143C0.383929 7.42857 0 7.04643 0 6.57143ZM7.14286 13.1429H0.857143C0.383929 13.1429 0 12.7607 0 12.2857C0 11.8107 0.383929 11.4286 0.857143 11.4286H7.14286C7.61786 11.4286 8 11.8107 8 12.2857C8 12.7607 7.61786 13.1429 7.14286 13.1429Z"
				/>
			</Svg>
		);
	},
);
