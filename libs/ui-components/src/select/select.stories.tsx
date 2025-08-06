import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from './index';

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

const longOptions: SelectOption[] = [
  { label: 'Very long option name that might wrap to multiple lines', value: '1' },
  { label: 'Another long option with lots of text content', value: '2' },
  { label: 'Short', value: '3' },
  { label: 'Medium length option', value: '4' },
  {
    label:
      'This is an extremely long option name that demonstrates how the component handles very long text content',
    value: '5',
  },
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option...',
    options: sampleOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
    options: sampleOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With Helper Text',
    helperText: 'This is some helpful information about the field',
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'With Error',
    error: 'This field has an error message',
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'magnifying-glass',
    placeholder: 'Search options...',
    options: sampleOptions,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'With Right Icon',
    iconRight: 'x-mark',
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Select',
    isClearable: true,
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const MultiSelect: Story = {
  args: {
    label: 'Multi Select',
    isMulti: true,
    placeholder: 'Select multiple options...',
    options: sampleOptions,
  },
};

export const NotSearchable: Story = {
  args: {
    label: 'Not Searchable',
    isSearchable: false,
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading State',
    loading: true,
    placeholder: 'Loading options...',
    options: [],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    placeholder: 'This select is disabled',
    options: sampleOptions,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Size',
    size: 'small',
    placeholder: 'Small select...',
    options: sampleOptions,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Size',
    size: 'large',
    placeholder: 'Large select...',
    options: sampleOptions,
  },
};

export const PrimaryColor: Story = {
  args: {
    label: 'Primary Color',
    color: 'primary',
    placeholder: 'Primary colored select...',
    options: sampleOptions,
  },
};

export const SuccessColor: Story = {
  args: {
    label: 'Success Color',
    color: 'success',
    placeholder: 'Success colored select...',
    options: sampleOptions,
  },
};

export const ErrorColor: Story = {
  args: {
    label: 'Error Color',
    color: 'error',
    placeholder: 'Error colored select...',
    options: sampleOptions,
  },
};

export const SolidVariant: Story = {
  args: {
    label: 'Solid Variant',
    variant: 'solid',
    placeholder: 'Solid variant...',
    options: sampleOptions,
  },
};

export const SubtleVariant: Story = {
  args: {
    label: 'Subtle Variant',
    variant: 'subtle',
    placeholder: 'Subtle variant...',
    options: sampleOptions,
  },
};

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Variant',
    variant: 'ghost',
    placeholder: 'Ghost variant...',
    options: sampleOptions,
  },
};

export const LongOptions: Story = {
  args: {
    label: 'Long Option Names',
    placeholder: 'Select from long options...',
    options: longOptions,
  },
};

export const CustomStyles: Story = {
  args: {
    label: 'Custom Styles',
    placeholder: 'Custom styled select...',
    options: sampleOptions,
    customClasses: {
      root: 'max-w-md',
      label: 'text-blue-600 font-bold',
      select: 'border-2 border-blue-300',
      helperText: 'text-blue-500 italic',
    },
  },
};
