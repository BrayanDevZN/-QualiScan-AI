import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-line bg-surface shadow-panel", className)} {...props} />;
}
