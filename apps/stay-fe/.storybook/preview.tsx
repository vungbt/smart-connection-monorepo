import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import './tailwind-imports.css';
import { UIProvider } from '@smart-connection-monorepo/ui-theme';
// eslint-disable-next-line @nx/enforce-module-boundaries
import themeToken from '../../../libs/ui-theme/theme-token/stay-fe.json';
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
    (Story: StoryFn, context) => (
      <UIProvider config={themeToken.variants}>
        <div className="p-4">{Story(context.args, context)}</div>
      </UIProvider>
    ),
  ],
};

export default preview;
