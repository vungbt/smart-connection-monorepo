'use client';
import { ROUTES } from '@/constants/route';
import { usePageTitle } from '@/hooks/usePageTitle';
import { EServiceType, ServiceFormValues } from '@/types/services';
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
import ServiceSlugUtils from './utils/service-slug.utils';

const serviceTypeOptions: SelectOption[] = [
  { label: EServiceType.DELUXE, value: EServiceType.DELUXE },
  { label: EServiceType.LUXURY, value: EServiceType.LUXURY },
  { label: EServiceType.PREMIUM, value: EServiceType.PREMIUM },
  { label: EServiceType.BUSINESS, value: EServiceType.BUSINESS },
];

const validationSchema = yup.object({
  type: yup
    .string()
    .oneOf(Object.values(EServiceType), 'Please select a type')
    .required('Please select a type'),
  roomFee: yup
    .number()
    .typeError('Room fee must be a number')
    .moreThan(0, 'Room fee must be greater than 0')
    .required('Room fee is required'),
  waterFee: yup
    .number()
    .typeError('Water fee must be a number')
    .moreThan(0, 'Water fee must be greater than 0')
    .required('Water fee is required'),
  electricFee: yup
    .number()
    .typeError('Electric fee must be a number')
    .moreThan(0, 'Electric fee must be greater than 0')
    .required('Electric fee is required'),
  electricBikeFee: yup
    .number()
    .typeError('Electric bike fee must be a number')
    .moreThan(0, 'Electric bike fee must be greater than 0')
    .required('Electric bike fee is required'),
  commonServiceFee: yup
    .number()
    .typeError('Common service fee must be a number')
    .moreThan(0, 'Common service fee must be greater than 0')
    .required('Common service fee is required'),
  internetFee: yup
    .number()
    .typeError('Internet fee must be a number')
    .moreThan(0, 'Internet fee must be greater than 0')
    .required('Internet fee is required'),
});

export default function ServiceSlugPage() {
  const { isAdd, isSubmitting, initialValues, onSubmit, onCancel } = ServiceSlugUtils();

  usePageTitle({
    title: isAdd ? 'Create New Service' : 'Edit Service',
    icon: 'vuesax-empty-wallet-change',
  });

  return (
    <FormikForm<ServiceFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { title: 'Home', href: ROUTES.HOME },
            { title: 'Services', href: ROUTES.SERVICES },
            { title: isAdd ? 'Create New Service' : 'Edit Service' },
          ]}
        />

        <div>
          <h2 className="text-32 font-semibold text-neutral-text-primary">
            {isAdd ? 'Create New Service' : 'Edit Service'}
          </h2>
          <p className="mt-1 text-14 text-neutral-placeholder">
            Configure service pricing and monthly fees for selected room type.
          </p>
        </div>

        <Box>
          <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            General Information
          </h3>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-4 md:col-span-1">
              <FormikItem
                name="type"
                required
                label="Room type"
                mapValue={value => serviceTypeOptions.find(item => item.value === value) || null}
                mapOnChange={option => {
                  const selectedOption = option as SelectOption | null;
                  return selectedOption?.value ?? '';
                }}
              >
                <Select options={serviceTypeOptions} loading={isSubmitting} />
              </FormikItem>
            </div>
          </div>
        </Box>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Box>
            <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">Electricity</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormikItem name="electricFee" required>
                <Input
                  type="number"
                  min="0"
                  label="Electric Fee"
                  placeholder="0.00"
                  loading={isSubmitting}
                />
              </FormikItem>
              <FormikItem name="electricBikeFee" required>
                <Input
                  type="number"
                  min="0"
                  label="Electric Bike Fee"
                  placeholder="0.00"
                  loading={isSubmitting}
                />
              </FormikItem>
            </div>
          </Box>

          <Box>
            <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">
              Water & Internet
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormikItem name="waterFee" required>
                <Input
                  type="number"
                  min="0"
                  label="Water Fee"
                  placeholder="0.00"
                  loading={isSubmitting}
                />
              </FormikItem>
              <FormikItem name="internetFee" required>
                <Input
                  type="number"
                  min="0"
                  label="Internet Fee"
                  placeholder="0.00"
                  loading={isSubmitting}
                />
              </FormikItem>
            </div>
          </Box>
        </div>

        <Box>
          <h3 className="mb-4 text-20 font-semibold text-neutral-text-primary">
            Fixed Monthly Fees
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FormikItem name="roomFee" required>
              <Input
                type="number"
                min="0"
                label="Room Fee"
                placeholder="0.00"
                loading={isSubmitting}
              />
            </FormikItem>
            <FormikItem name="commonServiceFee" required>
              <Input
                type="number"
                min="0"
                label="Common Service Fee"
                placeholder="0.00"
                loading={isSubmitting}
              />
            </FormikItem>
          </div>
        </Box>

        <div className="flex items-center justify-end w-full flex-1 flex-row gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {isAdd ? 'Create Service' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </FormikForm>
  );
}
