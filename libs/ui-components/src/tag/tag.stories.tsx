import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './index';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    icon: {
      control: { type: 'text' },
    },
    closeIcon: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'text' },
      description: 'Hex/color string. When provided, styles are computed automatically.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Default Tag',
    type: 'default',
  },
};

export const Outline: Story = {
  args: {
    content: 'Outline Tag',
    type: 'outline',
  },
};

export const WithIcon: Story = {
  args: {
    content: 'With Icon',
    icon: 'home',
  },
};

export const Closable: Story = {
  args: {
    content: 'Closable',
    closeIcon: 'x-mark',
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag content="#10b981 default" color="#10b981" />
      <Tag content="#ef4444 default" color="#ef4444" />
      <Tag content="#3b82f6 outline" color="#3b82f6" type="outline" />
      <Tag content="#8b5cf6 outline" color="#8b5cf6" type="outline" />
    </div>
  ),
};
