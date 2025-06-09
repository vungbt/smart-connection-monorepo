import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { iconOptions } from '../icons';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component that supports multiple variants, sizes, colors, and icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'subtle', 'link', 'text', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of the button',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of the button',
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'circle', 'round'],
      description: 'The shape of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    danger: {
      control: 'boolean',
      description: 'Whether to apply danger styling',
    },
    icon: {
      control: 'select',
      options: iconOptions.map(opt => opt.value),
      description:
        'Icon to show before the button text. Available icons can be found in the Icons story.',
    },
    iconRight: {
      control: 'select',
      options: iconOptions.map(opt => opt.value),
      description:
        'Icon to show after the button text. Available icons can be found in the Icons story.',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for different parts of the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button variations
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'middle',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'solid',
    color: 'secondary',
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="small">Small</Button>
      <Button size="middle">Middle</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// Variant showcase
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
      <Button variant="text">Text</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

// Colors showcase
export const Colors: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
      <Button color="pending">Pending</Button>
      <Button color="neutral">Neutral</Button>
    </div>
  ),
};

// Shapes showcase
export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button shape="default">Default Shape</Button>
      <Button shape="round">Round Shape</Button>
      <Button shape="circle" icon="magnifying-glass" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button danger>Danger</Button>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button icon="magnifying-glass">Search</Button>
      <Button iconRight="vuesax-arrow-right">Next</Button>
      <Button icon="arrow-up-tray" iconRight="check">
        Both Icons
      </Button>
      <Button icon="loading" loading>
        Loading with Icon
      </Button>
    </div>
  ),
};
