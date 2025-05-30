import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useLayoutContext } from './context';
import { Text } from '../typography/Text';
import { Separator } from '../primitives/separator/Separator';

// Cartridge Logo Component
const CartridgeLogo: React.FC<{ className?: string }> = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ height: 16, width: 91 }}>
      <Text variant="caption" style={{ color: colors.foreground[400] }}>
        CARTRIDGE
      </Text>
    </View>
  );
};

// Controller Icon Component
const ControllerIcon: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ height: 24, width: 24 }}>
      <Text variant="caption" style={{ color: colors.foreground[400] }}>
        🎮
      </Text>
    </View>
  );
};

// Main LayoutFooter Component
interface LayoutFooterProps {
  children: React.ReactNode;
  className?: string;
  showCartridgeLogo?: boolean;
  style?: ViewStyle;
}

export const LayoutFooter: React.FC<LayoutFooterProps> = ({
  children,
  className,
  showCartridgeLogo = false,
  style,
}) => {
  const { colors } = useTheme();
  const { setWithFooter } = useLayoutContext();

  useEffect(() => {
    setWithFooter(true);
    
    // Cleanup function to reset footer state when component unmounts
    return () => setWithFooter(false);
  }, [setWithFooter]);

  const handleCartridgePress = () => {
    Linking.openURL('https://cartridge.gg');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 12,
      width: '100%',
      padding: 24,
      paddingTop: 0,
      marginTop: 'auto',
      backgroundColor: colors.background[100],
      flexShrink: 0,
    },
    containerWithLogo: {
      paddingBottom: 8,
    },
    cartridgeSection: {
      flexDirection: 'column',
    },
    cartridgeLink: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    cartridgeText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.foreground[400],
    },
    cartridgeTextHover: {
      color: colors.primary[100],
    },
  });

  return (
    <View style={[
      styles.container,
      showCartridgeLogo && styles.containerWithLogo,
      style
    ]}>
      <Separator orientation="horizontal" />
      
      {children}
      
      {showCartridgeLogo && (
        <View style={styles.cartridgeSection}>
          <Separator orientation="horizontal" />
          <TouchableOpacity 
            style={styles.cartridgeLink}
            onPress={handleCartridgePress}
            activeOpacity={0.7}
          >
            <ControllerIcon />
            <Text style={styles.cartridgeText}>by</Text>
            <CartridgeLogo />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}; 