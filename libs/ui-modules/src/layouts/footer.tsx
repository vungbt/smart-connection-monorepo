import { Pagination } from '@smart-connection-monorepo/ui-components';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useFooter } from './hooks/useFooter';
export * from './hooks';

export function Footer({
  customClasses,
}: {
  customClasses?: {
    root?: string;
    container?: string;
    page?: string;
    active?: string;
    next?: string;
    previous?: string;
  };
}) {
  const { pagination, setPageChange, setPagination } = useFooter();
  console.log('pagination===?', pagination);
  useEffect(() => {
    setPagination({ page: 1, limit: 10, total: 1000 });
  }, []);

  return (
    <Pagination
      total={pagination?.total}
      pageCount={pagination?.pageCount}
      limit={pagination?.limit}
      page={pagination?.page}
      onChangePage={setPageChange}
      customClasses={{
        ...customClasses,
        root: clsx(
          'sticky bottom-0 px-5 py-3 bg-neutral-white z-[1000] min-h-[80px] shadow-border',
          customClasses?.root
        ),
      }}
    />
  );
}
