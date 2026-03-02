import { generateMetadata } from '@/constants/route';
import BillListPage from '@/libraries/pages/bills/bill.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Bill Management' });

export default function BillsPage() {
  return <BillListPage />;
}
