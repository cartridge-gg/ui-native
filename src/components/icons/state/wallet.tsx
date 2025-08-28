import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const WalletIcon = memo<StateIconProps>(
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
									d="M6 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c0-1.103-.897-2-2-2H6.5a.501.501 0 0 1-.5-.5c0-.275.225-.5.5-.5H18a.999.999 0 1 0 0-2H6Zm11 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
