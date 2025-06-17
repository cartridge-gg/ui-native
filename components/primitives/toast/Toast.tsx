import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = "default",
  visible,
  onClose,
  duration = 4000,
  className,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      hideToast();
    }
  }, [visible, duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const variantClasses = {
    default: "bg-background-200 border-background-300",
    success: "bg-constructive-100 border-constructive-100",
    error: "bg-destructive-100 border-destructive-100",
    warning: "bg-primary-100 border-primary-100",
  };

  const textColorClasses = {
    default: "text-foreground-100",
    success: "text-background-100",
    error: "text-background-100",
    warning: "text-background-100",
  };

  if (!visible) return null;

  return (
    <View className={cn("absolute top-12 left-4 right-4 z-50", className)}>
      <Animated.View
        className={cn(
          "rounded-lg border p-4 flex-row items-start justify-between shadow-lg",
          variantClasses[variant]
        )}
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }}
      >
        <View className="flex-1 gap-1">
          {title && (
            <Text className={cn("text-sm font-semibold", textColorClasses[variant])}>
              {title}
            </Text>
          )}
          {description && (
            <Text className={cn("text-xs opacity-90", textColorClasses[variant])}>
              {description}
            </Text>
          )}
        </View>
        {onClose && (
          <Pressable
            className="w-6 h-6 rounded-full justify-center items-center ml-3"
            onPress={hideToast}
          >
            <Text className={cn("text-base font-bold", textColorClasses[variant])}>
              ×
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

// Toast context and hook for global toast management
export interface ToastContextType {
  showToast: (props: Omit<ToastProps, "visible">) => void;
  hideToast: () => void;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toastProps, setToastProps] = React.useState<ToastProps | null>(null);

  const showToast = (props: Omit<ToastProps, "visible">) => {
    setToastProps({ ...props, visible: true });
  };

  const hideToast = () => {
    setToastProps((prev) => (prev ? { ...prev, visible: false } : null));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastProps && (
        <Toast
          {...toastProps}
          onClose={() => {
            toastProps.onClose?.();
            setToastProps(null);
          }}
        />
      )}
    </ToastContext.Provider>
  );
};
