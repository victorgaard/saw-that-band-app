import LoadingSpinner from "@/icons/LoadingSpinner";
import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({
  children,
  onClick,
  loading,
  disabled,
  ...ButtonHTMLProps
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        "flex items-center gap-2 justify-center bg-gradient-to-br from-emerald-400 to-green-400 hover:from-green-400 hover:to-green-400 text-zinc-900 text-sm font-semibold p-4 rounded-lg disabled:hover:from-emerald-400 disabled:hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      )}
      {...ButtonHTMLProps}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}

export default Button;
