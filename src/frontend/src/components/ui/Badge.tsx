import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand",
        className,
      )}
      {...props}
    />
  );
}
