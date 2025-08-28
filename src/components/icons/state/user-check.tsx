import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const UserCheckIcon = memo<StateIconProps>(
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
									d="M6.2 8.5C6.2 7.57174 6.57928 6.6815 7.25442 6.02513C7.92955 5.36875 8.84522 5 9.8 5C10.7548 5 11.6705 5.36875 12.3456 6.02513C13.0207 6.6815 13.4 7.57174 13.4 8.5C13.4 9.42826 13.0207 10.3185 12.3456 10.9749C11.6705 11.6313 10.7548 12 9.8 12C8.84522 12 7.92955 11.6313 7.25442 10.9749C6.57928 10.3185 6.2 9.42826 6.2 8.5ZM3.5 18.1879C3.5 15.4945 5.74438 13.3125 8.51469 13.3125H11.0853C13.8556 13.3125 16.1 15.4945 16.1 18.1879C16.1 18.6363 15.7259 19 15.2647 19H4.33531C3.87406 19 3.5 18.6363 3.5 18.1879ZM21.0781 9.83984L17.4781 13.3398C17.2138 13.5969 16.7863 13.5969 16.5247 13.3398L14.7247 11.5898C14.4603 11.3328 14.4603 10.9172 14.7247 10.6629C14.9891 10.4086 15.4166 10.4059 15.6781 10.6629L17 11.948L20.1219 8.91016C20.3863 8.65313 20.8138 8.65313 21.0753 8.91016C21.3369 9.16719 21.3397 9.58281 21.0753 9.83711L21.0781 9.83984Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
