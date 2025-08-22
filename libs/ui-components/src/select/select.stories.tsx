import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption, SelectAsync, SelectAsyncCreatable } from './index';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'subtle', 'ghost'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    isClearable: {
      control: { type: 'boolean' },
    },
    isSearchable: {
      control: { type: 'boolean' },
    },
    isMulti: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Disabled Option', value: '6', isDisabled: true },
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

const mockAsync = (inputValue: string): Promise<SelectOption[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      const base: SelectOption[] = [
        { label: 'Alpha', value: 'alpha' },
        { label: 'Beta', value: 'beta' },
        { label: 'Gamma', value: 'gamma' },
        { label: 'Delta', value: 'delta' },
      ];
      const filtered = base.filter(o =>
        o.label.toLowerCase().includes((inputValue || '').toLowerCase())
      );
      resolve(filtered);
    }, 600);
  });

export const AsyncBasic: Story = {
  name: 'Async/Basic',
  args: {
    placeholder: 'Search async options...',
    isClearable: true,
  },
  render: args => (
    <div style={{ width: 320 }}>
      <SelectAsync
        {...(args as any)}
        loadOptions={(input, cb) => {
          mockAsync(input).then(cb);
        }}
      />
    </div>
  ),
};

export const AsyncCreatableBasic: Story = {
  name: 'Async/Creatable',
  args: {
    placeholder: 'Type to search or create...',
    isClearable: true,
    isMulti: true,
  },
  render: args => (
    <div style={{ width: 480 }}>
      <SelectAsyncCreatable
        {...(args as any)}
        loadOptions={(input, cb) => {
          mockAsync(input).then(cb);
        }}
        onCreateOption={(val: string) => {
          // eslint-disable-next-line no-console
          console.log('Create option:', val);
        }}
      />
    </div>
  ),
};
