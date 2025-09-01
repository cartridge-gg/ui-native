import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "expo-router";
import type * as React from "react";
import { Pressable, View } from "react-native";
import { SvgClassContext } from "#components/icons";
import type { StateIconProps } from "#components/icons/types";
import { cn } from "#utils";

export const bottomTabVariants = cva(
  "w-full flex-row justify-around items-stretch shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-background-200 border-t border-spacer-100 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)]",
      },
      size: {
        default: "h-[88px] gap-x-2 px-4 pb-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BottomTabContainerProps
  extends React.ComponentProps<typeof View>,
  VariantProps<typeof bottomTabVariants> {
  children?: React.ReactNode;
}

export function BottomTabContainer({
  className,
  variant,
  size,
  children,
  ...props
}: BottomTabContainerProps) {
  return (
    <View
      className={cn(bottomTabVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </View>
  );
}

// Tab Item component specifically for expo-router navigation
export interface BottomTabItemProps
  extends React.ComponentProps<typeof Pressable> {
  children?: React.ReactNode;
  routeName: string;
  active?: boolean;
  onPress?: () => void;
  // New prop for icon component
  Icon?: React.ComponentType<StateIconProps>;
}

export function BottomTabItem({
  className,
  children,
  routeName,
  active = false,
  onPress,
  Icon: IconComponent,
  ...props
}: BottomTabItemProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/(tabs)/${routeName}`);
    }
  };

  return (
    <SvgClassContext.Provider
      value={active ? "fill-primary" : "fill-foreground-100"}
    >
      <Pressable
        className={cn(
          "flex-1 items-center justify-center relative pt-4",
          active && "opacity-100",
          !active && "opacity-60",
          className,
        )}
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        {...props}
      >
        {/* Border top indicator for active tab */}
        {active && (
          <View className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
        )}

        {IconComponent ? (
          <IconComponent variant={active ? "solid" : "line"} size="xl" />
        ) : (
          children
        )}
      </Pressable>
    </SvgClassContext.Provider>
  );
}
