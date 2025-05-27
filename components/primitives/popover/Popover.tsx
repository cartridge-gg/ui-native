import React, { createContext, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Modal } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// Popover Context
interface PopoverContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  style,
}) => {
  const context = useContext(PopoverContext);
  
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover');
  }
  
  const { onOpenChange } = context;
  
  return (
    <Pressable
      style={style}
      onPress={() => onOpenChange(true)}
    >
      {children}
    </Pressable>
  );
};

export interface PopoverContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  style,
  align = 'center',
  side = 'bottom',
}) => {
  const context = useContext(PopoverContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('PopoverContent must be used within a Popover');
  }
  
  const { open, onOpenChange } = context;

  const getAlignmentStyles = () => {
    switch (align) {
      case 'start':
        return { alignItems: 'flex-start' as const };
      case 'end':
        return { alignItems: 'flex-end' as const };
      default:
        return { alignItems: 'center' as const };
    }
  };

  const getSideStyles = () => {
    switch (side) {
      case 'top':
        return { justifyContent: 'flex-start' as const };
      case 'bottom':
        return { justifyContent: 'flex-end' as const };
      case 'left':
        return { justifyContent: 'flex-start' as const };
      case 'right':
        return { justifyContent: 'flex-end' as const };
      default:
        return { justifyContent: 'center' as const };
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: 16,
      ...getSideStyles(),
      ...getAlignmentStyles(),
    },
    content: {
      backgroundColor: colors.background[200],
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.background[300],
      padding: 16,
      width: 288, // w-72 equivalent
      maxWidth: '90%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
        <Pressable 
          style={[styles.content, style]}
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export interface PopoverAnchorProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const PopoverAnchor: React.FC<PopoverAnchorProps> = ({
  children,
  style,
}) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
}; 