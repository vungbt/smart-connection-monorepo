import { generateMetadata } from '@/constants/route';
import RoomListPage from '@/libraries/pages/rooms/room.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'Rooms' });

export default function RoomsPage() {
  return <RoomListPage />;
}
