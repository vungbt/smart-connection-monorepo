'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RoomFormValues } from '@/types/rooms';
import { formatPrice } from '@/utils/formatter';
import {
  Box,
  Breadcrumb,
  Button,
  FormikForm,
  FormikItem,
  Input,
  Select,
  SelectOption,
  yup,
} from '@smart-connection-monorepo/ui-components';
import { useMemo } from 'react';
import RoomSlugUtils from './utils/room-slug.utils';

const validationSchema = yup.object({
  name: yup.string().required('Room name is required'),
  serviceId: yup.string().required('Please select a service'),
  isUseElectricBike: yup.boolean().required('Please choose electric bike usage'),
});

export default function RoomSlugPage() {
  const {
    isAdd,
    isLoadingServices,
    isLoadingUsers,
    isSubmitting,
    services,
    users,
    initialValues,
    onSubmit,
    onCancel,
  } = RoomSlugUtils();

  const serviceOptions = useMemo<SelectOption[]>(
    () =>
      services.map(service => ({
        value: service.id,
        label: `${service.type} - ${formatPrice(service.roomFee)}`,
      })),
    [services]
  );

  const userOptions = useMemo<SelectOption[]>(
    () =>
      users.map(user => ({
        value: user.id,
        label: user.phone ? `${user.name} - ${user.phone}` : user.name,
      })),
    [users]
  );

  const electricBikeOptions = useMemo<SelectOption[]>(
    () => [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
    []
  );

  usePageTitle({
    title: isAdd ? 'Add New Room' : 'Edit Room',
    icon: 'building-storefront',
  });

  return (
    <FormikForm<RoomFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { title: 'Home', href: ROUTES.HOME },
            { title: 'Rooms', href: ROUTES.ROOMS },
            { title: isAdd ? 'Add New Room' : 'Edit Room' },
          ]}
          description="Configure room information and assign a service package."
        />

        <Box>
          <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            General Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormikItem name="name" required>
              <Input label="Room name" placeholder="Enter room name" loading={isSubmitting} />
            </FormikItem>

            <FormikItem
              name="serviceId"
              required
              label="Service"
              mapValue={value => serviceOptions.find(item => item.value === value) || null}
              mapOnChange={option => {
                const selectedOption = option as SelectOption | null;
                return selectedOption?.value ?? '';
              }}
            >
              <Select
                options={serviceOptions}
                placeholder="Select service"
                loading={isSubmitting || isLoadingServices}
              />
            </FormikItem>

            <FormikItem
              name="isUseElectricBike"
              required
              label="Use Electric Bike"
              mapValue={value =>
                electricBikeOptions.find(item => item.value === String(Boolean(value))) || null
              }
              mapOnChange={option => {
                const selectedOption = option as SelectOption | null;
                return selectedOption?.value === 'true';
              }}
            >
              <Select
                options={electricBikeOptions}
                placeholder="Select option"
                loading={isSubmitting}
              />
            </FormikItem>

            <FormikItem
              name="userIds"
              label="Users"
              mapValue={value => {
                const userIds = (value as string[] | undefined) || [];
                return userOptions.filter(option => userIds.includes(String(option.value)));
              }}
              mapOnChange={option => {
                const selectedOptions = (option as SelectOption[] | null) || [];
                return selectedOptions.map(selectedOption => String(selectedOption.value));
              }}
            >
              <Select
                isMulti
                options={userOptions}
                placeholder="Select users"
                loading={isSubmitting || isLoadingUsers}
              />
            </FormikItem>
          </div>
        </Box>

        <div className="flex items-center justify-end w-full flex-1 flex-row gap-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {isAdd ? 'Create Room' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </FormikForm>
  );
}
