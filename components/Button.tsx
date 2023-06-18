import LoadingSpinner from '@/icons/LoadingSpinner';
import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: 'primary' | 'secondary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

function Button({
  children,
  onClick,
  loading,
  disabled,
  style = 'primary',
  size = 'md',
  ...ButtonHTMLProps
}: ButtonProps) {
  const baseButton =
    'flex items-center justify-center gap-2 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 text-sm font-semibold';

  const primary =
    'bg-gradient-to-br from-emerald-400 to-green-400 text-zinc-900 hover:from-green-400 hover:to-green-400 disabled:hover:from-emerald-400 disabled:hover:to-green-400';

  const secondary =
    'bg-zinc-850 hover:bg-zinc-900 active:bg-zinc-850 text-white disabled:hover:bg-zinc-850';

  const ghost =
    'bg-transparent hover:bg-white/5 active:bg-white/10 text-white disabled:hover:bg-transparent';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        baseButton,
        {
          'p-1': size === 'xs',
          'p-2': size === 'sm',
          'p-4': size === 'md'
        },
        style === 'primary' ? primary : '',
        style === 'secondary' ? secondary : '',
        style === 'ghost' ? ghost : ''
      )}
      {...ButtonHTMLProps}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}

export default Button;
