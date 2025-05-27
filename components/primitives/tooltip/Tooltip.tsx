import React, { createContext, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Modal } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

// Tooltip Context
interface TooltipContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delayDuration: number;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

// TooltipProvider Context
interface TooltipProviderContextType {
  delayDuration: number;
}

const TooltipProviderContext = createContext<TooltipProviderContextType>({ delayDuration: 700 });

export interface TooltipProviderProps {
  delayDuration?: number;
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  delayDuration = 700,
  children,
}) => {
  return (
    <TooltipProviderContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipProviderContext.Provider>
  );
};

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration: customDelayDuration,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const providerContext = useContext(TooltipProviderContext);
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const delayDuration = customDelayDuration ?? providerContext.delayDuration;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <TooltipContext.Provider value={{ open, onOpenChange: handleOpenChange, delayDuration }}>
      {children}
    </TooltipContext.Provider>
  );
};

export interface TooltipTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  style,
}) => {
  const context = useContext(TooltipContext);
  
  if (!context) {
    throw new Error('TooltipTrigger must be used within a Tooltip');
  }
  
  const { onOpenChange, delayDuration } = context;
  let timeoutId: NodeJS.Timeout;
  
  const handlePressIn = () => {
    timeoutId = setTimeout(() => {
      onOpenChange(true);
    }, delayDuration);
  };
  
  const handlePressOut = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    onOpenChange(false);
  };
  
  return (
    <Pressable
      style={style}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {}} // Prevent default press behavior
    >
      {children}
    </Pressable>
  );
};

export interface TooltipContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  style,
  side = 'bottom',
  sideOffset = 4,
}) => {
  const context = useContext(TooltipContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('TooltipContent must be used within a Tooltip');
  }
  
  const { open, onOpenChange } = context;

  const getSideStyles = () => {
    switch (side) {
      case 'top':
        return { 
          justifyContent: 'flex-start' as const,
          paddingTop: sideOffset
        };
      case 'bottom':
        return { 
          justifyContent: 'flex-end' as const,
          paddingBottom: sideOffset
        };
      case 'left':
        return { 
          justifyContent: 'center' as const,
          alignItems: 'flex-start' as const,
          paddingLeft: sideOffset
        };
      case 'right':
        return { 
          justifyContent: 'center' as const,
          alignItems: 'flex-end' as const,
          paddingRight: sideOffset
        };
      default:
        return { 
          justifyContent: 'flex-end' as const,
          paddingBottom: sideOffset
        };
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      ...getSideStyles(),
    },
    content: {
      backgroundColor: colors.background[100],
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      maxWidth: 250,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 12,
      color: colors.foreground[100],
      textAlign: 'center',
    },
  });

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable 
        style={styles.overlay}
        onPress={() => onOpenChange(false)}
      >
        <View style={[styles.content, style]}>
          {typeof children === 'string' ? (
            <Text style={styles.text}>{children}</Text>
          ) : (
            children
          )}
        </View>
      </Pressable>
    </Modal>
  );
}; 