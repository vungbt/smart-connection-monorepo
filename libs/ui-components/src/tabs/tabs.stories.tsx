import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabs component that supports different styles, sizes, and colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'card'],
      description: 'The visual style of the tabs',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of the tabs',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'pending', 'neutral'],
      description: 'The color scheme of the tabs',
    },
    selectedIndex: {
      control: 'number',
      description: 'The index of the currently selected tab',
    },
    defaultActiveTab: {
      control: 'number',
      description: 'The index of the default active tab',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  {
    label: 'Tab 1',
    value: 1,
    content: <div className="p-4">Content for Tab 1</div>,
  },
  {
    label: 'Tab 2',
    value: 2,
    content: <div className="p-4">Content for Tab 2</div>,
  },
  {
    label: 'Tab 3',
    value: 3,
    content: <div className="p-4">Content for Tab 3</div>,
  },
];

// Basic tabs
export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    tabs: [
      {
        label: 'Home',
        value: 1,
        icon: 'home',
        content: <div className="p-4">Home content</div>,
      },
      {
        label: 'Profile',
        value: 2,
        icon: 'magnifying-glass',
        content: <div className="p-4">Profile content</div>,
      },
      {
        label: 'Settings',
        value: 3,
        icon: 'trash',
        content: <div className="p-4">Settings content</div>,
      },
    ],
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs size="small" tabs={defaultTabs} />
      <Tabs size="middle" tabs={defaultTabs} />
      <Tabs size="large" tabs={defaultTabs} />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs color="primary" tabs={defaultTabs} />
      <Tabs color="secondary" tabs={defaultTabs} />
      <Tabs color="success" tabs={defaultTabs} />
      <Tabs color="pending" tabs={defaultTabs} />
      <Tabs color="neutral" tabs={defaultTabs} />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Line Variant</h3>
        <Tabs variant="line" tabs={defaultTabs} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Card Variant</h3>
        <Tabs variant="card" tabs={defaultTabs} />
      </div>
    </div>
  ),
};

// With disabled tabs
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      {
        label: 'Active Tab',
        value: 1,
        content: <div className="p-4">Content for active tab</div>,
      },
      {
        label: 'Disabled Tab',
        value: 2,
        disabled: true,
        content: <div className="p-4">Content for disabled tab</div>,
      },
      {
        label: 'Another Active Tab',
        value: 3,
        content: <div className="p-4">Content for another active tab</div>,
      },
    ],
  },
};

// Interactive Example
export const Interactive = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="min-w-[500px]">
      <div className="mb-4">Selected tab index: {selectedIndex}</div>
      <Tabs
        tabs={defaultTabs}
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
      />
    </div>
  );
};
