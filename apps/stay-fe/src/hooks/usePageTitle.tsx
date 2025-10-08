'use client';
import { IconName, RenderIcon } from '@smart-connection-monorepo/ui-components';
import { useHeader } from '@smart-connection-monorepo/ui-modules';
import { useEffect } from 'react';

export function usePageTitle({ title, icon }: { title: string; icon?: IconName }) {
  const setTitle = useHeader(state => state.setTitle);

  useEffect(() => {
    setTitle(
      <div className="flex items-center flex-wrap font-medium ml-5 gap-2 capitalize">
        {icon ? <RenderIcon className="!w-5 !h-5 text-primary" name={icon} /> : null}
        {title}
      </div>
    );
    return () => setTitle(null);
  }, [title, icon, setTitle]);
}
