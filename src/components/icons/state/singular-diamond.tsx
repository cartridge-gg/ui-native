import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SingularDiamondIcon = memo<StateIconProps>(
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
									d="M11.975 4.99a.565.565 0 0 0-.274.086l-7.109 6.447a.563.563 0 0 0 0 .956l7.11 6.446a.563.563 0 0 0 .597 0l7.108-6.446a.563.563 0 0 0 .001-.956l-7.109-6.447a.56.56 0 0 0-.324-.087Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
