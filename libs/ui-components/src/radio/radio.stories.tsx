import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '.';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button component that supports different sizes, colors, and styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
      description: 'The size of the radio button',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'pending', 'neutral'],
      description: 'The color scheme of the radio button',
    },
    optionType: {
      control: { type: 'select' },
      options: ['default', 'button'],
      description: 'The style type of the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    label: {
      control: 'text',
      description: 'The label text for the radio button',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for different parts of the radio button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Basic radio button
export const Default: Story = {
  args: {
    label: 'Default Radio',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio size="small" label="Small Radio" name="size" value="small" />
      <Radio size="middle" label="Middle Radio" name="size" value="middle" />
      <Radio size="large" label="Large Radio" name="size" value="large" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio color="primary" checked label="Primary" name="color" value="primary" />
      <Radio color="secondary" label="Secondary" name="color" value="secondary" />
      <Radio color="success" label="Success" name="color" value="success" />
      <Radio color="error" label="Error" name="color" value="error" />
      <Radio color="pending" label="Pending" name="color" value="pending" />
      <Radio color="neutral" label="Neutral" name="color" value="neutral" />
    </div>
  ),
};

// Option Types
export const OptionTypes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-gray-600">Default Type</h3>
        <div className="flex gap-4">
          <Radio optionType="default" label="Option 1" name="default" value="1" />
          <Radio optionType="default" label="Option 2" name="default" value="2" />
          <Radio optionType="default" label="Option 3" name="default" value="3" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-gray-600">Button Type</h3>
        <div className="flex">
          <Radio optionType="button" label="Option 1" name="button" value="1" />
          <Radio optionType="button" label="Option 2" name="button" value="2" />
          <Radio optionType="button" label="Option 3" name="button" value="3" />
        </div>
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio label="Normal Radio" name="state" value="normal" />
      <Radio checked label="Checked Radio" name="state" value="checked" />
      <Radio disabled label="Disabled Radio" name="state" value="disabled" />
      <Radio
        disabled
        checked
        label="Disabled Checked Radio"
        name="state"
        value="disabled-checked"
      />
    </div>
  ),
};

// Interactive Example
export const Interactive = () => {
  const [value, setValue] = useState('1');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-gray-600">Default Style</h3>
        <div className="flex gap-4">
          <Radio
            label="Option 1"
            name="interactive"
            value="1"
            checked={value === '1'}
            onChange={e => setValue(e.target.value)}
          />
          <Radio
            label="Option 2"
            name="interactive"
            value="2"
            checked={value === '2'}
            onChange={e => setValue(e.target.value)}
          />
          <Radio
            label="Option 3"
            name="interactive"
            value="3"
            checked={value === '3'}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-gray-600">Button Style</h3>
        <div className="flex">
          <Radio
            optionType="button"
            label="Option 1"
            name="interactive-button"
            value="1"
            checked={value === '1'}
            onChange={e => setValue(e.target.value)}
          />
          <Radio
            optionType="button"
            label="Option 2"
            name="interactive-button"
            value="2"
            checked={value === '2'}
            onChange={e => setValue(e.target.value)}
          />
          <Radio
            optionType="button"
            label="Option 3"
            name="interactive-button"
            value="3"
            checked={value === '3'}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600">Selected value: {value}</p>
    </div>
  );
};
