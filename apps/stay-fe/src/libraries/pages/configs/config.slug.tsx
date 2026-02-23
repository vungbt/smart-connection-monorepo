'use client';
import { usePageTitle } from '@/hooks/usePageTitle';
import React from 'react';
import ConfigSlugUtils from './utils/config-slug.utils';
import { useFooterActions } from '@/hooks/useFooterActions';

export default function ConfigSlugPage() {
  const { isAdd } = ConfigSlugUtils();
  usePageTitle({
    title: isAdd ? 'Create New Config' : 'Edit Config',
    icon: 'vuesax-empty-wallet-change',
  });
  useFooterActions({
    actions: [
      { title: 'Cancel', variant: 'outline', onClick: () => console.log('edit') },
      { title: isAdd ? 'Submit' : 'Save changes', onClick: () => console.log('delete') },
    ],
  });
  return <div>ConfigSlugPage</div>;
}
