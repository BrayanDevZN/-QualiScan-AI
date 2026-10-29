import { Slot } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";

import { Button as ShadcnButton } from "@/components/shadcn/button";

const variants = {
  primary: "default",
  secondary: "outline",
  ghost: "ghost",
  danger: "destructive",
} as const;

const sizes = {
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
} as const;

type ButtonProps = Omit<ComponentProps<typeof ShadcnButton>, "size" | "variant"> & {
  icon?: ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export function Button({ asChild, children, icon, size = "md", type = "button", variant = "primary", ...props }: ButtonProps) {
  return (
    <ShadcnButton asChild={asChild} size={sizes[size]} type={asChild ? undefined : type} variant={variants[variant]} {...props}>
      {icon}
      <Slot.Slottable>{children}</Slot.Slottable>
    </ShadcnButton>
  );
}
