export * from './axios-client';
export * from './ApiQueryProvider';
export * from './useApi';

// Re-export common hooks from react-query
export { useQueryClient, useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient();

export const ApiQueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
