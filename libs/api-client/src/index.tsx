export * from './axios-client';
export * from './useApi';

export { useQueryClient, useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 2,
    },
  },
});

export const ApiQueryProvider = ({
  children,
  isEnableDevtools = false,
}: {
  children: ReactNode;
  isEnableDevtools?: boolean;
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {isEnableDevtools && <ReactQueryDevtools />}
  </QueryClientProvider>
);
