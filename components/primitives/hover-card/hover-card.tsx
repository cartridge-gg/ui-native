import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// HoverCard Context
interface HoverCardContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  align: 'start' | 'center' | 'end';
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
}

const HoverCardContext = createContext<HoverCardContextType | undefined>(undefined);

const useHoverCard = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error('HoverCard components must be used within a HoverCard');
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
        align: 'center',
        side: 'bottom',
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

export const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({ children }) => {
  const { setOpen } = useHoverCard();

  return (
    <TouchableOpacity 
      onPress={() => setOpen(true)}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

// HoverCard Content Component
interface HoverCardContentProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
}

export const HoverCardContent: React.FC<HoverCardContentProps> = ({ 
  children,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
}) => {
  const { open, setOpen } = useHoverCard();
  const { colors } = useTheme();

  const getContentPosition = () => {
    const baseStyle = {
      position: 'absolute' as const,
      backgroundColor: colors.background[200],
      borderWidth: 1,
      borderColor: colors.border[200],
      borderRadius: 8,
      padding: 16,
      width: 256, // w-64 equivalent
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 50,
    };

    // For simplicity in React Native, we'll center the content
    // In a real implementation, you'd calculate position based on trigger location
    return {
      ...baseStyle,
      top: '50%',
      left: '50%',
      marginTop: -100, // Approximate half height
      marginLeft: -128, // Half of width (256/2)
    };
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: colors.background[200],
      borderWidth: 1,
      borderColor: colors.border[200],
      borderRadius: 8,
      padding: 16,
      width: 256, // w-64 equivalent
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
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
      onRequestClose={() => setOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Portal component for API compatibility
export const HoverCardPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 