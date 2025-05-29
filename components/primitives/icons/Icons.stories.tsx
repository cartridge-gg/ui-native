import React from 'react';
import { View, Text } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import {
  badgeIcons,
  brandIcons,
  brandColorIcons,
  directionalIcons,
  stateIcons,
  utilityIcons,
} from '../../icons';
import {
  DirectionalIconProps,
  IconProps,
  StateIconProps,
  IconSize,
} from '../../icons/types';
import { useTheme } from '../../theme/ThemeProvider';

const iconsByCategory = {
  badge: badgeIcons,
  brand: brandIcons,
  'brand-color': brandColorIcons,
  directional: directionalIcons,
  state: stateIcons,
  utility: utilityIcons,
};

const sizeOptions: IconSize[] = ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'];

const meta: Meta<typeof Icons> = {
  title: 'Primitives/Icons',
  component: Icons,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: Object.keys(iconsByCategory),
    },
    size: {
      control: 'radio',
      options: sizeOptions,
    },
    directionalVariant: {
      control: 'radio',
      options: ['up', 'right', 'down', 'left'],
      description: 'Directional icons only.',
    },
    stateVariant: {
      control: 'radio',
      options: ['solid', 'line'],
      description: 'State icons only.',
    },
  },
  args: {
    category: 'state',
    size: 'default',
    directionalVariant: 'up',
    stateVariant: 'solid',
  },
};

export default meta;

type Story = StoryObj<typeof Icons>;

export const Badge: Story = {
  args: {
    category: 'badge',
  },
};

export const Brand: Story = {
  args: {
    category: 'brand',
  },
};

export const BrandColor: Story = {
  args: {
    category: 'brand-color',
  },
};

export const Directional: Story = {
  args: {
    category: 'directional',
  },
};

export const State: Story = {
  args: {
    category: 'state',
  },
};

export const Utility: Story = {
  args: {
    category: 'utility',
  },
};

function Icons({
  category,
  size = 'default',
  directionalVariant = 'up',
  stateVariant = 'solid',
}: {
  category: keyof typeof iconsByCategory;
  size?: IconProps['size'];
  directionalVariant?: DirectionalIconProps['variant'];
  stateVariant?: StateIconProps['variant'];
}) {
  const { colors } = useTheme();

  // Calculate number of columns based on screen width (similar to Tailwind grid)
  const getColumns = () => {
    // Default to 6 columns for md screens, 4 for sm, 3 for base
    return 6;
  };

  const columns = getColumns();
  const iconEntries = Object.entries(iconsByCategory[category]);

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      padding: 0,
    }}>
      {iconEntries.map(([, icon]) => (
        <View
          key={icon.displayName}
          style={{
            borderWidth: 1,
            borderColor: colors.background[200],
            borderRadius: 8,
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 8,
            gap: 8,
            width: `${100 / columns - 2}%`,
            minHeight: 80,
            overflow: 'hidden',
          }}
        >
          {(() => {
            switch (category) {
              case 'directional': {
                const DirectionalIcon =
                  icon as ComponentType<DirectionalIconProps>;
                return (
                  <DirectionalIcon size={size} variant={directionalVariant} />
                );
              }
              case 'state': {
                const StateIcon = icon as ComponentType<StateIconProps>;
                return <StateIcon size={size} variant={stateVariant} />;
              }
              default: {
                const Icon = icon as ComponentType<IconProps>;
                return <Icon size={size} />;
              }
            }
          })()}
          <Text style={{
            fontSize: 10,
            color: colors.foreground[400],
            textAlign: 'center',
            lineHeight: 12,
          }}>
            {icon.displayName}
          </Text>
        </View>
      ))}
    </View>
  );
} 