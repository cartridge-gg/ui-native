import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const ConnectIcon = memo<StateIconProps>(
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
									d="M3 6.5A1.5 1.5 0 0 1 4.5 5h3A1.5 1.5 0 0 1 9 6.5V7h6v-.5A1.5 1.5 0 0 1 16.5 5h3A1.5 1.5 0 0 1 21 6.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 15 9.5V9H9v.5c0 .053-.003.106-.01.156L11.5 13h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3c0-.053.003-.106.01-.156L7.5 11h-3A1.5 1.5 0 0 1 3 9.5v-3Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
