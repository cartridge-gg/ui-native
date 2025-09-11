import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const TimesCircleIcon = memo<IconProps>(
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
					d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Zm3.923 10.1a.387.387 0 0 1 0 .548l-1.278 1.275a.387.387 0 0 1-.548 0L12 13.806l-2.1 2.117a.387.387 0 0 1-.548 0l-1.275-1.278a.387.387 0 0 1 0-.548L10.194 12 8.076 9.9a.387.387 0 0 1 0-.548l1.278-1.278a.387.387 0 0 1 .548 0L12 10.194l2.1-2.117a.387.387 0 0 1 .548 0l1.278 1.278a.387.387 0 0 1 0 .548L13.806 12l2.117 2.1Z"
				/>
			</Svg>
		);
	},
);
