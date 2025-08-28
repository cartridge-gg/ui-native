import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const UserIcon = memo<StateIconProps>(
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
									d="M12 12C13.0609 12 14.0783 11.5786 14.8284 10.8284C15.5786 10.0783 16 9.06087 16 8C16 6.93913 15.5786 5.92172 14.8284 5.17157C14.0783 4.42143 13.0609 4 12 4C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8C8 9.06087 8.42143 10.0783 9.17157 10.8284C9.92172 11.5786 10.9391 12 12 12ZM10.5719 13.5C7.49375 13.5 5 15.9937 5 19.0719C5 19.5844 5.41563 20 5.92813 20H18.0719C18.5844 20 19 19.5844 19 19.0719C19 15.9937 16.5063 13.5 13.4281 13.5H10.5719Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
