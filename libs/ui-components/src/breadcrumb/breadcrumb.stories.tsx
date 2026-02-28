import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, type BreadcrumbItem } from './index';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Separator between breadcrumb items',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Home', href: '/' },
      { title: 'Application', href: '/application' },
      { title: 'Details' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { title: 'Home', href: '/' },
      { title: 'Library', href: '/library' },
      { title: 'Data' },
    ],
  },
};

export const CustomItemRender: Story = {
  args: {
    items: [
      { title: 'Home', href: '/' },
      { title: 'Components', href: '/components' },
      { title: 'Breadcrumb' },
    ],
    itemRender: (item: BreadcrumbItem, isLast: boolean) =>
      isLast ? (
        <span className="font-semibold text-primary">{item.title}</span>
      ) : (
        <span>{item.title}</span>
      ),
  },
};
