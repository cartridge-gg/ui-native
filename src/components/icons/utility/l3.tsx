import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const L3Icon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
					d="M12.734 4.162a1.748 1.748 0 0 0-1.468 0L4.434 7.32a.75.75 0 0 0 0 1.362l6.832 3.157a1.749 1.749 0 0 0 1.468 0l6.832-3.157A.747.747 0 0 0 20 8a.747.747 0 0 0-.434-.681l-6.832-3.157Z"
				/>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
					d="m17.903 10.55-4.75 2.194a2.753 2.753 0 0 1-2.306 0l-4.75-2.194-1.663.769a.75.75 0 0 0 0 1.362l6.832 3.157a1.749 1.749 0 0 0 1.468 0l6.832-3.157A.747.747 0 0 0 20 12a.747.747 0 0 0-.434-.681l-1.663-.769Z"
				/>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
					d="m19.566 15.319-1.663-.769-4.75 2.194a2.753 2.753 0 0 1-2.306 0l-4.75-2.194-1.663.769a.75.75 0 0 0 0 1.362l6.832 3.156a1.749 1.749 0 0 0 1.468 0l6.832-3.156A.747.747 0 0 0 20 16a.747.747 0 0 0-.434-.681Z"
				/>
			</Svg>
		);
	},
);
