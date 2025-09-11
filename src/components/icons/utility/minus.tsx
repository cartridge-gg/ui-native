import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const MinusIcon = memo<IconProps>(
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
				<Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
					className={color ? undefined : svgClass}
					fill={color}
					d="M20 13.712v-3.391H4v3.391h16Z"
				/>
			</Svg>
		);
	},
);
