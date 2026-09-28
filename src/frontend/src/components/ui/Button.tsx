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
        "inline-flex items-center justify-center gap-2 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50",
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
