import type { CSSProperties } from "react";

type NavigatorHints = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

// Weaker machines (few cores, little memory, data saver) get a lighter rain so the page stays smooth.
function dropCount() {
  const nav = navigator as NavigatorHints;
  const weak = nav.connection?.saveData || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return weak ? 16 : 42;
}

// Deterministic spread so the rain looks random but renders the same every time.
function buildDrops(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((i * n * 9301 + 49297) % 233280) / 233280;
    return {
      x: `${(i / count) * 118 - 12 + r(7) * 2}%`,
      len: `${1.8 + r(13) * 4.2}rem`,
      w: r(5) > 0.85 ? "2px" : "1.5px",
      d: `${3 + r(17) * 3.5}s`,
      delay: `-${(r(23) * 6).toFixed(2)}s`,
      o: 0.25 + r(31) * 0.6,
    };
  });
}

const drops = buildDrops(dropCount());

export function Ambient3D() {
  return (
    <div aria-hidden className="ambient-3d">
      {drops.map(({ d, delay, len, o, w, x }, i) => (
        <div className="ambient-3d__drop" key={i} style={{ "--x": x, "--len": len, "--w": w, "--d": d, "--delay": delay, "--o": o } as CSSProperties} />
      ))}
    </div>
  );
}
