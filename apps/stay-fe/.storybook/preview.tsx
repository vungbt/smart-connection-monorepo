import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import './tailwind-imports.css';
import { UIProvider } from '@smart-connection-monorepo/ui-theme';
import { themeToken } from '@smart-connection-monorepo/ui-theme/theme-token';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story: StoryFn) => (
      <UIProvider config={themeToken.variants}>
        <div className="p-4">
          <Story />
        </div>
      </UIProvider>
    ),
  ],
};

export default preview;
