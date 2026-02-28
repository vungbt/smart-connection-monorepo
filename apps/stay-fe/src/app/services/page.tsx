import { generateMetadata } from '@/constants/route';
import ServiceListPage from '@/libraries/pages/services/service.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Service Management' });

export default function ServicesPage() {
  return <ServiceListPage />;
}
