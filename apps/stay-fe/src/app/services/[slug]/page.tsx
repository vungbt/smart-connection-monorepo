import { generateMetadata } from '@/constants/route';
import ServiceSlugPage from '@/libraries/pages/services/service.slug';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Service Detail' });

export default function ServicesSlugPage() {
  return <ServiceSlugPage />;
}
