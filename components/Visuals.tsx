import type { CSSProperties } from "react";
import Image from "next/image";
import { Logo } from "@/components/Header";
import { CalendarDays, Check, Gift, Wifi } from "lucide-react";
import { allPackages, hotspotAccess, rewardCards, ugx } from "@/content/site";

export function HeroPhone({ className }: { className: string }) {
  return (
    <div aria-hidden className={`w-56 rounded-[2rem] bg-ink p-1.5 shadow-[0_40px_70px_-25px_rgba(5,8,30,0.7)] ${className}`}>
      <div className="flex h-[25rem] flex-col rounded-[1.6rem] bg-white p-4 text-ink">
        <div className="flex justify-between text-[0.65rem] font-semibold text-muted">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Wifi className="size-3" /> {hotspotAccess.network}
          </span>
        </div>
        <span className="mt-6 inline-flex size-10 items-center justify-center rounded-full bg-blue text-white">
          <Check className="size-5" strokeWidth={2.5} />
        </span>
        <p className="mt-4 text-lg font-semibold">You are online</p>
        <p className="text-xs text-muted">24 hours · YA-DEMO-24</p>
        <div className="mt-5 rounded-2xl bg-paper p-3">
          <p className="text-[0.65rem] text-muted">Time left</p>
          <p className="text-2xl font-semibold tabular-nums">23:41:08</p>
          <div className="mt-2 h-1.5 rounded-full bg-ink/10">
            <div className="h-full w-[98%] rounded-full bg-blue" />
          </div>
        </div>
        <p className="mt-auto rounded-xl bg-mango/30 px-3 py-2 text-[0.65rem] text-mango-ink">Demo screen. 24 hours costs UGX 1,000.</p>
      </div>
    </div>
  );
}

export function HeroPackages({ className }: { className: string }) {
  return (
    <div aria-hidden className={`w-72 rounded-3xl bg-white p-4 text-ink shadow-[0_40px_70px_-30px_rgba(5,8,30,0.7)] ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">Choose a package</span>
        <span className="rounded-full bg-mango px-2 py-0.5 font-medium text-mango-ink">From UGX 500</span>
      </div>
      <ul className="mt-3 space-y-2">
        {[allPackages[2], allPackages[3], allPackages[4]].map((item, index) => (
          <li key={item.name} className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm ${index === 0 ? "bg-blue text-white" : "bg-paper"}`}>
            <span className="font-semibold">{item.duration}</span>
            <span className="font-semibold">{ugx(item.price)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <Wifi className="size-3.5 text-blue" />
        Pay as you go. No contract.
      </p>
    </div>
  );
}

const onDark = { "--logo-main": "#fff" } as CSSProperties;
const onMango = { "--logo-accent": "#fff" } as CSSProperties;

const cardTones = {
  blue: { header: "bg-blue text-white", accent: "text-mango", tag: "bg-mango text-mango-ink", day: "bg-blue/8 text-blue ring-blue/20", panel: "bg-[#e3effd]", bar: "bg-blue", logo: onDark },
  night: { header: "bg-night text-white", accent: "text-blue-soft", tag: "bg-white text-night", day: "bg-night/6 text-night ring-night/20", panel: "bg-[#efe4fb]", bar: "bg-night", logo: onDark },
  mango: { header: "bg-mango text-mango-ink", accent: "text-blue-deep", tag: "bg-ink text-white", day: "bg-mango/25 text-mango-ink ring-mango", panel: "bg-[#fef2dd]", bar: "bg-mango", logo: onMango },
};

export function RewardCard({ card }: { card: (typeof rewardCards)[number] }) {
  const tone = cardTones[card.tone];
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-50px_rgba(13,16,32,0.55)]">
      <div className={`relative isolate overflow-hidden px-6 pt-6 pb-7 ${tone.header}`}>
        <svg aria-hidden viewBox="0 0 400 260" className="absolute inset-0 -z-10 size-full opacity-15">
          {[90, 150, 210].map((radius) => (
            <circle key={radius} cx="380" cy="250" r={radius} fill="none" stroke="currentColor" strokeWidth="2" />
          ))}
        </svg>
        <div className="flex items-start justify-between gap-4">
          <span style={tone.logo}>
            <Logo />
          </span>
          <p className="text-right text-xs leading-snug font-medium italic opacity-80">
            Connect
            <br />
            Learn
            <br />
            Grow
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <h3 className="text-[2rem] leading-[0.95] font-semibold tracking-[-0.04em]">
            Internet
            <span className={`block ${tone.accent}`}>Gift Card</span>
          </h3>
          <p className={`-rotate-3 rounded-xl px-3.5 py-1.5 text-2xl font-bold tracking-[-0.02em] shadow-lg ${tone.tag}`}>{ugx(card.amount)}</p>
        </div>
        <p className="mt-5 flex items-center gap-2.5 text-sm">
          <CalendarDays aria-hidden className="size-6 shrink-0" />
          <span>
            <span className="block text-lg leading-tight font-semibold">30 days</span>
            Customer attendance schedule
          </span>
        </p>
      </div>

      <div className="px-6 pt-6">
        <p className="font-semibold">Visit us daily for 30 days</p>
        <p className="text-sm text-muted">Tick the day when you attend</p>
        <div role="img" aria-label="Attendance tracker with 30 days to tick" className="mt-4 grid grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, day) => (
            <span key={day} className={`flex aspect-square items-center justify-center rounded-full text-[0.7rem] font-semibold tabular-nums ring-1 ${tone.day}`}>
              {day + 1}
            </span>
          ))}
        </div>
      </div>

      <div className={`relative mx-4 mt-6 mb-4 flex min-h-40 flex-1 items-center overflow-hidden rounded-3xl pl-6 ${tone.panel}`}>
        <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 ${tone.bar}`} />
        <div className="relative z-10 py-5 pr-2">
          <p className="flex items-center gap-1.5 text-sm text-ink/75">
            <Gift aria-hidden className="size-4" />
            Your 30-day reward
          </p>
          <p className="mt-1 text-xl leading-tight font-semibold tracking-[-0.02em] text-balance">{card.reward}</p>
          <p className="text-sm text-ink/70">YoungAfrican branded</p>
          <p className="mt-3 inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">Claim at the hotspot</p>
        </div>
        <Image
          src={card.image}
          alt={card.alt}
          width={card.width}
          height={card.height}
          sizes="10rem"
          className="ml-auto h-36 w-auto max-w-[48%] shrink-0 object-contain [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_78%)]"
        />
      </div>
    </article>
  );
}
