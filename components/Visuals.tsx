import { Check, Gift, Wifi } from "lucide-react";
import { Mark } from "@/components/Header";
import { ugx } from "@/content/site";

export function HeroPhone({ className }: { className: string }) {
  return (
    <div aria-hidden className={`w-56 rounded-[2rem] bg-ink p-1.5 shadow-[0_40px_70px_-25px_rgba(5,8,30,0.7)] ${className}`}>
      <div className="flex h-[25rem] flex-col rounded-[1.6rem] bg-white p-4 text-ink">
        <div className="flex justify-between text-[0.65rem] font-semibold text-muted">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Wifi className="size-3" /> Young African Wi-Fi
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
        {[
          ["24 hours", 1000],
          ["7 days", 5000],
          ["30 days", 25000],
        ].map(([name, price], index) => (
          <li key={name} className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm ${index === 0 ? "bg-blue text-white" : "bg-paper"}`}>
            <span className="font-semibold">{name}</span>
            <span className="font-semibold tabular-nums">{ugx(Number(price))}</span>
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

export function GiftCard({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative aspect-[1.6/1] w-full max-w-sm overflow-hidden rounded-3xl bg-night p-6 text-white shadow-[0_40px_70px_-30px_rgba(5,8,30,0.7)] ${className}`}>
      <svg viewBox="0 0 400 250" className="absolute inset-0 size-full text-white/8">
        {[90, 150, 210].map((radius) => (
          <circle key={radius} cx="360" cy="250" r={radius} fill="none" stroke="currentColor" strokeWidth="2" />
        ))}
      </svg>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Mark inverse className="size-8" />
          <Gift className="size-6 text-mango" />
        </div>
        <p className="mt-auto text-sm text-white/70">Thank you for staying connected</p>
        <p className="text-2xl font-semibold tracking-[-0.03em]">Young African Internet</p>
        <p className="mt-1 text-sm font-semibold text-mango">Customer gift card</p>
      </div>
    </div>
  );
}
