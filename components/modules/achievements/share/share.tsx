import React, { useCallback, useMemo } from 'react';
import { ViewStyle, Linking } from 'react-native';
import { Button } from '../../../primitives/button/Button';
import { XIcon } from '../../../icons/brand/XIcon';

export interface AchievementShareProps {
  website?: string;
  twitter?: string;
  timestamp?: number;
  points?: number;
  difficulty?: number;
  title?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const AchievementShare: React.FC<AchievementShareProps> = ({
  disabled = false,
  website,
  twitter,
  timestamp,
  points,
  difficulty,
  title,
  style,
}) => {
  const url: string | null = useMemo(() => {
    if (!website) return null;
    return website;
  }, [website]);

  const xhandle = useMemo(() => {
    if (!twitter) return null;
    // Take the last part of the url
    return twitter.split("/").pop();
  }, [twitter]);

  const date = useMemo(() => {
    if (!timestamp) return null;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [timestamp]);

  const handleShare = useCallback(async () => {
    if (!url || !xhandle) return;
    const content = `I earned ${points} points by unlocking 🏆 ${title} in @${xhandle}. Only ${difficulty}% of players have earned this achievement.

Play now 👇`;

    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      content,
    )}&url=${encodeURIComponent(url)}`;

    try {
      // React Native uses Linking instead of window.open
      await Linking.openURL(twitterUrl);
    } catch (error) {
      console.error('Failed to open Twitter URL:', error);
    }
  }, [url, xhandle, title, points, difficulty]);

  return (
    <Button
      variant="tertiary"
      size="tall"
      disabled={disabled}
      onPress={handleShare}
      style={[{ flex: 1 }, style]} // grow equivalent
    >
      <XIcon size="sm" />
    </Button>
  );
};

export default AchievementShare;