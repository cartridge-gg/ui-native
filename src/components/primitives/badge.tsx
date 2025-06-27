import { cva, type VariantProps } from "class-variance-authority";
import { View, type ViewProps } from "react-native";
import { TextClassContext } from "#components/primitives/text";
import { cn } from "#utils";

const badgeVariants = cva(
	"flex-row items-center self-start rounded-md px-2 py-0.5 transition-colors focus:outline-none",
	{
		variants: {
			variant: {
				default: "border-transparent bg-background-200 hover:bg-background-200",
				primary: "border-transparent bg-primary shadow hover:bg-primary",
				muted: "border-transparent bg-background-200 hover:bg-background-200",
				destructive:
					"border-transparent bg-destructive-100 shadow hover:bg-destructive-100",
				outline: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const badgeTextVariants = cva("text-xs font-semibold", {
	variants: {
		variant: {
			default: "text-foreground",
			primary: "text-primary-foreground",
			muted: "text-foreground-400",
			destructive: "text-destructive-100",
			outline: "text-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface BadgeProps
	extends ViewProps,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<TextClassContext.Provider value={badgeTextVariants({ variant })}>
			<View className={cn(badgeVariants({ variant }), className)} {...props} />
		</TextClassContext.Provider>
	);
}
