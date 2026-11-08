"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, Lightbulb, Phone, RotateCcw, Search, Ticket, Wallet, Wifi, X } from "lucide-react";
import { allPackages, hotspotAccess, site, ugx } from "@/content/site";

type Screen = "settings" | "portal" | "voucher" | "find" | "packages" | "pay" | "someone" | "help";
type Path = "voucher" | "buy";

const network = hotspotAccess.network;
const payments = hotspotAccess.payments.join(" or ");

const steps: Record<Screen, { title: string; text: ReactNode; tip?: ReactNode }> = {
  settings: {
    title: `Join the ${network} Wi-Fi`,
    text: (
      <>
        Open <strong>Settings</strong>, tap <strong>Network &amp; internet</strong> and turn on <strong>Wi-Fi</strong>. Then tap the network called{" "}
        <strong>{network}</strong>.
      </>
    ),
    tip: `You may see similar names, such as YOUNG AFRICAN or YoungAfrican. Choose ${network}, and ask the attendant if you are not sure which one to use.`,
  },
  portal: {
    title: "Open the sign-in page",
    text: (
      <>
        Once you join, your phone opens the {network} sign-in page at <strong>{hotspotAccess.portal}</strong>. From here you can enter a voucher or buy a package.
      </>
    ),
    tip: `If the page does not open by itself, tap the "Sign in to Wi-Fi network" notification. The page only works while you are connected to ${network}.`,
  },
  voucher: {
    title: "Enter your voucher code",
    text: (
      <>
        Type your code into the <strong>Enter your voucher code</strong> box and tap <strong>Login</strong>. Once the code is accepted, your internet session starts.
      </>
    ),
    tip: "Type the code exactly as you received it, checking each letter and number.",
  },
  find: {
    title: "Can't find your voucher?",
    text: (
      <>
        If you have already paid but don&apos;t have your code, tap <strong>Already bought? Find My Voucher</strong> just below the Login button and follow the steps on
        the page.
      </>
    ),
    tip: "If the voucher still can't be found, call support with the phone number you paid from.",
  },
  packages: {
    title: "Choose a package",
    text: (
      <>
        Under <strong>Select a package and pay with Mobile Money</strong>, tap <strong>BUY</strong> next to the package you want.
      </>
    ),
    tip: `Packages run from 3 hours for ${ugx(allPackages[0].price)} to 4 weeks for ${ugx(allPackages[4].price)}. They can only be bought on the sign-in page.`,
  },
  pay: {
    title: "Pay with Mobile Money",
    text: (
      <>
        Check the package, duration and price. Enter the {payments} number you want to pay with, add an email address if you like, then tap <strong>Pay Now</strong>{" "}
        and follow the payment instructions on your phone.
      </>
    ),
    tip: "Keep your phone nearby and make sure the Mobile Money account has enough balance for the package.",
  },
  someone: {
    title: "Paying for someone else",
    text: (
      <>
        Buying internet for a friend or family member? After choosing a package, tap <strong>Pay for someone else</strong> below Pay Now and follow the steps on the
        page.
      </>
    ),
  },
  help: {
    title: "Need help?",
    text: "If you can't connect, a voucher isn't accepted or a payment doesn't go through, call our support team.",
  },
};

const paths: Record<Path, Screen[]> = {
  voucher: ["settings", "portal", "voucher", "find", "help"],
  buy: ["settings", "portal", "packages", "pay", "someone", "help"],
};

const allScreens = Object.keys(steps) as Screen[];

const focus = "relative z-10 ring-2 ring-mango ring-offset-2 ring-offset-[#151a17]";

function Pulse() {
  return (
    <span aria-hidden className="absolute -top-1.5 -right-1.5 flex size-3.5">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-mango opacity-70 motion-reduce:animate-none" />
      <span className="relative inline-flex size-3.5 rounded-full bg-mango" />
    </span>
  );
}

function PortalBar() {
  return (
    <div className="bg-[#22262b] px-4 pt-3 pb-2.5 text-white">
      <p className="text-[0.78rem] font-semibold">Sign in to {network}</p>
      <p className="text-[0.65rem] text-white/55">{hotspotAccess.portal}</p>
    </div>
  );
}

