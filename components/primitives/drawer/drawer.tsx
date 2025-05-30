import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

const { height: screenHeight } = Dimensions.get('window');

// Drawer Context
interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer');
  }
  return context;
};

// Drawer Root Component
interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  shouldScaleBackground = true,
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
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Drawer Trigger Component
interface DrawerTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children }) => {
  const { setOpen } = useDrawer();

  return (
    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

// Drawer Overlay Component
interface DrawerOverlayProps {
  className?: string;
}

export const DrawerOverlay: React.FC<DrawerOverlayProps> = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 50,
    },
  });

  return <View style={styles.overlay} />;
};

// Drawer Content Component
interface DrawerContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
  const { open, setOpen } = useDrawer();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'flex-end',
    },
    content: {
      backgroundColor: colors.background[100],
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderColor: colors.border[200],
      minHeight: 200,
      maxHeight: screenHeight * 0.8,
      paddingTop: 16,
    },
    handle: {
      width: 100,
      height: 8,
      backgroundColor: colors.background[200],
      borderRadius: 4,
      alignSelf: 'center',
      marginBottom: 16,
    },
  });

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={() => setOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.handle} />
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Drawer Header Component
interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ children }) => {
  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      alignItems: 'center',
    },
  });

  return <View style={styles.header}>{children}</View>;
};

// Drawer Footer Component
interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children }) => {
  const styles = StyleSheet.create({
    footer: {
      marginTop: 'auto',
      padding: 16,
      gap: 8,
    },
  });

  return <View style={styles.footer}>{children}</View>;
};

// Drawer Title Component
interface DrawerTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerTitle: React.FC<DrawerTitleProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="sans-semibold-18" 
      style={{ 
        color: colors.foreground[100],
        textAlign: 'center',
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
};

// Drawer Description Component
interface DrawerDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerDescription: React.FC<DrawerDescriptionProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="body" 
      style={{ 
        color: colors.foreground[400],
        textAlign: 'center',
      }}
    >
      {children}
    </Text>
  );
};

// Drawer Close Component
interface DrawerCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DrawerClose: React.FC<DrawerCloseProps> = ({ children }) => {
  const { setOpen } = useDrawer();

  return (
    <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

// Portal component for API compatibility
export const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 