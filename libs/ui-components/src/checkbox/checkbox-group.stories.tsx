import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './checkbox-group';
import { useState } from 'react';
import type { CheckboxOption } from './checkbox-group';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A group of checkboxes that allows selecting a single value from multiple options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of all checkboxes in the group',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of all checkboxes in the group',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all checkboxes in the group are disabled',
    },
    options: {
      control: 'object',
      description: 'Array of checkbox options with label, value, and optional disabled state',
    },
    value: {
      control: 'text',
      description: 'The currently selected value',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for the checkbox group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const defaultOptions: CheckboxOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

// Basic checkbox group
export const Default: Story = {
  args: {
    options: defaultOptions,
    value: '1',
  },
};

// Interactive Example
export const Interactive = () => {
  const [value, setValue] = useState('1');
  return <CheckboxGroup options={defaultOptions} value={value} onChange={setValue} />;
};

// Sizes
export const Sizes: Story = {
  args: {
    options: defaultOptions,
  },
  render: args => (
    <div className="flex flex-col gap-4">
      <CheckboxGroup {...args} size="small" value="1" />
      <CheckboxGroup {...args} size="middle" value="2" />
      <CheckboxGroup {...args} size="large" value="3" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  args: {
    options: defaultOptions,
  },
  render: args => (
    <div className="flex flex-col gap-4">
      <CheckboxGroup {...args} color="primary" value="1" />
      <CheckboxGroup {...args} color="secondary" value="1" />
      <CheckboxGroup {...args} color="success" value="1" />
      <CheckboxGroup {...args} color="error" value="1" />
      <CheckboxGroup {...args} color="pending" value="1" />
      <CheckboxGroup {...args} color="neutral" value="1" />
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
