import type { Meta, StoryObj } from "@storybook/react";
import {
  ChestIcon,
  ClockIcon,
  PulseIcon,
  SwordsIcon,
  TrophyIcon,
  UsersIcon,
} from "#components/icons";
import { cn } from "#utils";
import { BottomTabContainer, BottomTabItem } from "./bottom-tab";
import { BottomTab, BottomTabs, bottomTabsVariants } from "./bottom-tabs";

const meta = {
  title: "Primitives/BottomTabs",
  component: BottomTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default"],
    },
    size: {
      control: { type: "select" },
      options: ["default"],
    },
  },
} satisfies Meta<typeof BottomTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: (
      <>
        <BottomTab>
          <PulseIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab status="active">
          <ChestIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <TrophyIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <SwordsIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <UsersIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <ClockIcon variant="solid" size="lg" />
        </BottomTab>
      </>
    ),
  },
};

export const WithTabItems: Story = {
  args: {
    variant: "default",
    size: "default",
    children: (
      <>
        <BottomTab>
          <PulseIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <ChestIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab status="active">
          <TrophyIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <SwordsIcon variant="solid" size="lg" />
        </BottomTab>
      </>
    ),
  },
};

export const BottomTabContainerExample: Story = {
  render: () => (
    <BottomTabContainer>
      <BottomTabItem routeName="index">
        <PulseIcon variant="solid" size="lg" />
      </BottomTabItem>
      <BottomTabItem routeName="activity">
        <ChestIcon variant="solid" size="lg" />
      </BottomTabItem>
      <BottomTabItem routeName="profile">
        <TrophyIcon variant="solid" size="lg" />
      </BottomTabItem>
    </BottomTabContainer>
  ),
};

export const CustomSize: Story = {
  args: {
    variant: "default",
    size: "default",
    className: "h-20",
    children: "Custom Height Bottom Tabs",
  },
};

// Story that exactly matches the UI version
export const UIVersionMatch: Story = {
  args: {
    variant: "default",
    size: "default",
    children: (
      <>
        <BottomTab>
          <PulseIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab status="active">
          <ChestIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <TrophyIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <SwordsIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <UsersIcon variant="solid" size="lg" />
        </BottomTab>
        <BottomTab>
          <ClockIcon variant="solid" size="lg" />
        </BottomTab>
      </>
    ),
  },
};

// Story that exactly replicates the UI project's structure
export const UILayoutReplica: Story = {
  render: () => (
    <BottomTabs
      className={cn(bottomTabsVariants(), "px-0 py-0 border-t-0 shadow-none")}
    >
      <BottomTab>
        <PulseIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab status="active">
        <ChestIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <TrophyIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <SwordsIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <UsersIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <ClockIcon variant="solid" size="lg" />
      </BottomTab>
    </BottomTabs>
  ),
};

// Stories that match the UI project's snapshot names exactly
export const LayoutBottomtabsDefault: Story = {
  render: () => (
    <BottomTabs className={bottomTabsVariants()}>
      <BottomTab>
        <PulseIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab status="active">
        <ChestIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <TrophyIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <SwordsIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <UsersIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <ClockIcon variant="solid" size="lg" />
      </BottomTab>
    </BottomTabs>
  ),
};

export const PrimitivesBottomtabChestActive: Story = {
  render: () => (
    <BottomTabs className={bottomTabsVariants()}>
      <BottomTab>
        <PulseIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab status="active">
        <ChestIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <TrophyIcon variant="solid" size="lg" />
      </BottomTab>
    </BottomTabs>
  ),
};

export const PrimitivesBottomtabChest: Story = {
  render: () => (
    <BottomTabs className={bottomTabsVariants()}>
      <BottomTab>
        <PulseIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <ChestIcon variant="solid" size="lg" />
      </BottomTab>
      <BottomTab>
        <TrophyIcon variant="solid" size="lg" />
      </BottomTab>
    </BottomTabs>
  ),
};
