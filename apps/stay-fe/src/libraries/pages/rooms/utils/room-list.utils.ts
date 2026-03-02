import { ROUTES } from '@/constants/route';
import { usePagination } from '@/hooks/usePagination';
import { Metadata } from '@/types/common';
import { RoomItem, RoomListRes } from '@/types/rooms';
import { ServiceItem, ServiceListRes } from '@/types/services';
import { roomKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useFilterForm } from '@smart-connection-monorepo/ui-modules';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type RoomListUtilsResult = {
  rooms: RoomItem[];
  metadata?: Metadata;
  isLoading: boolean;
  isLoadingDelete: boolean;
  itemIdDelete: string | null;
  getServiceById: (serviceId: string) => ServiceItem | undefined;
  onEdit: (room: RoomItem) => void;
  onDelete: (roomId: string) => void;
  onSubmitDelete: () => void;
  setItemIdDelete: (id: string | null) => void;
};

export default function RoomListUtils(): RoomListUtilsResult {
  const { pagination, setPagination } = usePagination({});
  const [itemIdDelete, setItemIdDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { q } = useFilterForm();
  const searchKeyword = q.trim();

  const { data: roomData, isLoading: isLoadingRooms } = useApiQuery<RoomListRes>({
    endpoint: API_ROUTES.ROOMS,
    queryKey: roomKeys.list({
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword,
    }),
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword || undefined,
    },
  });

  useEffect(() => {
    setPagination({
      count: roomData?.metadata?.count || 0,
      totalPages: roomData?.metadata?.totalPages || 0,
    });
  }, [roomData?.metadata]);

  const { data: serviceData, isLoading: isLoadingServices } = useApiQuery<ServiceListRes>({
    endpoint: API_ROUTES.SERVICES,
    queryKey: ['services', 'all'],
    params: {
      page: 1,
      pageSize: 1000,
    },
  });

  const serviceMap = useMemo(() => {
    return new Map((serviceData?.items || []).map(service => [service.id, service]));
  }, [serviceData?.items]);

  const { mutate: deleteRoom, isPending: isLoadingDelete } = useApiMutation<
    { message: string },
    Record<string, never>
  >('DELETE');

  const onEdit = (room: RoomItem) => {
    router.push(ROUTES.ROOMS_SLUG.replace(':slug', room.id));
  };

  const onDelete = (roomId: string) => {
    setItemIdDelete(roomId);
  };

  const onSubmitDelete = () => {
    if (!itemIdDelete) return;
    deleteRoom(
      { endpoint: `${API_ROUTES.ROOMS}/${itemIdDelete}`, body: {} },
      {
        onSuccess: data => {
          setItemIdDelete(null);
          toastSuccess(data?.message || 'Room deleted successfully');
          queryClient.invalidateQueries({
            queryKey: roomKeys.list(),
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
    rooms: roomData?.items || [],
    metadata: roomData?.metadata,
    isLoading: isLoadingRooms || isLoadingServices,
    isLoadingDelete,
    itemIdDelete,
    getServiceById: (serviceId: string) => serviceMap.get(serviceId),
    onEdit,
    onDelete,
    setItemIdDelete,
    onSubmitDelete,
  };
}
