import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "#utils";

export const bottomTabsVariants = cva(
  "w-full flex-row justify-around items-stretch shrink-0",
  {
    variants: {
      variant: {
        default: "bg-background-200 border-t border-spacer-100",
      },
      size: {
        default: "h-[72px] px-4 pb-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const bottomTabVariants = cva("flex flex-col items-center", {
  variants: {
    variant: {
      default:
        "flex-1 text-foreground-300 hover:text-foreground-200 cursor-pointer mx-1",
    },
    size: {
      default: "h-16",
    },
    status: {
      active: "text-primary hover:text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface BottomTabsProps
  extends React.ComponentProps<typeof View>,
  VariantProps<typeof bottomTabsVariants> {
  children?: React.ReactNode;
}

export interface BottomTabItemStatusProps
  extends React.ComponentProps<typeof View>,
  VariantProps<typeof bottomTabVariants> {
  children?: React.ReactNode;
  status?: "active";
}

const BottomTabs = React.forwardRef<
  React.ElementRef<typeof View>,
  BottomTabsProps
>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(bottomTabsVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </View>
  );
});

const BottomTab = React.forwardRef<
  React.ElementRef<typeof View>,
  BottomTabItemStatusProps
>(({ className, variant, status, size, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(bottomTabVariants({ variant, status, size }), className)}
      {...props}
    >
      <View
        className={cn(
          "bg-primary h-[2px] w-full rounded-full",
          status !== "active" && "opacity-0",
        )}
      />
      <View className="flex-1 w-full flex items-center justify-center">
        {children}
      </View>
    </View>
  );
});

BottomTabs.displayName = "BottomTabs";
BottomTab.displayName = "BottomTab";

export { BottomTabs, BottomTab };
