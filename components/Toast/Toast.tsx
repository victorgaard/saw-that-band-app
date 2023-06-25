'use client';

import classNames from 'classnames';
import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Button from '../Button';

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
        'fixed bottom-6 left-[102px] z-50 flex max-w-[calc(100%-32px)] items-center justify-between gap-12 overflow-hidden rounded-lg px-4 py-3 pb-4 text-sm text-white',
        {
          'bg-green-600/20 backdrop-blur-lg': type === 'success',
          'bg-red-600/20 backdrop-blur-lg': type === 'error'
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
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-white/70">{message}</p>
        </div>
      </div>
      <Button style="ghost" size="sm" onClick={dismiss}>
        <XMarkIcon className="h-5 w-5" />
      </Button>
      <div className="absolute bottom-0 left-0 h-0.5 animate-width-to-fit bg-white/50" />
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10" />
    </div>
  );
}

export default Toast;
