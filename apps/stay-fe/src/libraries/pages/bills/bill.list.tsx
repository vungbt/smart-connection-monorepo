'use client';
import { SERVICE_TYPE_TAG_COLORS } from '@/constants/common';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { BillItem } from '@/types/bills';
import { getCellIndex } from '@/utils/common';
import { formatDate, formatPrice } from '@/utils/formatter';
import {
  Button,
  FormikForm,
  FormikItem,
  ModalConfirm,
  Select,
  SelectOption,
  Table,
  TableColumn,
  Tag,
  yup,
} from '@smart-connection-monorepo/ui-components';
import { ActionButtons, FilterForm } from '@smart-connection-monorepo/ui-modules';
import Link from 'next/link';
import { calculateBillAmount, monthOptions, yearOptions } from '@/utils/bills';
import { getRoomMemberCount } from '@/utils/rooms';
import BillListUtils, { BillListFilterFormValues } from './utils/bill-list.utils';

const billListFilterSchema = yup.object({
  billingMonth: yup.string().required('Select billing month'),
  billingYear: yup.string().required('Select billing year'),
});

function BillListPeriodFilterForm({
  initialValues,
  onApply,
}: {
  initialValues: BillListFilterFormValues;
  onApply: (month: number, year: number) => void;
}) {
  return (
    <FormikForm<BillListFilterFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={billListFilterSchema}
      onSubmit={values => {
        const idx = monthOptions.findIndex(o => String(o.value) === String(values.billingMonth));
        const month = idx >= 0 ? idx + 1 : new Date().getMonth() + 1;
        const year = Number(values.billingYear);
        onApply(month, Number.isFinite(year) ? year : new Date().getFullYear());
      }}
    >
      <FormikItem
        name="billingMonth"
        label="Billing month"
        mapValue={value =>
          monthOptions.find(option => String(option.value) === String(value)) || null
        }
        mapOnChange={option =>
          String((option as SelectOption | null)?.value ?? monthOptions[0].value)
        }
      >
        <Select options={monthOptions} placeholder="Month" />
      </FormikItem>
      <FormikItem
        name="billingYear"
        label="Billing year"
        mapValue={value =>
          yearOptions.find(option => String(option.value) === String(value)) || null
        }
        mapOnChange={option =>
          String((option as SelectOption | null)?.value ?? String(new Date().getFullYear()))
        }
      >
        <Select options={yearOptions} placeholder="Year" />
      </FormikItem>
      <Button type="submit" className="w-full">
        Apply filters
      </Button>
    </FormikForm>
  );
}

export default function BillListPage() {
  const {
    bills,
    metadata,
    isLoading,
    isLoadingDelete,
    itemIdDelete,
    sorting,
    onView,
    onDelete,
    setItemIdDelete,
    setSorting,
    onSubmitDelete,
    listFilterInitialValues,
    applyBillingPeriodFilter,
  } = BillListUtils();

  usePageTitle({ title: 'Bill Management', icon: 'vuesax-money-receive' });

  const columns: TableColumn<BillItem> = [
    {
      header: 'N°',
      cell: ({ row }) => (
        <Link
          href={ROUTES.BILLS_SLUG.replace(':slug', row.original.id)}
          className="font-semibold text-primary"
        >
          {getCellIndex(metadata, row.index)}
        </Link>
      ),
    },
    {
      header: 'Tenant',
      cell: ({ row }) => row.original.room?.members?.[0]?.name || '-',
    },
    {
      header: 'Room',
      id: 'roomName',
      enableSorting: true,
      accessorFn: row => row.room?.name || '',
      cell: ({ row }) => row.original.room?.name ?? '--',
    },
    {
      header: 'Issue Date',
      id: 'issueDate',
      enableSorting: true,
      accessorFn: row => String(row.createdAt || ''),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      header: 'Service Type',
      cell: ({ row }) => {
        const type = row.original.room?.service?.type;
        if (!type) return '-';
        return <Tag content={type} color={SERVICE_TYPE_TAG_COLORS[type]} type="outline" />;
      },
    },
    {
      header: 'Amount',
      id: 'amount',
      enableSorting: true,
      accessorFn: row => row.waterNumberNew,
      cell: ({ row }) => (
        <span className="font-semibold">
          {formatPrice(
            calculateBillAmount(
              row.original.room?.service,
              {
                electricNumberOld: row.original.electricNumberOld,
                electricNumberNew: row.original.electricNumberNew,
                waterNumberOld: row.original.waterNumberOld,
                waterNumberNew: row.original.waterNumberNew,
              },
              row.original.otherServiceFee,
              Boolean(row.original.room?.isUseElectricBike),
              getRoomMemberCount(row.original.room),
              {
                customElectricFee: row.original.customElectricFee,
                customWaterFee: row.original.customWaterFee,
              },
              Boolean(row.original.isMoveOutBill)
            )
          )}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons
          onView={() => onView(row.original)}
          onDelete={() => onDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div>
      {/* headers */}
      <div className="flex items-center gap-3 justify-end mt-6">
        <FilterForm placeholder="Search invoice, tenant or room" drawer={{ title: 'Filters' }}>
          <div className="pt-2">
            <BillListPeriodFilterForm
              initialValues={listFilterInitialValues}
              onApply={applyBillingPeriodFilter}
            />
          </div>
        </FilterForm>
        <Link href={ROUTES.BILLS_ADD}>
          <Button icon="plus">Create Bill</Button>
        </Link>
        <Link href={ROUTES.BILLS_BULK_ADD}>
          <Button variant="outline" icon="vuesax-document-upload">
            Create Bills (Bulk)
          </Button>
        </Link>
      </div>

      {/* content */}
      <Table
        columns={columns}
        data={bills}
        rowKey="id"
        loading={isLoading}
        sortable={{ sorting, onSorting: setSorting }}
        customClasses={{ root: 'mt-6' }}
      />

      <ModalConfirm
        isLoading={isLoadingDelete}
        isOpen={!!itemIdDelete}
        onCancel={() => setItemIdDelete(null)}
        onClose={() => setItemIdDelete(null)}
        onSubmit={onSubmitDelete}
      />
    </div>
  );
}
