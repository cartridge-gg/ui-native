import React from 'react';
import { ViewStyle } from 'react-native';
import { FollowerFollow } from './follow';
import { FollowerFollowing } from './following';
import { FollowerUnfollow } from './unfollow';

export interface FollowerActionProps {
  following: boolean;
  unfollowable: boolean;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  style?: ViewStyle;
  onPress?: () => void;
}

export const FollowerAction: React.FC<FollowerActionProps> = ({
  following,
  unfollowable,
  loading = false,
  disabled = false,
  variant = 'default',
  style,
  onPress,
}) => {
  if (following && unfollowable) {
    return (
      <FollowerUnfollow
        onPress={onPress}
        loading={loading}
        disabled={disabled}
        variant={variant}
        style={style}
      />
    );
  }
  
  if (following) {
    return (
      <FollowerFollowing 
        variant={variant} 
        style={style}
      />
    );
  }
  
  return (
    <FollowerFollow
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      variant={variant}
      style={style}
    />
  );
};

export default FollowerAction;