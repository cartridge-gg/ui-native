import type React from "react";
import { createContext, useContext, useState } from "react";
import {
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { cn } from "../../utils/cn";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// HoverCard Context
interface HoverCardContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  align: "start" | "center" | "end";
  side: "top" | "right" | "bottom" | "left";
  sideOffset: number;
}

const HoverCardContext = createContext<HoverCardContextType | undefined>(
  undefined,
);

const useHoverCard = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within a HoverCard");
  }
  return context;
};

// HoverCard Root Component
interface HoverCardProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <HoverCardContext.Provider
      value={{
        open,
        setOpen,
        align: "center",
        side: "bottom",
        sideOffset: 4,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
};

// HoverCard Trigger Component
interface HoverCardTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({
  children,
}) => {
  const { setOpen } = useHoverCard();

  // Auto-wrap string children in Text component for React Native compatibility
  const renderChildren = () => {
    if (typeof children === "string") {
      const Text = require("../../typography/Text").Text;
      return <Text variant="sans-regular-16">{children}</Text>;
    }
    return children;
  };

  return (
    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
      {renderChildren()}
    </TouchableOpacity>
  );
};

// HoverCard Content Component
interface HoverCardContentProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
}

export const HoverCardContent: React.FC<HoverCardContentProps> = ({
  children,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  className,
}) => {
  const { open, setOpen } = useHoverCard();

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View className="flex-1 bg-black/30 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className={cn(
              "bg-background-200 border border-border-200 rounded-lg p-4 w-64 shadow-lg",
              className
            )}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Portal component for API compatibility
export const HoverCardPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
