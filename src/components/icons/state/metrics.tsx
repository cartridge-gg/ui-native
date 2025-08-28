import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const MetricsIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									fill="currentColor"
									d="M12.0325 11.4974V4.48948C12.0325 4.20716 12.2521 3.96875 12.5344 3.96875C16.4148 3.96875 19.5611 7.1151 19.5611 10.9955C19.5611 11.2778 19.3227 11.4974 19.0404 11.4974H12.0325ZM3.5 12.5012C3.5 8.69612 6.32638 5.54663 9.99346 5.04472C10.2821 5.00394 10.5267 5.23607 10.5267 5.52781V13.0031L15.4361 17.9124C15.6462 18.1226 15.6305 18.4677 15.389 18.6371C14.1593 19.5154 12.6536 20.0299 11.0287 20.0299C6.87221 20.0299 3.5 16.6608 3.5 12.5012ZM20.0128 13.0031C20.3046 13.0031 20.5336 13.2478 20.4959 13.5364C20.2544 15.29 19.4106 16.849 18.1777 18.0003C17.9895 18.1759 17.6947 18.1634 17.5127 17.9783L12.5344 13.0031H20.0128Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
