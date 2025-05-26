import React from 'react';
import { View, Modal as RNModal, Pressable, StyleSheet } from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  style?: any;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  style?: any;
}

export interface ModalContentProps {
  children: React.ReactNode;
  style?: any;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  style?: any;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    content: {
      backgroundColor: colors.background[100],
      borderRadius: 12,
      borderWidth: 4,
      borderColor: colors.background[300],
      padding: 24,
      maxWidth: '90%',
      maxHeight: '80%',
      minWidth: 300,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.foreground[100],
      flex: 1,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 6,
      backgroundColor: colors.background[200],
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
    closeButtonText: {
      fontSize: 16,
      color: colors.foreground[400],
      fontWeight: 'bold',
    },
  });

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <Pressable style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              )}
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.background[300],
    },
  });

  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  style,
}) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      marginTop: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.background[300],
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
    },
  });

  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}; 