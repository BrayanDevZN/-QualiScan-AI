import type { CSSProperties } from "react";

// Deterministic spread so the rain looks random but renders the same every time.
const drops = Array.from({ length: 64 }, (_, i) => {
  const r = (n: number) => ((i * n * 9301 + 49297) % 233280) / 233280;
  return {
    x: `${(i / 64) * 118 - 12 + r(7) * 2}%`,
    len: `${2.5 + r(13) * 6}rem`,
    w: r(5) > 0.85 ? "2px" : "1.5px",
    d: `${2.4 + r(17) * 3.2}s`,
    delay: `-${(r(23) * 6).toFixed(2)}s`,
    o: 0.25 + r(31) * 0.6,
  };
});

export function Ambient3D() {
  return (
    <div aria-hidden className="ambient-3d">
      <div className="ambient-3d__blob ambient-3d__blob--one" />
      <div className="ambient-3d__blob ambient-3d__blob--two" />
      <div className="ambient-3d__blob ambient-3d__blob--three" />
      {drops.map(({ d, delay, len, o, w, x }, i) => (
        <div className="ambient-3d__drop" key={i} style={{ "--x": x, "--len": len, "--w": w, "--d": d, "--delay": delay, "--o": o } as CSSProperties} />
      ))}
    </div>
  );
}
