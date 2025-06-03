import type { Meta, StoryObj } from '@storybook/react';
import { InputPassword } from '.';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A password input component with show/hide functionality and various styles.',
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
      options: ['lock', 'key', 'shield', null],
      description: 'Icon to show at the start of the input',
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
type Story = StoryObj<typeof InputPassword>;

// Basic password input
export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
  },
};

// With label and helper text
export const WithLabel: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
    placeholder: 'Enter your password',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword size="small" placeholder="Small input" />
      <InputPassword size="middle" placeholder="Middle input" />
      <InputPassword size="large" placeholder="Large input" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword color="primary" placeholder="Primary" />
      <InputPassword color="secondary" placeholder="Secondary" />
      <InputPassword color="success" placeholder="Success" />
      <InputPassword color="error" placeholder="Error" />
      <InputPassword color="pending" placeholder="Pending" />
      <InputPassword color="neutral" placeholder="Neutral" />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword variant="solid" placeholder="Solid variant" />
      <InputPassword variant="outline" placeholder="Outline variant" />
      <InputPassword variant="subtle" placeholder="Subtle variant" />
      <InputPassword variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword icon="home" placeholder="With lock icon" />
      <InputPassword icon="key" placeholder="With key icon" />
      <InputPassword icon="home" placeholder="With shield icon" />
      <InputPassword icon="loading" loading placeholder="Loading state" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword placeholder="Normal state" />
      <InputPassword disabled placeholder="Disabled state" />
      <InputPassword loading placeholder="Loading state" />
      <InputPassword error="Password is required" placeholder="Error state" />
      <InputPassword required label="Required Password" placeholder="Required field" />
    </div>
  ),
};

// With validation
export const Validation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <InputPassword
        label="Password"
        helperText="Enter your password"
        placeholder="Type your password"
      />
      <InputPassword
        label="Confirm Password"
        error="Passwords do not match"
        placeholder="Confirm your password"
      />
      <InputPassword
        label="Strong Password"
        helperText="Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
        icon="home"
        required
      />
    </div>
  ),
};
