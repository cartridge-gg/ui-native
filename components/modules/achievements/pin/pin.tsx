import React, { useCallback, useState } from 'react';
import { ViewStyle } from 'react-native';
import { Button } from '../../../primitives/button/Button';
import { TrackIcon } from '../../../icons/state/TrackIcon';

export interface AchievementPinProps {
  pinned?: boolean;
  achievementId?: string;
  disabled?: boolean;
  onClick?: (
    pinned: boolean,
    achievementId: string,
    setLoading: (loading: boolean) => void,
  ) => void;
  style?: ViewStyle;
}

export const AchievementPin: React.FC<AchievementPinProps> = ({
  pinned = false,
  achievementId,
  disabled = false,
  onClick,
  style,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(() => {
    if (disabled) return;
    onClick?.(!!pinned, achievementId ?? "", setLoading);
  }, [disabled, onClick, pinned, achievementId]);

  return (
    <Button
      variant="tertiary"
      size="tall"
      isLoading={loading}
      isActive={pinned}
      disabled={disabled}
      onPress={handlePress}
      style={[{ flex: 1 }, style]} // grow equivalent
    >
      <TrackIcon size="sm" variant={pinned ? "solid" : "line"} />
    </Button>
  );
};

export default AchievementPin;