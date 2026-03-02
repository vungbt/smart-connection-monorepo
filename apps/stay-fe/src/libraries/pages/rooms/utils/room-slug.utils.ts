import { ROUTES } from '@/constants/route';
import { useSlugParams } from '@/hooks/useSlugParams';
import { RoomDetailRes, RoomFormValues } from '@/types/rooms';
import { ServiceItem, ServiceListRes } from '@/types/services';
import { UserItem, UserListRes } from '@/types/users';
import { roomKeys, userKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';

type RoomSlugUtilsResult = {
  isAdd: boolean;
  isLoadingDetail: boolean;
  isLoadingServices: boolean;
  isLoadingUsers: boolean;
  isSubmitting: boolean;
  services: ServiceItem[];
  users: UserItem[];
  initialValues: RoomFormValues;
  onSubmit: (formValues: RoomFormValues) => Promise<void>;
  onCancel: () => void;
};

type RoomMutationPayload = Omit<RoomFormValues, 'userIds'>;

const defaultInitialValues: RoomFormValues = {
  name: '',
  serviceId: '',
  userIds: [],
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

  const { data: userData, isLoading: isLoadingUsers } = useApiQuery<UserListRes>({
    endpoint: API_ROUTES.USERS,
    queryKey: ['users', 'all'],
    params: {
      page: 1,
      pageSize: 1000,
    },
  });

  const { data: roomMemberData, isLoading: isLoadingRoomMembers } = useApiQuery<UserListRes>(
    {
      endpoint: API_ROUTES.USERS,
      queryKey: ['users', 'by-room', roomId],
      params: {
        page: 1,
        pageSize: 1000,
        roomIds: roomId ? [roomId] : undefined,
      },
    },
    { enabled: !!roomId && !isAdd }
  );

  const roomDetail = detailData?.item;
  const initialUserIds = roomMemberData?.items?.map(user => user.id) || [];

  const initialValues: RoomFormValues = isAdd
    ? defaultInitialValues
    : {
        name: roomDetail?.name || '',
        serviceId: roomDetail?.serviceId || '',
        userIds: initialUserIds,
      };

  const { mutate: createRoom, isPending: isCreating } = useApiMutation<
    RoomDetailRes,
    RoomMutationPayload
  >('POST');

  const { mutate: updateRoom, isPending: isUpdating } = useApiMutation<
    RoomDetailRes,
    RoomMutationPayload
  >('PUT');

  const { mutateAsync: updateUserRoom, isPending: isUpdatingUserRoom } = useApiMutation<
    { item: UserItem },
    Partial<UserItem>
  >('PUT');

  const syncUsersToRoom = async (targetRoomId: string, userIds: string[]) => {
    await Promise.all(
      userIds.map(userId =>
        updateUserRoom({
          endpoint: `${API_ROUTES.USERS}/${userId}`,
          body: {
            roomId: targetRoomId,
          },
        })
      )
    );
  };

  const onSubmit = async (formValues: RoomFormValues) => {
    const { userIds, ...roomPayload } = formValues;

    if (isAdd) {
      createRoom(
        {
          endpoint: API_ROUTES.ROOMS,
          body: roomPayload,
        },
        {
          onSuccess: async data => {
            try {
              const createdRoomId = data?.item?.id;
              if (createdRoomId && userIds.length > 0) {
                await syncUsersToRoom(createdRoomId, userIds);
              }
              toastSuccess('Room created successfully');
              queryClient.invalidateQueries({ queryKey: roomKeys.list() });
              queryClient.invalidateQueries({ queryKey: userKeys.list() });
              router.push(ROUTES.ROOMS);
            } catch (error: unknown) {
              const message =
                typeof error === 'object' && error !== null && 'message' in error
                  ? String((error as { message?: string }).message)
                  : 'Assign user to room failed';
              toastError(message);
            }
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
        body: roomPayload,
      },
      {
        onSuccess: async () => {
          try {
            await syncUsersToRoom(roomId, userIds);
            toastSuccess('Room updated successfully');
            queryClient.invalidateQueries({ queryKey: roomKeys.list() });
            queryClient.invalidateQueries({ queryKey: roomKeys.detail(roomId) });
            queryClient.invalidateQueries({ queryKey: userKeys.list() });
            router.push(ROUTES.ROOMS);
          } catch (error: unknown) {
            const message =
              typeof error === 'object' && error !== null && 'message' in error
                ? String((error as { message?: string }).message)
                : 'Assign user to room failed';
            toastError(message);
          }
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
    isLoadingUsers: isLoadingUsers || isLoadingRoomMembers,
    isSubmitting: isLoadingDetail || isCreating || isUpdating || isUpdatingUserRoom,
    services: serviceData?.items || [],
    users: userData?.items || [],
    initialValues,
    onSubmit,
    onCancel,
  };
}
