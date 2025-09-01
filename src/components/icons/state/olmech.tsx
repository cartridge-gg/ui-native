import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const OlmechIcon = memo<StateIconProps>(
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
            case "one":
              return (
                
              <>
                <Path
                  d="M10 4H8V6H6V8H8V10H10V12H14V10H16V8H18V6H16V4H14V6H16V8H14V10H10V8H8V6H10V4Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M18 12H20V16H18V12Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path
                  d="M16 14H14V16H10V14H8V16H10V20H14V16H16V14Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M6 16V12H4V16H6Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
              </>
            
              );
            case "two":
              return (
                
              <>
                <Path
                  d="M4 4V6H6V8H4V12H6V8H8V10H10V12H14V10H16V8H18V12H20V8H18V6H20V4H16V8H14V10H10V8H8V4H4Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M8 14H6V16H8V14Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M8 18H10V20H8V18Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M18 14H16V16H18V14Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M16 18H14V20H16V18Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
              </>
            
              );
            case "three":
              return (
                
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 4H4V8H10V10H4V14H6V18H4V20H6V18H8V20H16V18H18V20H20V18H18V14H20V10H14V8H20V4H18V6H14V8H10V6H6V4ZM14 14V12H10V14H14Z"
                // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                className={svgClass}
              />
            
              );
            case "four":
              return (
                
              <>
                <Path d="M6 4H4V6H6V4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path
                  d="M6 8H4V14H6V20H8V18H10V16H8V14H6V8Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M8 4H16V8H8V4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M18 4H20V6H18V4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M18 8H20V14H18V8Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path
                  d="M18 14V20H16V18H14V16H16V14H18Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
              </>
            
              );
            case "five":
              return (
                
              <>
                <Path
                  d="M8 4V6H6V8H8V6H16V8H18V6H16V4H8Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M10 8V10H14V8H10Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 20V18H8V20H4V12H20V20H16V18H14V20H10ZM6 14H18V16H6V14Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
              </>
            
              );
            case "six":
              return (
                
              <>
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4H6V6H4V10H6V18H4V20H6V18H18V20H20V18H18V10H20V6H18V4H16V6H8V4ZM10 10V12H14V10H10ZM18 10V8H16V10H18ZM6 10V8H8V10H6Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
              </>
            
              );
            case "seven":
              return (
                
              <>
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 4H18V8H20V12H16V16H14V14H10V16H8V12H4V8H6V4ZM16 10V6H8V10H16Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M10 18H8V20H10V18Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M4 14V20H6V14H4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M14 18H16V20H14V18Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M18 14H20V20H18V14Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
              </>
            
              );
            case "eight":
              return (
                
              <>
                <Path d="M6 4H4V8H8V6H6V4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M8 10V12H4V10H8Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path
                  d="M10 12H8V14H6V20H8V14H10V12Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path
                  d="M10 8V12H14V14H16V20H18V14H16V12H20V10H16V12H14V8H10Z"
                  // @ts-expect-error TODO: className prop type issue with cssInterop-ed component

                  className={svgClass}
                />
                <Path d="M10 16V18H14V16H10Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
                <Path d="M18 4H20V8H16V6H18V4Z" // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
 className={svgClass} />
              </>
            
              );
          }
				})()}
			</Svg>
		);
	},
);
