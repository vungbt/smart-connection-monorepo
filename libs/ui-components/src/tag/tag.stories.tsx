import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './index';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Tag',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="default">Default</Tag>
      <Tag color="neutral">Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="secondary">Secondary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="processing">Processing</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="pending">Pending</Tag>
      <Tag color="error">Error</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag size="small">Small</Tag>
      <Tag size="middle">Middle</Tag>
      <Tag size="large">Large</Tag>
    </div>
  ),
};

export const Closable: Story = {
  args: {
    children: 'Closable',
    closable: true,
  },
};

export const CheckableControlled: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Tag checkable checked onCheck={() => {}}>
          Checked
        </Tag>
        <Tag checkable checked={false} onCheck={() => {}}>
          Unchecked
        </Tag>
      </div>
    );
  },
};

export const CheckableUncontrolled: Story = {
  args: {
    children: 'Toggle me',
    checkable: true,
    defaultChecked: false,
  },
};
