import { Check, Cpu, GraduationCap, LineChart, Pill, Radio, Wifi } from "lucide-react";
import { Mark } from "@/components/Header";

export function HeroPhone({ className }: { className: string }) {
  return (
    <div aria-hidden className={`w-56 rounded-[2rem] bg-ink p-1.5 shadow-[0_40px_70px_-25px_rgba(5,8,30,0.7)] ${className}`}>
      <div className="flex h-[25rem] flex-col rounded-[1.6rem] bg-white p-4 text-ink">
        <div className="flex justify-between text-[0.65rem] font-semibold text-muted">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Wifi className="size-3" /> YoungAfrican Wi-Fi
          </span>
        </div>
        <span className="mt-6 inline-flex size-10 items-center justify-center rounded-full bg-blue text-white">
          <Check className="size-5" strokeWidth={2.5} />
        </span>
        <p className="mt-4 text-lg font-semibold">You are online</p>
        <p className="text-xs text-muted">Time pass · YA-DEMO-24</p>
        <div className="mt-5 rounded-2xl bg-paper p-3">
          <p className="text-[0.65rem] text-muted">Time left</p>
          <p className="text-2xl font-semibold tabular-nums">59:41</p>
          <div className="mt-2 h-1.5 rounded-full bg-ink/10">
            <div className="h-full w-[98%] rounded-full bg-blue" />
          </div>
        </div>
        <p className="mt-auto rounded-xl bg-mango/30 px-3 py-2 text-[0.65rem] text-mango-ink">Demo screen. Prices will be announced before launch.</p>
      </div>
    </div>
  );
}

export function HeroLesson({ className }: { className: string }) {
  const candles = [44, 50, 47, 54, 51, 58, 55, 61, 59, 65, 62, 68];
  return (
    <div aria-hidden className={`w-72 rounded-3xl bg-white p-4 text-ink shadow-[0_40px_70px_-30px_rgba(5,8,30,0.7)] ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">Lesson 3 · Position sizing</span>
        <span className="rounded-full bg-mango px-2 py-0.5 font-medium text-mango-ink">Preview</span>
      </div>
      <svg viewBox="0 0 240 120" className="mt-3 w-full">
        <rect x="0" y="6" width="240" height="34" fill="var(--color-blue)" opacity="0.08" />
        <rect x="0" y="40" width="240" height="24" fill="var(--color-coral)" opacity="0.12" />
        <line x1="0" x2="240" y1="6" y2="6" stroke="var(--color-blue)" strokeDasharray="4 4" />
        <line x1="0" x2="240" y1="40" y2="40" stroke="var(--color-ink)" opacity="0.5" />
        <line x1="0" x2="240" y1="64" y2="64" stroke="var(--color-coral)" strokeDasharray="4 4" />
        {candles.map((value, index) => {
          const up = index % 3 !== 1;
          const top = 132 - value * 1.4;
          const colour = up ? "var(--color-up)" : "var(--color-coral)";
          return (
            <g key={index} fill={colour} stroke={colour}>
              <line x1={10 + index * 19} x2={10 + index * 19} y1={top - 6} y2={top + 24} />
              <rect x={5 + index * 19} y={top} width="10" height="16" rx="1.5" />
            </g>
          );
        })}
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-medium">
        <span className="rounded-lg bg-blue/10 py-1.5 text-blue">Target 2R</span>
        <span className="rounded-lg bg-ink/5 py-1.5">Entry</span>
        <span className="rounded-lg bg-coral/10 py-1.5 text-coral-deep">Stop 1R</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <div className="flex flex-1 gap-1">
          {[1, 2, 3].map((step) => (
            <span key={step} className={`h-1.5 flex-1 rounded-full ${step < 3 ? "bg-blue" : "bg-ink/10"}`} />
          ))}
        </div>
        Step 2 of 3
      </div>
    </div>
  );
}

const interests = [
  { icon: Pill, title: "Pharmacy", text: "Careful reading and responsibility for advice" },
  { icon: LineChart, title: "Markets", text: "Self-taught trading and market research" },
  { icon: Radio, title: "Connectivity", text: "Affordable access for underserved communities" },
  { icon: Cpu, title: "Technology", text: "Tools that widen who can take part" },
  { icon: GraduationCap, title: "Learning", text: "Curiosity across disciplines, shared openly" },
];

export function Interests() {
  const size = 440;
  const center = size / 2;
  const radius = 160;
  const points = interests.map((_, index) => {
    const angle = (index / interests.length) * Math.PI * 2 - Math.PI / 2;
    return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius };
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[27.5rem]">
      <svg aria-hidden viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-line)" strokeDasharray="3 6" />
        {points.map((point, index) => (
          <line key={index} x1={center} y1={center} x2={point.x} y2={point.y} stroke="var(--color-blue)" strokeOpacity="0.25" />
        ))}
      </svg>
      <span className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue shadow-[0_0_0_10px_rgba(45,60,255,0.12)]">
        <Mark inverse className="size-10" />
      </span>
      <ul aria-label="The founder's interests">
        {interests.map((interest, index) => (
          <li
            key={interest.title}
            className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center sm:w-36"
            style={{ left: `${(points[index].x / size) * 100}%`, top: `${(points[index].y / size) * 100}%` }}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-blue shadow-[0_10px_25px_-12px_rgba(13,16,32,0.4)] ring-1 ring-line">
              <interest.icon aria-hidden className="size-5" />
            </span>
            <span className="mt-2 text-sm font-semibold">{interest.title}</span>
            <span className="hidden text-xs leading-snug text-muted sm:block">{interest.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
