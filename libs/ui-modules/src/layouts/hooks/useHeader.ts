import { ReactNode } from 'react';
import { create } from 'zustand';

interface CollapseNavbarState {
  collapse: boolean;
  notiCount?: number;
  setCollapse: (payload: { collapse: boolean }) => void;
  title?: ReactNode;
  setTitle: (element: ReactNode) => void;
}
export const useHeader = create<CollapseNavbarState>(set => ({
  collapse: false,
  notiCount: 0,
  setCollapse: (payload: { collapse: boolean }) =>
    set(state => ({ ...state, collapse: payload.collapse })),
  setNotiCount: (payload: { notiCount: number }) =>
    set(state => ({ ...state, notiCount: payload.notiCount })),
  setTitle: (title: ReactNode) => set(state => ({ ...state, title })),
}));
