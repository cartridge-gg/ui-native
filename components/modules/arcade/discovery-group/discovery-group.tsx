import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ArcadeDiscoveryEvent, ArcadeDiscoveryEventProps } from '../discovery-event/discovery-event';
import { ArcadeGameHeader, ArcadeGameHeaderProps } from '../game-header/game-header';

export interface ArcadeDiscoveryGroupProps {
  game: ArcadeGameHeaderProps;
  events: ArcadeDiscoveryEventProps[];
  loading?: boolean;
  rounded?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  color?: string;
  style?: ViewStyle;
}

export const ArcadeDiscoveryGroup: React.FC<ArcadeDiscoveryGroupProps> = ({
  game,
  events,
  loading = false,
  rounded = false,
  variant = 'default',
  color,
  style,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 1, // gap-y-px
      borderRadius: rounded ? 8 : 0, // rounded-lg when rounded=true
      overflow: rounded ? 'hidden' : 'visible', // overflow-hidden when rounded=true
    },
  });

  return (
    <View style={[styles.container, style]}>
      <ArcadeGameHeader variant={variant} {...game} />
      {events.map((event, index) => (
        <ArcadeDiscoveryEvent
          key={index}
          loading={loading}
          variant={variant}
          color={color}
          {...event}
        />
      ))}
    </View>
  );
};

export default ArcadeDiscoveryGroup;