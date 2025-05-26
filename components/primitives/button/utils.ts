import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex justify-center items-center gap-1.5 rounded-md uppercase font-mono font-semibold transition-opacity focus:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-100 hover:opacity-80 disabled:opacity-50",
        secondary:
          "bg-background-200 hover:bg-background-300 disabled:bg-background-200",
        tertiary:
          "bg-background-200 font-medium hover:bg-background-300 disabled:bg-background-200",
        icon: "bg-background-200 hover:bg-background-300 disabled:bg-background-200",
        link: "normal-case tracking-normal font-sans font-normal bg-background-100 border border-background-200",
        // TODO: The following variants should be removed
        destructive:
          "bg-destructive-100 shadow-sm hover:bg-destructive-100",
        outline:
          "border border-input bg-background shadow-sm hover:bg-background-500",
        ghost: "hover:bg-background-500",
      },
      size: {
        default: "h-10 px-6 py-2.5",
        tall: "h-full w-9 rounded-none p-2",
        icon: "h-10 w-10 flex items-center",
        thumbnail: "h-10 px-3",
      },
      status: {
        active:
          "bg-background-300 font-medium hover:bg-background-300",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export const buttonTextVariants = cva(
  "text-base font-mono font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        primary: "text-primary-foreground",
        secondary: "text-foreground-100 disabled:text-foreground-300",
        tertiary: "text-foreground-300 hover:text-foreground-200 disabled:text-foreground-400",
        icon: "text-foreground-100 disabled:text-foreground-400",
        link: "text-foreground-300",
        destructive: "text-destructive-foreground",
        outline: "text-foreground-100 hover:text-foreground-200",
        ghost: "text-foreground-100 hover:text-foreground-200",
      },
      size: {
        default: "text-base leading-5",
        tall: "text-sm",
        icon: "text-base",
        thumbnail: "text-sm",
      },
      status: {
        active: "text-foreground-100",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
); 