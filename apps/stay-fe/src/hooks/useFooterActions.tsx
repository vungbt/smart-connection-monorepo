'use client';
import { Button, ButtonProps } from '@smart-connection-monorepo/ui-components';
import { useFooter } from '@smart-connection-monorepo/ui-modules';
import { useEffect } from 'react';

export function useFooterActions({ actions }: { actions: ButtonProps[] }) {
  const setActions = useFooter(state => state.setActions);

  useEffect(() => {
    setActions(
      actions.map(item => (
        <Button key={item.title} {...item}>
          {item.title}
        </Button>
      ))
    );
    return () => setActions([]);
  }, [actions]);
}
