import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from './index';
import { useState } from 'react';
import { UploadItem } from './types';

const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Size of the component',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'Color variant of the component',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle', 'ghost'],
      description: 'Visual style of the component',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    required: {
      control: 'boolean',
      description: 'Make the field required',
    },
    label: {
      control: 'text',
      description: 'Label text for the component',
    },
    placeholder: {
      control: 'text',
      description: 'Main placeholder text',
    },
    subPlaceholder: {
      control: 'text',
      description: 'Secondary placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    label: 'Upload Files',
    placeholder: 'Drag & drop files or Browse',
    subPlaceholder: 'Supported formats: PNG, JPG, JPEG, WEBP, GIF',
    size: 'middle',
    color: 'neutral',
    variant: 'outline',
  },
};

export const Interactive = () => {
  const [value, setValue] = useState<UploadItem[]>([]);
  return <Upload value={value} onChange={values => setValue(values || [])} />;
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    color: 'error',
  },
};
