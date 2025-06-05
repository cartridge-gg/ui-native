import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { ThumbnailCollectible } from "./ThumbnailCollectible";
import { PaperPlaneIcon } from "../../../icons/state/PaperPlaneIcon";
import { ThumbnailsSubIcon } from "../sub-icon/ThumbnailsSubIcon";

const meta: Meta<typeof ThumbnailCollectible> = {
  title: "Modules/Thumbnails/Collectible",
  component: ThumbnailCollectible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    image:
      "https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png",
  },
};

export default meta;
type Story = StoryObj<typeof ThumbnailCollectible>;

const variants = [
  "darkest",
  "darker", 
  "dark",
  "default",
  "light",
  "lighter",
  "lightest",
  "ghost",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const Default: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {sizes.map((size) => (
        <View key={size} style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <ThumbnailCollectible
              key={`${size}-${variant}`}
              image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
              size={size}
              variant={variant}
            />
          ))}
          {(size === "lg" || size === "xl") && (
            <ThumbnailCollectible
              key={`${size}-subicon`}
              image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
              size={size}
              subIcon={
                <ThumbnailsSubIcon
                  Icon={<PaperPlaneIcon variant="solid" size="sm" />}
                  size={size}
                />
              }
            />
          )}
        </View>
      ))}
    </View>
  ),
};

export const Fallback: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {sizes.map((size) => (
        <View key={size} style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <ThumbnailCollectible
              key={`${size}-${variant}`}
              image=""
              size={size}
              variant={variant}
            />
          ))}
          {(size === "lg" || size === "xl") && (
            <ThumbnailCollectible
              key={`${size}-subicon`}
              image=""
              size={size}
              subIcon={
                <ThumbnailsSubIcon
                  Icon={<PaperPlaneIcon variant="solid" size="sm" />}
                  size={size}
                />
              }
            />
          )}
        </View>
      ))}
    </View>
  ),
};

export const Large: Story = {
  render: () => (
    <ThumbnailCollectible
      image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
      size="xl"
    />
  ),
};

export const Medium: Story = {
  render: () => (
    <ThumbnailCollectible
      image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
      size="md"
    />
  ),
};

export const Small: Story = {
  render: () => (
    <ThumbnailCollectible
      image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
      size="sm"
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ThumbnailCollectible
      image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
      size="xl"
      loading
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ThumbnailCollectible
      image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png"
      size="xl"
      error
    />
  ),
};

export const NoImage: Story = {
  render: () => (
    <ThumbnailCollectible
      image=""
      size="xl"
    />
  ),
};