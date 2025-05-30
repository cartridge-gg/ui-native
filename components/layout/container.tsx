import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { LayoutProvider, useLayoutContext } from './context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Custom hook for media queries (simplified for React Native)
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // For React Native, we'll use screen dimensions
    // This is a simplified version - in a real app you might want more sophisticated breakpoint logic
    if (query.includes('min-width: 768px')) {
      setMatches(screenWidth >= 768);
    }
  }, [query]);

  return matches;
}

// Responsive Wrapper Component
interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  const { colors } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const styles = StyleSheet.create({
    desktopContainer: {
      flex: 1,
      width: screenWidth,
      height: screenHeight,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background[100],
    },
    desktopContent: {
      width: Math.min(432, screenWidth - 32),
      maxHeight: Math.min(600, screenHeight - 32),
      borderWidth: 1,
      borderColor: colors.border[200],
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.background[100],
    },
    mobileContainer: {
      flex: 1,
      width: screenWidth,
      height: screenHeight,
      backgroundColor: colors.background[100],
    },
  });

  if (isDesktop) {
    return (
      <View style={styles.desktopContainer}>
        <View style={styles.desktopContent}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mobileContainer}>
      {children}
    </SafeAreaView>
  );
};

// Main LayoutContainer Component
interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  modal?: boolean;
  onModalClick?: () => void;
}

const LayoutContainerInner: React.FC<LayoutContainerProps> = ({ 
  children, 
  className,
  modal,
  onModalClick,
}) => {
  const { colors } = useTheme();
  const { withBackground, setWithBackground } = useLayoutContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      minHeight: 0,
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
    },
  });

  return (
    <ResponsiveWrapper>
      {/* Background overlay for modal states */}
      {withBackground && (
        <Modal
          visible={withBackground}
          transparent
          animationType="fade"
          onRequestClose={() => setWithBackground(false)}
        >
          <TouchableWithoutFeedback onPress={() => setWithBackground(false)}>
            <View style={styles.backgroundOverlay} />
          </TouchableWithoutFeedback>
        </Modal>
      )}
      
      <View style={styles.container}>
        {children}
      </View>
    </ResponsiveWrapper>
  );
};

// Main export with provider wrapper
export const LayoutContainer: React.FC<LayoutContainerProps> = (props) => {
  return (
    <LayoutProvider>
      <LayoutContainerInner {...props} />
    </LayoutProvider>
  );
}; 