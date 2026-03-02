import { generateMetadata } from '@/constants/route';
import BillSlugPage from '@/libraries/pages/bills/bill.slug';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Bill Detail' });

export default function BillsSlugPage() {
  return <BillSlugPage />;
}