function Settings() {
  const networks = [
    { name: "YOUNG AFRICAN", state: "Saved" },
    { name: "YoungAfrican", state: "Saved" },
    { name: network, state: "Tap to connect", target: true },
  ];
  return (
    <div className="flex h-full flex-col bg-[#f2f2f6] px-4 pt-4 text-ink">
      <p className="flex items-center gap-1 text-[0.78rem] text-muted">
        <ChevronLeft aria-hidden className="size-3.5" />
        Network &amp; internet
      </p>
      <p className="mt-2 text-xl font-semibold">Internet</p>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
        <span className="text-sm font-semibold">Wi-Fi</span>
        <span className="flex h-5 w-9 items-center justify-end rounded-full bg-blue p-0.5">
          <span className="size-4 rounded-full bg-white" />
        </span>
      </div>
      <p className="mt-5 px-1 text-[0.65rem] font-semibold tracking-wide text-muted uppercase">Available networks</p>
      <ul className="mt-2 space-y-2">
        {networks.map((item) => (
          <li key={item.name} className={`relative flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ${item.target ? "ring-2 ring-mango" : ""}`}>
            <Wifi aria-hidden className="size-4 text-ink/70" />
            <span>
              <span className={`block text-sm ${item.target ? "font-semibold" : ""}`}>{item.name}</span>
              <span className="block text-[0.65rem] text-muted">{item.state}</span>
            </span>
            {item.target && <Pulse />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Portal({ screen }: { screen: Screen }) {
  const highlight = (target: Screen) => (screen === target ? focus : "");
  return (
    <div className="flex h-full flex-col bg-[#0e1210] text-white">
      <PortalBar />
      <div className="flex flex-1 flex-col px-4 pt-5">
        <Wifi aria-hidden className="mx-auto size-6 text-[#3cc47c]" />
        <p className="mt-1 text-center text-xl font-bold text-[#3cc47c]">{network}</p>
        <div className={`relative mt-4 flex gap-2 rounded-lg ${highlight("voucher")}`}>
          <span className="flex min-h-10 flex-1 items-center rounded-lg bg-[#2a2f2c] px-3 text-[0.7rem] text-white/60">
            {screen === "voucher" ? <span className="font-semibold tracking-[0.12em] text-white">ABC123</span> : "Enter your voucher code"}
          </span>
          <span className="flex min-h-10 items-center rounded-lg bg-[#3cc47c] px-3 text-[0.72rem] font-semibold text-[#0e1210]">Login</span>
          {screen === "voucher" && <Pulse />}
        </div>
        <span
          className={`relative mx-auto mt-3 flex items-center gap-1.5 rounded-md border border-[#3cc47c]/40 bg-[#3cc47c]/10 px-3 py-1.5 text-[0.65rem] text-[#3cc47c] ${highlight("find")}`}
        >
          <Search aria-hidden className="size-3" />
          Already bought? Find My Voucher
          {screen === "find" && <Pulse />}
        </span>
        <p className="mt-4 text-center text-[0.7rem] text-white/75">Select a package and pay with Mobile Money</p>
        <PackageRows count={3} />
      </div>
    </div>
  );
}

function PackageRows({ count, target }: { count: number; target?: string }) {
  return (
    <ul className="mt-3 space-y-2">
      {allPackages.slice(0, count).map((item) => (
        <li
          key={item.name}
          className={`relative flex items-center gap-2 rounded-lg border border-white/10 bg-[#171c19] px-3 py-2 ${item.name === target ? focus : ""}`}
        >
          <span className="flex-1">
            <span className="block text-[0.75rem] font-semibold">{item.name}</span>
            <span className="block text-[0.6rem] text-white/55">{item.duration}</span>
          </span>
          <span className="text-[0.72rem] font-semibold text-[#3cc47c]">{ugx(item.price)}</span>
          <span className="rounded-md bg-[#56c97f] px-2.5 py-1 text-[0.65rem] font-bold text-[#0e1210]">BUY</span>
          {item.name === target && <Pulse />}
        </li>
      ))}
    </ul>
  );
}

function Packages() {
  return (
    <div className="flex h-full flex-col bg-[#0e1210] text-white">
      <PortalBar />
      <div className="flex-1 px-4 pt-4">
        <p className="text-center text-[0.7rem] text-white/75">Select a package and pay with Mobile Money</p>
        <PackageRows count={allPackages.length} target="Daily" />
        <p className="mt-3 rounded-lg border border-white/10 py-2 text-center text-[0.65rem]">
          <span className="block font-semibold">We accept:</span>
          <span className="text-white/70">{hotspotAccess.payments.join(" · ")}</span>
        </p>
      </div>
    </div>
  );
}

function PayDialog({ someone }: { someone: boolean }) {
  const daily = allPackages[2];
  return (
    <div className="flex h-full flex-col bg-[#0e1210] text-white">
      <PortalBar />
      <div className="flex flex-1 items-start bg-black/40 px-3 pt-6">
        <div className="w-full rounded-xl bg-[#211f26] p-3.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <p className="font-semibold">{daily.name}</p>
            <X aria-hidden className="size-4" />
          </div>
          <dl className="mt-3 space-y-1.5 rounded-lg border border-white/10 p-3 text-[0.68rem]">
            {[
              ["Package:", daily.name],
              ["Duration:", daily.duration],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-white/70">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-white/10 pt-1.5 text-[0.75rem]">
              <dt className="text-white/70">Price:</dt>
              <dd className="font-semibold">{ugx(daily.price)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[0.65rem] font-semibold">Phone Number *</p>
          <p className={`mt-1 rounded-lg border border-[#3cc47c]/60 bg-[#171c19] px-3 py-2 text-[0.72rem] text-white/60 ${someone ? "" : focus}`}>07XX XXX XXX</p>
          <p className="mt-2.5 text-[0.65rem] font-semibold">Email Address (Optional)</p>
          <p className="mt-1 rounded-lg border border-white/10 px-3 py-2 text-[0.72rem] text-white/45">Enter your email address</p>
          <p className="mt-3 rounded-lg bg-[#56c97f] py-2 text-center text-[0.78rem] font-semibold text-[#0e1210]">Pay Now</p>
          <p className={`relative mx-auto mt-2.5 w-fit rounded px-1 text-[0.68rem] text-white/80 underline ${someone ? focus : ""}`}>
            Pay for someone else
            {someone && <Pulse />}
          </p>
        </div>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div className="flex h-full flex-col bg-[#0e1210] text-white">
      <PortalBar />
      <div className="flex-1 px-4 pt-4">
        <PackageRows count={2} />
        <p className="mt-4 rounded-lg border border-white/10 py-3 text-center text-[0.68rem]">
          <span className="block font-semibold">We accept:</span>
          <span className="text-white/70">{hotspotAccess.payments.join(" · ")}</span>
        </p>
        <div className={`relative mt-4 rounded-lg border-t border-white/10 py-3 text-center text-[0.68rem] ${focus}`}>
          <p className="text-white/80">Need help? Contact support:</p>
          <p className="mt-1 font-semibold text-[#3cc47c]">{site.contact.phones.map((phone) => phone.tel.replace("+256", "0")).join(" / ")}</p>
          <Pulse />
        </div>
      </div>
    </div>
  );
}

function PhoneScreen({ screen }: { screen: Screen }) {
  if (screen === "settings") return <Settings />;
  if (screen === "packages") return <Packages />;
  if (screen === "pay" || screen === "someone") return <PayDialog someone={screen === "someone"} />;
  if (screen === "help") return <Help />;
  return <Portal screen={screen} />;
}

export function ConnectGuide() {
  const [path, setPath] = useState<Path>("voucher");
  const [index, setIndex] = useState(0);
  const order = paths[path];
  const screen = order[index];
  const last = index === order.length - 1;

  const choose = (next: Path) => {
    setPath(next);
    setIndex((value) => Math.min(value, 2));
  };

  const control = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-semibold transition-colors";

  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-50px_rgba(13,16,32,0.45)] lg:grid-cols-[minmax(0,1fr)_25rem]">
      <div className="flex flex-col p-5 sm:p-10">
        <div role="group" aria-label="Choose your path" className="grid grid-cols-2 gap-1 rounded-full bg-paper p-1">
          {(
            [
              ["voucher", "I have a voucher", Ticket],
              ["buy", "I need to buy", Wallet],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              aria-pressed={path === id}
              onClick={() => choose(id)}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors sm:text-base ${
                path === id ? "bg-blue text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <Icon aria-hidden className="size-4 shrink-0 max-sm:hidden" />
              <span>
                {label}
                {id === "buy" && <span className="max-sm:hidden"> internet</span>}
              </span>
            </button>
          ))}
        </div>

        <ol aria-label="Guide progress" className="mt-8 flex gap-1.5">
          {order.map((item, position) => (
            <li key={item} className="flex-1">
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-current={position === index ? "step" : undefined}
                aria-label={`Step ${position + 1}: ${steps[item].title}`}
                className="block w-full py-2"
              >
                <span aria-hidden className={`block h-1.5 rounded-full transition-colors duration-300 ${position < index ? "bg-blue" : position === index ? "bg-mango" : "bg-ink/10"}`} />
              </button>
            </li>
          ))}
        </ol>

        <div aria-live="polite" className="mt-6 grid">
          {allScreens.map((item) => {
            const step = steps[item];
            const active = item === screen;
            return (
              <div key={item} aria-hidden={!active} className={`[grid-area:1/1] ${active ? "" : "invisible"}`}>
                <p className="text-sm font-semibold text-blue">
                  Step {index + 1} of {order.length}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-balance sm:text-3xl">{step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{step.text}</p>
                {step.tip && (
                  <p className="mt-5 flex gap-3 rounded-2xl bg-paper p-4 leading-relaxed">
                    <Lightbulb aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
                    <span>{step.tip}</span>
                  </p>
                )}
                {item === "help" && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {site.contact.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        tabIndex={active ? undefined : -1}
                        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-blue px-5 font-semibold text-white hover:bg-blue-deep"
                      >
                        <Phone aria-hidden className="size-4" />
                        {phone.label}
                      </a>
                    ))}
                    <Link
                      href="/contact?service=support"
                      tabIndex={active ? undefined : -1}
                      className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-2 ring-ink/15 hover:ring-ink"
                    >
                      Send a message
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 pt-2 lg:mt-auto">
          <button type="button" onClick={() => setIndex(index - 1)} disabled={index === 0} className={`${control} ring-2 ring-ink/15 hover:ring-ink disabled:opacity-35 disabled:hover:ring-ink/15`}>
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
          {last ? (
            <button type="button" onClick={() => setIndex(0)} className={`${control} bg-ink text-white hover:bg-blue`}>
              <RotateCcw aria-hidden className="size-4" />
              Start again
            </button>
          ) : (
            <button type="button" onClick={() => setIndex(index + 1)} className={`${control} bg-blue text-white hover:bg-blue-deep`}>
              Next
              <ArrowRight aria-hidden className="size-4" />
            </button>
          )}
        </div>
      </div>

      <figure className="relative isolate flex flex-col items-center overflow-hidden bg-blue px-6 pt-10 pb-6">
        <svg aria-hidden viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -z-10 w-[44rem] -translate-x-1/2 -translate-y-1/2 text-white/15">
          {[60, 110, 160, 210].map((radius) => (
            <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" />
          ))}
        </svg>
        <div aria-hidden className="w-[16.5rem] rounded-[2.2rem] bg-ink p-2 shadow-[0_40px_70px_-25px_rgba(5,8,30,0.8)]">
          <div className="h-[31rem] overflow-hidden rounded-[1.75rem] bg-[#0e1210]">
            <PhoneScreen screen={screen} />
          </div>
        </div>
        <figcaption className="mt-5 max-w-[17rem] text-center text-xs leading-relaxed text-white/75">
          A drawing of the {network} sign-in page. Your phone&apos;s screens may look a little different.
        </figcaption>
      </figure>
    </div>
  );
}
