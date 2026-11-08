"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Clock, Globe, Lock, RotateCcw, Router, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { allPackages, ugx } from "@/content/site";

const audiences = [
  { id: "people", label: "Get online" },
  { id: "hosts", label: "Host a hotspot" },
  { id: "organisations", label: "Organisations" },
] as const;

type Audience = (typeof audiences)[number]["id"];
type Photo = { src: string; alt: string };

const steps = [
  {
    title: "Find the network",
    phone: "Open Wi-Fi settings and choose the youngafrican network.",
    behind: "An access point at the host's premises broadcasts an open network that anyone nearby can join.",
  },
  {
    title: "Open the sign-in page",
    phone: "The youngafrican sign-in page opens by itself. Joining the network is free.",
    behind: "Your phone is connected to the hotspot, but internet traffic is held at the sign-in page until access is confirmed.",
  },
  {
    title: "Choose a package",
    phone: "Pick how long you need: 3 hours for UGX 500, 12 hours for UGX 800 or 24 hours for UGX 1,000.",
    behind: "Every package is time-based, so you always know when it ends. Longer packages run for 7 days or 4 weeks.",
  },
  {
    title: "Enter a voucher",
    phone: "Type your voucher code and tap Login. On the real sign-in page you can also pay with MTN MoMo or Airtel Money.",
    behind: "The hotspot asks the voucher system to check the code, then opens a session linked to it.",
  },
  {
    title: "Browse",
    phone: "Use the internet normally. Time or data left stays visible.",
    behind: "Traffic flows through the site's shared connection until the voucher runs out.",
  },
];

const statusFor = (step: number) => [
  { icon: Smartphone, name: "Your phone", state: step === 0 ? "Searching" : "Connected", level: step === 0 ? 1 : 2 },
  { icon: Router, name: "Hotspot", state: step === 0 ? "Broadcasting" : "Joined", level: step === 0 ? 1 : 2 },
  { icon: ShieldCheck, name: "Voucher check", state: step < 3 ? "Waiting" : step === 3 ? "Ready to check" : "Verified", level: step < 3 ? 0 : step === 3 ? 1 : 2 },
  { icon: Globe, name: "Internet", state: step < 4 ? "Locked" : "Open", level: step < 4 ? 0 : 2 },
];

const networks = [
  { name: "youngafrican", open: true, bars: 4 },
  { name: "Shop_Guest", open: false, bars: 3 },
  { name: "Home-5G", open: false, bars: 2 },
];

const hostSteps = [
  ["Tell us about your space", "A shop, school, clinic or community centre with regular visitors."],
  ["Site check", "Power, mounting points, signal for the shared connection and expected footfall."],
  ["Agreement", "Responsibilities and any revenue share agreed individually, in writing."],
  ["Installation", "Equipment fitted and configured, with basic training for whoever sells vouchers."],
  ["Vouchers on sale", "Visitors buy codes locally and connect from their own phones."],
  ["Monitoring and support", "Uptime and usage watched remotely, with a named contact for problems."],
];

const orgServices = [
  ["Installation", "Planning and fitting hotspots across one or several sites."],
  ["Voucher management", "Creating, distributing and tracking access codes."],
  ["Monitoring", "Uptime and usage visibility for every site."],
  ["Technical support", "Help when something stops working."],
];

function Bars({ count }: { count: number }) {
  return (
    <span aria-hidden className="flex items-end gap-0.5">
      {[1, 2, 3, 4].map((level) => (
        <span key={level} className={`w-1 rounded-sm bg-current ${level <= count ? "" : "opacity-20"}`} style={{ height: 3 + level * 3 }} />
      ))}
    </span>
  );
}

