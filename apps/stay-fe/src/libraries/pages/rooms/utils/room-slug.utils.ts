import { ROUTES } from '@/constants/route';
import { useSlugParams } from '@/hooks/useSlugParams';
import { RoomDetailRes, RoomFormValues } from '@/types/rooms';
import { ServiceItem, ServiceListRes } from '@/types/services';
import { roomKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';

type RoomSlugUtilsResult = {
  isAdd: boolean;
  isLoadingDetail: boolean;
  isLoadingServices: boolean;
  isSubmitting: boolean;
  services: ServiceItem[];
  initialValues: RoomFormValues;
  onSubmit: (formValues: RoomFormValues) => void;
  onCancel: () => void;
};

const defaultInitialValues: RoomFormValues = {
  name: '',
  serviceId: '',
};

export default function RoomSlugUtils(): RoomSlugUtilsResult {
  const { itemId: roomId, isAdd } = useSlugParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: detailData, isLoading: isLoadingDetail } = useApiQuery<RoomDetailRes>(
    {
      endpoint: `${API_ROUTES.ROOMS}/${roomId}`,
      queryKey: roomKeys.detail(roomId as string),
      params: {
        id: roomId,
      },
    },
    { enabled: !!roomId }
  );

  const { data: serviceData, isLoading: isLoadingServices } = useApiQuery<ServiceListRes>({
    endpoint: API_ROUTES.SERVICES,
    queryKey: ['services', 'all'],
    params: {
      page: 1,
      pageSize: 1000,
    },
  });

  const roomDetail = detailData?.item;

  const initialValues: RoomFormValues = isAdd
    ? defaultInitialValues
    : {
        name: roomDetail?.name || '',
        serviceId: roomDetail?.serviceId || '',
      };

  const { mutate: createRoom, isPending: isCreating } = useApiMutation<
    RoomDetailRes,
    RoomFormValues
  >('POST');

  const { mutate: updateRoom, isPending: isUpdating } = useApiMutation<
    RoomDetailRes,
    RoomFormValues
  >('PUT');

  const onSubmit = (formValues: RoomFormValues) => {
    if (isAdd) {
      createRoom(
        {
          endpoint: API_ROUTES.ROOMS,
          body: formValues,
        },
        {
          onSuccess: () => {
            toastSuccess('Room created successfully');
            queryClient.invalidateQueries({ queryKey: roomKeys.list() });
            router.push(ROUTES.ROOMS);
          },
          onError: error => {
            toastError(error?.message);
          },
        }
      );
      return;
    }

    if (!roomId) {
      toastError('Room id is missing');
      return;
    }

    updateRoom(
      {
        endpoint: `${API_ROUTES.ROOMS}/${roomId}`,
        body: formValues,
      },
      {
        onSuccess: () => {
          toastSuccess('Room updated successfully');
          queryClient.invalidateQueries({ queryKey: roomKeys.list() });
          queryClient.invalidateQueries({ queryKey: roomKeys.detail(roomId) });
          router.push(ROUTES.ROOMS);
        },
        onError: error => {
          toastError(error?.message);
        },
      }
    );
  };

  const onCancel = () => {
    router.push(ROUTES.ROOMS);
  };

  return {
    isAdd,
    isLoadingDetail,
    isLoadingServices,
    isSubmitting: isLoadingDetail || isCreating || isUpdating,
    services: serviceData?.items || [],
    initialValues,
    onSubmit,
    onCancel,
  };
}
