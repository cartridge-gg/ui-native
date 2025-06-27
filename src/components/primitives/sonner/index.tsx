import { useMemo } from "react";
import { Toaster as SonnerNative } from "sonner-native";

type SonnerToasterProps = React.ComponentProps<typeof SonnerNative>;

export function SonnerToaster({ ...props }: SonnerToasterProps) {
	// For native, we'll use a simple theme detection
	// This can be enhanced with proper theme context later
	const theme = useMemo(() => "system" as const, []);

	return (
		<SonnerNative
			theme={theme}
			duration={1000}
			toastOptions={
				{
					// classNames: {
					//   toast:
					//     "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					//   description: "group-[.toast]:text-foreground-400",
					//   actionButton:
					//     "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					//   cancelButton:
					//     "group-[.toast]:bg-background-200 group-[.toast]:text-foreground-400",
					// },
				}
			}
			{...props}
		/>
	);
}

// Re-export the toast function from sonner-native
export { toast } from "sonner-native";
