import classNames from "classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  optional?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  value,
  optional = false,
  onChange,
  ...HTMLInputProps
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm">
        {label} {optional && <span>(optional)</span>}
      </span>
      <input
        value={value}
        onChange={onChange}
        maxLength={40}
        className={classNames(
          "bg-white/10 focus:outline-zinc-100/60 text-white w-full border text-sm border-zinc-600 p-4 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...HTMLInputProps}
      />
    </div>
  );
}

export default Input;
