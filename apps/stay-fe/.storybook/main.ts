import type { StorybookConfig } from '@storybook/react-vite';
import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../../../libs/ui-*/src/**/*.mdx',
    '../../../libs/ui-*/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'apps/stay-fe/vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config: UserConfig) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@smart-connection-monorepo/ui-theme': path.resolve(
            __dirname,
            '../../../libs/ui-theme/src'
          ),
          '@smart-connection-monorepo/ui-theme/theme-token': path.resolve(
            __dirname,
            '../../../libs/ui-theme/theme-token'
          ),
          '@smart-connection-monorepo/ui-components': path.resolve(
            __dirname,
            '../../../libs/ui-components/src'
          ),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'clsx'],
        exclude: [],
      },
      json: {
        stringify: true,
      },
    });
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
