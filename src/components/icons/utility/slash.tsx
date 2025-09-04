import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const SlashIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 15 15"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z"
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
				/>
			</Svg>
		);
	},
);
