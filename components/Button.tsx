import LoadingSpinner from '@/icons/LoadingSpinner';
import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

function Button({
  children,
  onClick,
  loading,
  disabled,
  size = 'md',
  ...ButtonHTMLProps
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        'flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-emerald-400 to-green-400 text-sm font-semibold text-zinc-900 transition-colors hover:from-green-400 hover:to-green-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-emerald-400 disabled:hover:to-green-400',
        {
          'p-1': size === 'xs',
          'p-2': size === 'sm',
          'p-4': size === 'md'
        }
      )}
      {...ButtonHTMLProps}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}

export default Button;
