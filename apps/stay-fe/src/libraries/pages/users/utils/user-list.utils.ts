import { ROUTES } from '@/constants/route';
import { usePagination } from '@/hooks/usePagination';
import {
  UserImportBody,
  UserImportItem,
  UserImportRes,
  UserItem,
  UserListRes,
} from '@/types/users';
import { userKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import {
  TableSortingType,
  toastError,
  toastSuccess,
} from '@smart-connection-monorepo/ui-components';
import { useFilterForm } from '@smart-connection-monorepo/ui-modules';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserListUtilsResult = {
  users: UserItem[];
  metadata?: UserListRes['metadata'];
  isLoading: boolean;
  isLoadingDelete: boolean;
  isImporting: boolean;
  itemIdDelete: string | null;
  sorting: TableSortingType;
  onEdit: (user: UserItem) => void;
  onDelete: (userId: string) => void;
  onImportCsv: (file: File) => Promise<void>;
  onSubmitDelete: () => void;
  setItemIdDelete: (id: string | null) => void;
  setSorting: (sorting: TableSortingType) => void;
};

type UserSortBy =
  | 'createdAt'
  | 'name'
  | 'phone'
  | 'address'
  | 'isActive'
  | 'isRoomLeader'
  | 'roomName';

const sortFieldMap: Record<string, UserSortBy> = {
  name: 'name',
  phone: 'phone',
  address: 'address',
  roomName: 'roomName',
  isActive: 'isActive',
  isRoomLeader: 'isRoomLeader',
};

const parseCsvRow = (line: string) => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
};

const parseActive = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();
  if (normalizedValue === 'true' || normalizedValue === '1') return true;
  if (normalizedValue === 'false' || normalizedValue === '0') return false;
  return null;
};

const parseUserImportCsv = (rawCsv: string): UserImportItem[] => {
  const lines = rawCsv
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter(line => line.trim().length > 0);

  if (lines.length < 2) throw new Error('CSV file must include header and at least 1 data row');

  const headers = parseCsvRow(lines[0]).map(item => item.trim());
  const requiredHeaders = ['name', 'phone', 'address', 'identityCardNumber', 'isActive', 'roomId'];
  const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
  if (missingHeaders.length > 0) {
    throw new Error(`Missing CSV headers: ${missingHeaders.join(', ')}`);
  }

  const headerIndexMap = new Map(headers.map((header, index) => [header, index]));
  const getField = (columns: string[], fieldName: string) => {
    const fieldIndex = headerIndexMap.get(fieldName);
    if (fieldIndex === undefined) return '';
    return (columns[fieldIndex] || '').trim();
  };

  return lines
    .slice(1)
    .map((line, lineIndex) => {
      const columns = parseCsvRow(line);
      const name = getField(columns, 'name');
      const isActiveRaw = getField(columns, 'isActive');
      const isActive = parseActive(isActiveRaw);

      if (!name) throw new Error(`Invalid CSV at row ${lineIndex + 2}: name is required`);
      if (isActive === null) {
        throw new Error(`Invalid CSV at row ${lineIndex + 2}: isActive must be true/false/1/0`);
      }

      const phone = getField(columns, 'phone');
      const address = getField(columns, 'address');
      const identityCardNumber = getField(columns, 'identityCardNumber');
      const roomId = getField(columns, 'roomId');
      const isRoomLeaderRaw = getField(columns, 'isRoomLeader');
      const isRoomLeader = isRoomLeaderRaw ? parseActive(isRoomLeaderRaw) : null;

      return {
        name,
        isActive,
        isRoomLeader: isRoomLeader === null ? undefined : isRoomLeader,
        phone,
        address,
        identityCardNumber,
        roomId: roomId || undefined,
      };
    })
    .filter(item => item.name);
};

export default function UserListUtils(): UserListUtilsResult {
  const [itemIdDelete, setItemIdDelete] = useState<string | null>(null);
  const [sorting, setSorting] = useState<TableSortingType>([{ id: 'roomName', desc: false }]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { q } = useFilterForm();
  const { pagination, setPagination } = usePagination({});

  const searchKeyword = q.trim();
  const activeSort = sorting[0];
  const sortBy = activeSort ? sortFieldMap[activeSort.id] || 'roomName' : 'roomName';
  const sortOrder = activeSort?.desc ? 'DESC' : 'ASC';

  const { data: userData, isLoading: isLoadingUsers } = useApiQuery<UserListRes>({
    endpoint: API_ROUTES.USERS,
    queryKey: userKeys.list({
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword,
      sortBy,
      sortOrder,
    }),
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      q: searchKeyword || undefined,
      sortBy,
      sortOrder,
    },
  });

  useEffect(() => {
    setPagination({
      count: userData?.metadata?.count || 0,
      totalPages: userData?.metadata?.totalPages || 0,
    });
  }, [userData?.metadata]);

  const { mutate: deleteUser, isPending: isLoadingDelete } = useApiMutation<
    { message: string },
    Record<string, never>
  >('DELETE');
  const { mutateAsync: importUsers, isPending: isImporting } = useApiMutation<
    UserImportRes,
    UserImportBody
  >('POST');

  const onEdit = (user: UserItem) => {
    router.push(ROUTES.USERS_SLUG.replace(':slug', user.id));
  };

  const onDelete = (userId: string) => {
    setItemIdDelete(userId);
  };

  const onImportCsv = async (file: File) => {
    const rawCsv = await file.text();
    const items = parseUserImportCsv(rawCsv);

    if (items.length === 0) {
      toastError('CSV does not contain valid user rows');
      return;
    }

    try {
      const data = await importUsers({
        endpoint: API_ROUTES.USERS_IMPORT,
        body: { items },
      });
      toastSuccess(`Imported ${data?.items?.length || 0} users successfully`);
      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });
      setPagination({
        ...pagination,
        page: 1,
      });
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Import users failed';
      toastError(message);
    }
  };

  const onSubmitDelete = () => {
    if (!itemIdDelete) return;
    deleteUser(
      { endpoint: `${API_ROUTES.USERS}/${itemIdDelete}`, body: {} },
      {
        onSuccess: data => {
          setItemIdDelete(null);
          toastSuccess(data?.message || 'User deleted successfully');
          queryClient.invalidateQueries({
            queryKey: userKeys.list(),
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
    users: userData?.items || [],
    metadata: userData?.metadata,
    isLoading: isLoadingUsers,
    isLoadingDelete,
    isImporting,
    itemIdDelete,
    sorting,
    onEdit,
    onDelete,
    onImportCsv,
    setItemIdDelete,
    setSorting,
    onSubmitDelete,
  };
}
