import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';
import { TimesIcon } from '../../icons/utility/TimesIcon';

// Dialog Context
interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

// Dialog Root Component
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
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
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Trigger Component
interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  const { setOpen } = useDialog();

  // Auto-wrap string children in Text component for React Native compatibility
  const renderChildren = () => {
    if (typeof children === 'string') {
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

// Dialog Content Component
interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  const { open, setOpen } = useDialog();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    content: {
      backgroundColor: colors.background[100],
      borderRadius: 8,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      borderWidth: 4,
      borderColor: colors.border[200],
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      position: 'absolute',
      left: 12,
      top: 12,
      padding: 8,
      backgroundColor: colors.background[200],
      borderRadius: 6,
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
              <Pressable
                style={styles.closeButton}
                onPress={() => setOpen(false)}
              >
                <TimesIcon size="default" color={colors.foreground[400]} />
              </Pressable>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Dialog Header Component
interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  const styles = StyleSheet.create({
    header: {
      marginBottom: 16,
      alignItems: 'center',
    },
  });

  return <View style={styles.header}>{children}</View>;
};

// Dialog Footer Component
interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children }) => {
  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 16,
    },
  });

  return <View style={styles.footer}>{children}</View>;
};

// Dialog Title Component
interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return (
    <Text variant="heading-lg" style={{ textAlign: 'center', marginBottom: 8 }}>
      {children}
    </Text>
  );
};

// Dialog Description Component
interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
  const { colors } = useTheme();
  
  return (
    <Text 
      variant="body" 
      style={{ 
        textAlign: 'center', 
        color: colors.foreground[400],
      }}
    >
      {children}
    </Text>
  );
};

// Dialog Close Component
interface DialogCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogClose: React.FC<DialogCloseProps> = ({ children }) => {
  const { setOpen } = useDialog();

  return (
    <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

// Portal and Overlay components for API compatibility
export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const DialogOverlay: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 