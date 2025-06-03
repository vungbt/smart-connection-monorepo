import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '.';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable checkbox component that supports different sizes, colors, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of the checkbox',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    label: {
      control: 'text',
      description: 'The label text for the checkbox',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for different parts of the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic checkbox
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="small" label="Small Checkbox" />
      <Checkbox size="middle" label="Middle Checkbox" />
      <Checkbox size="large" label="Large Checkbox" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox color="primary" checked label="Primary" />
      <Checkbox color="secondary" checked label="Secondary" />
      <Checkbox color="success" checked label="Success" />
      <Checkbox color="error" checked label="Error" />
      <Checkbox color="pending" checked label="Pending" />
      <Checkbox color="neutral" checked label="Neutral" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox checked label="Checked" />
      <Checkbox indeterminate label="Indeterminate" />
      <Checkbox disabled label="Disabled" />
      <Checkbox disabled checked label="Disabled Checked" />
      <Checkbox disabled indeterminate label="Disabled Indeterminate" />
    </div>
  ),
};
