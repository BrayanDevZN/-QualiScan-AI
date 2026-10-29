import type { PropsWithChildren } from "react";

import { Ambient3D } from "@/components/motion/Ambient3D";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-dvh">
      <Ambient3D />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
