import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { buttonVariants } from "@/components/shadcn/button";
import { cn } from "@/lib/cn";

const variantMap = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  inverse: "inverse",
  danger: "destructive",
} as const;

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  icon?: ReactNode;
  size?: keyof typeof sizeMap;
  variant?: keyof typeof variantMap;
};

/** QualiScan API on top of the shadcn button: `icon` before the label, `asChild` for links. */
export function Button({
  asChild = false,
  children,
  className,
  icon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ size: sizeMap[size], variant: variantMap[variant] }), className)}
      data-slot="button"
      type={asChild ? undefined : type}
      {...props}
    >
      {icon}
      <Slottable>{children}</Slottable>
    </Component>
  );
}
