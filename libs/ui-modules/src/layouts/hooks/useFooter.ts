import { ReactNode } from 'react';
import { create } from 'zustand';

type PaginationData = {
  count?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
};
type FooterState = {
  pagination: PaginationData;
  actions?: ReactNode[];
  setPagination: (payload: PaginationData) => void;
  setPageChange: (page: number) => void;
  setActions: (elements: ReactNode[]) => void;
};

export const useFooter = create<FooterState>(set => ({
  pagination: {
    count: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  },
  actions: [],
  setPagination: (payload: PaginationData) =>
    set(state => ({ ...state, pagination: { ...state.pagination, ...payload } })),
  setPageChange: (page: number) =>
    set(state => ({
      ...state,
      pagination: { ...state?.pagination, page },
    })),
  setActions: (elements: ReactNode[]) => set(state => ({ ...state, actions: elements })),
}));
