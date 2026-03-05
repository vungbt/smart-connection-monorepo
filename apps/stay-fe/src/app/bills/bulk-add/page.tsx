import { generateMetadata } from '@/constants/route';
import BillBulkPage from '@/libraries/pages/bills/bill.bulk';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Create Bills (Bulk)' });

export default function BillsBulkAddPage() {
  return <BillBulkPage />;
}
