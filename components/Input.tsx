import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value: string;
  optional?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  value,
  optional = false,
  onChange,
  className,
  ...HTMLInputProps
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <span className="text-sm">
          {label} {optional && <span>(optional)</span>}
        </span>
      )}
      <input
        value={value}
        onChange={onChange}
        maxLength={40}
        className={classNames(
          'w-full rounded-lg border border-zinc-600 bg-white/10 p-4 text-sm text-white focus:outline-zinc-100/60 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        {...HTMLInputProps}
      />
    </div>
  );
}

export default Input;
