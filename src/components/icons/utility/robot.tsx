import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const RobotIcon = memo<IconProps>(
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
          d="M12.9 4.8v2.7h5.4v11.7H5.7V7.5h5.4V4.8h1.8ZM8.85 15.6H8.4v.9h1.8v-.9H8.85Zm2.7 0h-.45v.9h1.8v-.9h-1.35Zm2.7 0h-.45v.9h1.8v-.9h-1.35ZM10.425 12a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Zm4.275 1.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM4.8 11.1v5.4H3v-5.4h1.8Zm16.2 0v5.4h-1.8v-5.4H21Z"
        />
      
			</Svg>
		);
	},
);
