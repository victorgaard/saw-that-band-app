'use client';

import { PropsWithChildren, useEffect } from 'react';
import Button from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  canEscape?: boolean;
  close: () => void;
};

function ModalFooter({ children }: PropsWithChildren) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex w-full items-center justify-end gap-2 border-t border-zinc-600 bg-zinc-600/40 px-6  py-4">
        {children}
      </div>
    </div>
  );
}

function Modal({ isOpen, canEscape = true, close, children }: ModalProps) {
  useEffect(() => {
    function escFunction(event: KeyboardEvent) {
      if (event.key === 'Escape' && canEscape) {
        close();
      }
    }

    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={canEscape ? close : undefined}
        className="fixed inset-0 z-[59] block animate-fade-in-no-forwards bg-zinc-900/80"
      ></div>
      <div className="fixed left-0 right-0 top-1/4 z-[60] w-full animate-fade-in-down-short-no-forwards overflow-auto rounded-b-lg rounded-t-lg bg-zinc-700 p-6 pb-[120px] shadow-2xl sm:bottom-auto sm:top-[15%] sm:m-auto sm:w-[28rem] sm:rounded-2xl">
        <Button
          onClick={close}
          style="ghost"
          size="sm"
          className="absolute right-4 top-4"
        >
          <XMarkIcon className="h-5 w-5" />
        </Button>
        {children}
      </div>
    </>
  );
}

export { Modal, ModalFooter };
