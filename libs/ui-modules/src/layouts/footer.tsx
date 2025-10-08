import { Pagination } from '@smart-connection-monorepo/ui-components';
import { useFooter } from './hooks/useFooter';
import clsx from 'clsx';
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
  const { pagination, setPageChange, actions } = useFooter();
  return (
    <div
      className={clsx(
        'sticky bottom-0 px-8 py-3 bg-neutral-white z-[1000] min-h-[80px] shadow-border flex items-center gap-3',
        {
          'justify-end': actions && actions.length > 0,
          'justify-between': !actions || actions.length <= 0,
        }
      )}
    >
      {pagination.totalPages ? (
        <Pagination
          total={pagination?.count || 0}
          pageCount={pagination?.totalPages || 0}
          limit={pagination?.pageSize || 10}
          page={pagination?.page || 1}
          onChangePage={setPageChange}
          customClasses={{
            ...customClasses,
          }}
        />
      ) : null}
      {actions && actions.length > 0 ? actions.map(item => item) : null}
    </div>
  );
}
