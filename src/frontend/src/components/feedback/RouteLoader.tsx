type RouteLoaderProps = { label?: string };

export function RouteLoader({ label = "Preparando experiência" }: RouteLoaderProps) {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas" role="status">
      <p className="rounded-sm bg-surface px-6 py-4 text-base font-semibold text-ink">{label}</p>
    </div>
  );
}
