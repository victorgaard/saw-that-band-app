'use client';

import classNames from 'classnames';
import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export type ToastObjProps = {
  type: 'success' | 'error';
  title: string;
  message: string;
};

export type ToastProps = ToastObjProps & {
  dismiss: () => void;
};

function Toast({ type, title, message, dismiss }: ToastProps) {
  return (
    <div
      className={classNames(
        'fixed bottom-8 right-8 flex max-w-[calc(100%-32px)] items-center justify-between gap-12 rounded px-4 py-3 text-sm text-white',
        {
          'bg-green-600': type === 'success',
          'bg-red-600': type === 'error'
        }
      )}
    >
      <div className="flex gap-2">
        {type === 'success' ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <ExclamationCircleIcon className="h-5 w-5" />
        )}
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button onClick={dismiss}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Toast;
