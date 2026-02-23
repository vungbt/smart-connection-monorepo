import { generateMetadata } from '@/constants/route';
import ConfigListPage from '@/libraries/pages/configs/config.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Config Management' });

export default function RoomsPage() {
  return <ConfigListPage />;
}
