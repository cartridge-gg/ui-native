import type React from "react";
import { View } from "react-native";
import { cn } from "../../utils/cn";

interface AspectRatioProps {
  /**
   * The desired aspect ratio (width / height)
   * Examples: 16/9, 4/3, 1 (square), 9/16 (portrait)
   */
  ratio?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * A component that maintains a specific aspect ratio for its content.
 * The ratio is calculated as width / height.
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1,
  children,
  className,
}) => {
  return (
    <View
      className={cn("w-full", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </View>
  );
};
