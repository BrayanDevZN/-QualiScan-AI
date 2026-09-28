import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return <div className="page-enter min-h-dvh bg-canvas text-ink">{children}</div>;
}
