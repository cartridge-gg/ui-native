import { memo } from "react";
import Svg, { Circle } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const CircleIcon = memo<IconProps>(
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
				<Circle
					cx="12"
					cy="12"
					r="4" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
					className={color ? undefined : svgClass}
					fill={color}
				/>
			</Svg>
		);
	},
);
