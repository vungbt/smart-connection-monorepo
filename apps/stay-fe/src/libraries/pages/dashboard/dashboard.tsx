'use client';

import { usePageTitle } from '@/hooks/usePageTitle';
import { formatPrice } from '@/utils/formatter';
import { monthOptions, yearOptions } from '@/utils/bills';
import {
  Box,
  Button,
  FormikForm,
  FormikItem,
  Select,
  SelectOption,
  Table,
  TableColumn,
  Tag,
  yup,
} from '@smart-connection-monorepo/ui-components';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardUtils, { RoomRevenueItem } from './utils/dashboard.utils';

type DashboardFilterValues = {
  month: string;
  year: string;
};

const filterSchema = yup.object({
  month: yup.string().required('Select billing month'),
  year: yup.string().required('Select billing year'),
});

const formatPercentage = (value: number | null) => {
  if (value === null) return 'No previous-month baseline';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}% from previous month`;
};

export default function DashboardPage() {
  const { period, previousPeriod, isLoading, report, setPeriod } = DashboardUtils();

  usePageTitle({ title: 'Revenue Dashboard', icon: 'vuesax-money-receive' });

  const roomRevenueColumns: TableColumn<RoomRevenueItem> = [
    { header: 'Room', accessorKey: 'roomName' },
    { header: 'Bills', accessorKey: 'billCount' },
    {
      header: 'Revenue',
      cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.revenue)}</span>,
    },
  ];

  const initialValues: DashboardFilterValues = {
    month: String(monthOptions[period.month - 1]?.value || monthOptions[0].value),
    year: String(period.year),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-24 font-semibold text-neutral-text-primary">Revenue Dashboard</h1>
          <p className="mt-1 text-14 text-neutral-text-secondary">
            Monthly revenue summary and comparison with the previous month.
          </p>
        </div>

        <FormikForm<DashboardFilterValues>
          enableReinitialize
          initialValues={initialValues}
          validationSchema={filterSchema}
          onSubmit={values => {
            const monthIndex = monthOptions.findIndex(
              option => String(option.value) === values.month
            );
            setPeriod({
              month: monthIndex >= 0 ? monthIndex + 1 : period.month,
              year: Number(values.year) || period.year,
            });
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <FormikItem
              name="month"
              label="Billing month"
              mapValue={value =>
                monthOptions.find(option => String(option.value) === String(value)) || null
              }
              mapOnChange={option => String((option as SelectOption | null)?.value || '')}
            >
              <Select options={monthOptions} className="min-w-40 bg-white" />
            </FormikItem>
            <FormikItem
              name="year"
              label="Billing year"
              mapValue={value =>
                yearOptions.find(option => String(option.value) === String(value)) || null
              }
              mapOnChange={option => String((option as SelectOption | null)?.value || '')}
            >
              <Select options={yearOptions} className="min-w-32 bg-white" />
            </FormikItem>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Apply
            </Button>
          </div>
        </FormikForm>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Box>
          <p className="text-13 text-neutral-text-secondary">Current month revenue</p>
          <p className="mt-2 text-24 font-semibold text-neutral-text-primary">
            {formatPrice(report.currentRevenue)}
          </p>
          <p className="mt-2 text-13 text-neutral-text-secondary">
            {monthOptions[period.month - 1]?.label} {period.year}
          </p>
        </Box>
        <Box>
          <p className="text-13 text-neutral-text-secondary">Previous month revenue</p>
          <p className="mt-2 text-24 font-semibold text-neutral-text-primary">
            {formatPrice(report.previousRevenue)}
          </p>
          <p className="mt-2 text-13 text-neutral-text-secondary">
            {monthOptions[previousPeriod.month - 1]?.label} {previousPeriod.year}
          </p>
        </Box>
        <Box>
          <p className="text-13 text-neutral-text-secondary">Revenue change</p>
          <p className="mt-2 text-24 font-semibold text-neutral-text-primary">
            {formatPrice(report.revenueDifference)}
          </p>
          <div className="mt-2">
            <Tag
              content={formatPercentage(report.percentageChange)}
              color={report.revenueDifference >= 0 ? 'green' : 'red'}
              type="outline"
            />
          </div>
        </Box>
        <Box>
          <p className="text-13 text-neutral-text-secondary">Bills this month</p>
          <p className="mt-2 text-24 font-semibold text-neutral-text-primary">
            {report.currentBillCount}
          </p>
          <p className="mt-2 text-13 text-neutral-text-secondary">Issued bills</p>
        </Box>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Box className="xl:col-span-3">
          <h2 className="text-18 font-semibold text-neutral-text-primary">Monthly comparison</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-neutral)" vertical={false} />
                <XAxis dataKey="period" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value =>
                    new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(Number(value))
                  }
                />
                <Tooltip formatter={value => formatPrice(Number(value))} />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>

        <Box className="xl:col-span-2">
          <h2 className="text-18 font-semibold text-neutral-text-primary">Revenue by room</h2>
          <Table
            columns={roomRevenueColumns}
            data={report.roomRevenue}
            rowKey="roomId"
            loading={isLoading}
            customClasses={{ root: 'mt-4' }}
          />
        </Box>
      </div>
    </div>
  );
}
