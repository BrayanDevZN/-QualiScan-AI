import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return <div className="min-h-dvh bg-canvas text-ink">{children}</div>;
}
