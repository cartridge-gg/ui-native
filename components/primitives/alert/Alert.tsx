import { View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

export type AlertVariant = "default" | "destructive" | "constructive";

export interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "default",
  children,
  className,
}) => {
  const variantStyles = {
    default: "bg-background-200 border border-background-300",
    destructive: "bg-background-200 border border-destructive-100",
    constructive: "bg-background-200 border border-constructive-100",
  };

  return (
    <View
      className={cn(
        "rounded-lg p-4",
        variantStyles[variant],
        className
      )}
      accessibilityRole="alert"
    >
      {children}
    </View>
  );
};

export interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  return (
    <Text
      variant="body"
      className={cn("font-semibold mb-1 text-foreground-100", className)}
    >
      {children}
    </Text>
  );
};

export interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <Text
      variant="body"
      className={cn("text-foreground-400 leading-5", className)}
    >
      {children}
    </Text>
  );
};
