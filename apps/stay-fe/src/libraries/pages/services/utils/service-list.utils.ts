import { usePagination } from '@/hooks/usePagination';
import { ROUTES } from '@/constants/route';
import { Metadata } from '@/types/common';
import { ServiceItem, ServiceListRes } from '@/types/services';
import { serviceKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useQueryClient, useApiMutation, useApiQuery } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ServiceListUtilsResult = {
  services: ServiceItem[];
  metadata?: Metadata;
  isLoading: boolean;
  isLoadingDelete: boolean;
  itemIdDelete: string | null;
  onEdit: (service: ServiceItem) => void;
  onDelete: (serviceId: string) => void;
  onSubmitDelete: () => void;
  setItemIdDelete: (id: string | null) => void;
};

export default function ServiceListUtils(): ServiceListUtilsResult {
  const { setPagination, pagination } = usePagination({});
  const [itemIdDelete, setItemIdDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: listData, isLoading } = useApiQuery<ServiceListRes>({
    endpoint: API_ROUTES.SERVICES,
    queryKey: serviceKeys.list({ page: pagination.page, pageSize: pagination.pageSize }),
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  });

  const { mutate: deleteService, isPending: isLoadingDelete } = useApiMutation<
    { message: string },
    Record<string, never>
  >('DELETE');

  useEffect(() => {
    setPagination({
      count: listData?.metadata?.count || 0,
      totalPages: listData?.metadata?.totalPages || 0,
    });
  }, [listData?.metadata]);

  const onEdit = (service: ServiceItem) => {
    router.push(ROUTES.SERVICES_SLUG.replace(':slug', service.id));
  };

  const onDelete = (serviceId: string) => {
    setItemIdDelete(serviceId);
  };

  // delete
  const onSubmitDelete = () => {
    if (!itemIdDelete) return;
    deleteService(
      { endpoint: `${API_ROUTES.SERVICES}/${itemIdDelete}`, body: {} },
      {
        onSuccess: data => {
          setItemIdDelete(null);
          toastSuccess(data?.message);
          queryClient.invalidateQueries({
            queryKey: serviceKeys.list(),
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
    services: listData?.items || [],
    metadata: listData?.metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    onEdit,
    onDelete,
    setItemIdDelete,
    onSubmitDelete,
  };
}
