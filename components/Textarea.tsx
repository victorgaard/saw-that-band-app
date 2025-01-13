import { cn } from '@/utils/cn';
import { ChangeEvent, TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  value: string;
  optional?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({
  label,
  value,
  optional = false,
  onChange,
  className,
  ...rest
}: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <span className="text-sm text-zinc-400">
          {label} {optional && <span>(optional)</span>}
        </span>
      )}
      <textarea
        value={value}
        onChange={onChange}
        className={cn(
          'w-full rounded-lg border border-zinc-600 bg-white/10 p-4 text-sm text-white [field-sizing:content] focus:outline-zinc-100/60 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        {...rest}
      />
    </div>
  );
}

export default Textarea;
