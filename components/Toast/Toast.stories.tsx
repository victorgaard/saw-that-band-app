import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  component: Toast
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  args: {
    type: 'success',
    title: 'Band added',
    message: 'The band Alcest was successfully added to your bands inventory',
    dismiss: () => {}
  }
};
