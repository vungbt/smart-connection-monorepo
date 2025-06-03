import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';
import { iconOptions } from '../icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component that supports different sizes, colors, variants, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of the input',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'subtle', 'ghost'],
      description: 'The visual style of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is in loading state',
    },
    icon: {
      control: 'select',
      options: iconOptions.map(opt => opt.value),
      description: 'Icon to show at the start of the input',
    },
    iconRight: {
      control: 'select',
      options: iconOptions.map(opt => opt.value),
      description: 'Icon to show at the end of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic input
export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

// With label and helper text
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    helperText: 'Enter your email address',
    placeholder: 'example@email.com',
    type: 'email',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input size="small" placeholder="Small input" />
      <Input size="middle" placeholder="Middle input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input color="primary" placeholder="Primary" />
      <Input color="secondary" placeholder="Secondary" />
      <Input color="success" placeholder="Success" />
      <Input color="error" placeholder="Error" />
      <Input color="pending" placeholder="Pending" />
      <Input color="neutral" placeholder="Neutral" />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input variant="solid" placeholder="Solid variant" />
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="subtle" placeholder="Subtle variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input icon="envelope" placeholder="With left icon" />
      <Input iconRight="magnifying-glass" placeholder="With right icon" />
      <Input icon="envelope" iconRight="check" placeholder="With both icons" />
      <Input icon="loading" loading placeholder="Loading state" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input placeholder="Normal state" />
      <Input disabled placeholder="Disabled state" />
      <Input loading placeholder="Loading state" />
      <Input error="This field is required" placeholder="Error state" />
      <Input required label="Required Field" placeholder="Required field" />
    </div>
  ),
};

// With validation
export const Validation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <Input label="Username" helperText="Enter your username" placeholder="johndoe" />
      <Input
        label="Email"
        error="Please enter a valid email address"
        placeholder="example@email.com"
        type="email"
      />
      <Input label="Password" helperText="Must be at least 8 characters" type="password" required />
    </div>
  ),
};
