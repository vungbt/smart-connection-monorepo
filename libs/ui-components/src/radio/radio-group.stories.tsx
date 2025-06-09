import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './radio-group';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A group of radio buttons that allows selecting a single value from multiple options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of all radio buttons in the group',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of all radio buttons in the group',
    },
    optionType: {
      control: { type: 'select' },
      options: ['default', 'button'],
      description: 'The style type of all radio buttons in the group',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all radio buttons in the group are disabled',
    },
    options: {
      control: 'object',
      description: 'Array of radio options with label, value, and optional disabled state',
    },
    value: {
      control: 'text',
      description: 'The currently selected value',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for the radio group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const defaultOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

// Basic radio group
export const Default: Story = {
  args: {
    options: defaultOptions,
    value: '1',
  },
};

// Interactive Example
export const Interactive = () => {
  const [value, setValue] = useState('1');
  return <RadioGroup options={defaultOptions} value={value} onChange={setValue} />;
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioGroup size="small" options={defaultOptions} value="1" />
      <RadioGroup size="middle" options={defaultOptions} value="2" />
      <RadioGroup size="large" options={defaultOptions} value="3" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioGroup color="primary" options={defaultOptions} value="1" />
      <RadioGroup color="secondary" options={defaultOptions} value="1" />
      <RadioGroup color="success" options={defaultOptions} value="1" />
      <RadioGroup color="error" options={defaultOptions} value="1" />
      <RadioGroup color="pending" options={defaultOptions} value="1" />
      <RadioGroup color="neutral" options={defaultOptions} value="1" />
    </div>
  ),
};

// Option Types
export const OptionTypes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Default Type</h3>
        <RadioGroup optionType="default" options={defaultOptions} value="1" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Button Type</h3>
        <RadioGroup optionType="button" options={defaultOptions} value="1" />
      </div>
    </div>
  ),
};

// With disabled options
export const DisabledOptions: Story = {
  args: {
    options: [
      { label: 'Enabled Option', value: '1' },
      { label: 'Disabled Option', value: '2', disabled: true },
      { label: 'Another Enabled Option', value: '3' },
    ],
    value: '1',
  },
};

// Fully disabled group
export const DisabledGroup: Story = {
  args: {
    options: defaultOptions,
    value: '1',
    disabled: true,
  },
};
