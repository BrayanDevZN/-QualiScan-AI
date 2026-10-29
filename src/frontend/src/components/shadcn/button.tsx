import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_28px_-4px] shadow-primary/50 hover:bg-brand-bright hover:shadow-[0_16px_38px_-4px] hover:shadow-primary/60",
        destructive:
          "bg-destructive text-white shadow-[0_10px_28px_-4px] shadow-destructive/50 hover:bg-danger-bright hover:shadow-[0_16px_38px_-4px]",
        outline:
          "border border-primary/40 bg-card text-primary shadow-[0_10px_26px_-4px] shadow-primary/30 hover:border-primary hover:bg-danger-soft hover:shadow-[0_16px_34px_-4px]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_10px_26px_-4px] shadow-primary/35 hover:bg-line hover:shadow-[0_16px_34px_-4px]",
        ghost:
          "text-muted-foreground shadow-[0_6px_18px_-4px] shadow-primary/25 hover:bg-secondary hover:text-foreground hover:shadow-[0_12px_26px_-4px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        xs: "h-7 gap-1 px-3 text-xs has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3.5",
        lg: "h-13 px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
