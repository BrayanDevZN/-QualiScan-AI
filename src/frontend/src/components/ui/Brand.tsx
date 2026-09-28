type BrandProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

export function Brand({ className, compact = false, inverse = false }: BrandProps) {
  return (
    <span className={className}>
      <img
        alt=""
        aria-hidden="true"
        className={compact ? "size-10" : "h-10 w-auto sm:h-11"}
        src={compact ? "/assets/brand/qualiscan-mark.svg" : inverse ? "/assets/brand/qualiscan-logo-inverse.svg" : "/assets/brand/qualiscan-logo.svg"}
      />
      <span className="sr-only">QualiScan AI</span>
    </span>
  );
}
