'use client';

import { UIProvider } from '@smart-connection-monorepo/ui-theme';
import themeToken from '@smart-connection-monorepo/ui-theme/theme-token/stay-fe.json';
import { ApiQueryProvider } from '@smart-connection-monorepo/api-client';
import '@/styles/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider config={themeToken.variants}>
      <ApiQueryProvider>{children}</ApiQueryProvider>
    </UIProvider>
  );
}
