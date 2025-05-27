import { createContext, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Modal } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

// AlertDialog Context
interface AlertDialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
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
    <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export interface AlertDialogTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  children,
  style,
}) => {
  const context = useContext(AlertDialogContext);
  
  if (!context) {
    throw new Error('AlertDialogTrigger must be used within an AlertDialog');
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

export interface AlertDialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
  children,
  style,
}) => {
  const context = useContext(AlertDialogContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('AlertDialogContent must be used within an AlertDialog');
  }
  
  const { open, onOpenChange } = context;

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
      borderWidth: 4,
      borderColor: colors.background[300],
      padding: 24,
      width: '100%',
      maxWidth: 400,
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

export interface AlertDialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {children}
    </View>
  );
};

export interface AlertDialogFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[
      { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        gap: 8, 
        marginTop: 16 
      }, 
      style
    ]}>
      {children}
    </View>
  );
};

export interface AlertDialogTitleProps {
  children: React.ReactNode;
  style?: any;
}

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="heading-lg" 
      style={[
        { 
          color: colors.foreground[100],
          marginBottom: 8
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
};

export interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="body" 
      style={[
        { 
          color: colors.foreground[400],
          lineHeight: 20
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
};

export interface AlertDialogActionProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'destructive';
  style?: ViewStyle;
}

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  children,
  onPress,
  variant = 'default',
  style,
}) => {
  const context = useContext(AlertDialogContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('AlertDialogAction must be used within an AlertDialog');
  }
  
  const { onOpenChange } = context;
  
  const handlePress = () => {
    onPress?.();
    onOpenChange(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          backgroundColor: colors.destructive[100],
          color: colors.background[100],
        };
      default:
        return {
          backgroundColor: colors.primary[100],
          color: colors.background[100],
        };
    }
  };

  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: variantStyles.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: variantStyles.color,
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export interface AlertDialogCancelProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
  children,
  onPress,
  style,
}) => {
  const context = useContext(AlertDialogContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('AlertDialogCancel must be used within an AlertDialog');
  }
  
  const { onOpenChange } = context;
  
  const handlePress = () => {
    onPress?.();
    onOpenChange(false);
  };

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.background[300],
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.foreground[200],
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}; 