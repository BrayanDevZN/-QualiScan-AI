import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  endAdornment?: ReactNode;
  error?: string;
  icon?: ReactNode;
  label: string;
};

export function Input({ className, endAdornment, error, icon, id, label, ...props }: InputProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute inset-y-0 left-0 grid w-12 place-items-center text-ink-subtle">{icon}</span>}
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-h-13 w-full rounded-sm border bg-white px-4 text-sm text-ink outline-none placeholder:text-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand/10",
            icon && "pl-12",
            endAdornment && "pr-12",
            error ? "border-danger" : "border-line-strong",
            className,
          )}
          id={id}
          {...props}
        />
        {endAdornment && <span className="absolute inset-y-0 right-1 grid place-items-center">{endAdornment}</span>}
      </div>
      {error && <p className="pt-1.5 text-xs text-danger" id={errorId}>{error}</p>}
    </div>
  );
}
