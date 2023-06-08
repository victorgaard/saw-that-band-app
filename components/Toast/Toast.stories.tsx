import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Band added',
    message: 'The band Alcest was successfully added to your bands inventory',
    dismiss: () => {}
  }
};
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Band not added',
    message:
      'The band Alcest could not be added to your bands inventory. Please try again later.',
    dismiss: () => {}
  }
};
