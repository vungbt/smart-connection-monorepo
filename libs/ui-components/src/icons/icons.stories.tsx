import type { Meta, StoryObj } from '@storybook/react';
import { RenderIcon, Icons, IconName } from '.';

const meta: Meta<typeof RenderIcon> = {
  title: 'Components/Icons',
  component: RenderIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive collection of SVG icons that support different styles, sizes, and colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(Icons),
      description: 'The name of the icon to render',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
    style: {
      control: 'object',
      description: 'Inline styles for the icon',
    },
    transform: {
      control: 'text',
      description: 'SVG transform attribute value',
    },
    strokeWidth: {
      control: 'number',
      description: 'Width of the icon stroke (for outline icons)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RenderIcon>;

// Basic icon
export const Default: Story = {
  args: {
    name: 'home',
  },
};

// All Icons Grid
export const IconsGrid = () => {
  const iconNames = Object.keys(Icons) as IconName[];

  return (
    <div className="grid grid-cols-6 gap-4 p-4 max-w-4xl">
      {iconNames.map(name => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <RenderIcon name={name} className="w-8 h-8" />
          <span className="text-sm text-gray-600 text-center">{name}</span>
        </div>
      ))}
    </div>
  );
};

// Icon Categories
export const Categories = () => {
  const categories = {
    'Navigation & UI': [
      'home',
      'arrow-up-tray',
      'magnifying-glass',
      'chevron-double-left',
      'chevron-double-right',
      'vuesax-arrow-down',
      'vuesax-arrow-up',
    ],
    'Form & Input': [
      'envelope',
      'key',
      'eye',
      'eye-slash',
      'check',
      'check-circle',
      'x-mark',
      'x-circle',
    ],
    'Status & Feedback': ['loading', 'exclamation-triangle', 'exclamation-circle', 'check-circle'],
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl">
      {Object.entries(categories).map(([category, icons]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-6 gap-4">
            {icons.map(name => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200"
              >
                <RenderIcon name={name as IconName} className="w-6 h-6" />
                <span className="text-sm text-gray-600 text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Sizes
export const Sizes = () => {
  const sizes = ['w-4 h-4', 'w-6 h-6', 'w-8 h-8', 'w-10 h-10', 'w-12 h-12'];

  return (
    <div className="flex items-center gap-8 p-4">
      {sizes.map(size => (
        <RenderIcon key={size} name="home" className={size} />
      ))}
    </div>
  );
};

// Colors
export const Colors = () => {
  const colors = [
    'text-blue-500',
    'text-green-500',
    'text-red-500',
    'text-yellow-500',
    'text-purple-500',
  ];

  return (
    <div className="flex items-center gap-8 p-4">
      {colors.map(color => (
        <RenderIcon key={color} name="home" className={`w-8 h-8 ${color}`} />
      ))}
    </div>
  );
};

// Stroke Width
export const StrokeWidth = () => {
  const strokeWidths = [0.5, 1, 1.5, 2, 2.5];

  return (
    <div className="flex items-center gap-8 p-4">
      {strokeWidths.map(width => (
        <RenderIcon key={width} name="home" className="w-8 h-8" strokeWidth={width} />
      ))}
    </div>
  );
};

// Transformations
export const Transformations = () => {
  const transforms = ['rotate(0)', 'rotate(90)', 'rotate(180)', 'rotate(270)', 'scale(1.5)'];

  return (
    <div className="flex items-center gap-8 p-4">
      {transforms.map(transform => (
        <RenderIcon key={transform} name="home" className="w-8 h-8" transform={transform} />
      ))}
    </div>
  );
};

// Animated Icons
export const Animated = () => {
  return (
    <div className="flex items-center gap-8 p-4">
      <RenderIcon name="loading" className="w-8 h-8 animate-spin" />
      <RenderIcon name="home" className="w-8 h-8 animate-bounce" />
      <RenderIcon name="magnifying-glass" className="w-8 h-8 animate-pulse" />
    </div>
  );
};
