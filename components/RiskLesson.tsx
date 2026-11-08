"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

const currencies = ["USD", "EUR", "GBP", "UGX", "KES", "NGN", "ZAR", "INR"] as const;
type Currency = (typeof currencies)[number];
const defaults: Record<Currency, number> = { USD: 1000, EUR: 1000, GBP: 1000, UGX: 3700000, KES: 130000, NGN: 1500000, ZAR: 18000, INR: 85000 };

const stages = ["The idea", "Try it", "Check yourself"];

const questions = [
  {
    prompt: "You keep risk at 1% but move your stop twice as far from your entry. What happens to your position size?",
    options: ["It doubles", "It halves", "It stays the same"],
    answer: 1,
    explain: "The amount you can lose is fixed. If each unit can now lose twice as much, you can only hold half as many units.",
  },
  {
    prompt: "Price falls straight to your stop. Roughly how much of your account have you lost?",
    options: ["About 1%, plus fees and slippage", "Exactly 1%, always", "Nothing until you sell"],
    answer: 0,
    explain: "A stop limits the loss, but in fast markets the exit can be worse than planned, and fees add a little more.",
  },
];

const series = [46.2, 46.8, 46.1, 47.3, 47.0, 48.1, 47.6, 48.8, 48.3, 49.2, 48.7, 49.6, 49.1, 50.0];

