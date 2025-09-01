import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { DirectionalIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const CaratIcon = memo<DirectionalIconProps>(
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
                
                <Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} d="m8 13.6 4-4 4 4v.8H8v-.8Z" />
              
              );
            case "right":
              return (
                
                <Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} d="m10.4 8 4 4-4 4h-.8V8h.8Z" />
              
              );
            case "down":
              return (
                
                <Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} d="m16 10.4-4 4-4-4v-.8h8v.8Z" />
              
              );
            case "left":
              return (
                
                <Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} d="m13.6 16-4-4 4-4h.8v8h-.8Z" />
              
              );
          }
				})()}
			</Svg>
		);
	},
);
