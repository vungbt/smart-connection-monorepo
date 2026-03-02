import { ROUTES } from '@/constants/route';
import { useSlugParams } from '@/hooks/useSlugParams';
import { BillItem, BillListRes } from '@/types/bills';
import { RoomItem, RoomListRes } from '@/types/rooms';
import { ServiceItem, ServiceListRes } from '@/types/services';
import { UserDetailRes, UserFormValues } from '@/types/users';
import { userKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type UserSlugUtilsResult = {
  isAdd: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  user?: UserDetailRes['item'];
  rooms: RoomItem[];
  addInitialValues: UserFormValues;
  editInitialValues: UserFormValues;
  isEditing: boolean;
  onSubmitAdd: (formValues: UserFormValues) => void;
  onSubmitEdit: (formValues: UserFormValues) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onCancelAdd: () => void;
  userRoom?: RoomItem;
  userService?: ServiceItem;
  latestBill?: BillItem;
  bills: BillItem[];
  leaseStatusText: string;
  leaseStatusColor: 'green' | 'blue' | 'orange' | 'red';
};

export default function UserSlugUtils(): UserSlugUtilsResult {
  const { itemId: userId, isAdd } = useSlugParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const addInitialValues: UserFormValues = {
    name: '',
    phone: '',
    address: '',
    isActive: true,
    isRoomLeader: false,
    identityCardNumber: '',
    roomId: '',
  };

  const { data: userData, isLoading: isLoadingUser } = useApiQuery<UserDetailRes>(
    {
      endpoint: `${API_ROUTES.USERS}/${userId}`,
      queryKey: userKeys.detail(userId || ''),
      params: {
        id: userId,
      },
    },
    { enabled: !!userId && !isAdd }
  );

  const { data: roomData, isLoading: isLoadingRooms } = useApiQuery<RoomListRes>({
    endpoint: API_ROUTES.ROOMS,
    queryKey: ['rooms', 'all'],
    params: {
      page: 1,
      pageSize: 1000,
    },
  });

  const { data: serviceData, isLoading: isLoadingServices } = useApiQuery<ServiceListRes>({
    endpoint: API_ROUTES.SERVICES,
    queryKey: ['services', 'all'],
    params: {
      page: 1,
      pageSize: 1000,
    },
  });

  const roomId = userData?.item?.roomId;

  const { data: billData, isLoading: isLoadingBills } = useApiQuery<BillListRes>(
    {
      endpoint: API_ROUTES.BILLS,
      queryKey: ['bills', 'by-room', roomId],
      params: {
        page: 1,
        pageSize: 100,
        roomIds: roomId ? [roomId] : undefined,
      },
    },
    { enabled: !!roomId && !isAdd }
  );

  const { mutate: createUser, isPending: isCreating } = useApiMutation<
    UserDetailRes,
    UserFormValues
  >('POST');
  const { mutate: updateUser, isPending: isUpdating } = useApiMutation<
    UserDetailRes,
    UserFormValues
  >('PUT');

  const onSubmitAdd = (formValues: UserFormValues) => {
    createUser(
      {
        endpoint: API_ROUTES.USERS,
        body: formValues,
      },
      {
        onSuccess: () => {
          toastSuccess('User created successfully');
          queryClient.invalidateQueries({ queryKey: userKeys.list() });
          router.push(ROUTES.USERS);
        },
        onError: error => {
          toastError(error?.message);
        },
      }
    );
  };

  const onCancelAdd = () => {
    router.push(ROUTES.USERS);
  };

  const onStartEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const onSubmitEdit = (formValues: UserFormValues) => {
    if (!userId) return;

    updateUser(
      {
        endpoint: `${API_ROUTES.USERS}/${userId}`,
        body: formValues,
      },
      {
        onSuccess: data => {
          toastSuccess('User updated successfully');
          queryClient.setQueryData(userKeys.detail(userId), data);
          queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
          queryClient.invalidateQueries({ queryKey: userKeys.list() });
          setIsEditing(false);
        },
        onError: error => {
          toastError(error?.message);
        },
      }
    );
  };

  const roomMap = useMemo(() => {
    return new Map((roomData?.items || []).map(room => [room.id, room]));
  }, [roomData?.items]);

  const serviceMap = useMemo(() => {
    return new Map((serviceData?.items || []).map(service => [service.id, service]));
  }, [serviceData?.items]);

  const bills = useMemo(() => {
    const items = billData?.items || [];
    return [...items].sort(
      (left, right) =>
        new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime()
    );
  }, [billData?.items]);

  const latestBill = bills[0];
  const user = userData?.item;
  const editInitialValues: UserFormValues = {
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    isActive: user?.isActive ?? true,
    isRoomLeader: user?.isRoomLeader ?? false,
    identityCardNumber: user?.identityCardNumber || '',
    roomId: user?.roomId || '',
  };
  const userRoom = roomMap.get(user?.roomId || '');
  const userService = serviceMap.get(userRoom?.serviceId || '');
  const leaseStatusText = user?.isActive ? 'ACTIVE' : 'INACTIVE';
  const leaseStatusColor: UserSlugUtilsResult['leaseStatusColor'] = user?.isActive
    ? 'green'
    : 'red';

  return {
    isAdd,
    isLoading: isLoadingUser || isLoadingRooms || isLoadingServices || isLoadingBills,
    isSubmitting: isCreating || isUpdating,
    isEditing,
    user,
    rooms: roomData?.items || [],
    addInitialValues,
    editInitialValues,
    onSubmitAdd,
    onSubmitEdit,
    onStartEdit,
    onCancelEdit,
    onCancelAdd,
    userRoom,
    userService,
    latestBill,
    bills,
    leaseStatusText,
    leaseStatusColor,
  };
}
