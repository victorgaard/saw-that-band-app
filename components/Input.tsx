"use client";

import classNames from "classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps =  InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  optional?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  value,
  optional = false,
  handleChange,
  ...HTMLInputProps
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span>
        {label} {optional && <span>(optional)</span>}
      </span>
      <input
        value={value}
        onChange={handleChange}
        className={classNames({ "cursor-not-allowed": HTMLInputProps.disabled })}
        {...HTMLInputProps}
      />
    </div>
  );
}

export default Input;
