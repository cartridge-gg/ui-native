import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const TransferIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path
					fill="currentColor"
					d="m5.728 16.756 2.526 2.527.714.717 1.43-1.43-.713-.715-.802-.802h10.192v-2.021H8.883l.802-.802.714-.714-1.431-1.43-.714.713-2.526 2.527-.717.717.713.713h.003Zm12.548-8.085.713-.714-.713-.713-2.527-2.527L15.032 4l-1.43 1.43.713.714.802.803H4.926v2.021H15.116l-.802.802-.714.714 1.43 1.43.715-.713 2.526-2.527.004-.003Z"
				/>
			</Svg>
		);
	},
);
