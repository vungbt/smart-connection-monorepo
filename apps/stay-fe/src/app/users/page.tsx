import { generateMetadata } from '@/constants/route';
import UserListPage from '@/libraries/pages/users/user.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'User Management' });

export default function UsersPage() {
  return <UserListPage />;
}
