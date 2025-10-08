import {
  useQuery,
  useMutation,
  UseQueryOptions,
  useQueryClient as useQueryClientTanstack,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';
import { axiosClient } from './axios-client';

export type TQueryKey<TKey, TListQuery = unknown, TDetailQuery = string> = {
  all: readonly [TKey];
  lists: () => readonly [...TQueryKey<TKey>['all'], 'list'];
  list: (
    query?: TListQuery
  ) =>
    | readonly [...ReturnType<TQueryKey<TKey>['lists']>]
    | readonly [...ReturnType<TQueryKey<TKey>['lists']>, { query: TListQuery }];
  details: () => readonly [...TQueryKey<TKey>['all'], 'detail'];
  detail: (
    id: TDetailQuery,
    query?: TListQuery
  ) =>
    | readonly [...ReturnType<TQueryKey<TKey>['details']>, TDetailQuery]
    | readonly [...ReturnType<TQueryKey<TKey>['details']>, TDetailQuery, { query: TListQuery }];
};

type QueryArgs<TParams, TQueryKey extends QueryKey = QueryKey> = {
  endpoint: string;
  params?: TParams;
  queryKey?: TQueryKey;
};

type MutationArgs<TBody> = {
  endpoint: string;
  body: TBody;
};

export const useApiQuery = <TData = unknown, TParams = unknown>(
  { endpoint, params, queryKey }: QueryArgs<TParams>,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>
) => {
  const finalQueryKey = queryKey ?? [endpoint, params ?? {}];

  return useQuery<TData, Error, TData>({
    ...options,
    queryKey: finalQueryKey,
    queryFn: async () => {
      const response = await axiosClient.get<TParams, TData>(endpoint, params);
      return response?.data || (response as TData);
    },
  });
};

export const useQueryClient = () => {
  return useQueryClientTanstack();
};

export const useApiMutation = <TRes = unknown, TBody = unknown>(
  method: 'POST' | 'PUT' | 'DELETE',
  options?: Omit<UseMutationOptions<TRes, Error, MutationArgs<TBody>>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: async ({ endpoint, body }) => {
      let response;
      if (method === 'POST') response = await axiosClient.post<TBody, TRes>(endpoint, body);
      else if (method === 'PUT') response = await axiosClient.put<TBody, TRes>(endpoint, body);
      else if (method === 'DELETE')
        response = await axiosClient.delete<TBody, TRes>(endpoint, body);
      else throw new Error(`Unsupported method: ${method}`);
      return response?.data || (response as TRes);
    },
    ...options,
  });
};

export const queryKeysFactory = <T, TListQueryType = unknown, TDetailQueryType = string>(
  globalKey: T
): TQueryKey<T, TListQueryType, TDetailQueryType> => {
  const queryKeyFactory = {
    all: [globalKey] as const,

    lists: () => [...queryKeyFactory.all, 'list'] as const,

    list: (query?: TListQueryType) =>
      query
        ? ([...queryKeyFactory.lists(), { query }] as const)
        : ([...queryKeyFactory.lists()] as const),

    details: () => [...queryKeyFactory.all, 'detail'] as const,

    detail: (id: TDetailQueryType, query?: TListQueryType) =>
      query
        ? ([...queryKeyFactory.details(), id, { query }] as const)
        : ([...queryKeyFactory.details(), id] as const),
  };

  return queryKeyFactory;
};
