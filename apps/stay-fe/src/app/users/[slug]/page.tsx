import { generateMetadata } from '@/constants/route';
import UserSlugPage from '@/libraries/pages/users/user.slug';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({ page: 'User Detail' });

export default function UsersSlugPage() {
  return <UserSlugPage />;
}
