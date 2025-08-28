import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const GridIcon = memo<StateIconProps>(
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
									d="M10.929 6.107c0-.887-.72-1.607-1.608-1.607H6.107C5.22 4.5 4.5 5.22 4.5 6.107v3.214c0 .888.72 1.608 1.607 1.608h3.214c.888 0 1.608-.72 1.608-1.608V6.107Zm0 8.572c0-.888-.72-1.608-1.608-1.608H6.107c-.887 0-1.607.72-1.607 1.608v3.214c0 .887.72 1.607 1.607 1.607h3.214c.888 0 1.608-.72 1.608-1.607v-3.214Zm2.142-8.572v3.214c0 .888.72 1.608 1.608 1.608h3.214c.887 0 1.607-.72 1.607-1.608V6.107c0-.887-.72-1.607-1.607-1.607h-3.214c-.888 0-1.608.72-1.608 1.607ZM19.5 14.68c0-.888-.72-1.608-1.607-1.608h-3.214c-.888 0-1.608.72-1.608 1.608v3.214c0 .887.72 1.607 1.608 1.607h3.214c.887 0 1.607-.72 1.607-1.607v-3.214Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);
