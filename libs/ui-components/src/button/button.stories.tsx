import type { Meta, StoryFn } from '@storybook/react';
import { Button as ButtonComponent } from '.';
import { mockButtonProps } from './mock';

const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'display'],
    },
    block: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<typeof ButtonComponent> = args => (
  <ButtonComponent {...args}>{args.children}</ButtonComponent>
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockButtonProps['button'],
  children: 'Primary Button',
};
