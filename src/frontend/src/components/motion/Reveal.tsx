import { type HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function Reveal({ className, delay = 0, style, ...props }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "-4% 0px -8%", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn("reveal-on-scroll", visible && "is-visible", className)}
      ref={elementRef}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...props}
    />
  );
}
