type RouteLoaderProps = { label?: string };

export function RouteLoader({ label = "Preparando experiência" }: RouteLoaderProps) {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas" role="status">
      <div className="border-l-4 border-brand bg-white px-5 py-4 text-sm font-semibold text-ink shadow-panel">{label}</div>
    </div>
  );
}
