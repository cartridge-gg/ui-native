import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import '../global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => React.createElement(ThemeProvider, { children: React.createElement(Story) }),
  ],
  tags: ['autodocs'],
};

export default preview;
