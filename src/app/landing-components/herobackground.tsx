export default function HeroBackground() {
  const COLS = 20;
  const ROWS = 12;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,.4) 10%, rgba(0,0,0,0) 60%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "cover",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,.4) 10%, rgba(0,0,0,0) 60%)",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "cover",
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div
            key={i}
            className="
              border border-indigo-500/20
              transition-all duration-200
              hover:border-indigo-400
              hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]
              hover:bg-indigo-500/10
            "
          />
        ))}
      </div>
    </div>
  );
}
