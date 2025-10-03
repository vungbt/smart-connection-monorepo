import { generateMetadata } from '@/constants/route';
import RoomSlugPage from '@/libraries/pages/rooms/room.slug';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Create room' });

export default function RoomsSlugPage() {
  return <RoomSlugPage />;
}
