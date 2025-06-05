import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { Card, CardHeader, CardTitle } from '../../../primitives/card/Card';
import { TrophyIcon } from '../../../icons/state/TrophyIcon'; // Using TrophyIcon as fallback

export interface AchievementFeaturedProps {
  icon?: string;
  title?: string;
  style?: ViewStyle;
}

export const AchievementFeatured: React.FC<AchievementFeaturedProps> = ({ 
  icon, 
  title,
  style 
}) => {
  const { colors } = useTheme();
  
  const empty = useMemo(() => !icon || !title, [icon, title]);

  const styles = StyleSheet.create({
    card: {
      height: 136, // h-[136px]
      width: 120, // w-[120px]
      position: 'relative',
      overflow: 'visible',
      // shadow-none equivalent in RN
      elevation: 0,
      shadowOpacity: 0,
    },
    header: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      padding: 8, // p-2
      paddingTop: 24, // pt-6
      overflow: 'hidden',
      borderRadius: 8, // rounded
      backgroundColor: empty ? colors.background[100] : colors.background[200],
      borderWidth: empty ? 1 : 0,
      borderColor: empty ? colors.background[200] : 'transparent',
      borderStyle: empty ? 'dashed' : 'solid',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48, // w-12
      height: 48, // h-12
    },
  });

  return (
    <Card style={[styles.card, style]}>
      {!empty && <Banner />}
      <CardHeader style={styles.header}>
        <View style={styles.iconContainer}>
          <TrophyIcon 
            variant={empty ? "line" : "solid"}
            size="xl"
            color={empty ? colors.background[500] : colors.primary[100]}
          />
        </View>
        <Title title={title || "empty"} empty={empty} />
      </CardHeader>
    </Card>
  );
};

interface TitleProps {
  title: string;
  empty?: boolean;
}

const Title: React.FC<TitleProps> = ({ title, empty }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1, // grow
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: '500', // font-medium
      fontSize: 14, // text-sm
      textTransform: 'capitalize',
      textAlign: 'center',
      color: empty ? colors.background[500] : colors.foreground[100],
    },
  });

  return (
    <CardTitle style={styles.container}>
      <Text style={styles.text} numberOfLines={2}>
        {title}
      </Text>
    </CardTitle>
  );
};

export const Banner: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: -2, // top-[-2px]
      right: 8, // right-2
      height: 28, // h-7
      width: 24, // w-6
      borderTopLeftRadius: 2, // rounded-t-sm
      borderTopRightRadius: 2,
      overflow: 'hidden',
      flexDirection: 'column',
    },
    bannerTop: {
      height: 20, // h-5
      width: 24, // w-6
      backgroundColor: colors.background[500],
    },
    trianglesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    triangleLeft: {
      width: 0,
      height: 0,
      borderTopWidth: 6,
      borderTopColor: colors.background[500],
      borderRightWidth: 12,
      borderRightColor: 'transparent',
    },
    triangleRight: {
      width: 0,
      height: 0,
      borderTopWidth: 6,
      borderTopColor: colors.background[500],
      borderLeftWidth: 12,
      borderLeftColor: 'transparent',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.bannerTop} />
      <View style={styles.trianglesContainer}>
        <View style={styles.triangleLeft} />
        <View style={styles.triangleRight} />
      </View>
    </View>
  );
};

export default AchievementFeatured;