function Chart({ entry, stop, target, className = "w-full" }: { entry: number; stop: number; target: number; className?: string }) {
  const prices = [...series, entry, stop, target];
  const high = Math.max(...prices) + 0.6;
  const low = Math.min(...prices) - 0.6;
  const y = (price: number) => 10 + ((high - price) / (high - low || 1)) * 180;
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label={`Illustrative chart with entry ${entry}, stop ${stop} and a target at twice the risk, ${target.toFixed(2)}`}>
      <rect x="0" y={y(target)} width="320" height={Math.max(0, y(entry) - y(target))} fill="var(--color-blue)" opacity="0.08" />
      <rect x="0" y={y(entry)} width="320" height={Math.max(0, y(stop) - y(entry))} fill="var(--color-coral)" opacity="0.12" />
      {series.map((close, index) => {
        const open = index ? series[index - 1] : close - 0.4;
        const up = close >= open;
        const color = up ? "var(--color-up)" : "var(--color-coral)";
        return (
          <g key={index} stroke={color} fill={color}>
            <line x1={14 + index * 17} x2={14 + index * 17} y1={y(Math.max(open, close) + 0.35)} y2={y(Math.min(open, close) - 0.35)} />
            <rect x={9 + index * 17} y={y(Math.max(open, close))} width="10" height={Math.max(2, Math.abs(y(open) - y(close)))} rx="1.5" />
          </g>
        );
      })}
      {[
        { price: target, label: "Target 2R", color: "var(--color-blue)", dash: "5 4" },
        { price: entry, label: "Entry", color: "var(--color-ink)", dash: "" },
        { price: stop, label: "Stop 1R", color: "var(--color-coral-deep)", dash: "5 4" },
      ].map((line) => (
        <g key={line.label}>
          <line x1="0" x2="320" y1={y(line.price)} y2={y(line.price)} stroke={line.color} strokeWidth="1.5" strokeDasharray={line.dash} />
          <rect x="252" y={y(line.price) - 9} width="68" height="18" rx="9" fill={line.color} />
          <text x="286" y={y(line.price) + 4} fontSize="10" fontWeight="600" textAnchor="middle" fill="#fff">
            {line.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const field = "mt-1.5 min-h-12 w-full rounded-xl border border-line bg-paper px-3 font-semibold tabular-nums outline-none focus:border-blue focus:bg-white";

export function RiskLesson() {
  const [stage, setStage] = useState(0);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [account, setAccount] = useState(defaults.USD);
  const [riskPct, setRiskPct] = useState(1);
  const [entry, setEntry] = useState(50);
  const [stop, setStop] = useState(47.5);
  const [picked, setPicked] = useState<(number | null)[]>([null, null]);

  const money = (value: number) => new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: value < 100 ? 2 : 0 }).format(value);

  const atRisk = (account * riskPct) / 100;
  const perUnit = entry - stop;
  const valid = account > 0 && entry > 0 && stop > 0 && perUnit > 0;
  const units = valid ? atRisk / perUnit : 0;
  const exposure = units * entry;
  const correct = picked.filter((choice, index) => choice === questions[index].answer).length;

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white text-ink shadow-[0_40px_80px_-50px_rgba(58,36,0,0.8)]">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line px-5 py-4 sm:px-8">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted">Lesson 3 of 6 · Preview</p>
          <p className="font-semibold">Risk and position sizing</p>
        </div>
        <ol className="flex gap-1.5" aria-label="Lesson progress">
          {stages.map((name, index) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => setStage(index)}
                aria-current={stage === index ? "step" : undefined}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors sm:px-4 ${
                  stage === index ? "bg-ink text-white" : index < stage ? "bg-blue/10 text-blue" : "bg-paper text-muted hover:text-ink"
                }`}
              >
                {index < stage ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : <span className="tabular-nums">{index + 1}</span>}
                <span className={stage === index ? "" : "sr-only sm:not-sr-only"}>{name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col p-5 sm:p-8 lg:min-h-[39rem]">
        {stage === 0 && (
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-4xl">Decide what you can lose before you decide what to buy.</h3>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Experienced traders start with where their idea is proven wrong. That point, the stop, sets the risk. A common rule is to
                risk around 1% of the account on each idea.
              </p>
              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-paper p-4">
                <div className="grid w-24 shrink-0 grid-cols-10 gap-[2px]" role="img" aria-label="100 squares with one highlighted: 1% of an account">
                  {Array.from({ length: 100 }, (_, index) => (
                    <span key={index} className={`aspect-square rounded-[1px] ${index === 99 ? "bg-coral" : "bg-ink/15"}`} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">1 square = 1%.</span> Ten losses in a row would cost about a tenth of the account,
                  not all of it.
                </p>
              </div>
            </div>
            <figure className="rounded-3xl bg-paper p-4 sm:p-6">
              <Chart entry={50} stop={47.5} target={55} />
              <figcaption className="mt-3 text-sm text-muted">The red zone is what you accept to lose. The blue zone is what you aim for: twice the risk.</figcaption>
            </figure>
          </div>
        )}

        {stage === 1 && (
          <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="grid grid-cols-2 content-start gap-4">
              <label>
                <span className="text-sm font-medium">Currency</span>
                <select
                  value={currency}
                  onChange={(event) => {
                    const next = event.target.value as Currency;
                    setCurrency(next);
                    setAccount(defaults[next]);
                  }}
                  className={field}
                >
                  {currencies.map((code) => (
                    <option key={code}>{code}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="text-sm font-medium">Account size</span>
                <input type="number" min={0} inputMode="decimal" value={account} onChange={(event) => setAccount(Number(event.target.value))} className={field} />
              </label>
              <label className="col-span-2 rounded-2xl bg-paper p-4">
                <span className="flex justify-between text-sm font-medium">
                  Risk per idea <span className="rounded-full bg-ink px-2.5 py-0.5 text-white tabular-nums">{riskPct}%</span>
                </span>
                <input type="range" min={0.25} max={3} step={0.25} value={riskPct} onChange={(event) => setRiskPct(Number(event.target.value))} className="mt-4 w-full accent-blue" />
                <span className="mt-1 block text-xs text-muted">Many beginners stay between 0.5% and 1%.</span>
              </label>
              <label>
                <span className="text-sm font-medium">Entry price</span>
                <input type="number" min={0} step="0.1" inputMode="decimal" value={entry} onChange={(event) => setEntry(Number(event.target.value))} className={field} />
              </label>
              <label>
                <span className="text-sm font-medium">Stop price</span>
                <input type="number" min={0} step="0.1" inputMode="decimal" value={stop} onChange={(event) => setStop(Number(event.target.value))} className={field} />
              </label>
            </div>

            <div>
              {valid ? (
                <>
                  <div className="rounded-3xl bg-ink p-5 text-white">
                    <p className="text-sm text-white/60">Position size</p>
                    <p className="mt-1 text-4xl font-semibold tracking-[-0.03em] tabular-nums">
                      {units.toLocaleString("en", { maximumFractionDigits: 2 })} <span className="text-xl text-white/60">units</span>
                    </p>
                    <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 text-sm">
                      {[
                        ["At risk", money(atRisk)],
                        ["Per unit", money(perUnit)],
                        ["Value", money(exposure)],
                      ].map(([term, value]) => (
                        <div key={term}>
                          <dt className="text-white/55">{term}</dt>
                          <dd className="mt-0.5 font-semibold tabular-nums">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-4 hidden sm:block">
                    <Chart entry={entry} stop={stop} target={entry + perUnit * 2} className="h-48 w-full" />
                  </div>
                  <p aria-live="polite" className={`mt-4 rounded-2xl p-4 text-sm leading-relaxed ${exposure > account ? "bg-coral/12 text-[#9c2e18]" : "bg-blue/8 text-blue-deep"}`}>
                    {exposure > account
                      ? "This position is worth more than the whole account, so it would need borrowed money. That multiplies risk. Try a wider stop or a smaller risk."
                      : `If price reaches the stop, you lose about ${money(atRisk)}. Move the stop further away and watch the position shrink.`}
                  </p>
                </>
              ) : (
                <p className="rounded-2xl bg-paper p-5 text-muted">Enter a positive account size and a stop below your entry. Selling short works in reverse.</p>
              )}
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="grid flex-1 content-start gap-8 lg:grid-cols-2">
            {questions.map((question, qIndex) => {
              const choice = picked[qIndex];
              return (
                <fieldset key={question.prompt} className="rounded-3xl bg-paper p-5 sm:p-6">
                  <legend className="sr-only">Question {qIndex + 1}</legend>
                  <p className="text-sm font-medium text-muted">Question {qIndex + 1} of 2</p>
                  <p className="mt-2 text-lg leading-snug font-semibold">{question.prompt}</p>
                  <div className="mt-4 space-y-2">
                    {question.options.map((option, oIndex) => {
                      const chosen = choice === oIndex;
                      const right = oIndex === question.answer;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={chosen}
                          onClick={() => setPicked((current) => current.map((value, index) => (index === qIndex ? oIndex : value)))}
                          className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border-2 bg-white px-4 text-left font-medium transition-colors ${
                            chosen ? (right ? "border-up text-[#0e7553]" : "border-coral text-[#9c2e18]") : "border-transparent hover:border-line"
                          }`}
                        >
                          {option}
                          {chosen && (right ? <Check aria-hidden className="size-5" /> : <X aria-hidden className="size-5" />)}
                        </button>
                      );
                    })}
                  </div>
                  <p aria-live="polite" className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-muted">
                    {choice !== null && question.explain}
                  </p>
                </fieldset>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStage(stage - 1)}
            disabled={stage === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted hover:text-ink disabled:invisible"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
          {stage === 2 && <p className="text-sm font-medium">{correct} of 2 correct</p>}
          {stage < 2 ? (
            <button type="button" onClick={() => setStage(stage + 1)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-blue px-6 font-semibold text-white transition-transform hover:-translate-y-0.5">
              {stage === 0 ? "Try it with numbers" : "Check yourself"}
              <ArrowRight aria-hidden className="size-4" />
            </button>
          ) : (
            <a href="/academy#syllabus" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-blue px-6 font-semibold text-white transition-transform hover:-translate-y-0.5">
              Syllabus
              <ArrowRight aria-hidden className="size-4" />
            </a>
          )}
        </div>
      </div>

      <p className="border-t border-line bg-paper px-5 py-3 text-xs text-muted sm:px-8">Illustrative lesson. Prices are invented and nothing here is financial advice.</p>
    </div>
  );
}
