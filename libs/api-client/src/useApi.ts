// hooks/useApi.ts
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { axiosClient } from './axios-client';

type QueryArgs<TParams> = {
  endpoint: string;
  params?: TParams;
  queryKey?: (string | null | undefined)[];
};

type MutationArgs<TBody> = {
  endpoint: string;
  body: TBody;
};

export const useApiQuery = <TData = unknown, TParams = unknown>(
  { endpoint, params, queryKey }: QueryArgs<TParams>,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>
) => {
  const finalQueryKey =
    queryKey ?? [endpoint, params ? JSON.stringify(params) : null].filter(Boolean);
  return useQuery<TData, Error, TData>({
    ...options,
    queryKey: finalQueryKey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    queryFn: async () => {
      const response = await axiosClient.get<TParams, TData>(endpoint, params);
      return response.data;
    },
  });
};

export const useApiMutation = <TRes = unknown, TBody = unknown>(
  method: 'post' | 'put' | 'delete',
  options?: Omit<UseMutationOptions<TRes, Error, MutationArgs<TBody>>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: async ({ endpoint, body }) => {
      let response;
      if (method === 'post') response = await axiosClient.post<TBody, TRes>(endpoint, body);
      else if (method === 'put') response = await axiosClient.put<TBody, TRes>(endpoint, body);
      else if (method === 'delete')
        response = await axiosClient.delete<TBody, TRes>(endpoint, body);
      else throw new Error(`Unsupported method: ${method}`);
      return response.data;
    },
    ...options,
  });
};
