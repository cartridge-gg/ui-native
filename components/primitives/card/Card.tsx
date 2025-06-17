import React from "react";
import { Image, View, type ViewProps } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

// Base Card component
export interface CardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-col rounded-lg overflow-hidden bg-background-100 gap-px", className)}
        {...props}
      >
        {children}
      </View>
    );
  },
);
Card.displayName = "Card";

// Card Header
export interface CardHeaderProps extends ViewProps {
  icon?: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
}

export const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ className, icon, children, ...props }, ref) => {
    if (icon) {
      return (
        <View ref={ref} className={cn("h-10 flex-row items-center bg-background-200 gap-px", className)} {...props}>
          {typeof icon === "string" ? (
            <CardIcon src={icon} />
          ) : (
            <CardIcon>{icon}</CardIcon>
          )}
          <View className="w-px h-full bg-background" />
          <View className="p-3 flex-1">{children}</View>
        </View>
      );
    }

    return (
      <View ref={ref} className={cn("flex-col gap-1 p-3 bg-background-200", className)} {...props}>
        {children}
      </View>
    );
  },
);
CardHeader.displayName = "CardHeader";

// Card Header Right
export interface CardHeaderRightProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardHeaderRight = React.forwardRef<View, CardHeaderRightProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn("ml-auto", className)} {...props}>
      {children}
    </View>
  ),
);
CardHeaderRight.displayName = "CardHeaderRight";

// Card Icon
export interface CardIconProps extends ViewProps {
  src?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CardIcon = React.forwardRef<View, CardIconProps>(
  ({ className, src, children, ...props }, ref) => (
    <View ref={ref} className={cn("h-9 w-9 p-2 bg-background-200 justify-center items-center", className)} {...props}>
      {src ? (
        <Image
          source={{ uri: src }}
          className="w-5 h-5 rounded-sm"
          resizeMode="cover"
        />
      ) : children ? (
        children
      ) : (
        <View className="w-5 h-5 bg-background-300 rounded-sm" />
      )}
    </View>
  ),
);
CardIcon.displayName = "CardIcon";

// Card Title
export interface CardTitleProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardTitle = React.forwardRef<View, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={className} {...props}>
      <Text variant="label" color="muted">
        {children}
      </Text>
    </View>
  ),
);
CardTitle.displayName = "CardTitle";

// Card Description
export interface CardDescriptionProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardDescription = React.forwardRef<View, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={className} {...props}>
      <Text variant="sans-regular-14" color="muted">
        {children}
      </Text>
    </View>
  ),
);
CardDescription.displayName = "CardDescription";

// Card Content
export interface CardContentProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardContent = React.forwardRef<View, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn("p-3 bg-background-200", className)} {...props}>
      {children}
    </View>
  ),
);
CardContent.displayName = "CardContent";

// Card List Content
export interface CardListContentProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardListContent = React.forwardRef<View, CardListContentProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn("flex-col gap-px text-sm font-medium", className)} {...props}>
      {children}
    </View>
  ),
);
CardListContent.displayName = "CardListContent";

// Card List Item
export interface CardListItemProps extends ViewProps {
  icon?: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
}

export const CardListItem = React.forwardRef<View, CardListItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    if (icon) {
      return (
        <View ref={ref} className={cn("h-11 flex-row items-center bg-background gap-px", className)} {...props}>
          {typeof icon === "string" ? (
            <CardListItemIcon src={icon} />
          ) : (
            <CardListItemIcon>{icon}</CardListItemIcon>
          )}
          <View className="px-3 flex-1 h-full flex-row items-center justify-between bg-background-200">
            {children}
          </View>
        </View>
      );
    }

    return (
      <View ref={ref} className={cn("flex-col gap-1 p-3 bg-background-200 justify-between", className)} {...props}>
        {children}
      </View>
    );
  },
);
CardListItem.displayName = "CardListItem";

// Card List Item Icon
export interface CardListItemIconProps extends ViewProps {
  src?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CardListItemIcon = React.forwardRef<View, CardListItemIconProps>(
  ({ className, src, children, ...props }, ref) => (
    <View ref={ref} className={cn("h-11 w-11 bg-background-200 justify-center items-center", className)} {...props}>
      {src ? (
        <Image
          source={{ uri: src }}
          className="h-6 w-6 rounded-sm"
          resizeMode="cover"
        />
      ) : children ? (
        children
      ) : (
        <View className="h-6 w-6 bg-background-300 rounded-sm" />
      )}
    </View>
  ),
);
CardListItemIcon.displayName = "CardListItemIcon";
