import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const SpinnerIcon = memo<IconProps>(
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
          d="M11.111 5.778c0-.491.398-.89.89-.89a7.11 7.11 0 0 1 6.158 10.668c-.245.425-.79.572-1.24.325-.4-.245-.544-.79-.3-1.24.453-.758.715-1.669.715-2.666A5.335 5.335 0 0 0 12 6.642a.873.873 0 0 1-.889-.89v.026Z"
        />
        <Path
          // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

          className={svgClass}
          d="M11.975 6.667A5.319 5.319 0 0 0 6.64 12a5.335 5.335 0 0 0 5.334 5.333 5.34 5.34 0 0 0 4.605-2.6l.003.003a.906.906 0 0 0 .336 1.145c.45.247.995.1 1.24-.325A7.106 7.106 0 0 1 12 19.112 7.11 7.11 0 0 1 4.888 12a7.11 7.11 0 0 1 7.11-7.111.888.888 0 1 0 0 1.778h-.024Z"
          opacity=".25"
        />
      
			</Svg>
		);
	},
);
