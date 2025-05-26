import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
  style?: any;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'default',
  visible,
  onClose,
  duration = 4000,
  style,
}) => {
  const { colors } = useTheme();
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

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: colors.constructive[100],
          borderColor: colors.constructive[100],
        };
      case 'error':
        return {
          backgroundColor: colors.destructive[100],
          borderColor: colors.destructive[100],
        };
      case 'warning':
        return {
          backgroundColor: colors.primary[100],
          borderColor: colors.primary[100],
        };
      default:
        return {
          backgroundColor: colors.background[200],
          borderColor: colors.background[300],
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
      case 'error':
      case 'warning':
        return colors.background[100]; // Dark text on colored background
      default:
        return colors.foreground[100]; // Light text on dark background
    }
  };

  const variantStyles = getVariantStyles();
  const textColor = getTextColor();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 50,
      left: 16,
      right: 16,
      zIndex: 1000,
    },
    toast: {
      ...variantStyles,
      borderRadius: 8,
      borderWidth: 1,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: textColor,
    },
    description: {
      fontSize: 12,
      color: textColor,
      opacity: 0.9,
    },
    closeButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: textColor,
    },
  });

  if (!visible) return null;

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.toast,
          {
            transform: [{ translateY: slideAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {onClose && (
          <Pressable style={styles.closeButton} onPress={hideToast}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

// Toast context and hook for global toast management
export interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'visible'>) => void;
  hideToast: () => void;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastProps, setToastProps] = React.useState<ToastProps | null>(null);

  const showToast = (props: Omit<ToastProps, 'visible'>) => {
    setToastProps({ ...props, visible: true });
  };

  const hideToast = () => {
    setToastProps(prev => prev ? { ...prev, visible: false } : null);
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