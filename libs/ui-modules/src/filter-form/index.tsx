import {
  Drawer,
  FormikForm,
  FormikItem,
  Input,
  RenderIcon,
  yup,
} from '@smart-connection-monorepo/ui-components';
export * from './hooks/useFilterForm';
import { useFilterForm } from './hooks/useFilterForm';
import { ReactNode, useState } from 'react';

export function FilterForm({
  placeholder = 'Enter search value',
  drawer,
  children,
  onCloseFilter,
}: {
  placeholder?: string;
  drawer?: { title?: string };
  onCloseFilter?: () => void;
  children?: ReactNode;
}) {
  const { q, setSearchValue } = useFilterForm();
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValidationSchema = yup.object({
    q: yup.string().optional(),
  });

  const onHandleCloseFilter = () => {
    onCloseFilter && onCloseFilter();
    setOpenDrawer(false);
  };

  return (
    <div className="flex items-center justify-end">
      <FormikForm<{ q: string }>
        initialValues={{ q }}
        validationSchema={searchValidationSchema}
        onSubmit={(value, formHelper) => setSearchValue(value.q, formHelper)}
      >
        <FormikItem name="q" className="!mb-0">
          <Input icon="magnifying-glass" placeholder={placeholder} className="!bg-neutral-white" />
        </FormikItem>
      </FormikForm>
      <button
        type="button"
        onClick={() => setOpenDrawer(!openDrawer)}
        className="outline-none ml-2 border border-solid border-neutral bg-neutral-white rounded-lg h-full w-10 aspect-square flex items-center justify-center cursor-pointer box-border group hover:bg-primary-background transition-all ease-linear hover:border-primary"
      >
        <RenderIcon
          name="adjustments-vertical"
          className="!w-5 !h-5 group-hover:text-primary transition-all ease-linear"
        />
      </button>

      <Drawer onClose={onHandleCloseFilter} open={openDrawer} classNames={{ content: 'p-4' }}>
        <div className="flex items-center w-full justify-between gap-3 pb-4">
          <p className="font-medium text-16">{drawer?.title}</p>
          <button
            type="button"
            onClick={onHandleCloseFilter}
            className="outline-none group p-1 rounded-full hover:bg-primary-background"
          >
            <RenderIcon name="x-mark" className="text-neutral-border group-hover:text-primary" />
          </button>
        </div>
        {children}
      </Drawer>
    </div>
  );
}
