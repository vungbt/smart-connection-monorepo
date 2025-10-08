import { generateMetadata } from '@/constants/route';
import ConfigSlugPage from '@/libraries/pages/configs/config.slug';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Config Detail' });

export default function ConfigsSlugPage() {
  return <ConfigSlugPage />;
}
