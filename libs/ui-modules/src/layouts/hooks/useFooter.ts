import { ReactNode } from 'react';
import { create } from 'zustand';

type PaginationData = {
  total: number;
  page: number;
  limit: number;
  pageCount?: number;
};
type FooterState = {
  pagination: PaginationData;
  actions?: ReactNode[];
  setPagination: (payload: PaginationData) => void;
  setPageChange: (page: number) => void;
  setAction: (elements: ReactNode[]) => void;
};

export const useFooter = create<FooterState>(set => ({
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
  actions: [],
  setPagination: (payload: PaginationData) =>
    set(state => ({ ...state, pagination: { ...payload } })),
  setPageChange: (page: number) =>
    set(state => ({
      ...state,
      pagination: { ...state?.pagination, page },
    })),
  setAction: (elements: ReactNode[]) => set(state => ({ ...state, actions: elements })),
}));
