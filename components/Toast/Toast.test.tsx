import { render } from '@testing-library/react';
import Toast, { ToastProps } from './Toast';

const props: ToastProps = {
  type: 'success',
  title: 'Band added',
  message: 'The band Alcest was successfully added to your bands inventory',
  dismiss: jest.fn()
};

describe('Toast tests', () => {
  it('should render without crashing', () => {
    render(<Toast {...props} />);
  });
});
