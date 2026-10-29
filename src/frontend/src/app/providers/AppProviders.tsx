import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return <div className="min-h-dvh">{children}</div>;
}
