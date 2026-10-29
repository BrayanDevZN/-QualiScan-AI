import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const variants = {
  primary: "border border-brand bg-brand text-white hover:border-brand-bright hover:bg-brand-bright",
  secondary: "border border-brand bg-white text-brand hover:bg-[#fff5f3]",
  ghost: "border border-transparent text-ink-muted hover:bg-surface-overlay hover:text-ink",
  danger: "border border-danger bg-danger text-white hover:bg-danger-bright",
} as const;

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
  icon: "size-11 p-0",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  icon?: ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export function Button({
  asChild = false,
  children,
  className,
  disabled,
  icon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-semibold shadow-[0_6px_16px_rgb(166_33_21/0.22)] transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_9px_22px_rgb(166_33_21/0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand active:translate-y-0 active:shadow-[0_3px_10px_rgb(166_33_21/0.2)] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon}
      <Slottable>{children}</Slottable>
    </Component>
  );
}
