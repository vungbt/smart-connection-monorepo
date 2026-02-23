import { usePagination } from '@/hooks/usePagination';
import { Metadata } from '@/types/common';
import { ConfigItem, ConfigListRes } from '@/types/configs';
import { configKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useQueryClient, useApiMutation, useApiQuery } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useEffect, useState } from 'react';

type ConfigListUtilsResult = {
  configs: ConfigItem[];
  metadata?: Metadata;
  isLoading: boolean;
  isLoadingDelete: boolean;
  itemIdDelete: string | null;
  onEdit: (config: ConfigItem) => void;
  onSubmitDelete: () => void;
  setItemIdDelete: (id: string | null) => void;
};

export default function ConfigListUtils(): ConfigListUtilsResult {
  const { setPagination, pagination } = usePagination({});
  const [itemIdDelete, setItemIdDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: listData, isLoading } = useApiQuery<ConfigListRes>({
    endpoint: API_ROUTES.CONFIGS,
    queryKey: configKeys.list({ page: pagination.page, pageSize: pagination.pageSize }),
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  });

  const { mutate: deleteConfig, isPending: isLoadingDelete } = useApiMutation<
    { message: string },
    Record<string, never>
  >('DELETE');

  useEffect(() => {
    setPagination({
      count: listData?.metadata?.count || 0,
      totalPages: listData?.metadata?.totalPages || 0,
    });
  }, [listData?.metadata]);

  const onEdit = (config: ConfigItem) => {
    console.log('onEdit', config);
  };

  // delete
  const onSubmitDelete = () => {
    if (!itemIdDelete) return;
    deleteConfig(
      { endpoint: `${API_ROUTES.CONFIGS}/${itemIdDelete}`, body: {} },
      {
        onSuccess: data => {
          setItemIdDelete(null);
          toastSuccess(data?.message);
          queryClient.invalidateQueries({
            queryKey: configKeys.list(),
          });
          setPagination({
            ...pagination,
            page: 1,
          });
        },
        onError: error => {
          setItemIdDelete(null);
          toastError(error?.message);
        },
      }
    );
  };

  return {
    configs: listData?.items || [],
    metadata: listData?.metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    onEdit,
    setItemIdDelete,
    onSubmitDelete,
  };
}
