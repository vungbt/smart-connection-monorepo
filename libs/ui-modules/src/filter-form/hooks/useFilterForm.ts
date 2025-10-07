import { FormikHelpers } from 'formik';
import { create } from 'zustand';

type FilterFormState = {
  q: string;
  formHelper: FormikHelpers<{ q: string }> | null;
  setSearchValue: (value: string, formHelper: FormikHelpers<{ q: string }>) => void;
};

export const useFilterForm = create<FilterFormState>(set => ({
  q: '',
  formHelper: null,
  openDrawer: false,
  setSearchValue: (value: string, formHelper: FormikHelpers<{ q: string }>) =>
    set(state => ({ ...state, q: value, formHelper })),
}));
