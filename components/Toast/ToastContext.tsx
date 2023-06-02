import { createContext } from "react";
import { ToastObjProps } from "./Toast";

type Context = {
  toast: (newToast: ToastObjProps) => void;
};

const context: Context = {
  toast: () => {},
};

export const ToastContext = createContext(context);
