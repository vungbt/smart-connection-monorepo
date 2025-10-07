'use client';
import { usePageTitle } from '@/hooks/usePageTitle';
import React from 'react';

export default function RoomSlugPage() {
  usePageTitle({ title: 'Add New Room', icon: 'building-storefront' });

  return <div>RoomSlugPage</div>;
}
