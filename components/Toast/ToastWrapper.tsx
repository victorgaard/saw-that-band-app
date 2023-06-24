'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import Toast, { ToastObjProps } from './Toast';
import { ToastContext } from './ToastContext';

function ToastWrapper({ children }: { children: ReactNode }) {
  const [toastObj, setToastObj] = useState<ToastObjProps | undefined>();

  const toast = useCallback(({ type, title, message }: ToastObjProps) => {
    setToastObj({ type, title, message });
  }, []);

  function dismiss() {
    setToastObj(undefined);
  }

  useEffect(() => {
    let toastTimeout: ReturnType<typeof setTimeout>;

    if (toastObj) {
      toastTimeout = setTimeout(() => {
        dismiss();
      }, 5000);
    }

    return () => clearTimeout(toastTimeout);
  }, [toastObj]);

  return (
    <ToastContext.Provider value={{ toast }}>
      <div>
        {toastObj && (
          <Toast
            type={toastObj.type}
            title={toastObj.title}
            message={toastObj.message}
            dismiss={dismiss}
          />
        )}
        {children}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastWrapper;
