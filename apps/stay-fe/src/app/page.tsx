/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useApiQuery, useApiMutation } from '@smart-connection-monorepo/api-client';
import {
  Table,
  TableColumn,
  FormikForm,
  FormikItem,
  yup,
  Input,
  InputPassword,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Tag,
  DatePicker,
  DateRangePicker,
  Editor,
  Breadcrumb,
} from '@smart-connection-monorepo/ui-components';
import { FormikProps } from 'formik';
import { useRef, useState } from 'react';

// Config type definition
type Config = {
  id: string;
  roomFee: number;
  waterFee: number;
  electricFee: number;
  electricBikeFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: string;
};

type ApiError = Error;

interface FormValues {
  email: string;
  password: string;
  gender: string;
  interests: string[];
  notifications: boolean;
  terms: boolean;
  room: string;
  rooms: string[];
  date: Date | null;
  dateRange: [Date | null, Date | null];
  editor: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  gender: '',
  interests: [],
  notifications: false,
  terms: false,
  room: '',
  rooms: [],
  date: null,
  dateRange: [null, null],
  editor: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
  gender: yup.string().required('Please select your gender'),
  interests: yup
    .array()
    .min(1, 'Please select at least one interest')
    .required('Please select interests'),
  notifications: yup.boolean(),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  room: yup
    .mixed()
    .test('is-valid-room', 'Please select a room', value => {
      if (typeof value === 'string') return value.length > 0;
      if (value && typeof value === 'object' && 'value' in value) {
        const objValue = value as { value: unknown };
        return Boolean(
          objValue.value && typeof objValue.value === 'string' && objValue.value.length > 0
        );
      }
      return false;
    })
    .required('Please select a room'),
  rooms: yup.array().min(1, 'Please select at least one room').required('Please select rooms'),
  date: yup.date().required('Please select a date'),
  dateRange: yup
    .array()
    .of(yup.date().nullable())
    .test('both-dates-required', 'Both start and end dates are required', function (value) {
      if (!value || value.length !== 2) return false;
      return value[0] !== null && value[1] !== null;
    })
    .required('Please select a date range'),
  editor: yup.string().required('Please enter a description'),
});

// Radio options for gender
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

// Checkbox options for interests
const interestOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' },
  { label: 'Travel', value: 'travel' },
  { label: 'Cooking', value: 'cooking' },
];

export default function ConfigsPage() {
  const [, setForm] = useState<Partial<Config>>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);
  // GET services
  const {
    data: configs,
    error,
    isError,
    isLoading,
  } = useApiQuery<Config[]>({
    endpoint: '/services',
    queryKey: ['services'],
  });

  // Note: create/update mutations omitted until used

  // Delete service
  const { mutate: deleteConfig } = useApiMutation<unknown, Record<string, never>>('DELETE', {
    onError: (error: ApiError) => {
      console.error('Error deleting service:', error);
    },
  });

  const onEdit = (config: Config) => {
    setForm(config);
  };

  const onDelete = (id: string) => {
    if (confirm('Delete this service?')) {
      deleteConfig({ endpoint: `/services/${id}`, body: {} });
    }
  };

  // Show error state
  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const columns: TableColumn<Config> = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Room Fee', accessorKey: 'roomFee' },
    { header: 'Water Fee', accessorKey: 'waterFee' },
    { header: 'Electric Fee', accessorKey: 'electricFee' },
    { header: 'Electric Bike Fee', accessorKey: 'electricBikeFee' },
    { header: 'Common Service Fee', accessorKey: 'commonServiceFee' },
    { header: 'Internet Fee', accessorKey: 'internetFee' },
    { header: 'Type', accessorKey: 'type' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onEdit(row.original)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleSubmit = (values: FormValues) => {
    console.log('Submitted:', values);
  };

  return (
    <div className="p-5">
      <h2>Services CRUD Demo</h2>
      <Breadcrumb
        items={[{ title: 'Home', href: '/' }, { title: 'Services' }]}
        description="Services CRUD demo and form controls showcase."
      />
      <Tag content="Hello" />

      {/* Form with Radio and Checkbox components */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Registration Form with Radio & Checkbox</h3>
        <FormikForm<FormValues>
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormikItem name="email">
            <Input type="email" placeholder="Enter email" label="Email" required />
          </FormikItem>

          <FormikItem name="password">
            <InputPassword placeholder="Enter password" label="Password" required />
          </FormikItem>

          <FormikItem name="gender" label="Gender">
            <RadioGroup options={genderOptions} />
          </FormikItem>

          <FormikItem name="interests">
            <CheckboxGroup options={interestOptions} />
          </FormikItem>

          <FormikItem name="notifications">
            <Checkbox label="Receive email notifications" size="middle" color="primary" />
          </FormikItem>

          <FormikItem name="terms">
            <Checkbox label="I agree to the terms and conditions" size="middle" color="primary" />
          </FormikItem>

          <FormikItem name="room" label="Room">
            <Select
              options={[
                { label: 'Room 1', value: 'room1' },
                { label: 'Room 2', value: 'room2' },
              ]}
              isClearable
              placeholder="Select a room"
            />
          </FormikItem>

          <FormikItem name="rooms" label="Rooms">
            <Select
              options={[
                { label: 'Room 1', value: 'room1' },
                { label: 'Room 2', value: 'room2' },
              ]}
              placeholder="Select a room"
              isSearchable
              isMulti
            />
          </FormikItem>

          <FormikItem name="date">
            <DatePicker />
          </FormikItem>

          <FormikItem name="dateRange">
            <DateRangePicker />
          </FormikItem>

          <FormikItem name="editor" label="Editor">
            <Editor />
          </FormikItem>

          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            Submit
          </button>
        </FormikForm>
      </div>

      <Table
        columns={columns}
        data={Array.isArray(configs) ? configs : []}
        rowKey="id"
        loading={isLoading}
        customClasses={{ root: 'h-[500px]' }}
      />
    </div>
  );
}
