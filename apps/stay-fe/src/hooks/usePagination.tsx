'use client';
import { DEFAULT_PAGINATION } from '@/constants/common';
import { useFooter } from '@smart-connection-monorepo/ui-modules';
import { useEffect } from 'react';

export function usePagination({
  page = DEFAULT_PAGINATION.page,
  pageSize = DEFAULT_PAGINATION.pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  const { setPagination, pagination } = useFooter();

  useEffect(() => {
    setPagination({ ...DEFAULT_PAGINATION, page, pageSize });
    return () => setPagination({ page: 0, pageSize: 0, count: 0, totalPages: 0 });
  }, [page, pageSize]);

  return { pagination, setPagination };
}
