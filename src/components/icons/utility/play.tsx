import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const PlayIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		const hookSvgClass = useSvgClass();
		const svgClass = className ?? hookSvgClass ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={color ? undefined : svgClass}
					fill={color}
					d="M16.527 10.903c.383.235.617.65.617 1.098 0 .447-.233.863-.617 1.074L8.813 17.79a1.236 1.236 0 0 1-1.3.049 1.286 1.286 0 0 1-.657-1.123v-9.43a1.286 1.286 0 0 1 1.957-1.097l7.714 4.714Z"
				/>
			</Svg>
		);
	},
);
