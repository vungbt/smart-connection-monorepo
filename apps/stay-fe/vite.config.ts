import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@smart-connection-monorepo/ui-theme': resolve(__dirname, '../../libs/ui-theme/src'),
      '@smart-connection-monorepo/ui-theme/theme-token': resolve(
        __dirname,
        '../../libs/ui-theme/src/theme-token'
      ),
      '@smart-connection-monorepo/ui-components': resolve(
        __dirname,
        '../../libs/ui-components/src'
      ),
      '@smart-connection-monorepo/ui-modules': resolve(__dirname, '../../libs/ui-modules/src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'clsx',
      '@smart-connection-monorepo/ui-theme',
      '@smart-connection-monorepo/ui-components',
      '@smart-connection-monorepo/ui-modules',
    ],
  },
});
