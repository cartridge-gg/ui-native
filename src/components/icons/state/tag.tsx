import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const TagIcon = memo<StateIconProps>(
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
									d="M18.6703 6.5V11.1719C18.6703 11.7031 18.4609 12.2125 18.0859 12.5875L12.5859 18.0875C11.8047 18.8687 10.5391 18.8687 9.75781 18.0875L5.58594 13.9156C4.80469 13.1344 4.80469 11.8688 5.58594 11.0875L11.0859 5.5875C11.4609 5.2125 11.9703 5.00312 12.5016 5.00312L17.1703 5C17.9984 5 18.6703 5.67188 18.6703 6.5ZM15.1703 7.5C14.9051 7.5 14.6507 7.60536 14.4632 7.79289C14.2757 7.98043 14.1703 8.23478 14.1703 8.5C14.1703 8.76522 14.2757 9.01957 14.4632 9.20711C14.6507 9.39464 14.9051 9.5 15.1703 9.5C15.4355 9.5 15.6899 9.39464 15.8774 9.20711C16.065 9.01957 16.1703 8.76522 16.1703 8.5C16.1703 8.23478 16.065 7.98043 15.8774 7.79289C15.6899 7.60536 15.4355 7.5 15.1703 7.5Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
