import type { ViewRef } from "@rn-primitives/types";

export type BottomTabsProps = {
  variant?: "default";
  size?: "default";
  children?: React.ReactNode;
};

export type BottomTabItemStatusProps = {
  children?: React.ReactNode;
  status?: "active";
  variant?: "default";
  size?: "default";
};

export type BottomTabContainerProps = {
  variant?: "default";
  size?: "default";
  children?: React.ReactNode;
};

export type BottomTabItemProps = {
  children?: React.ReactNode;
  routeName: string;
  active?: boolean;
  onPress?: () => void;
};

export type BottomTabsRef = ViewRef;
export type BottomTabRef = ViewRef;
export type BottomTabContainerRef = ViewRef;
export type BottomTabItemRef = ViewRef;
