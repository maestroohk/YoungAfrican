const pricePath = [
  [20, 212],
  [55, 204],
  [85, 216],
  [115, 198],
  [145, 208],
  [175, 192],
  [205, 200],
  [235, 190],
  [265, 182],
  [292, 188],
  [320, 168],
  [350, 150],
  [380, 158],
  [410, 126],
  [440, 112],
  [470, 120],
  [500, 92],
  [540, 80],
];

const levels = { target: 84, entry: 180, stop: 228 };

export function TradePlanDiagram({ className = "" }: { className?: string }) {
  const line = pricePath.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <figure className={`overflow-hidden rounded-[2px] border border-white/10 bg-ink-2 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 label text-mist">
        <span>Anatomy of a trade plan</span>
        <span className="hidden sm:inline">Illustration</span>
      </div>
      <svg viewBox="0 0 560 300" className="block w-full" role="img" aria-labelledby="trade-plan-title">
        <title id="trade-plan-title">
          Illustration of a trade plan: an entry level, an invalidation level below it that defines the risk, and a target
          above it set at twice the risk.
        </title>
        <rect x="0" y={levels.target} width="560" height={levels.entry - levels.target} fill="#8ea2ff" fillOpacity="0.07" />
        <rect x="0" y={levels.entry} width="560" height={levels.stop - levels.entry} fill="#e0915f" fillOpacity="0.09" />
        {[60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="white" strokeOpacity="0.04" />
        ))}
        <line x1="0" x2="560" y1={levels.target} y2={levels.target} stroke="#8ea2ff" strokeDasharray="5 6" strokeOpacity="0.9" />
        <line x1="0" x2="560" y1={levels.entry} y2={levels.entry} stroke="white" strokeOpacity="0.55" />
        <line x1="0" x2="560" y1={levels.stop} y2={levels.stop} stroke="#e0915f" strokeDasharray="5 6" strokeOpacity="0.9" />
        <polyline points={line} fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="292" cy={levels.entry} r="6" fill="#0b0c0a" stroke="white" strokeWidth="2" />
        <g fontFamily="var(--font-schibsted), sans-serif" fontSize="11" letterSpacing="0.06em">
          <text x="14" y={levels.target - 10} fill="#8ea2ff">TARGET · 2R</text>
          <text x="14" y={levels.entry - 10} fill="white" fillOpacity="0.75">ENTRY</text>
          <text x="14" y={levels.stop + 20} fill="#e0915f">INVALIDATION · 1R</text>
        </g>
        <g stroke="white" strokeOpacity="0.5">
          <line x1="528" x2="528" y1={levels.target + 4} y2={levels.entry - 4} />
          <line x1="528" x2="528" y1={levels.entry + 4} y2={levels.stop - 4} />
        </g>
        <g fontFamily="var(--font-schibsted), sans-serif" fontSize="10" fill="white" fillOpacity="0.6" textAnchor="end">
          <text x="520" y={(levels.target + levels.entry) / 2 + 4}>REWARD</text>
          <text x="520" y={(levels.entry + levels.stop) / 2 + 4}>RISK</text>
        </g>
      </svg>
      <figcaption className="grid gap-px border-t border-white/10 bg-white/10 text-sm sm:grid-cols-2">
        <div className="bg-ink-2 px-5 py-4">
          <p className="label text-mist">Position size</p>
          <p className="mt-1.5 text-white">Amount you accept to lose ÷ distance from entry to invalidation</p>
        </div>
        <div className="bg-ink-2 px-5 py-4">
          <p className="label text-mist">Before entry</p>
          <p className="mt-1.5 text-white">All three levels are written down. Not a signal or a forecast.</p>
        </div>
      </figcaption>
    </figure>
  );
}
