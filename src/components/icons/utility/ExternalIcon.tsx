import React, { forwardRef, memo } from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { cn } from "#utils";
import { iconVariants } from "../utils";

interface ExternalIconProps extends SvgProps {
	size?: "2xs" | "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl";
	className?: string;
}

export const ExternalIcon = memo(
	forwardRef<Svg, ExternalIconProps>(
		({ className, size, ...props }, forwardedRef) => {
			const sizeClass = iconVariants({ size });

			return (
				<Svg
					viewBox="0 0 24 24"
					className={cn(sizeClass, className)}
					ref={forwardedRef}
					{...props}
				>
					<Path
						fill="currentColor"
						d="M13.843 5.143a.572.572 0 0 1 0-1.143h5.715c.314 0 .57.256.57.571v5.715a.573.573 0 0 1-.57.571.573.573 0 0 1-.572-.571V5.95l-8.168 8.167a.567.567 0 0 1-.807 0 .567.567 0 0 1 0-.807l8.168-8.168h-4.336ZM4.13 6.857c0-.947.767-1.714 1.714-1.714h4.572a.572.572 0 0 1 0 1.143H5.843a.572.572 0 0 0-.571.571v11.429c0 .314.255.571.571.571h11.429a.573.573 0 0 0 .571-.571v-4.572c0-.314.257-.571.572-.571.314 0 .571.257.571.571v4.572c0 .946-.768 1.714-1.714 1.714H5.843a1.715 1.715 0 0 1-1.714-1.714V6.857Z"
					/>
				</Svg>
			);
		},
	),
);

ExternalIcon.displayName = "ExternalIcon";
