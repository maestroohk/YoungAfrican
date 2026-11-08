"use client";

import { useState } from "react";

const width = 640;
const height = 300;
const pad = 24;

const prices = (() => {
  let seed = 7;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280 - 0.5;
  };
  return Array.from({ length: 64 }, (_, index) => 100 + index * 0.55 + Math.sin(index / 4.5) * 6 + random() * 5);
})();

const min = Math.min(...prices) - 4;
const max = Math.max(...prices) + 4;
const x = (index: number) => pad + (index / (prices.length - 1)) * (width - pad * 2);
const y = (value: number) => height - pad - ((value - min) / (max - min)) * (height - pad * 2);
const linePath = prices.map((value, index) => `${index ? "L" : "M"}${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");

const span = 8;
const band = prices.map((_, index) => {
  const slice = prices.slice(Math.max(0, index - span), index + 1);
  const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
  const deviation = Math.sqrt(slice.reduce((a, b) => a + (b - mean) ** 2, 0) / slice.length);
  return { upper: mean + deviation * 2, lower: mean - deviation * 2 };
});
const bandPath = `${band.map((point, index) => `${index ? "L" : "M"}${x(index).toFixed(1)},${y(point.upper).toFixed(1)}`).join(" ")} ${band
  .map((point, index) => ({ point, index }))
  .reverse()
  .map(({ point, index }) => `L${x(index).toFixed(1)},${y(point.lower).toFixed(1)}`)
  .join(" ")} Z`;

const support = { from: 112, to: 116 };
const resistance = { from: 131, to: 135 };

const layers = [
  { id: "trend", label: "Trend", text: "Price has been making higher lows. A trend line joins them. It describes the past; it is not a promise about the next move." },
  { id: "levels", label: "Support and resistance", text: "Zones where price has repeatedly paused. Many traders watch them, which is also why they sometimes fail." },
  { id: "volatility", label: "Volatility", text: "The shaded band widens when price swings more. Wider swings mean wider stops and smaller positions for the same risk." },
] as const;

type LayerId = (typeof layers)[number]["id"];

export function ChartLesson() {
  const [active, setActive] = useState<LayerId[]>(["trend"]);
  const toggle = (id: LayerId) => setActive((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const on = (id: LayerId) => active.includes(id);
  const latest = layers.filter((layer) => on(layer.id)).at(-1);

  return (
    <figure className="overflow-hidden rounded-[2rem] bg-white text-ink">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-8">
        <div>
          <p className="text-xs font-medium text-muted">Lesson 2 of 6 · Preview</p>
          <p className="font-semibold">Reading a price chart</p>
        </div>
        <div role="group" aria-label="Chart layers" className="flex flex-wrap gap-2">
          {layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              aria-pressed={on(layer.id)}
              onClick={() => toggle(layer.id)}
              className="min-h-10 rounded-full bg-paper px-4 text-sm font-medium transition-colors hover:bg-ink/10 aria-pressed:bg-blue aria-pressed:text-white"
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_17rem] lg:items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Illustrative price chart with optional trend, level and volatility layers">
          {[0.25, 0.5, 0.75].map((fraction) => (
            <line key={fraction} x1={pad} x2={width - pad} y1={pad + fraction * (height - pad * 2)} y2={pad + fraction * (height - pad * 2)} stroke="var(--color-line)" />
          ))}
          {on("volatility") && <path d={bandPath} fill="var(--color-blue)" fillOpacity="0.1" />}
          {on("levels") && (
            <g>
              <rect x={pad} width={width - pad * 2} y={y(support.to)} height={y(support.from) - y(support.to)} fill="var(--color-mango)" fillOpacity="0.35" />
              <rect x={pad} width={width - pad * 2} y={y(resistance.to)} height={y(resistance.from) - y(resistance.to)} fill="var(--color-mango)" fillOpacity="0.35" />
              <text x={width - pad - 4} y={y(support.from) - 6} textAnchor="end" fontSize="12" fill="var(--color-mango-ink)">
                Support zone
              </text>
              <text x={width - pad - 4} y={y(resistance.to) - 6} textAnchor="end" fontSize="12" fill="var(--color-mango-ink)">
                Resistance zone
              </text>
            </g>
          )}
          <path d={linePath} fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
          {on("trend") && (
            <line x1={x(6)} y1={y(prices[6] - 3)} x2={x(58)} y2={y(prices[6] - 3 + 52 * 0.55)} stroke="var(--color-blue)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          )}
        </svg>
        <figcaption className="rounded-3xl bg-paper p-5">
          <p className="text-sm font-semibold">{latest ? latest.label : "Choose a layer"}</p>
          <p aria-live="polite" className="mt-2 leading-relaxed text-muted">
            {latest ? latest.text : "Switch on a layer to see what it shows."}
          </p>
          <p className="mt-4 text-xs text-muted">Illustrative data. Not a real asset, forecast or advice.</p>
        </figcaption>
      </div>
    </figure>
  );
}