function Status({ step, expired }: { step: number; expired: boolean }) {
  const nodes = statusFor(step).map((node) => (expired && node.name === "Internet" ? { ...node, state: "Locked", level: 0 } : node));
  return (
    <ol aria-label="Connection status" className="grid grid-cols-4">
      {nodes.map((node, index) => (
        <li key={node.name} className="relative">
          {index > 0 && (
            <span aria-hidden className={`absolute top-5 right-1/2 left-[-50%] h-px transition-colors duration-300 ${node.level ? "bg-blue-soft" : "bg-white/15"}`} />
          )}
          <span
            className={`relative mx-auto flex size-10 items-center justify-center rounded-full border transition-colors duration-300 ${
              node.level === 2 ? "border-blue bg-blue text-white" : node.level === 1 ? "border-blue-soft bg-night-2 text-white" : "border-white/15 bg-night-2 text-white/40"
            }`}
          >
            <node.icon aria-hidden className="size-4" />
          </span>
          <span className="mt-3 block text-center text-xs font-medium sm:text-sm">{node.name}</span>
          <span className={`block text-center text-[0.7rem] sm:text-xs ${node.level ? "text-blue-soft" : "text-white/40"}`}>{node.state}</span>
        </li>
      ))}
    </ol>
  );
}

const passes = allPackages.slice(0, 3).map((item) => ({ name: item.duration, hours: parseInt(item.duration), price: ugx(item.price) }));

