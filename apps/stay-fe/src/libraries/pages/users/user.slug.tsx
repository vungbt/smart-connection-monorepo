'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { UserFormValues } from '@/types/users';
import { formatDate, formatPrice } from '@/utils/formatter';
import {
  Box,
  Breadcrumb,
  Button,
  FormikForm,
  FormikItem,
  Input,
  Select,
  SelectOption,
  Tag,
  yup,
} from '@smart-connection-monorepo/ui-components';
import Link from 'next/link';
import { useMemo } from 'react';
import UserSlugUtils from './utils/user-slug.utils';

const addUserValidationSchema = yup.object({
  name: yup.string().required('User name is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  identityCardNumber: yup.string().required('Identity card is required'),
  roomId: yup.string().required('Please select a room'),
  isRoomLeader: yup.boolean().required(),
});

export default function UserSlugPage() {
  const {
    isAdd,
    isLoading,
    isSubmitting,
    isEditing,
    rooms,
    addInitialValues,
    editInitialValues,
    onSubmitAdd,
    onSubmitEdit,
    onStartEdit,
    onCancelEdit,
    onCancelAdd,
    user,
    userRoom,
    userService,
    latestBill,
    bills,
    leaseStatusText,
    leaseStatusColor,
  } = UserSlugUtils();

  const roomOptions = useMemo<SelectOption[]>(
    () => rooms.map(room => ({ value: room.id, label: room.name })),
    [rooms]
  );

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'true', label: 'Active' },
      { value: 'false', label: 'Inactive' },
    ],
    []
  );

  const roomLeaderOptions: SelectOption[] = useMemo(
    () => [
      { value: 'true', label: 'Room Leader' },
      { value: 'false', label: 'Room Member' },
    ],
    []
  );

  usePageTitle({ title: isAdd ? 'Add User' : 'User Profile', icon: 'user-group' });

  const renderUserForm = (
    submitLabel: string,
    initialValues: UserFormValues,
    onSubmit: (formValues: UserFormValues) => void,
    onCancel: () => void
  ) => (
    <FormikForm<UserFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={addUserValidationSchema}
      onSubmit={onSubmit}
    >
      <Box>
        <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">
          General Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormikItem name="name" required>
            <Input label="User name" placeholder="Enter user name" loading={isSubmitting} />
          </FormikItem>
          <FormikItem name="phone" required>
            <Input label="Phone" placeholder="Enter phone number" loading={isSubmitting} />
          </FormikItem>
          <FormikItem name="address" required>
            <Input label="Address" placeholder="Enter address" loading={isSubmitting} />
          </FormikItem>
          <FormikItem name="identityCardNumber" required>
            <Input
              label="Identity card number"
              placeholder="Enter identity card number"
              loading={isSubmitting}
            />
          </FormikItem>

          <FormikItem
            name="isActive"
            required
            label="Status"
            mapValue={value => statusOptions.find(item => item.value === String(value)) || null}
            mapOnChange={option => {
              const selectedOption = option as SelectOption | null;
              return selectedOption?.value === 'true';
            }}
          >
            <Select options={statusOptions} placeholder="Select status" loading={isSubmitting} />
          </FormikItem>

          <FormikItem
            name="roomId"
            required
            label="Room"
            mapValue={value => roomOptions.find(item => item.value === value) || null}
            mapOnChange={option => {
              const selectedOption = option as SelectOption | null;
              return selectedOption?.value ?? '';
            }}
          >
            <Select options={roomOptions} placeholder="Select room" loading={isSubmitting} />
          </FormikItem>

          <FormikItem
            name="isRoomLeader"
            required
            label="Role In Room"
            mapValue={value => roomLeaderOptions.find(item => item.value === String(value)) || null}
            mapOnChange={option => {
              const selectedOption = option as SelectOption | null;
              return selectedOption?.value === 'true';
            }}
          >
            <Select options={roomLeaderOptions} placeholder="Select role" loading={isSubmitting} />
          </FormikItem>
        </div>
      </Box>

      <div className="flex items-center justify-end w-full flex-1 flex-row gap-4 mt-6">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </FormikForm>
  );

  if (isAdd) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { title: 'Home', href: ROUTES.HOME },
            { title: 'Users', href: ROUTES.USERS },
            { title: 'Add User' },
          ]}
          description="Create a new tenant profile and assign room information."
        />
        {renderUserForm('Create User', addInitialValues, onSubmitAdd, onCancelAdd)}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { title: 'Home', href: ROUTES.HOME },
            { title: 'Users', href: ROUTES.USERS },
            { title: user?.name || 'User Detail' },
            { title: 'Edit Profile' },
          ]}
          description="Update tenant profile information."
        />

        {renderUserForm('Save Changes', editInitialValues, onSubmitEdit, onCancelEdit)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: 'Home', href: ROUTES.HOME },
          { title: 'Users', href: ROUTES.USERS },
          { title: user?.name || 'User Detail' },
        ]}
        description="View tenant profile, lease information, billing history and documents."
      />

      <div className="flex items-center w-full justify-end gap-2">
        <Button variant="outline" size="small" icon="pencil" onClick={onStartEdit}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <Box>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-bg border border-neutral flex items-center justify-center text-24 font-semibold text-neutral-text-secondary">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <p className="mt-3 text-24 font-semibold text-neutral-text-primary">
                {user?.name || '-'}
              </p>
              <Tag
                className="mt-2"
                content={user?.isActive ? 'ACTIVE TENANT' : 'INACTIVE TENANT'}
                color={user?.isActive ? 'green' : 'red'}
                type="outline"
              />
              {user?.isRoomLeader && (
                <Tag className="mt-2" content="ROOM LEADER" color="blue" type="outline" />
              )}
              <p className="mt-2 text-14 text-neutral-placeholder">
                Joined {formatDate(user?.createdAt)}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral space-y-4">
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Tenant ID</p>
                <p className="text-14 font-medium text-neutral-text-primary mt-1">
                  {user?.id || '-'}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Phone Number</p>
                <p className="text-14 font-medium text-neutral-text-primary mt-1">
                  {user?.phone || '-'}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Address</p>
                <p className="text-14 font-medium text-neutral-text-primary mt-1">
                  {user?.address || '-'}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Identity Card</p>
                <p className="text-14 font-medium text-neutral-text-primary mt-1">
                  {user?.identityCardNumber || '-'}
                </p>
              </div>
            </div>
          </Box>

          <Box>
            <p className="text-16 font-semibold text-neutral-text-primary">ID Document Photo</p>
            <div className="mt-4 h-[180px] rounded-lg bg-neutral-bg border border-neutral flex items-center justify-center text-neutral-placeholder">
              Document Preview
            </div>
          </Box>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Box>
            <div className="flex items-center justify-between">
              <p className="text-20 font-semibold text-neutral-text-primary">
                Current Room Information
              </p>
              <Tag content={leaseStatusText} color={leaseStatusColor} type="outline" />
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Unit / Room</p>
                <p className="text-20 font-semibold text-neutral-text-primary mt-1">
                  {userRoom?.name || '-'}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Monthly Rent</p>
                <p className="text-20 font-semibold text-primary mt-1">
                  {formatPrice(userService?.roomFee)}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Latest Bill Date</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {formatDate(latestBill?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-12 uppercase text-neutral-placeholder">Latest Electric Number</p>
                <p className="text-16 font-medium text-neutral-text-primary mt-1">
                  {latestBill?.electricNumberNew ?? '-'}
                </p>
              </div>
            </div>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <div className="flex items-center justify-between">
                <p className="text-20 font-semibold text-neutral-text-primary">Billing History</p>
                <Link href="#" className="text-14 text-primary">
                  View All
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {bills.length === 0 && (
                  <p className="text-14 text-neutral-placeholder">No billing history</p>
                )}
                {bills.slice(0, 4).map(bill => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between border border-neutral rounded-lg px-3 py-2"
                  >
                    <div>
                      <p className="text-14 font-medium text-neutral-text-primary">
                        {formatDate(bill.createdAt)}
                      </p>
                      <p className="text-12 text-neutral-placeholder">
                        Bill #{bill.id.slice(0, 8)}
                      </p>
                    </div>
                    <p className="text-14 font-semibold text-neutral-text-primary">
                      {formatPrice(
                        Number(userService?.roomFee || 0) + Number(bill.otherServiceFee || 0)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Box>

            <Box>
              <p className="text-20 font-semibold text-neutral-text-primary">
                Maintenance Requests
              </p>
              <div className="mt-4 space-y-3">
                <div className="border border-neutral rounded-lg px-3 py-2">
                  <p className="text-14 font-medium text-neutral-text-primary">
                    No maintenance request
                  </p>
                  <p className="text-12 text-neutral-placeholder mt-1">
                    This section is ready for upcoming maintenance logs.
                  </p>
                </div>
              </div>
            </Box>
          </div>

          {isLoading && <p className="text-14 text-neutral-placeholder">Loading user profile...</p>}
        </div>
      </div>
    </div>
  );
}
