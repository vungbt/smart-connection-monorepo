'use client';
import { ROUTES } from '@/constants/route';
import '@/styles/index.css';
import { ApiQueryProvider } from '@smart-connection-monorepo/api-client';
import { Header, Navbar, Footer } from '@smart-connection-monorepo/ui-modules';
import { UIProvider } from '@smart-connection-monorepo/ui-theme';
import themeToken from '@smart-connection-monorepo/ui-theme/theme-token/stay-fe.json';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider config={themeToken.variants}>
      <ApiQueryProvider>
        <Navbar
          items={[
            { title: 'Home', icon: 'vuesax-element', navKey: 'home', href: ROUTES.HOME },
            { title: 'Users', icon: 'user-group', navKey: 'user', href: ROUTES.USERS },
            {
              title: 'Rooms',
              href: ROUTES.ROOMS,
              icon: 'building-storefront',
              navKey: 'room',
            },
            {
              title: 'Configs',
              icon: 'vuesax-empty-wallet-change',
              navKey: 'config',
              href: ROUTES.CONFIGS,
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
          <div className="min-h-[calc(100vh-160px)] px-5 py-6">{children}</div>
          <Footer />
        </main>
      </ApiQueryProvider>
    </UIProvider>
  );
}
