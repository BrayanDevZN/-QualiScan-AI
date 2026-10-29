const fallingFragments = [
  { delay: "-2s", duration: "13s", left: "4%" },
  { delay: "-9s", duration: "17s", left: "11%" },
  { delay: "-5s", duration: "12s", left: "19%" },
  { delay: "-14s", duration: "19s", left: "27%" },
  { delay: "-7s", duration: "15s", left: "35%" },
  { delay: "-1s", duration: "18s", left: "43%" },
  { delay: "-11s", duration: "14s", left: "51%" },
  { delay: "-4s", duration: "16s", left: "59%" },
  { delay: "-13s", duration: "20s", left: "67%" },
  { delay: "-6s", duration: "13s", left: "74%" },
  { delay: "-16s", duration: "18s", left: "81%" },
  { delay: "-8s", duration: "15s", left: "88%" },
  { delay: "-3s", duration: "19s", left: "94%" },
  { delay: "-12s", duration: "16s", left: "7%" },
  { delay: "-4s", duration: "18s", left: "23%" },
  { delay: "-15s", duration: "14s", left: "39%" },
  { delay: "-8s", duration: "20s", left: "55%" },
  { delay: "-18s", duration: "17s", left: "71%" },
  { delay: "-6s", duration: "19s", left: "85%" },
  { delay: "-10s", duration: "15s", left: "97%" },
];

export function Ambient3D() {
  return (
    <div aria-hidden className="ambient-3d">
      <div className="ambient-3d__plane" />
      <div className="ambient-3d__frame ambient-3d__frame--one"><span /></div>
      <div className="ambient-3d__frame ambient-3d__frame--two"><span /></div>
      <div className="ambient-3d__frame ambient-3d__frame--three"><span /></div>
      <div className="ambient-3d__rain">
        {fallingFragments.map(({ delay, duration, left }, index) => (
          <span
            className={index % 3 === 0 ? "ambient-3d__fragment ambient-3d__fragment--square" : "ambient-3d__fragment"}
            key={left}
            style={{ animationDelay: delay, animationDuration: duration, left }}
          />
        ))}
      </div>
    </div>
  );
}
