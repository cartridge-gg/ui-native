import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const CircleNoCheckIcon = memo<IconProps>(
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
					fillRule="evenodd"
					d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
					clipRule="evenodd"
				/>
			</Svg>
		);
	},
);
