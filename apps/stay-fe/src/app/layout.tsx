import { generateMetadata } from '@/constants/route';
import { MainLayout } from '@/libraries';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({ page: 'Home' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
