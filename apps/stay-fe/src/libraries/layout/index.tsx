'use client';
import { ROUTES } from '@/constants/route';
import '@/styles/index.css';
import { ApiQueryProvider } from '@smart-connection-monorepo/api-client';
import { Toaster } from '@smart-connection-monorepo/ui-components';
import { Footer, Header, Navbar } from '@smart-connection-monorepo/ui-modules';
import { UIProvider } from '@smart-connection-monorepo/ui-theme';
import themeToken from '@smart-connection-monorepo/ui-theme/theme-token/stay-fe.json';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider config={themeToken.variants}>
      <ApiQueryProvider isEnableDevtools={Boolean(process.env.ENABLE_DEV_TOOLS || false)}>
        <Toaster />
        <Navbar
          items={[
            { title: 'Home', icon: 'vuesax-element', navKey: 'home', href: ROUTES.HOME },
            {
              title: 'Bills',
              icon: 'vuesax-money-receive',
              navKey: 'bill',
              href: ROUTES.BILLS,
            },
            { title: 'Users', icon: 'user-group', navKey: 'user', href: ROUTES.USERS },
            {
              title: 'Rooms',
              href: ROUTES.ROOMS,
              icon: 'building-storefront',
              navKey: 'room',
            },
            {
              title: 'Services',
              icon: 'vuesax-empty-wallet-change',
              navKey: 'service',
              href: ROUTES.SERVICES,
            },
          ]}
          logoHref="/logo/logo.webp"
        />
        <main className="max-h-screen overflow-auto flex-1">
          <Header
            items={[
              { title: 'Edit profile', icon: 'pencil' },
              { title: 'User profile', icon: 'user' },
            ]}
            avatarUrl="/logo/logo.webp"
          />
          <div className="min-h-[calc(100vh-160px)] px-8 py-6">{children}</div>
          <Footer />
        </main>
      </ApiQueryProvider>
    </UIProvider>
  );
}
