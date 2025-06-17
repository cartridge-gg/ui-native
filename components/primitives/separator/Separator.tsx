import { View } from "react-native";
import { cn } from "../../utils/cn";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  decorative = true,
  className,
}) => {
  return (
    <View
      className={cn(
        "bg-background-300",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      accessible={!decorative}
    />
  );
};
