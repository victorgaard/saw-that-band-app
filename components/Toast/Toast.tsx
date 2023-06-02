"use client";

import classNames from "classnames";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export type ToastObjProps = {
  type: "success" | "error";
  title: string;
  message: string;
};

type ToastProps = ToastObjProps & {
  dismiss: () => void;
};

function Toast({ type, title, message, dismiss }: ToastProps) {
  return (
    <div
      className={classNames(
        "fixed right-8 bottom-8 flex justify-between items-center gap-12 max-w-[calc(100%-32px)] py-3 px-4 text-sm text-white rounded",
        {
          "bg-red-600": type === "error",
          "bg-green-600": type === "success",
        }
      )}
    >
      <div className="flex gap-2">
        <CheckIcon className="h-5 w-5" />
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