function PeopleDemo() {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<(typeof passes)[number] | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const expired = step === 4 && seconds === 0;

  useEffect(() => {
    if (step !== 4) return;
    const timer = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [step]);

  const restart = () => {
    setStep(0);
    setPlan(null);
    setCode("");
    setError("");
  };

  const newVoucher = () => {
    setCode("");
    setStep(3);
  };

  const fastForward = () => setSeconds(3);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[A-Za-z0-9-]{6,}$/.test(code.trim())) {
      setError("Enter at least 6 letters or numbers.");
      return;
    }
    setError("");
    setSeconds((plan?.hours ?? 3) * 3600);
    setStep(4);
  };

  const current = expired
    ? { title: "Voucher used up", phone: "The session has ended. Enter a new voucher to keep browsing.", behind: "The hotspot closes internet access when the time on a voucher runs out." }
    : steps[step];
  const clock = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map((part) => String(part).padStart(2, "0")).join(":");
  const button = "min-h-12 rounded-full bg-blue text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:opacity-40";

  return (
    <div className="grid lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="relative isolate flex justify-center overflow-hidden border-b border-white/10 bg-blue px-6 py-10 lg:border-r lg:border-b-0">
        <svg aria-hidden viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -z-10 w-[44rem] -translate-x-1/2 -translate-y-1/2 text-white/15">
          {[60, 110, 160, 210].map((radius) => (
            <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" />
          ))}
        </svg>
        <div className="w-[16.5rem] rounded-[2.2rem] bg-ink p-2 shadow-[0_40px_70px_-25px_rgba(5,8,30,0.8)]">
          <div className="flex h-[31rem] flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink">
            <div className="flex items-center justify-between px-5 pt-3 text-[0.7rem] font-semibold text-muted">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <Wifi aria-hidden className="size-3.5" strokeWidth={2.5} />
                {step === 4 ? "Online" : "Wi-Fi"}
              </span>
            </div>

            <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
              {step === 0 && (
                <>
                  <p className="text-xs font-semibold text-muted">Wi-Fi networks</p>
                  <ul className="mt-2">
                    {networks.map((network) => (
                      <li key={network.name} className="border-b border-line">
                        <button
                          type="button"
                          disabled={!network.open}
                          onClick={() => setStep(1)}
                          className="flex min-h-14 w-full items-center gap-3 text-left disabled:cursor-not-allowed"
                        >
                          <Bars count={network.bars} />
                          <span className={`flex-1 text-[0.95rem] ${network.open ? "font-semibold" : "text-muted"}`}>{network.name}</span>
                          {network.open ? <ChevronRight aria-hidden className="size-4 text-blue" /> : <Lock aria-hidden className="size-3.5 text-muted" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto text-sm text-muted">Tap the youngafrican network.</p>
                </>
              )}

              {step === 1 && (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue text-white">
                    <Wifi aria-hidden className="size-5" />
                  </span>
                  <p className="mt-5 text-xl leading-tight font-semibold">Sign in to youngafrican</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">You are connected to the hotspot. Choose how you would like to browse.</p>
                  <button type="button" onClick={() => setStep(2)} className={`mt-auto ${button}`}>
                    See access options
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-lg font-semibold">Choose access</p>
                  <div className="mt-4 space-y-2.5">
                    {passes.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        aria-pressed={plan?.name === option.name}
                        onClick={() => setPlan(option)}
                        className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                          plan?.name === option.name ? "border-blue bg-blue/8" : "border-line hover:border-ink/30"
                        }`}
                      >
                        <Clock aria-hidden className="size-5 shrink-0 text-blue" />
                        <span className="flex-1 font-semibold">{option.name}</span>
                        <span className="text-sm font-semibold">{option.price}</span>
                      </button>
                    ))}
                    <p className="text-xs text-muted">More packages, up to 4 weeks, on the packages page.</p>
                  </div>
                  <button type="button" disabled={!plan} onClick={() => setStep(3)} className={`mt-auto ${button}`}>
                    Continue
                  </button>
                </>
              )}

              {step === 3 && (
                <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
                  <p className="text-lg font-semibold">Enter your voucher</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">In this demo, any code of 6 or more characters works.</p>
                  <label htmlFor="d-voucher" className="mt-5 text-sm font-semibold">
                    Voucher code
                  </label>
                  <input
                    id="d-voucher"
                    value={code}
                    onChange={(event) => setCode(event.target.value.toUpperCase())}
                    placeholder="YA-DEMO-24"
                    autoComplete="off"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "d-voucher-error" : undefined}
                    className="mt-2 min-h-12 rounded-lg border border-ink/20 bg-white px-3.5 tracking-[0.15em] tabular-nums outline-none focus:border-blue"
                  />
                  {error && (
                    <p id="d-voucher-error" className="mt-2 text-sm text-[#b42318]">
                      {error}
                    </p>
                  )}
                  <button type="submit" className={`mt-auto ${button}`}>
                    Connect
                  </button>
                </form>
              )}

              {expired && (
                <>
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-coral text-ink">
                    <Clock aria-hidden className="size-6" />
                  </span>
                  <p className="mt-5 text-2xl font-semibold">Session ended</p>
                  <p className="mt-1 text-sm text-muted">Your {plan?.name} package has run out.</p>
                  <p className="mt-6 rounded-lg bg-paper p-4 text-sm leading-relaxed text-muted">Buy another package on the sign-in page to continue.</p>
                  <button type="button" onClick={newVoucher} className={`mt-auto ${button}`}>
                    Enter a new voucher
                  </button>
                </>
              )}

              {step === 4 && !expired && (
                <>
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-blue text-white">
                    <Check aria-hidden className="size-6" strokeWidth={2.5} />
                  </span>
                  <p className="mt-5 text-2xl font-semibold">You are online</p>
                  <p className="mt-1 text-sm text-muted">
                    {plan?.name} · {code}
                  </p>
                  <div className="mt-6 rounded-lg border border-line bg-white p-4">
                    <p className="text-xs text-muted">Time left</p>
                    <p className="mt-1 text-3xl font-semibold tabular-nums">{clock}</p>
                  </div>
                  <button type="button" onClick={fastForward} className="mt-3 min-h-11 text-sm font-medium text-blue underline underline-offset-4">
                    Skip to the end of this voucher
                  </button>
                  <button type="button" onClick={restart} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line text-sm font-semibold">
                    <RotateCcw aria-hidden className="size-4" />
                    End session
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-10">
        <ol className="flex gap-1.5" aria-label="Demo progress">
          {steps.map((item, index) => (
            <li key={item.title} className="flex-1">
              <button
                type="button"
                disabled={index > step}
                onClick={() => setStep(index)}
                aria-current={index === step ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${item.title}`}
                className="block w-full py-3 disabled:cursor-default"
              >
                <span aria-hidden className={`block h-1.5 rounded-full transition-colors duration-300 ${index < step ? "bg-blue" : index === step ? "bg-mango" : "bg-white/15"}`} />
              </button>
            </li>
          ))}
        </ol>

        <div aria-live="polite" className="mt-4">
          <p className="text-sm text-white/50">
            Step {step + 1} of {steps.length}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em]">{current.title}</h3>
          <p className="mt-2 text-lg leading-relaxed text-white/80">{current.phone}</p>
        </div>

        <div className="mt-10 rounded-3xl bg-night px-4 py-6 ring-1 ring-white/10 sm:px-6">
          <Status step={step} expired={expired} />
          <p className="mt-6 border-t border-white/10 pt-5 leading-relaxed text-white/65">
            <span className="font-medium text-white">Behind the scenes. </span>
            {current.behind}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8 text-sm text-white/50">
          <p>Interactive demo. It does not connect to a network or take payment.</p>
          {step > 0 && (
            <button type="button" onClick={restart} className="inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-white">
              <RotateCcw aria-hidden className="size-3.5" />
              Start again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Process({ items, ordered, cta, href, intro, photo }: { items: string[][]; ordered: boolean; cta: string; href: string; intro: string; photo: Photo }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className="grid lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="relative min-h-56 border-b border-white/10 lg:border-r lg:border-b-0">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 352px, 100vw" className="object-cover" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white/80">Illustrative photograph</span>
      </div>
      <div className="flex flex-col p-6 sm:p-10">
        <p className="max-w-xl text-lg leading-relaxed text-white/80">{intro}</p>
        <List className="mt-8 grid gap-x-8 sm:grid-cols-2">
          {items.map(([title, text], index) => (
            <li key={title} className="flex gap-4 border-t border-white/10 py-4">
              {ordered && <span className="w-5 shrink-0 text-sm text-blue-soft tabular-nums">{index + 1}</span>}
              <span>
                <span className="block font-medium">{title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-white/60">{text}</span>
              </span>
            </li>
          ))}
        </List>
        <Link href={href} className="mt-auto inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-white px-5 font-medium text-ink transition-colors hover:bg-blue-soft max-lg:mt-6">
          {cta}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function Walkthrough({ photo }: { photo: Photo }) {
  const [audience, setAudience] = useState<Audience>("people");

  const onKey = (event: React.KeyboardEvent, index: number) => {
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1 + audiences.length, Home: 0, End: audiences.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = moves[event.key] % audiences.length;
    setAudience(audiences[next].id);
    document.getElementById(`d-tab-${audiences[next].id}`)?.focus();
  };

  return (
    <div className="overflow-hidden rounded-[2rem] bg-night-2 ring-1 ring-white/10">
      <div role="tablist" aria-label="Who is this for" className="flex gap-1 overflow-x-auto border-b border-white/10 p-2 [scrollbar-width:none] sm:p-3">
        {audiences.map((item, index) => (
          <button
            key={item.id}
            id={`d-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={audience === item.id}
            aria-controls="d-panel"
            tabIndex={audience === item.id ? 0 : -1}
            onClick={() => setAudience(item.id)}
            onKeyDown={(event) => onKey(event, index)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
              audience === item.id ? "bg-white text-ink" : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div id="d-panel" role="tabpanel" aria-labelledby={`d-tab-${audience}`} className="lg:min-h-[37rem] lg:[&>div]:min-h-[37rem]">
        {audience === "people" && <PeopleDemo />}
        {audience === "hosts" && (
          <Process
            photo={photo}
            ordered
            items={hostSteps}
            intro="A hotspot works best where people already spend time. This is the process we plan to follow with each host; details are confirmed site by site."
            cta="Ask about hosting"
            href="/contact?service=hotspot-hosting"
          />
        )}
        {audience === "organisations" && (
          <Process
            photo={photo}
            ordered={false}
            items={orgServices}
            intro="For schools, businesses, estates and community organisations that want shared Wi-Fi on their own sites. Scope and pricing are agreed per project."
            cta="Discuss a project"
            href="/contact?service=hotspot-installation"
          />
        )}
      </div>
    </div>
  );
}
