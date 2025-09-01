import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { DirectionalIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const ArrowFromLineIcon = memo<DirectionalIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
            case "up":
              return (
                
                <Path
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                  d="M18.857 18.279v1.72H5.143v-1.72h13.714ZM11.375 4.665 12 4.001l5.782 6.143-1.25 1.175-.586-.625-3.089-3.282v8.41h-1.714v-8.41l-3.679 3.907-1.25-1.175.586-.625 4.571-4.857.004.003Z"
                />
              
              );
            case "right":
              return (
                
                <Path
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                  d="M5.721 18.857h-1.72V5.143h1.72v13.714Zm13.613-7.482L20 12l-6.143 5.782-1.175-1.25.625-.586 3.282-3.089h-8.41v-1.714h8.41l-3.907-3.679 1.175-1.25.625.586 4.857 4.571-.004.004Z"
                />
              
              );
            case "down":
              return (
                
                <Path
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                  d="M5.143 5.721v-1.72h13.714v1.72H5.143Zm7.482 13.613L12 20l-5.782-6.143 1.25-1.175.586.625 3.089 3.282v-8.41h1.714v8.41l3.679-3.907 1.25 1.175-.586.625-4.571 4.857-.004-.004Z"
                />
              
              );
            case "left":
              return (
                
                <Path
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                  d="M18.279 5.143h1.72v13.714h-1.72V5.143ZM4.665 12.625 4.001 12l6.143-5.782 1.175 1.25-.625.586-3.282 3.089h8.41v1.714h-8.41l3.907 3.679-1.175 1.25-.625-.586-4.857-4.571.003-.004Z"
                />
              
              );
          }
				})()}
			</Svg>
		);
	},
);
