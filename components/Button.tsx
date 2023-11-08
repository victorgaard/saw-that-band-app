import LoadingSpinner from '@/icons/LoadingSpinner';
import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: 'primary' | 'secondary' | 'ghost' | 'outline';
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

  const outline = 'border border-zinc-700';

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
        style === 'ghost' ? ghost : '',
        style === 'outline' ? outline : ''
      )}
      {...ButtonHTMLProps}
    >
      {loading && (
        <>
          <svg
            className="h-5 w-5 animate-spin text-inherit"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      )}
      {children}
    </button>
  );
}

export default Button;
